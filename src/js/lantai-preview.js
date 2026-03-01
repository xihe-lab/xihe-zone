/**
 * 兰台预览组件
 * 加载并展示内部规范文档（4 份）
 * 作者：鲁班 🔨
 */

/* global marked */

// 使用绝对路径，适配 GitHub Pages 环境
const LANTAI_DATA_PATH = '/lantai/data.json';

/**
 * HTML 转义工具函数（防止 XSS）
 */
function escapeHtml(text) {
  const div = document.createElement('div');

  div.textContent = text;
  return div.innerHTML;
}

/**
 * 加载兰台数据
 */
async function loadLantaiData() {
  try {
    const response = await fetch(LANTAI_DATA_PATH);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    // 加载失败，静默处理
    return null;
  }
}

/**
 * 渲染文档卡片
 */
function renderDocumentCard(doc) {
  const isExternal = doc.source === 'external';
  const isPdf = doc.file_path?.endsWith('.pdf');

  return `
    <div class="lantai-doc-card fade-in" data-doc-id="${doc.id}">
      <div class="doc-header">
        <div class="doc-icon">${isExternal ? '📜' : '📋'}</div>
        <div class="doc-info">
          <h3 class="doc-title">${doc.title}</h3>
          <p class="doc-desc">${doc.desc}</p>
          <p class="doc-pinyin">负责人：<span class="text-sun-gold">${doc.charge_pinyin ? `<ruby>${escapeHtml(doc.charge_person)}<rt>${escapeHtml(doc.charge_pinyin)}</rt></ruby>` : escapeHtml(doc.charge_person)}</span></p>
        </div>
      </div>
      <div class="doc-footer">
        <span class="doc-tag">${doc.type}</span>
        <span class="doc-source-tag ${doc.source}">${doc.source === 'internal' ? '内部规范' : '外部法规'}</span>
        <button class="doc-view-btn sun-button" data-doc-id="${doc.id}" data-is-external="${isExternal}" data-url="${doc.file_path}">
          ${isPdf ? '查看 PDF' : isExternal ? '访问链接' : '📄 查看文档'}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  `;
}

/**
 * 显示文档详情弹窗
 */
async function showDocumentModal(doc) {
  // 如果是外部链接，直接打开
  if (doc.file_path.startsWith('http')) {
    window.open(doc.file_path, '_blank');
    return;
  }

  const modalOverlay = document.querySelector('.lantai-modal-overlay');
  const modal = modalOverlay?.querySelector('.lantai-modal');
  const modalTitle = modal?.querySelector('.modal-title');
  const modalContent = modal?.querySelector('.modal-content');
  const modalMeta = modal?.querySelector('.document-meta');

  if (!modalOverlay || !modal || !modalTitle || !modalContent) {
    console.error('弹窗元素未找到');
    return;
  }

  // 设置标题
  modalTitle.textContent = doc.title;

  // 设置元信息
  modalMeta.innerHTML = `
    <span class="meta-tag">${doc.type}</span>
    <span class="meta-tag">负责人：${doc.charge_pinyin ? `<ruby>${escapeHtml(doc.charge_person)}<rt>${escapeHtml(doc.charge_pinyin)}</rt></ruby>` : escapeHtml(doc.charge_person)}</span>
    <span class="meta-tag">${doc.source === 'internal' ? '内部规范' : '外部法规'}</span>
  `;

  try {
    // 优先使用 doc.content，如果没有则尝试从 file_path 加载
    let markdownContent;

    if (doc.content) {
      markdownContent = doc.content;
    } else if (doc.file_path) {
      const response = await fetch(doc.file_path);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      markdownContent = await response.text();
    } else {
      // 只有在没有 file_path 时才使用 desc
      markdownContent = doc.desc || '暂无详细内容';
    }

    let html;

    if (typeof marked !== 'undefined' && typeof marked.parse === 'function') {
      html = marked.parse(markdownContent);
    } else {
      // 降级处理：保留换行
      html = markdownContent.split('\n').map(line => `<p>${line}</p>`).join('');
    }

    modalContent.innerHTML = html;

    // 显示弹窗
    modalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // 禁止背景滚动
  } catch (error) {
    if (modalContent) {
      modalContent.innerHTML = `<p class="text-red-500">加载文档内容失败：${error.message}</p>`;
    }
    modalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

/**
 * 关闭文档详情弹窗
 */
function closeDocumentModal() {
  const modal = document.querySelector('.document-modal');

  modal.style.display = 'none';
  document.body.style.overflow = ''; // 恢复背景滚动
}

/**
 * 渲染文档列表
 */
function renderDocuments(documents, container) {
  // 数据已加载

  if (!documents || documents.length === 0) {
    container.innerHTML = `
      <div class="lantai-empty-state">
        <p>暂无文档</p>
      </div>
    `;
    return;
  }

  const html = documents.map((doc) => renderDocumentCard(doc)).join('');

  container.innerHTML = html;

  // 添加 visible 类使 fade-in 元素显示
  container.querySelectorAll('.fade-in').forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, index * 100);
  });

  // 绑定点击事件
  container.querySelectorAll('.doc-view-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const docId = btn.dataset.docId;
      const isExternal = btn.dataset.isExternal === 'true';
      const url = btn.dataset.url;

      if (isExternal) {
        // 外部链接直接打开
        window.open(url, '_blank');
      } else {
        // 内部文档显示弹窗
        const doc = window.lantaiData?.documents?.find((d) => d.id == docId);

        if (doc) {
          showDocumentModal(doc);
        }
      }
    });
  });

  // 渲染完成
}

/**
 * 注入弹窗 HTML 结构
 */
function injectModalHTML() {
  const modalHTML = `
    <div class="lantai-modal-overlay" style="display: none;">
      <div class="lantai-modal">
        <div class="modal-header">
          <h2 class="modal-title"></h2>
          <button class="modal-close" aria-label="关闭">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="document-meta"></div>
          <div class="modal-content"></div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

/**
 * 初始化弹窗事件
 */
function attachModalEvents() {
  // 点击遮罩关闭
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('document-modal-overlay')) {
      closeDocumentModal();
    }
  });

  // 点击关闭按钮
  document.addEventListener('click', (e) => {
    if (e.target.closest('.modal-close')) {
      closeDocumentModal();
    }
  });

  // 点击遮罩关闭
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('lantai-modal-overlay')) {
      closeDocumentModal();
    }
  });

  // ESC 键关闭
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDocumentModal();
    }
  });
}

/**
 * 初始化兰台组件
 */
async function initLantai() {
  const container = document.getElementById('lantai-documents');

  if (!container) {
    // 兰台容器未找到
    return;
  }

  // 开始初始化兰台组件

  // 注入弹窗 HTML
  injectModalHTML();

  // 初始化弹窗事件
  attachModalEvents();

  // 加载数据
  const data = await loadLantaiData();

  if (!data || !data.documents) {
    container.innerHTML = `
      <div class="lantai-error">
        <p>加载失败，请稍后重试</p>
      </div>
    `;
    return;
  }

  // 保存数据到全局变量
  window.lantaiData = data;

  // 仅展示内部规范（source === 'internal'）
  const internalDocs = data.documents.filter((doc) => doc.source === 'internal');

  // 渲染文档列表
  renderDocuments(internalDocs, container);
}

// DOM 加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLantai);
} else {
  initLantai();
}

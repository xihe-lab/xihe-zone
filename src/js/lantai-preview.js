/**
 * 兰台预览组件
 * 加载并展示内部规范文档（4 份）
 * 作者：鲁班 🔨
 */

// 使用绝对路径，适配 GitHub Pages 环境
const LANTAI_DATA_PATH = '/lantai/data.json';

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
    console.error('加载兰台数据失败:', error);
    return null;
  }
}

/**
 * 渲染文档卡片
 */
function renderDocumentCard(doc) {
  const isExternal = doc.source === 'external';
  const targetUrl = isExternal ? doc.file_path : '#';
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
          ${isPdf ? '查看 PDF' : (isExternal ? '访问链接' : '📄 查看文档')}
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
function showDocumentModal(doc) {
  const modal = document.querySelector('.document-modal');
  const modalTitle = modal.querySelector('.document-modal-title');
  const modalContent = modal.querySelector('.document-modal-content');
  const modalMeta = modal.querySelector('.document-meta');
  
  // 设置标题
  modalTitle.textContent = doc.title;
  
  // 设置元信息
  modalMeta.innerHTML = `
    <span class="meta-tag">${doc.type}</span>
    <span class="meta-tag">负责人：${doc.charge_pinyin ? `<ruby>${escapeHtml(doc.charge_person)}<rt>${escapeHtml(doc.charge_pinyin)}</rt></ruby>` : escapeHtml(doc.charge_person)}</span>
    <span class="meta-tag">${doc.source === 'internal' ? '内部规范' : '外部法规'}</span>
  `;
  
  // 使用 marked.js 渲染 Markdown 内容
  const markdownContent = doc.content || doc.desc || '暂无详细内容';
  
  // 调试输出
  console.log('Markdown 内容:', markdownContent);
  console.log('marked 是否可用:', typeof marked);
  
  let html;
  if (typeof marked !== 'undefined' && typeof marked.parse === 'function') {
    html = marked.parse(markdownContent);
  } else {
    console.warn('marked.js 未加载，使用纯文本');
    html = `<p>${markdownContent}</p>`;
  }
  
  console.log('渲染后 HTML:', html);
  modalContent.innerHTML = html;
  
  // 显示弹窗
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // 禁止背景滚动
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
  console.log('兰台数据:', window.lantaiData);
  console.log('内部文档:', documents);
  
  if (!documents || documents.length === 0) {
    container.innerHTML = `
      <div class="lantai-empty-state">
        <p>暂无文档</p>
      </div>
    `;
    return;
  }

  const html = documents.map(doc => renderDocumentCard(doc)).join('');
  container.innerHTML = html;

  // 添加 visible 类使 fade-in 元素显示
  container.querySelectorAll('.fade-in').forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, index * 100);
  });

  // 绑定点击事件
  container.querySelectorAll('.doc-view-btn').forEach(btn => {
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
        const doc = window.lantaiData?.documents?.find(d => d.id == docId);
        if (doc) {
          showDocumentModal(doc);
        }
      }
    });
  });
  
  console.log('渲染完成');
}

/**
 * 注入弹窗 HTML 结构
 */
function injectModalHTML() {
  const modalHTML = `
    <div class="document-modal" style="display: none;">
      <div class="document-modal-overlay"></div>
      <div class="document-modal-content-wrapper">
        <div class="document-modal-header">
          <h2 class="document-modal-title"></h2>
          <button class="modal-close-btn">&times;</button>
        </div>
        <div class="document-modal-body">
          <div class="document-meta"></div>
          <div class="document-modal-content"></div>
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
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('document-modal-overlay')) {
      closeDocumentModal();
    }
  });
  
  // 点击关闭按钮
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-close-btn')) {
      closeDocumentModal();
    }
  });
  
  // ESC 键关闭
  document.addEventListener('keydown', function(e) {
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
    console.warn('兰台容器未找到');
    return;
  }

  console.log('开始初始化兰台组件...');

  // 注入弹窗 HTML
  injectModalHTML();
  
  // 初始化弹窗事件
  attachModalEvents();

  // 显示加载状态
  container.innerHTML = `
    <div class="lantai-loading">
      <div class="sun-loader"></div>
      <p>加载典章中...</p>
    </div>
  `;

  // 加载数据
  const data = await loadLantaiData();
  if (!data || !data.documents) {
    container.innerHTML = `
      <div class="lantai-error">
        <p>加载失败，请稍后重试</p>
      </div>
    `;
    console.error('兰台数据加载失败');
    return;
  }

  // 保存数据到全局变量供调试使用
  window.lantaiData = data;
  console.log('兰台数据加载成功:', data);

  // 仅展示内部规范（source === 'internal'）
  const internalDocs = data.documents.filter(doc => doc.source === 'internal');
  console.log('过滤后的内部文档数量:', internalDocs.length);
  
  // 渲染文档列表
  renderDocuments(internalDocs, container);
}

// DOM 加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLantai);
} else {
  initLantai();
}

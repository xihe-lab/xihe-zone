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
          ${doc.need_pinyin && doc.pinyin ? `<p class="doc-pinyin">负责人：<span class="text-sun-gold">${doc.charge_person}</span> (${doc.pinyin})</p>` : `<p class="doc-pinyin">负责人：<span class="text-sun-gold">${doc.charge_person}</span></p>`}
        </div>
      </div>
      <div class="doc-footer">
        <span class="doc-tag">${doc.type}</span>
        <span class="doc-source-tag ${doc.source}">${doc.source === 'internal' ? '内部规范' : '外部法规'}</span>
        <button class="doc-view-btn sun-button" data-doc-id="${doc.id}" data-is-external="${isExternal}" data-url="${doc.file_path}">
          ${isPdf ? '查看 PDF' : (isExternal ? '访问链接' : '查看详情')}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  `;
}

/**
 * 渲染文档列表
 */
function renderDocuments(documents, container) {
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
        // 内部文档显示详情
        showDocumentDetail(docId, documents);
      }
    });
  });
}

/**
 * 显示文档详情（弹窗）
 */
function showDocumentDetail(docId, documents) {
  const doc = documents.find(d => d.id == docId);
  if (!doc) return;

  // 创建弹窗
  const modal = document.createElement('div');
  modal.className = 'lantai-modal-overlay';
  modal.innerHTML = `
    <div class="lantai-modal">
      <div class="modal-header">
        <h3 class="modal-title">${doc.title}</h3>
        <button class="modal-close" aria-label="关闭">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <div class="detail-section">
          <h4 class="detail-label">文档描述</h4>
          <p class="detail-content">${doc.desc}</p>
        </div>
        <div class="detail-section">
          <h4 class="detail-label">文档类型</h4>
          <p class="detail-content">${doc.type}</p>
        </div>
        <div class="detail-section">
          <h4 class="detail-label">负责人</h4>
          <p class="detail-content">
            <span class="text-sun-gold">${doc.charge_person}</span>
            ${doc.need_pinyin && doc.pinyin ? `(${doc.pinyin})` : ''}
          </p>
        </div>
        ${doc.file_path ? `
        <div class="detail-section">
          <h4 class="detail-label">文件路径</h4>
          <p class="detail-content code-path">${doc.file_path}</p>
        </div>
        ` : ''}
      </div>
      <div class="modal-footer">
        ${doc.file_path?.endsWith('.pdf') ? `
          <a href="${doc.file_path}" target="_blank" class="sun-button">
            打开 PDF
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
        ` : `
          <button class="sun-button modal-close-btn">关闭</button>
        `}
      </div>
    </div>
  `;

  // 绑定关闭事件
  modal.querySelectorAll('.modal-close, .modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      modal.remove();
    });
  });

  // 点击遮罩关闭
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });

  document.body.appendChild(modal);
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
    return;
  }

  // 仅展示内部规范（source === 'internal'）
  const internalDocs = data.documents.filter(doc => doc.source === 'internal');
  
  // 渲染文档列表
  renderDocuments(internalDocs, container);
}

// DOM 加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLantai);
} else {
  initLantai();
}

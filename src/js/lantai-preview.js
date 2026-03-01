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
          <p class="doc-pinyin">负责人：<span class="text-sun-gold">${doc.charge_person}</span></p>
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
        // 内部文档打开详情页
        window.open(`/lantai/document.html?id=${docId}`, '_blank');
      }
    });
  });
  
  console.log('渲染完成');
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

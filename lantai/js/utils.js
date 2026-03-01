/**
 * 兰台板块 - 工具函数模块
 * 羲和实验室 - 内部规范文档管理
 * 
 * @author 墨子 ⚙️
 * @version 1.1.0
 * @note 2026-03-01 调整：仅展示内部规范（4 份），国家法规暂不展示
 */

/**
 * 渲染文档列表
 * @param {Array} documents - 文档列表
 * @param {string} containerId - 容器 ID
 * @returns {string} HTML 字符串
 */
function renderDocumentList(documents, containerId) {
  if (!documents || documents.length === 0) {
    return `<div class="lantai-empty">暂无文档</div>`;
  }

  const html = documents.map(doc => {
    const pinyinHtml = doc.need_pinyin && doc.pinyin 
      ? `<span class="pinyin">${doc.pinyin}</span>` 
      : '';
    
    return `
      <div class="lantai-doc-item" data-id="${doc.id}">
        <div class="doc-header">
          <h3 class="doc-title">
            ${pinyinHtml}
            <a href="${getDocumentLink(doc)}" 
               target="_self" 
               class="doc-link">
              ${escapeHtml(doc.title)}
            </a>
          </h3>
          <span class="badge badge-internal">内部规范</span>
        </div>
        <p class="doc-desc">${escapeHtml(doc.desc)}</p>
        <div class="doc-meta">
          <span class="meta-item">
            <span class="meta-label">负责人:</span>
            <span class="meta-value">${escapeHtml(doc.charge_person)}</span>
          </span>
          <span class="meta-item">
            <span class="meta-label">类型:</span>
            <span class="meta-value">${escapeHtml(doc.type)}</span>
          </span>
        </div>
      </div>
    `;
  }).join('');

  return `<div class="lantai-doc-list">${html}</div>`;
}

/**
 * 渲染分组文档列表（按类型分组）
 * @param {Object} groupedDocs - 按类型分组的文档对象
 * @returns {string} HTML 字符串
 */
function renderGroupedDocuments(groupedDocs) {
  if (!groupedDocs || Object.keys(groupedDocs).length === 0) {
    return `<div class="lantai-empty">暂无文档</div>`;
  }

  const html = Object.keys(groupedDocs).map(type => {
    const docs = groupedDocs[type];
    const docItems = docs.map(doc => {
      const pinyinHtml = doc.need_pinyin && doc.pinyin 
        ? `<span class="pinyin">${doc.pinyin}</span>` 
        : '';
      
      return `
        <div class="lantai-doc-item" data-id="${doc.id}">
          <h4 class="doc-title">
            ${pinyinHtml}
            <a href="${getDocumentLink(doc)}" 
               target="_self" 
               class="doc-link">
              ${escapeHtml(doc.title)}
            </a>
          </h4>
          <p class="doc-desc">${escapeHtml(doc.desc)}</p>
          <div class="doc-meta">
            <span class="meta-item">
              <span class="meta-label">负责人:</span>
              <span class="meta-value">${escapeHtml(doc.charge_person)}</span>
            </span>
            <span class="meta-item">
              <span class="meta-label">类型:</span>
              <span class="meta-value">${escapeHtml(doc.type)}</span>
            </span>
          </div>
        </div>
      `;
    }).join('');

    return `
      <section class="lantai-doc-section">
        <h2 class="section-title">${escapeHtml(type)}</h2>
        <div class="lantai-doc-list">${docItems}</div>
      </section>
    `;
  }).join('');

  return `<div class="lantai-grouped-docs">${html}</div>`;
}

/**
 * 渲染搜索框
 * @param {string} containerId - 容器 ID
 * @param {string} placeholder - 占位符文本
 * @returns {string} HTML 字符串
 */
function renderSearchBox(containerId, placeholder = '搜索文档...') {
  return `
    <div class="lantai-search-box" id="${containerId}">
      <input type="text" 
             class="search-input" 
             placeholder="${placeholder}"
             id="lantai-search-input" />
      <button class="search-btn" onclick="LantaiUtils.handleSearch()">
        搜索
      </button>
    </div>
  `;
}

/**
 * 渲染类型过滤器
 * @param {Array} types - 类型列表
 * @param {string} containerId - 容器 ID
 * @returns {string} HTML 字符串
 */
function renderTypeFilter(types, containerId) {
  if (!types || types.length === 0) {
    return '';
  }

  const options = types.map((type, index) => {
    return `<option value="${escapeHtml(type)}">${escapeHtml(type)}</option>`;
  }).join('');

  return `
    <div class="lantai-filter-box" id="${containerId}">
      <label for="lantai-type-filter">类型:</label>
      <select id="lantai-type-filter" onchange="LantaiUtils.handleTypeFilter()">
        <option value="">全部</option>
        ${options}
      </select>
    </div>
  `;
}

/**
 * 渲染来源过滤器
 * @param {string} containerId - 容器 ID
 * @returns {string} HTML 字符串
 */
function renderSourceFilter(containerId) {
  return `
    <div class="lantai-filter-box" id="${containerId}">
      <label for="lantai-source-filter">来源:</label>
      <select id="lantai-source-filter" onchange="LantaiUtils.handleSourceFilter()">
        <option value="">全部</option>
        <option value="internal">内部文档</option>
        <option value="external">外部法规</option>
      </select>
    </div>
  `;
}

/**
 * 处理搜索
 * @param {string} keyword - 搜索关键词
 */
function handleSearch(keyword) {
  if (typeof LantaiData === 'undefined') {
    console.error('LantaiData module not loaded');
    return;
  }

  const results = LantaiData.searchDocuments(keyword);
  const container = document.getElementById('lantai-doc-container');
  if (container) {
    container.innerHTML = renderDocumentList(results);
  }
}

/**
 * 处理类型过滤
 * @param {string} type - 类型
 */
function handleTypeFilter(type) {
  if (typeof LantaiData === 'undefined') {
    console.error('LantaiData module not loaded');
    return;
  }

  const select = document.getElementById('lantai-type-filter');
  const selectedType = type || (select ? select.value : '');
  
  const results = selectedType 
    ? LantaiData.filterByType(selectedType)
    : LantaiData.getAllDocuments();
    
  const container = document.getElementById('lantai-doc-container');
  if (container) {
    container.innerHTML = renderDocumentList(results);
  }
}

/**
 * 处理来源过滤
 * @param {string} source - 来源类型
 */
function handleSourceFilter(source) {
  if (typeof LantaiData === 'undefined') {
    console.error('LantaiData module not loaded');
    return;
  }

  const select = document.getElementById('lantai-source-filter');
  const selectedSource = source || (select ? select.value : '');
  
  const results = selectedSource 
    ? LantaiData.filterBySource(selectedSource)
    : LantaiData.getAllDocuments();
    
  const container = document.getElementById('lantai-doc-container');
  if (container) {
    container.innerHTML = renderDocumentList(results);
  }
}

/**
 * 处理文档点击（区分内部/外部链接）
 * @param {Event} event - 点击事件
 * @param {Object} doc - 文档对象
 */
function handleDocClick(event, doc) {
  if (!doc) return;

  if (isExternalLink(doc)) {
    // 外部链接：新窗口打开，添加安全属性
    event.preventDefault();
    const link = getDocumentLink(doc);
    if (link) {
      const newWindow = window.open(link, '_blank', 'noopener,noreferrer');
      if (newWindow) {
        newWindow.opener = null; // 防止新窗口访问原窗口对象
      }
    }
  }
  // 内部链接：默认行为（可根据需要添加自定义逻辑）
}

/**
 * 获取安全的文档链接（处理 internal/external 不同逻辑）
 * @param {Object} doc - 文档对象
 * @returns {Object} 链接配置对象 { href, target, rel }
 */
function getSafeLinkConfig(doc) {
  if (!doc) {
    return { href: '#', target: '_self', rel: '' };
  }

  const isExternal = isExternalLink(doc);
  return {
    href: getDocumentLink(doc),
    target: isExternal ? '_blank' : '_self',
    rel: isExternal ? 'noopener noreferrer' : ''
  };
}

/**
 * 处理内部文档路径
 * @param {string} filePath - 文件路径
 * @returns {string} 处理后的路径
 */
function processInternalPath(filePath) {
  if (!filePath) return '#';
  
  // 如果是 HTTP/HTTPS 链接，直接返回
  if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
    return filePath;
  }
  
  // 内部路径：确保以 / 开头
  if (!filePath.startsWith('/')) {
    return '/' + filePath;
  }
  
  return filePath;
}

/**
 * 处理外部链接（安全校验）
 * @param {string} url - URL 地址
 * @returns {string|null} 安全的 URL 或 null（如果不安全）
 */
function processExternalLink(url) {
  if (!url) return null;
  
  try {
    const urlObj = new URL(url);
    
    // 只允许 HTTP/HTTPS 协议
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      console.warn('不安全的外部链接协议:', url);
      return null;
    }
    
    return url;
  } catch (e) {
    console.warn('无效的 URL:', url);
    return null;
  }
}

/**
 * 渲染拼音标注
 * @param {Object} doc - 文档对象
 * @param {string} position - 拼音位置 (before/after)
 * @returns {string} HTML 字符串
 */
function renderPinyin(doc, position = 'before') {
  if (!doc || !doc.need_pinyin || !doc.pinyin) {
    return '';
  }

  const pinyinHtml = `<span class="pinyin">${escapeHtml(doc.pinyin)}</span>`;
  
  if (position === 'before') {
    return pinyinHtml + ' ';
  } else {
    return ' ' + pinyinHtml;
  }
}

/**
 * 获取文档类型列表
 * @returns {Array} 类型列表
 */
function getDocumentTypes() {
  if (typeof LantaiData === 'undefined') {
    return [];
  }
  
  const docs = LantaiData.getAllDocuments();
  const types = [...new Set(docs.map(doc => doc.type))];
  return types;
}

/**
 * 渲染统计信息
 * @returns {string} HTML 字符串
 */
function renderStatistics() {
  if (typeof LantaiData === 'undefined') {
    return '';
  }

  const stats = LantaiData.getStatistics();

  return `
    <div class="lantai-statistics">
      <div class="stat-item">
        <span class="stat-value">${stats.total}</span>
        <span class="stat-label">总文档数</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">${stats.byType.length}</span>
        <span class="stat-label">规范类型</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">100%</span>
        <span class="stat-label">内部规范</span>
      </div>
    </div>
  `;
}

/**
 * HTML 转义（防止 XSS）
 * @param {string} str - 原始字符串
 * @returns {string} 转义后的字符串
 */
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * 防抖函数（用于搜索输入）
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * 初始化兰台板块
 * @param {Object} options - 配置选项
 */
function initLantai(options = {}) {
  const {
    containerId = 'lantai-doc-container',
    enableSearch = true,
    enableFilter = true,
    enableStatistics = true,
    groupByType = false
  } = options;

  if (typeof LantaiData === 'undefined') {
    console.error('LantaiData module not loaded');
    return;
  }

  const container = document.getElementById(containerId);
  if (!container) {
    console.error('Container not found:', containerId);
    return;
  }

  // 渲染统计信息
  if (enableStatistics) {
    const statsContainer = document.createElement('div');
    statsContainer.innerHTML = renderStatistics();
    container.appendChild(statsContainer);
  }

  // 渲染搜索框
  if (enableSearch) {
    const searchContainer = document.createElement('div');
    searchContainer.innerHTML = renderSearchBox('lantai-search');
    container.appendChild(searchContainer);

    // 绑定搜索事件（带防抖）
    const searchInput = document.getElementById('lantai-search-input');
    if (searchInput) {
      const debouncedSearch = debounce((e) => {
        handleSearch(e.target.value);
      }, 300);
      searchInput.addEventListener('input', debouncedSearch);
    }
  }

  // 渲染过滤器
  if (enableFilter) {
    const filterContainer = document.createElement('div');
    filterContainer.innerHTML = renderSourceFilter('lantai-source-filter');
    container.appendChild(filterContainer);
  }

  // 渲染文档列表
  const docsContainer = document.createElement('div');
  docsContainer.id = 'lantai-doc-container';
  
  if (groupByType) {
    const groupedDocs = LantaiData.groupByType();
    docsContainer.innerHTML = renderGroupedDocuments(groupedDocs);
  } else {
    const allDocs = LantaiData.getAllDocuments();
    docsContainer.innerHTML = renderDocumentList(allDocs);
  }
  
  container.appendChild(docsContainer);
}

// 导出模块（兼容不同模块系统）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    renderDocumentList,
    renderGroupedDocuments,
    renderSearchBox,
    renderTypeFilter,
    renderSourceFilter,
    handleSearch,
    handleTypeFilter,
    handleSourceFilter,
    handleDocClick,
    getSafeLinkConfig,
    processInternalPath,
    processExternalLink,
    renderPinyin,
    getDocumentTypes,
    renderStatistics,
    escapeHtml,
    debounce,
    initLantai
  };
}

// 全局挂载（浏览器环境）
if (typeof window !== 'undefined') {
  window.LantaiUtils = {
    renderDocumentList,
    renderGroupedDocuments,
    renderSearchBox,
    renderTypeFilter,
    renderSourceFilter,
    handleSearch,
    handleTypeFilter,
    handleSourceFilter,
    handleDocClick,
    getSafeLinkConfig,
    processInternalPath,
    processExternalLink,
    renderPinyin,
    getDocumentTypes,
    renderStatistics,
    escapeHtml,
    debounce,
    initLantai
  };
}

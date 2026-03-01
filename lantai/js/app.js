/**
 * 兰台 - 羲和实验室文档列表页
 * 负责加载和渲染文档数据
 */

// 分组图标映射
const GROUP_ICONS = {
    '合规规范': '📋',
    '团队规范': '👥',
    '审核规范': '✅',
    '数据合规': '🔒',
    '国家法规': '🏛️'
};

// 分组顺序
const GROUP_ORDER = [
    '合规规范',
    '团队规范',
    '审核规范',
    '数据合规',
    '国家法规'
];

/**
 * 加载文档数据
 */
async function loadDocuments() {
    try {
        // 使用绝对路径，适配 GitHub Pages 环境
        const response = await fetch('/lantai/data.json');
        if (!response.ok) {
            throw new Error('无法加载文档数据');
        }
        const data = await response.json();
        return data.documents;
    } catch (error) {
        console.error('加载文档失败:', error);
        showLoadingError();
        return [];
    }
}

/**
 * 按类型分组文档
 */
function groupDocumentsByType(documents) {
    const groups = {};
    
    documents.forEach(doc => {
        const type = doc.type;
        if (!groups[type]) {
            groups[type] = [];
        }
        groups[type].push(doc);
    });
    
    return groups;
}

/**
 * 创建文档卡片 HTML
 */
function createDocumentCard(doc) {
    const sourceClass = doc.source === 'internal' ? 'source-internal' : 'source-external';
    const sourceLabel = doc.source === 'internal' ? '内部' : '外部';
    const sourceIcon = doc.source === 'internal' ? '🏢' : '🌐';
    const clickableClass = doc.source === 'external' ? 'card-external' : 'card-internal';
    
    return `
        <div class="document-card ${doc.source} ${clickableClass}" data-id="${doc.id}" style="cursor: pointer;">
            <div class="card-header">
                <h3 class="card-title">${escapeHtml(doc.title)}</h3>
                <span class="card-type">${escapeHtml(doc.type)}</span>
            </div>
            <p class="card-desc">${escapeHtml(doc.desc)}</p>
            <div class="card-meta">
                <span class="meta-item">
                    <span class="meta-icon">👤</span>
                    <span>${doc.charge_pinyin ? `<ruby>${escapeHtml(doc.charge_person)}<rt>${escapeHtml(doc.charge_pinyin)}</rt></ruby>` : escapeHtml(doc.charge_person)}</span>
                </span>
                <span class="meta-item">
                    <span class="meta-icon">${sourceIcon}</span>
                    <span class="source-badge ${sourceClass}">${sourceLabel}</span>
                </span>
            </div>
        </div>
    `;
}

/**
 * HTML 转义
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * 创建分组容器
 */
function createGroupSection(type, documents) {
    const icon = GROUP_ICONS[type] || '📄';
    const cardsHtml = documents.map(doc => createDocumentCard(doc)).join('');
    
    return `
        <section class="document-group" data-type="${escapeHtml(type)}">
            <div class="group-header">
                <span class="group-icon">${icon}</span>
                <h2 class="group-title">${escapeHtml(type)}</h2>
                <span class="group-count">${documents.length} 份文档</span>
            </div>
            <div class="documents-list">
                ${cardsHtml}
            </div>
        </section>
    `;
}

/**
 * 过滤文档 - 仅展示内部规范
 */
function filterInternalDocuments(documents) {
    return documents.filter(doc => doc.source === 'internal');
}

/**
 * 渲染文档列表
 */
function renderDocuments(documents) {
    const container = document.getElementById('documents-container');
    
    // 过滤：仅展示内部规范
    const internalDocs = filterInternalDocuments(documents);
    console.log('兰台展示：共', documents.length, '份文档，当前展示内部规范', internalDocs.length, '份');
    
    const groups = groupDocumentsByType(internalDocs);
    
    let html = '';
    
    // 按照预定顺序渲染分组
    GROUP_ORDER.forEach(type => {
        if (groups[type] && groups[type].length > 0) {
            html += createGroupSection(type, groups[type]);
        }
    });
    
    // 渲染未预定义的分组
    Object.keys(groups).forEach(type => {
        if (!GROUP_ORDER.includes(type)) {
            html += createGroupSection(type, groups[type]);
        }
    });
    
    container.innerHTML = html;
}

/**
 * 显示加载状态
 */
function showLoading() {
    const container = document.getElementById('documents-container');
    container.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
            <p>正在加载兰台典藏...</p>
        </div>
    `;
}

/**
 * 显示加载错误
 */
function showLoadingError() {
    const container = document.getElementById('documents-container');
    container.innerHTML = `
        <div class="loading">
            <p style="color: var(--primary-red);">⚠️ 加载失败，请稍后重试</p>
        </div>
    `;
}

/**
 * 添加卡片点击事件
 */
function attachCardEvents() {
    document.addEventListener('click', function(e) {
        const card = e.target.closest('.document-card');
        if (card) {
            const docId = card.dataset.id;
            handleCardClick(docId);
        }
    });
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
 * 处理卡片点击
 */
async function handleCardClick(docId) {
    console.log('点击文档 ID:', docId);
    
    try {
        // 加载完整数据以获取文档详情
        const response = await fetch('/lantai/data.json');
        const data = await response.json();
        const doc = data.documents.find(d => d.id == docId);
        
        if (!doc) {
            console.error('未找到文档:', docId);
            return;
        }
        
        // external 类型直接跳转
        if (doc.source === 'external') {
            window.open(doc.file_path, '_blank', 'noopener,noreferrer');
            return;
        }
        
        // internal 类型显示弹窗
        showDocumentModal(doc);
    } catch (error) {
        console.error('处理点击失败:', error);
    }
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
 * 初始化
 */
async function init() {
    showLoading();
    attachCardEvents();
    attachModalEvents();
    injectModalHTML();
    
    const documents = await loadDocuments();
    if (documents.length > 0) {
        renderDocuments(documents);
        console.log('兰台文档加载完成，共', documents.length, '份文档');
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);

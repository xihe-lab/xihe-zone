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
        const response = await fetch('../../../feedback/lantai/inbound/doubao/lantai.json');
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
    
    return `
        <div class="document-card ${doc.source}" data-id="${doc.id}">
            <div class="card-header">
                <h3 class="card-title">${escapeHtml(doc.title)}</h3>
                <span class="card-type">${escapeHtml(doc.type)}</span>
            </div>
            <p class="card-desc">${escapeHtml(doc.desc)}</p>
            <div class="card-meta">
                <span class="meta-item">
                    <span class="meta-icon">👤</span>
                    <span>${formatChargePerson(doc)}</span>
                </span>
                <span class="meta-item">
                    <span class="meta-icon">${sourceIcon}</span>
                    <span class="source-badge ${sourceClass}">${sourceLabel}</span>
                </span>
            </div>
            ${doc.need_pinyin && doc.pinyin ? `
                <div class="pinyin">${escapeHtml(doc.pinyin)}</div>
            ` : ''}
        </div>
    `;
}

/**
 * 格式化负责人信息
 */
function formatChargePerson(doc) {
    if (!doc.need_pinyin) {
        return escapeHtml(doc.charge_person);
    }
    
    // 处理多个负责人的情况
    const persons = doc.charge_person.split('/').map(p => p.trim());
    return persons.map(person => {
        if (person.includes('皋陶')) {
            return `皋陶 <span style="font-size: 0.85em; color: var(--primary-red);">(${doc.pinyin})</span>`;
        }
        return escapeHtml(person);
    }).join(' / ');
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
 * 处理卡片点击
 */
function handleCardClick(docId) {
    console.log('点击文档 ID:', docId);
    // 后续可扩展：打开文档详情或下载
}

/**
 * 初始化
 */
async function init() {
    showLoading();
    attachCardEvents();
    
    const documents = await loadDocuments();
    if (documents.length > 0) {
        renderDocuments(documents);
        console.log('兰台文档加载完成，共', documents.length, '份文档');
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);

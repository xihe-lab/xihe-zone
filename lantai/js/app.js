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
        
        // internal 类型显示详情弹窗
        showDocumentModal(doc);
    } catch (error) {
        console.error('处理点击失败:', error);
    }
}

/**
 * 显示文档详情弹窗
 */
async function showDocumentModal(doc) {
    const sourceLabel = doc.source === 'internal' ? '内部' : '外部';
    const sourceClass = doc.source === 'internal' ? 'document-modal-source-internal' : 'document-modal-source-external';
    
    const modalHtml = `
        <div class="document-modal-overlay active" id="document-modal-overlay">
            <div class="document-modal">
                <div class="document-modal-header">
                    <h2 class="document-modal-title">
                        ${escapeHtml(doc.title)}
                        <span class="document-modal-source-badge ${sourceClass}">${sourceLabel}</span>
                    </h2>
                    <button class="document-modal-close" id="modal-close-btn">&times;</button>
                </div>
                <div class="document-modal-body">
                    <p class="document-modal-desc">${escapeHtml(doc.desc)}</p>
                    <div class="document-modal-meta">
                        <div class="document-modal-meta-item">
                            <span class="document-modal-meta-label">类型:</span>
                            <span class="document-modal-meta-value">${escapeHtml(doc.type)}</span>
                        </div>
                        <div class="document-modal-meta-item">
                            <span class="document-modal-meta-label">负责人:</span>
                            <span class="document-modal-meta-value">${formatChargePerson(doc)}</span>
                        </div>
                        ${doc.need_pinyin && doc.pinyin ? `
                        <div class="document-modal-meta-item">
                            <span class="document-modal-meta-label">拼音:</span>
                            <span class="document-modal-meta-value">${escapeHtml(doc.pinyin)}</span>
                        </div>
                        ` : ''}
                    </div>
                    <div class="document-modal-content" id="document-modal-content" style="display: none; margin-top: 15px; padding: 15px; background: #f8f9fa; border-radius: 8px; max-height: 400px; overflow-y: auto;">
                        <div id="document-content-text" style="white-space: pre-wrap; font-family: monospace; font-size: 14px; line-height: 1.6;"></div>
                    </div>
                    <div class="document-modal-actions">
                        <button class="document-modal-btn document-modal-btn-primary" id="modal-view-btn">
                            📄 查看文档
                        </button>
                        <button class="document-modal-btn document-modal-btn-secondary" id="modal-cancel-btn">
                            关闭
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 添加弹窗到页面
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = modalHtml;
    const modalOverlay = tempContainer.firstElementChild;
    document.body.appendChild(modalOverlay);
    
    // 绑定事件
    const closeBtn = document.getElementById('modal-close-btn');
    const cancelBtn = document.getElementById('modal-cancel-btn');
    const viewBtn = document.getElementById('modal-view-btn');
    const overlay = document.getElementById('document-modal-overlay');
    const contentDiv = document.getElementById('document-modal-content');
    const contentText = document.getElementById('document-content-text');
    
    // 关闭弹窗
    const closeModal = () => {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
    
    // 查看文档按钮 - 根据文件类型处理
    viewBtn.addEventListener('click', async () => {
        if (!doc.file_path) return;
        
        // 外部链接：直接打开
        if (doc.file_path.startsWith('http')) {
            window.open(doc.file_path, '_blank', 'noopener,noreferrer');
            return;
        }
        
        // Markdown 文件：读取并显示内容
        if (doc.file_path.endsWith('.md')) {
            try {
                viewBtn.disabled = true;
                viewBtn.textContent = '⏳ 加载中...';
                
                const response = await fetch(doc.file_path);
                if (!response.ok) {
                    throw new Error('无法加载文档内容');
                }
                
                const content = await response.text();
                contentText.textContent = content;
                contentDiv.style.display = 'block';
                viewBtn.textContent = '🔄 刷新内容';
            } catch (error) {
                console.error('加载 Markdown 失败:', error);
                contentText.textContent = '⚠️ 加载失败：' + error.message;
                contentDiv.style.display = 'block';
                viewBtn.textContent = '⚠️ 加载失败';
            } finally {
                viewBtn.disabled = false;
            }
            return;
        }
        
        // PDF 文件：提示用户
        if (doc.file_path.endsWith('.pdf')) {
            contentText.textContent = '📄 PDF 文件预览暂不支持，将在新标签页中打开。';
            contentDiv.style.display = 'block';
            setTimeout(() => {
                window.open(doc.file_path, '_blank', 'noopener,noreferrer');
            }, 1500);
            return;
        }
        
        // 其他文件：直接打开
        window.open(doc.file_path, '_blank', 'noopener,noreferrer');
    });
    
    // ESC 键关闭
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
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

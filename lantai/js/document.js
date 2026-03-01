/**
 * 兰台 - 文档详情页
 * 负责加载和渲染单个文档的详细内容
 */

// 从 URL 获取文档 ID
const urlParams = new URLSearchParams(window.location.search);
const docId = urlParams.get('id');

/**
 * 加载文档数据
 */
async function loadDocumentData() {
    try {
        const response = await fetch('./data.json');
        if (!response.ok) {
            throw new Error('无法加载文档数据');
        }
        const data = await response.json();
        return data.documents.find(d => d.id == docId);
    } catch (error) {
        console.error('加载文档失败:', error);
        return null;
    }
}

/**
 * 渲染文档
 */
async function renderDocument(doc) {
    if (!doc) {
        document.getElementById('doc-title').textContent = '文档未找到';
        document.getElementById('doc-content').innerHTML = '<p style="color: var(--primary-red);">⚠️ 无法加载文档，请检查文档 ID 是否正确</p>';
        return;
    }

    // 设置标题
    document.getElementById('doc-title').textContent = doc.title;
    
    // 设置元信息
    const metaHtml = `
        <div class="doc-meta">
            <span class="meta-item">
                <span class="meta-icon">📋</span>
                <span>类型：${escapeHtml(doc.type)}</span>
            </span>
            <span class="meta-item">
                <span class="meta-icon">👤</span>
                <span>负责人：${escapeHtml(doc.charge_person)}</span>
            </span>
            <span class="meta-item">
                <span class="meta-icon">${doc.source === 'internal' ? '🏢' : '🌐'}</span>
                <span>来源：${doc.source === 'internal' ? '内部' : '外部'}</span>
            </span>
        </div>
    `;
    document.getElementById('doc-meta').innerHTML = metaHtml;

    // 加载并渲染 Markdown 内容
    const contentDiv = document.getElementById('doc-content');
    contentDiv.innerHTML = '<div class="loading"><p>正在加载文档内容...</p></div>';

    try {
        // 外部链接
        if (doc.file_path.startsWith('http')) {
            contentDiv.innerHTML = `
                <div class="external-link-notice">
                    <p>📄 这是一个外部文档，将在新标签页中打开</p>
                    <a href="${escapeHtml(doc.file_path)}" target="_blank" rel="noopener noreferrer" class="sun-button">
                        打开文档
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                    </a>
                </div>
            `;
            return;
        }

        // Markdown 文件
        if (doc.file_path.endsWith('.md')) {
            const response = await fetch(doc.file_path);
            if (!response.ok) {
                throw new Error('无法加载文档内容');
            }
            const mdContent = await response.text();
            
            // 使用 marked 渲染 Markdown
            if (typeof marked !== 'undefined') {
                contentDiv.innerHTML = marked.parse(mdContent);
            } else {
                // 如果 marked 未加载，显示原始内容
                contentDiv.innerHTML = '<pre style="white-space: pre-wrap; font-family: monospace;">' + escapeHtml(mdContent) + '</pre>';
            }
        } else if (doc.file_path.endsWith('.pdf')) {
            contentDiv.innerHTML = `
                <div class="pdf-notice">
                    <p>📄 PDF 文件预览</p>
                    <iframe src="${escapeHtml(doc.file_path)}" style="width: 100%; height: 600px; border: none;"></iframe>
                    <p style="margin-top: 15px;">
                        <a href="${escapeHtml(doc.file_path)}" target="_blank" rel="noopener noreferrer" class="sun-button">
                            在新标签页中打开
                        </a>
                    </p>
                </div>
            `;
        } else {
            // 其他文件类型
            contentDiv.innerHTML = `
                <div class="file-notice">
                    <p>📄 文件类型不支持预览</p>
                    <a href="${escapeHtml(doc.file_path)}" target="_blank" rel="noopener noreferrer" class="sun-button">
                        下载/打开文件
                    </a>
                </div>
            `;
        }
    } catch (error) {
        console.error('加载文档内容失败:', error);
        contentDiv.innerHTML = '<p style="color: var(--primary-red);">⚠️ 加载失败：' + escapeHtml(error.message) + '</p>';
    }
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
 * 初始化
 */
async function init() {
    if (!docId) {
        document.getElementById('doc-title').textContent = '缺少文档 ID';
        document.getElementById('doc-content').innerHTML = '<p>请提供文档 ID 参数</p>';
        return;
    }

    const doc = await loadDocumentData();
    await renderDocument(doc);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);

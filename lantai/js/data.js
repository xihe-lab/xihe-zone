/**
 * 兰台板块 - 数据模块
 * 羲和实验室 - 内部规范文档管理
 * 
 * @author 墨子 ⚙️
 * @version 1.1.0
 * @note 2026-03-01 调整：仅展示内部规范（4 份），国家法规暂不展示
 */

// 原始数据（从 lantai.json 加载 - 仅内部规范）
const RAW_DATA = {
  "platform": "羲和实验室 - 兰台",
  "category": "内部规范",
  "documents": [
    {
      "id": 1001,
      "title": "羲和实验室合规手册",
      "desc": "内容合规、文化使用、网站运营、风险审核总规范",
      "charge_person": "皋陶",
      "need_pinyin": true,
      "pinyin": "gāo yáo",
      "file_path": "/lantai/docs/xihe-compliance-manual.pdf",
      "source": "internal",
      "type": "合规规范"
    },
    {
      "id": 1002,
      "title": "羲和实验室 · 智能体团队规范",
      "desc": "团队分工、协作机制、角色职责、行为准则",
      "charge_person": "陆压 / 皋陶",
      "need_pinyin": true,
      "pinyin": "gāo yáo",
      "file_path": "/lantai/docs/agent-team-spec.pdf",
      "source": "internal",
      "type": "团队规范"
    },
    {
      "id": 1003,
      "title": "内容审核与红线标准",
      "desc": "官网内容发布前必须遵守的审核清单",
      "charge_person": "皋陶",
      "need_pinyin": true,
      "pinyin": "gāo yáo",
      "file_path": "/lantai/docs/content-audit-rules.pdf",
      "source": "internal",
      "type": "审核规范"
    },
    {
      "id": 1004,
      "title": "数据安全与隐私保护指南",
      "desc": "用户信息、数据收集、存储、使用的合规要求",
      "charge_person": "皋陶",
      "need_pinyin": true,
      "pinyin": "gāo yáo",
      "file_path": "/lantai/docs/data-security-privacy.pdf",
      "source": "internal",
      "type": "数据合规"
    }
  ]
};

/**
 * 文档类型枚举
 */
const DOC_TYPES = {
  COMPLIANCE: '合规规范',
  TEAM: '团队规范',
  AUDIT: '审核规范',
  DATA: '数据合规',
  NATIONAL_LAW: '国家法规'
};

/**
 * 来源类型枚举
 */
const SOURCE_TYPES = {
  INTERNAL: 'internal',
  EXTERNAL: 'external'
};

/**
 * 获取所有文档
 * @returns {Array} 文档列表
 */
function getAllDocuments() {
  return RAW_DATA.documents;
}

/**
 * 根据类型分组文档
 * @returns {Object} 按类型分组的文档对象
 */
function groupByType() {
  const grouped = {};
  RAW_DATA.documents.forEach(doc => {
    if (!grouped[doc.type]) {
      grouped[doc.type] = [];
    }
    grouped[doc.type].push(doc);
  });
  return grouped;
}

/**
 * 根据来源分类文档
 * @returns {Object} 按来源分类的文档对象 { internal: [], external: [] }
 */
function groupBySource() {
  return {
    internal: RAW_DATA.documents.filter(doc => doc.source === SOURCE_TYPES.INTERNAL),
    external: RAW_DATA.documents.filter(doc => doc.source === SOURCE_TYPES.EXTERNAL)
  };
}

/**
 * 根据 ID 获取单个文档
 * @param {number} id - 文档 ID
 * @returns {Object|null} 文档对象或 null
 */
function getDocumentById(id) {
  return RAW_DATA.documents.find(doc => doc.id === id) || null;
}

/**
 * 搜索文档（支持标题和描述搜索）
 * @param {string} keyword - 搜索关键词
 * @returns {Array} 匹配的文档列表
 */
function searchDocuments(keyword) {
  if (!keyword || keyword.trim() === '') {
    return RAW_DATA.documents;
  }
  const lowerKeyword = keyword.toLowerCase().trim();
  return RAW_DATA.documents.filter(doc => 
    doc.title.toLowerCase().includes(lowerKeyword) ||
    doc.desc.toLowerCase().includes(lowerKeyword) ||
    doc.charge_person.toLowerCase().includes(lowerKeyword)
  );
}

/**
 * 根据类型过滤文档
 * @param {string} type - 文档类型
 * @returns {Array} 匹配的文档列表
 */
function filterByType(type) {
  return RAW_DATA.documents.filter(doc => doc.type === type);
}

/**
 * 根据来源过滤文档
 * @param {string} source - 来源类型 (internal/external)
 * @returns {Array} 匹配的文档列表
 */
function filterBySource(source) {
  return RAW_DATA.documents.filter(doc => doc.source === source);
}

/**
 * 获取文档链接（处理 internal/external 不同逻辑）
 * @param {Object} doc - 文档对象
 * @returns {string} 文档链接
 */
function getDocumentLink(doc) {
  if (!doc) return '#';
  return doc.file_path || '#';
}

/**
 * 判断是否为外部链接
 * @param {Object} doc - 文档对象
 * @returns {boolean} 是否为外部链接
 */
function isExternalLink(doc) {
  if (!doc) return false;
  return doc.source === SOURCE_TYPES.EXTERNAL || 
         (doc.file_path && doc.file_path.startsWith('http'));
}

/**
 * 获取平台信息
 * @returns {Object} 平台信息对象
 */
function getPlatformInfo() {
  return {
    platform: RAW_DATA.platform,
    category: RAW_DATA.category,
    totalDocuments: RAW_DATA.documents.length
  };
}

/**
 * 获取统计数据
 * @returns {Object} 统计数据对象
 */
function getStatistics() {
  const byType = groupByType();
  const bySource = groupBySource();
  
  return {
    total: RAW_DATA.documents.length,
    byType: Object.keys(byType).map(type => ({
      type: type,
      count: byType[type].length
    })),
    bySource: {
      internal: bySource.internal.length,
      external: bySource.external.length
    }
  };
}

// 导出模块（兼容不同模块系统）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    RAW_DATA,
    DOC_TYPES,
    SOURCE_TYPES,
    getAllDocuments,
    groupByType,
    groupBySource,
    getDocumentById,
    searchDocuments,
    filterByType,
    filterBySource,
    getDocumentLink,
    isExternalLink,
    getPlatformInfo,
    getStatistics
  };
}

// 全局挂载（浏览器环境）
if (typeof window !== 'undefined') {
  window.LantaiData = {
    RAW_DATA,
    DOC_TYPES,
    SOURCE_TYPES,
    getAllDocuments,
    groupByType,
    groupBySource,
    getDocumentById,
    searchDocuments,
    filterByType,
    filterBySource,
    getDocumentLink,
    isExternalLink,
    getPlatformInfo,
    getStatistics
  };
}

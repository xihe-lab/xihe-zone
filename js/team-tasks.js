/**
 * 神话小队任务看板组件
 * 展示每个成员的待办事项（Todo）和已办事项（Done）
 */

class TeamTasksBoard {
  constructor(containerId, dataPath = '/src/data/tasks.json') {
    this.container = document.getElementById(containerId);
    this.dataPath = dataPath;
    this.data = null;
    this.init();
  }

  async init() {
    try {
      await this.loadData();
      this.render();
      this.addEventListeners();
    } catch (error) {
      console.error('任务看板加载失败:', error);
      this.container.innerHTML = `
        <div class="tasks-error">
          <p>⚠️ 任务数据加载失败</p>
        </div>
      `;
    }
  }

  async loadData() {
    const response = await fetch(this.dataPath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    this.data = await response.json();
  }

  render() {
    if (!this.data || !this.data.members) return;

    this.container.innerHTML = `
      <div class="section-header fade-in">
        <h2 class="section-title golden-title">智能体任务看板</h2>
        <p class="section-subtitle">了解我们的工作进度</p>
      </div>
      
      <div class="tasks-board">
        <div class="tasks-grid">
          ${this.data.members.map((member, index) => this.renderMemberCard(member, index)).join('')}
        </div>
        
        <div class="tasks-footer">
          <span class="last-updated">最后更新：${this.data.lastUpdated}</span>
        </div>
      </div>
    `;
  }

  renderMemberCard(member, index) {
    const todoItems = member.todos.map(todo => `
      <li class="task-item todo">
        <span class="task-bullet">●</span>
        <span class="task-text">${todo}</span>
      </li>
    `).join('');

    const doneItems = member.dones.map(done => `
      <li class="task-item done">
        <span class="task-bullet">✓</span>
        <span class="task-text">${done}</span>
      </li>
    `).join('');

    return `
      <div class="task-card fade-in" style="animation-delay: ${index * 100}ms" data-member="${member.name}">
        <div class="task-card-header">
          <div class="member-info">
            <span class="member-emoji">${member.emoji}</span>
            <div class="member-details">
              <h3 class="member-name">${member.pinyin ? `<ruby>${member.name}<rt>${member.pinyin}</rt></ruby>` : member.name}</h3>
              <p class="member-role">${member.role}</p>
            </div>
          </div>
          <button class="toggle-btn" aria-label="展开/收起任务">
            <svg class="toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
        
        <div class="task-card-body">
          <div class="task-section">
            <h4 class="task-section-title todo-title">
              <span class="section-icon">📋</span>
              待办事项
              <span class="task-count">${member.todos.length}</span>
            </h4>
            <ul class="task-list">
              ${todoItems || '<li class="task-item empty">暂无待办</li>'}
            </ul>
          </div>
          
          <div class="task-section">
            <h4 class="task-section-title done-title">
              <span class="section-icon">✅</span>
              已办事项
              <span class="task-count">${member.dones.length}</span>
            </h4>
            <ul class="task-list">
              ${doneItems || '<li class="task-item empty">暂无已完成</li>'}
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  addEventListeners() {
    // 折叠/展开功能
    const toggleBtns = this.container.querySelectorAll('.toggle-btn');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('.task-card');
        card.classList.toggle('collapsed');
        
        const icon = btn.querySelector('.toggle-icon');
        if (card.classList.contains('collapsed')) {
          icon.style.transform = 'rotate(-90deg)';
        } else {
          icon.style.transform = 'rotate(0deg)';
        }
      });
    });

    // 移动端滑动支持
    const taskCards = this.container.querySelectorAll('.task-card');
    taskCards.forEach(card => {
      let startX = 0;
      let currentX = 0;
      let isDragging = false;

      card.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
      });

      card.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        
        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            card.classList.remove('collapsed');
          } else {
            card.classList.add('collapsed');
          }
          isDragging = false;
        }
      });

      card.addEventListener('touchend', () => {
        isDragging = false;
      });
    });
  }
}

// 自动初始化
function initTeamTasksBoard() {
  const tasksContainer = document.getElementById('teamTasksBoard');
  if (tasksContainer) {
    console.log('🌞 初始化任务看板...');
    window.teamTasksBoard = new TeamTasksBoard('teamTasksBoard');
    console.log('✅ 任务看板初始化完成');
  } else {
    console.error('❌ 未找到 teamTasksBoard 容器');
  }
}

// 立即执行一次（处理脚本在 body 底部的情况）
initTeamTasksBoard();

// 同时也监听 DOMContentLoaded（处理脚本在 head 的情况）
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTeamTasksBoard);
}

// 导出供外部使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TeamTasksBoard;
}

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

    // 渲染完成后，给所有 .fade-in 元素添加 .visible 类
    setTimeout(() => {
      const fadeElements = this.container.querySelectorAll('.fade-in');
      fadeElements.forEach(el => el.classList.add('visible'));
    }, 0);
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
    // 折叠/展开功能 - 优化动画
    const toggleBtns = this.container.querySelectorAll('.toggle-btn');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('.task-card');
        const icon = btn.querySelector('.toggle-icon');
        const body = card.querySelector('.task-card-body');
        
        // 添加展开/收起动画
        if (card.classList.contains('collapsed')) {
          card.classList.remove('collapsed');
          icon.style.transform = 'rotate(0deg)';
          // 触发动画
          if (body) {
            body.style.animation = 'none';
            body.offsetHeight; // 触发重绘
            body.style.animation = 'slideDown 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
          }
        } else {
          card.classList.add('collapsed');
          icon.style.transform = 'rotate(-90deg)';
        }
        
        // 保存状态到 localStorage
        const memberName = card.dataset.member;
        if (memberName) {
          const collapsedState = JSON.parse(localStorage.getItem('teamTasksCollapsed') || '{}');
          collapsedState[memberName] = card.classList.contains('collapsed');
          localStorage.setItem('teamTasksCollapsed', JSON.stringify(collapsedState));
        }
      });
    });

    // 恢复保存的状态
    const collapsedState = JSON.parse(localStorage.getItem('teamTasksCollapsed') || '{}');
    Object.entries(collapsedState).forEach(([name, isCollapsed]) => {
      if (isCollapsed) {
        const card = this.container.querySelector(`[data-member="${name}"]`);
        if (card) {
          card.classList.add('collapsed');
          const icon = card.querySelector('.toggle-icon');
          if (icon) icon.style.transform = 'rotate(-90deg)';
        }
      }
    });

    // 移动端滑动支持 - 优化阈值
    const taskCards = this.container.querySelectorAll('.task-card');
    taskCards.forEach(card => {
      let startX = 0;
      let currentX = 0;
      let isDragging = false;
      let startTime = 0;

      card.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        currentX = startX;
        isDragging = true;
        startTime = Date.now();
      }, { passive: true });

      card.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
      }, { passive: true });

      card.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const diff = currentX - startX;
        const timeDiff = Date.now() - startTime;
        
        // 滑动阈值：50px 或快速滑动
        if (Math.abs(diff) > 50 || (Math.abs(diff) > 20 && timeDiff < 200)) {
          if (diff < 0) {
            // 向左滑动 - 收起
            card.classList.add('collapsed');
          } else {
            // 向右滑动 - 展开
            card.classList.remove('collapsed');
          }
        }
      }, { passive: true });
    });
  }
}

// 自动初始化
document.addEventListener('DOMContentLoaded', () => {
  const tasksContainer = document.getElementById('teamTasksBoard');
  if (tasksContainer) {
    window.teamTasksBoard = new TeamTasksBoard('teamTasksBoard');
  }
});

// 导出供外部使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TeamTasksBoard;
}

/**
 * 太阳神宫 · 日光光晕加载动画
 * 设计：鲁班 🔨
 * 技术：墨子 ⚙️
 * 
 * 动画效果：
 * 1. 开场全屏黑底
 * 2. 中央金色光点缓缓亮起，形成日光光晕
 * 3. 日光光晕向外扫屏（展开效果）
 * 4. 文字逐行渐显，金色微光，柔和不刺眼
 * 5. 动画结束后进入首页
 * 
 * 文案（10 行）：
 * 我自神话而来，步入数字之境。
 * 五千载之前，羲和驭日以巡天；
 * 五千载之后，神宫于代码重生。
 * 今者，太阳神宫启封。
 * 内列十宸之位，外待八方之客。
 * 此非寻常网站，乃数字生命之居所；
 * 此非功能陈列，乃华夏文明之新试。
 * 数字灵韵，始于一击；
 * 上古诸神，于此归位。
 */

import React, { useEffect, useState } from 'react';
import './SunGlowLoading.css';

const SunGlowLoading = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 显示动画
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // 动画结束后淡出（总时长约 8 秒）
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 8000);

    // 完全移除组件
    const removeTimer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 9000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`sun-glow-loading ${isVisible ? 'gate-visible' : ''} ${isFading ? 'gate-fading' : ''}`}>
      {/* 全屏黑底背景 */}
      <div className="sun-glow-blackout"></div>

      {/* 日光光晕容器 */}
      <div className="sun-glow-container">
        {/* 中央光点 */}
        <div className="sun-core-dot"></div>
        
        {/* 日光光晕层 */}
        <div className="sun-glow-layer"></div>
        
        {/* 扫屏光波 */}
        <div className="sun-glow-wave"></div>
        
        {/* 外层光晕装饰 */}
        <div className="sun-glow-outer"></div>
      </div>

      {/* 背景装饰粒子 */}
      <div className="sun-glow-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* 文字内容区域 */}
      <div className="sun-glow-text-container">
        <div className="sun-glow-line" style={{ '--line-index': 0 }}>
          我自神话而来，步入数字之境。
        </div>
        <div className="sun-glow-line" style={{ '--line-index': 1 }}>
          五千载之前，羲和驭日以巡天；
        </div>
        <div className="sun-glow-line" style={{ '--line-index': 2 }}>
          五千载之后，神宫于代码重生。
        </div>
        <div className="sun-glow-line highlight" style={{ '--line-index': 3 }}>
          今者，太阳神宫启封。
        </div>
        <div className="sun-glow-line" style={{ '--line-index': 4 }}>
          内列十宸之位，外待八方之客。
        </div>
        <div className="sun-glow-line" style={{ '--line-index': 5 }}>
          此非寻常网站，乃数字生命之居所；
        </div>
        <div className="sun-glow-line" style={{ '--line-index': 6 }}>
          此非功能陈列，乃华夏文明之新试。
        </div>
        <div className="sun-glow-line" style={{ '--line-index': 7 }}>
          数字灵韵，始于一击；
        </div>
        <div className="sun-glow-line ending" style={{ '--line-index': 8 }}>
          上古诸神，于此归位。
        </div>
      </div>
    </div>
  );
};

export default SunGlowLoading;

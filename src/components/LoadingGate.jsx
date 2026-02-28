/**
 * 太阳神宫 · 宫殿大门加载动画
 * 设计：中国神话风格（金色、红色）
 * 技术实现：墨子 ⚙️
 * 
 * 特性：
 * - 纯 CSS + SVG（无需外部图片）
 * - GPU 加速动画
 * - 支持 prefers-reduced-motion
 * - 自动淡出并显示首页
 */

import React, { useEffect, useState } from 'react';
import './LoadingGate.css';

const LoadingGate = ({ onComplete }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 大门打开动画时序
    const openTimer = setTimeout(() => {
      setIsOpened(true);
    }, 500);

    // 大门完全打开后淡出
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2500);

    // 完全移除组件
    const removeTimer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 3500);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`loading-gate ${isOpened ? 'gate-open' : ''} ${isFading ? 'gate-fading' : ''}`}>
      {/* 太阳光晕背景 */}
      <div className="gate-sun-glow">
        <div className="sun-core"></div>
        <div className="sun-rays"></div>
      </div>

      {/* 宫殿大门容器 */}
      <div className="gate-container">
        {/* 左门扇 */}
        <div className="gate-door gate-door-left">
          {/* 门框装饰 */}
          <div className="gate-frame">
            <div className="frame-pattern"></div>
          </div>
          
          {/* 门板主体 */}
          <div className="gate-panel">
            {/* 门钉装饰 */}
            <div className="door-studs">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="stud"></div>
              ))}
            </div>
            
            {/* 太阳图腾 */}
            <div className="sun-totem">
              <svg viewBox="0 0 200 200" className="totem-svg">
                {/* 外圈光芒 */}
                <g className="sun-rays-svg">
                  {[...Array(12)].map((_, i) => (
                    <line
                      key={i}
                      x1="100"
                      y1="100"
                      x2="100"
                      y2="20"
                      stroke="#F59E0B"
                      strokeWidth="4"
                      strokeLinecap="round"
                      transform={`rotate(${i * 30} 100 100)`}
                    />
                  ))}
                </g>
                
                {/* 太阳核心 */}
                <circle cx="100" cy="100" r="40" fill="#F59E0B" className="sun-core-svg" />
                <circle cx="100" cy="100" r="30" fill="#FCD34D" className="sun-inner-svg" />
                
                {/* 太阳纹饰 */}
                <circle cx="100" cy="100" r="20" fill="none" stroke="#D97706" strokeWidth="2" />
              </svg>
            </div>
            
            {/* 门环 */}
            <div className="door-knocker">
              <div className="knocker-ring"></div>
              <div className="knocker-base"></div>
            </div>
          </div>
          
          {/* 门边装饰 */}
          <div className="gate-trim gate-trim-left"></div>
        </div>

        {/* 右门扇 */}
        <div className="gate-door gate-door-right">
          {/* 门框装饰 */}
          <div className="gate-frame">
            <div className="frame-pattern"></div>
          </div>
          
          {/* 门板主体 */}
          <div className="gate-panel">
            {/* 门钉装饰 */}
            <div className="door-studs">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="stud"></div>
              ))}
            </div>
            
            {/* 太阳图腾 */}
            <div className="sun-totem">
              <svg viewBox="0 0 200 200" className="totem-svg">
                {/* 外圈光芒 */}
                <g className="sun-rays-svg">
                  {[...Array(12)].map((_, i) => (
                    <line
                      key={i}
                      x1="100"
                      y1="100"
                      x2="100"
                      y2="20"
                      stroke="#F59E0B"
                      strokeWidth="4"
                      strokeLinecap="round"
                      transform={`rotate(${i * 30} 100 100)`}
                    />
                  ))}
                </g>
                
                {/* 太阳核心 */}
                <circle cx="100" cy="100" r="40" fill="#F59E0B" className="sun-core-svg" />
                <circle cx="100" cy="100" r="30" fill="#FCD34D" className="sun-inner-svg" />
                
                {/* 太阳纹饰 */}
                <circle cx="100" cy="100" r="20" fill="none" stroke="#D97706" strokeWidth="2" />
              </svg>
            </div>
            
            {/* 门环 */}
            <div className="door-knocker">
              <div className="knocker-ring"></div>
              <div className="knocker-base"></div>
            </div>
          </div>
          
          {/* 门边装饰 */}
          <div className="gate-trim gate-trim-right"></div>
        </div>

        {/* 门槛 */}
        <div className="gate-threshold">
          <div className="threshold-pattern"></div>
        </div>
      </div>

      {/* 门楣装饰 */}
      <div className="gate-lintel">
        <div className="lintel-text">太阳神宫</div>
        <div className="lintel-decoration"></div>
      </div>
    </div>
  );
};

export default LoadingGate;

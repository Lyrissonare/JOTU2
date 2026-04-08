// SpectrumWave Component - 示波器/心电图风格
import { useEffect, useRef } from 'react';

interface SpectrumWaveProps {
  className?: string;
  height?: number;
}

// 生成单个心跳波形点
const generateHeartbeat = (centerY: number, height: number, x: number, scale: number = 1) => {
  const points: number[] = [];
  const step = 2;
  
  for (let i = 0; i <= 100; i += step) {
    const t = i / 100;
    let y = centerY;
    
    // P波 (0-0.15)
    if (t < 0.15) {
      const pt = t / 0.15;
      y = centerY - Math.sin(pt * Math.PI) * height * 0.08 * scale;
    }
    // PR段 (0.15-0.2)
    else if (t < 0.2) {
      y = centerY;
    }
    // Q波 (0.2-0.22)
    else if (t < 0.22) {
      y = centerY + height * 0.05 * scale;
    }
    // R波 (0.22-0.28) - 主峰
    else if (t < 0.28) {
      const rt = (t - 0.22) / 0.06;
      if (rt < 0.5) {
        y = centerY - height * (0.35 + Math.random() * 0.1) * scale * Math.sin(rt * 2 * Math.PI);
      } else {
        y = centerY - height * (0.35 + Math.random() * 0.1) * scale * Math.sin((1 - rt) * Math.PI);
      }
    }
    // S波 (0.28-0.35)
    else if (t < 0.35) {
      const st = (t - 0.28) / 0.07;
      y = centerY + height * 0.15 * scale * Math.sin(st * Math.PI);
    }
    // ST段 (0.35-0.5)
    else if (t < 0.5) {
      y = centerY;
    }
    // T波 (0.5-0.75)
    else if (t < 0.75) {
      const tt = (t - 0.5) / 0.25;
      y = centerY - Math.sin(tt * Math.PI) * height * 0.1 * scale;
    }
    // 基线 (0.75-1)
    else {
      y = centerY + (Math.random() - 0.5) * height * 0.02;
    }
    
    points.push(y);
  }
  
  return points.map((y, i) => ({ x: x + i * step * 1.5, y }));
};

export const SpectrumWave: React.FC<SpectrumWaveProps> = ({ 
  className = '',
  height = 80 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const dataRef = useRef<number[]>([]);
  const offsetRef = useRef(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 设置canvas尺寸
    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = height * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener('resize', resize);
    
    const centerY = height / 2;
    const totalPoints = Math.ceil(canvas.offsetWidth / 3) + 100;
    
    // 初始化数据 - 使用随机周期
    dataRef.current = [];
    let currentX = 0;
    while (dataRef.current.length < totalPoints) {
      const scale = 0.8 + Math.random() * 0.4;
      // 随机周期长度（心跳间隔）
      const beatWidth = 120 + Math.random() * 80; // 120-200之间随机
      const beat = generateHeartbeat(centerY, height, currentX, scale);
      for (const point of beat) {
        dataRef.current.push(point.y);
      }
      currentX += beatWidth;
      // 心跳间隔的基线 - 随机长度
      const gapLength = 15 + Math.floor(Math.random() * 20);
      for (let i = 0; i < gapLength; i++) {
        dataRef.current.push(centerY + (Math.random() - 0.5) * 2);
      }
    }
    
    // 动画循环 - 从右往左流动
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, height);
      
      const width = canvas.offsetWidth;
      const points = dataRef.current;
      
      // 绘制网格背景
      ctx.strokeStyle = 'rgba(220, 38, 38, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < width; x += 20) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += 10) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
      
      // 绘制波形 - 从右往左流动效果 (更慢的速度 0.4)
      offsetRef.current = (offsetRef.current + 0.4) % points.length;
      
      // 主波形线
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = '#dc2626';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      
      for (let i = 0; i < width / 3 + 1; i++) {
        const dataIndex = Math.floor((offsetRef.current + i) % points.length);
        const x = width - i * 3;
        const y = points[dataIndex] ?? centerY;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      
      // 绘制扫描线（右侧高亮）
      ctx.strokeStyle = 'rgba(252, 165, 165, 0.8)';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#fca5a5';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      for (let i = 0; i < 15; i++) {
        const dataIndex = Math.floor((offsetRef.current + i) % points.length);
        const x = width - i * 3;
        const y = points[dataIndex] ?? centerY;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [height]);

  return (
    <div className={`w-full overflow-hidden ${className}`} style={{ height }}>
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
        style={{ imageRendering: 'crisp-edges' }}
      />
    </div>
  );
};

// 垂直频谱装饰
export const VerticalSpectrum: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="w-0.5 bg-gradient-to-b from-red-900 via-red-500 to-red-900 rounded-full animate-pulse-red"
          style={{
            height: `${12 + Math.random() * 20}px`,
            opacity: 0.4 + Math.random() * 0.4,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};

export default SpectrumWave;

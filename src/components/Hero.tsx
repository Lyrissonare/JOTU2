// Hero Component
import { SpectrumWave } from './SpectrumWave';
import { ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToArticles = () => {
    const element = document.getElementById('articles');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-16 overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-black">
        {/* 网格背景 */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(220, 38, 38, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(220, 38, 38, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* 径向渐变 */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.8) 100%)',
          }}
        />
      </div>

      {/* 顶部频谱 */}
      <div className="absolute top-20 left-0 right-0">
        <SpectrumWave height={60} />
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo大图标 */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <img 
              src="/logo.png" 
              alt="鸥停大学Logo" 
              className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl"
            />
            {/* 发光效果 */}
            <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
          </div>
        </div>

        {/* 标题 */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          鸥停大学<span className="text-red-500">学报</span>
        </h1>
        
        {/* 英文副标题 */}
        <p className="text-lg md:text-xl text-red-400/80 tracking-widest mb-6">
          OUTING UNIVERSITY JOURNAL
        </p>

        {/* 描述 */}
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          基于《世末歌者》世界观的同人学术期刊<br />
          探索鸥停市的交通、文化、气候与社区
        </p>

        {/* 统计数字 */}
        <div className="flex justify-center gap-8 md:gap-16 mb-12">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-red-500">4+</div>
            <div className="text-xs md:text-sm text-gray-500">研究领域</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-red-500">∞</div>
            <div className="text-xs md:text-sm text-gray-500">创作可能</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-red-500">1</div>
            <div className="text-xs md:text-sm text-gray-500">独特世界</div>
          </div>
        </div>

        {/* CTA按钮 */}
        <button
          onClick={scrollToArticles}
          className="group inline-flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300 hover:shadow-red-glow-lg"
        >
          浏览文章
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

      {/* 底部频谱 */}
      <div className="absolute bottom-[-20px] left-0 right-0">
        <SpectrumWave height={80} />
      </div>

      {/* 侧边装饰 */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="w-1 bg-gradient-to-b from-red-900 via-red-500 to-red-900 rounded-full animate-pulse-red"
            style={{
              height: `${20 + Math.random() * 40}px`,
              opacity: 0.3 + Math.random() * 0.4,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
      
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="w-1 bg-gradient-to-b from-red-900 via-red-500 to-red-900 rounded-full animate-pulse-red"
            style={{
              height: `${20 + Math.random() * 40}px`,
              opacity: 0.3 + Math.random() * 0.4,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;

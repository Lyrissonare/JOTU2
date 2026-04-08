// Footer Component
import { useState } from 'react';
import { MapPin, Mail, Phone, ExternalLink, FileText } from 'lucide-react';
import { SpectrumWave } from './SpectrumWave';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export const Footer: React.FC = () => {
  const [submissionDialogOpen, setSubmissionDialogOpen] = useState(false);

  return (
    <footer id="contact" className="relative bg-black border-t border-red-900/30">
      {/* 顶部频谱装饰 */}
      <div className="absolute top-0 left-0 right-0 -translate-y-full">
        <SpectrumWave height={40} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 品牌区域 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="鸥停大学Logo" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <h3 className="text-white font-bold">鸥停大学学报</h3>
                <p className="text-red-500 text-xs">OUTING UNIVERSITY JOURNAL</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              基于《世末歌者》系列歌曲世界观的同人学术期刊，
              致力于探索鸥停市的方方面面。
            </p>
          </div>

          {/* 关于学报 */}
          <div id="about" className="space-y-4">
            <h4 className="text-white font-semibold border-l-4 border-red-600 pl-3">
              关于学报
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <span className="text-gray-500">创刊时间：</span>
                <span className="text-gray-300">2026年</span>
              </li>
              <li>
                <span className="text-gray-500">出版周期：</span>
                <span className="text-gray-300">季刊</span>
              </li>
              <li>
                <span className="text-gray-500">主管单位：</span>
                <span className="text-gray-300">鸥停大学学术委员会</span>
              </li>
              <li>
                <span className="text-gray-500">主办单位：</span>
                <span className="text-gray-300">鸥停大学出版社</span>
              </li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold border-l-4 border-red-600 pl-3">
              联系方式
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  鸥停市义陵区百合中路99号5层21室
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
                <a 
                  href="mailto:wulingren@petalmail.com"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  journal@otu.edu
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-gray-400">+86 123-4567-8900</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 分隔线 */}
        <div className="my-8 border-t border-gray-800" />

        {/* 底部版权 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm text-center md:text-left">
            &copy; 2026 鸥停大学学报. 同人创作，仅供娱乐.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <button 
              onClick={() => setSubmissionDialogOpen(true)}
              className="text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1"
            >
              投稿须知
              <ExternalLink className="w-3 h-3" />
            </button>
            <a 
              href="#" 
              className="text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1"
            >
              隐私政策
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* 世末歌者致敬 */}
        <div className="mt-8 text-center">
          <p className="text-gray-700 text-xs">
            致敬《世末歌者》系列 | 原曲：COP | 演唱：乐正绫
          </p>
        </div>
      </div>

      {/* 底部红色频谱 */}
      <div className="absolute bottom-0 left-0 right-0 opacity-50">
        <SpectrumWave height={30} />
      </div>

      {/* 投稿须知弹窗 */}
      <Dialog open={submissionDialogOpen} onOpenChange={setSubmissionDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gray-900 border-red-900/50">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-500" />
              投稿须知
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 pt-4 text-gray-300">
            <div className="space-y-3">
              <h4 className="text-red-500 font-semibold">一、投稿范围</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                本刊接受与鸥停市相关的各类学术研究，包括但不限于交通工程、城市规划、
                文化研究、环境科学、数据分析等领域。同人创作、世界观探讨、跨作品分析等均在欢迎之列。
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-red-500 font-semibold">二、稿件要求</h4>
              <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                <li>稿件应为原创作品，未在其他刊物发表</li>
                <li>字数建议在3000-10000字之间</li>
                <li>需包含摘要、关键词、正文、参考文献</li>
                <li>可附带相关图片、数据图表</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-red-500 font-semibold">三、投稿方式</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                请将稿件以PDF格式发送至邮箱 journal@otu.edu，
                邮件标题请注明"投稿-文章标题-作者姓名"。审稿周期约为2-4周。
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-red-500 font-semibold">四、版权声明</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                作者保留作品的著作权，授权本刊在相关平台发表和传播。
                同人作品版权归原作者所有，本刊仅作为展示平台。
              </p>
            </div>

            {/* 特殊条款 */}
            <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-4 space-y-3">
              <h4 className="text-red-400 font-semibold flex items-center gap-2">
                <span className="text-lg">✦</span>
                特别条款
              </h4>
              <p className="text-sm text-gray-300 leading-relaxed italic">
                "作者接受自己的作品能被<span className="text-red-400">乐正绫</span>、
                <span className="text-teal-400">洛天依</span>、
                <span className="text-cyan-400">言和</span>以及
                <span className="text-yellow-400">第四面墙外之人</span>阅读。"
              </p>
              <p className="text-xs text-gray-500">
                投稿即视为同意以上条款。在《世末歌者》的世界观下，您的文字可能穿越次元，
                被那些仍在歌唱的人们所知晓。
              </p>
            </div>

            <div className="pt-4 border-t border-gray-800 text-center">
              <button
                onClick={() => setSubmissionDialogOpen(false)}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                我已了解
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;

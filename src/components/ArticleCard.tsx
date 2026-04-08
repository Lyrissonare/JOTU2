import { Calendar, User, Tag, Trash2, FileDown } from 'lucide-react';
import type { Article } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ArticleCardProps {
  article: Article;
  isAdmin: boolean;
  onDelete?: (id: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  isAdmin,
  onDelete 
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group relative bg-gradient-to-br from-gray-900 to-black border border-red-900/30 rounded-lg p-6 cursor-pointer hover:border-red-500/50 transition-all duration-300 hover:shadow-red-glow">
          {/* 红色装饰角 */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-600 rounded-tl-lg opacity-60 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-600 rounded-br-lg opacity-60 group-hover:opacity-100 transition-opacity" />
          
          {/* 分类标签 */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-red-500 bg-red-950/50 px-2 py-1 rounded">
              {article.category}
            </span>
            {isAdmin && onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(article.id);
                }}
                className="text-red-500 hover:text-red-400 hover:bg-red-950/50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {/* 标题 */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors line-clamp-2">
            {article.title}
          </h3>
          
          {/* 摘要 */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-3">
            {article.abstract}
          </p>
          
          {/* 元信息 */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {article.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {article.publishDate}
            </span>
          </div>
          
          {/* 标签 */}
          <div className="flex flex-wrap gap-1 mt-3">
            {article.tags.map((tag, idx) => (
              <span 
                key={idx}
                className="text-xs text-gray-600 flex items-center gap-0.5"
              >
                <Tag className="w-2 h-2" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </DialogTrigger>
      
      {/* 文章详情弹窗 */}
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-gray-900 border-red-900/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            {article.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          {/* 文章元信息 */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 pb-4 border-b border-gray-800">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4 text-red-500" />
              {article.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-red-500" />
              {article.publishDate}
            </span>
            <span className="text-red-500 bg-red-950/50 px-2 py-0.5 rounded">
              {article.category}
            </span>
          </div>
          
          {/* 摘要 */}
          <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-red-600">
            <h4 className="text-red-500 text-sm font-semibold mb-2">摘要</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              {article.abstract}
            </p>
          </div>
          
          {/* 正文 */}
          <div className="text-gray-300 leading-relaxed whitespace-pre-line">
            {article.content}
          </div>
          
          {/* 标签 */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-800">
            {article.tags.map((tag, idx) => (
              <span 
                key={idx}
                className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded flex items-center gap-1"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
          
          {/* PDF下载按钮 */}
          {article.pdfUrl && (
            <div className="pt-4 border-t border-gray-800">
              <a
                href={article.pdfUrl}
                download
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <FileDown className="w-4 h-4" />
                下载PDF
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleCard;

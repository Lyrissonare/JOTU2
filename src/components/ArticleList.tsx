import { useState } from 'react';
import type { Article } from '@/types';
import { ArticleCard } from './ArticleCard';
import { Search, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ArticleListProps {
  articles: Article[];
  isAdmin: boolean;
  onDeleteArticle?: (id: string) => void;
}

export const ArticleList: React.FC<ArticleListProps> = ({ 
  articles, 
  isAdmin,
  onDeleteArticle 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');

  // 获取所有分类
  const categories = ['全部', ...new Set(articles.map(a => a.category))];

  // 过滤文章
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.abstract.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '全部' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="articles" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            学报<span className="text-red-500">文章</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            探索鸥停大学师生的最新研究成果，涵盖交通、文化、数据科学等多个领域
          </p>
        </div>

        {/* 搜索和筛选 */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              type="text"
              placeholder="搜索文章标题、作者或关键词..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700 text-white placeholder:text-gray-600"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 文章列表 */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                isAdmin={isAdmin}
                onDelete={onDeleteArticle}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500">暂无匹配的文章</p>
          </div>
        )}

        {/* 统计信息 */}
        <div className="mt-8 text-center text-sm text-gray-600">
          共 {filteredArticles.length} 篇文章
          {searchTerm && ` (搜索: "${searchTerm}")`}
          {selectedCategory !== '全部' && ` [分类: ${selectedCategory}]`}
        </div>
      </div>
    </section>
  );
};

export default ArticleList;

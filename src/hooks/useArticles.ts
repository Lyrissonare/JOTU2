import { useState, useEffect, useCallback } from 'react';
import type { Article } from '@/types';

const STORAGE_KEY = 'outing-university-articles';

// 默认文章数据
const defaultArticles: Article[] = [
  {
    id: '1',
    title: '鸥停市公交系统线路优化研究',
    author: '张交通',
    abstract: '本文针对鸥停市公交系统现状，运用网络优化理论，提出了一套线路优化方案。通过分析客流数据，重新规划了12条主干线路，预计可提高运输效率23%，减少乘客平均等待时间15%。',
    content: '鸥停市作为世末背景下的重要城市，其公共交通系统的效率直接关系到市民的日常出行...',
    publishDate: '2026-03-15',
    category: '交通工程',
    tags: ['公交优化', '交通规划', '鸥停市']
  },
  {
    id: '2',
    title: '新《三国》电视剧与鸥停世界观的内在相似关联性初探',
    author: '李文艺',
    abstract: '本文从叙事结构、人物塑造和世界观构建三个维度，分析了新《三国》电视剧与鸥停世界观的相似性。研究发现两者在"乱世求生"主题、群像叙事手法以及历史与虚构的融合方面存在显著关联。',
    content: '鸥停世界观作为《世末歌者》系列的核心设定，展现了一个末日背景下的城市生态...',
    publishDate: '2026-02-28',
    category: '文化研究',
    tags: ['三国', '世界观', '叙事学']
  },
  {
    id: '3',
    title: 'COP投稿频率与社区梗图数量的相关性研究',
    author: '王数据',
    abstract: '基于2016-2026年间的COP投稿数据和社区梗图统计，本文运用皮尔逊相关系数分析了二者的关联。结果显示投稿频率与梗图数量呈强正相关（r=0.87），并建立了预测模型。',
    content: 'VOCALOID中文音乐社区的发展与创作者的投稿行为密切相关...',
    publishDate: '2026-01-20',
    category: '数据分析',
    tags: ['COP', '社区文化', '统计分析']
  },
  {
    id: '4',
    title: '世末背景下对鸥停的气候变化研究',
    author: '陈气象',
    abstract: '本文通过分析鸥停市近30年的气象数据，探讨了世末背景下城市气候的异常变化趋势。研究发现极端天气事件频率增加37%，并提出了城市气候适应性规划建议。',
    content: '在全球气候变化的宏观背景下，鸥停市作为沿海城市面临着独特的气候挑战...',
    publishDate: '2025-12-10',
    category: '环境科学',
    tags: ['气候变化', '环境监测', '城市规划']
  }
];

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 从localStorage加载文章
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setArticles(parsed);
      } catch {
        setArticles(defaultArticles);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultArticles));
      }
    } else {
      setArticles(defaultArticles);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultArticles));
    }
    setIsLoaded(true);
  }, []);

  // 保存到localStorage
  const saveArticles = useCallback((newArticles: Article[]) => {
    setArticles(newArticles);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newArticles));
  }, []);

  // 添加文章
  const addArticle = useCallback((article: Omit<Article, 'id'>) => {
    const newArticle: Article = {
      ...article,
      id: Date.now().toString(),
    };
    const updated = [newArticle, ...articles];
    saveArticles(updated);
    return newArticle;
  }, [articles, saveArticles]);

  // 删除文章
  const deleteArticle = useCallback((id: string) => {
    const updated = articles.filter(a => a.id !== id);
    saveArticles(updated);
  }, [articles, saveArticles]);

  // 更新文章
  const updateArticle = useCallback((id: string, updates: Partial<Article>) => {
    const updated = articles.map(a => 
      a.id === id ? { ...a, ...updates } : a
    );
    saveArticles(updated);
  }, [articles, saveArticles]);

  // 获取单篇文章
  const getArticle = useCallback((id: string) => {
    return articles.find(a => a.id === id);
  }, [articles]);

  return {
    articles,
    isLoaded,
    addArticle,
    deleteArticle,
    updateArticle,
    getArticle,
  };
}

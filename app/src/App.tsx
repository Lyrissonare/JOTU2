import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ArticleList } from '@/components/ArticleList';
import { AdminPanel } from '@/components/AdminPanel';
import { Footer } from '@/components/Footer';
import { useArticles } from '@/hooks/useArticles';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const { articles, isLoaded, addArticle, deleteArticle } = useArticles();

  const handleAdminLogin = (success: boolean) => {
    if (success) {
      setIsAdmin(true);
      toast.success('管理员登录成功', {
        description: '您现在可以上传和管理文章',
      });
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    toast.info('已退出管理员模式');
  };

  const handleAddArticle = (article: Parameters<typeof addArticle>[0]) => {
    addArticle(article);
    toast.success('文章发布成功', {
      description: `《${article.title}》已添加到学报`,
    });
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm('确定要删除这篇文章吗？')) {
      deleteArticle(id);
      toast.success('文章已删除');
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 animate-pulse">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid rgba(220, 38, 38, 0.3)',
          },
        }}
      />
      
      <Header 
        onAdminLogin={handleAdminLogin}
        isAdmin={isAdmin}
        onAdminLogout={handleAdminLogout}
      />
      
      <main>
        <Hero />
        <ArticleList 
          articles={articles}
          isAdmin={isAdmin}
          onDeleteArticle={handleDeleteArticle}
        />
      </main>
      
      <Footer />
      
      {isAdmin && (
        <AdminPanel onAddArticle={handleAddArticle} />
      )}
    </div>
  );
}

export default App;

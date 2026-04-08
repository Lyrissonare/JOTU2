import { useState, useRef } from 'react';
import { Plus, Upload, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { Article } from '@/types';

interface AdminPanelProps {
  onAddArticle: (article: Omit<Article, 'id'>) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onAddArticle }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    abstract: '',
    content: '',
    category: '',
    tags: '',
    pdfUrl: '',
  });
  const [pdfFileName, setPdfFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        // 创建本地URL用于预览/下载
        const url = URL.createObjectURL(file);
        setFormData(prev => ({ ...prev, pdfUrl: url }));
        setPdfFileName(file.name);
      } else {
        alert('请上传PDF文件');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newArticle: Omit<Article, 'id'> = {
      title: formData.title,
      author: formData.author,
      abstract: formData.abstract,
      content: formData.content,
      category: formData.category,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      publishDate: new Date().toISOString().split('T')[0],
      pdfUrl: formData.pdfUrl || undefined,
    };

    onAddArticle(newArticle);
    
    // 重置表单
    setFormData({
      title: '',
      author: '',
      abstract: '',
      content: '',
      category: '',
      tags: '',
      pdfUrl: '',
    });
    setPdfFileName('');
    setDialogOpen(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          className="fixed bottom-8 right-8 bg-red-600 hover:bg-red-700 shadow-red-glow-lg z-40"
          size="lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          上传文章
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-red-900/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Upload className="w-5 h-5 text-red-500" />
            上传新文章
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-300">
              文章标题 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="请输入文章标题"
              required
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author" className="text-gray-300">
                作者 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => handleChange('author', e.target.value)}
                placeholder="请输入作者姓名"
                required
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-300">
                分类 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                placeholder="如：交通工程、文化研究"
                required
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-gray-300">
              标签
            </Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => handleChange('tags', e.target.value)}
              placeholder="多个标签用逗号分隔，如：鸥停市, 交通规划, 优化"
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="abstract" className="text-gray-300">
              摘要 <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="abstract"
              value={formData.abstract}
              onChange={(e) => handleChange('abstract', e.target.value)}
              placeholder="请输入文章摘要（200字以内）"
              required
              rows={3}
              className="bg-gray-800 border-gray-700 text-white resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-gray-300">
              正文内容 <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="请输入文章正文内容"
              required
              rows={10}
              className="bg-gray-800 border-gray-700 text-white resize-none"
            />
          </div>

          {/* PDF上传 */}
          <div className="space-y-2">
            <Label className="text-gray-300">
              PDF文件
            </Label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <FileText className="w-4 h-4 mr-2" />
                选择PDF
              </Button>
              {pdfFileName && (
                <span className="text-sm text-gray-400 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-red-500" />
                  {pdfFileName}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-600">
              支持上传PDF文件，用户可在文章详情页下载
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <X className="w-4 h-4 mr-2" />
              取消
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              <Upload className="w-4 h-4 mr-2" />
              发布文章
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;

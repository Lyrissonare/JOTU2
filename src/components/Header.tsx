import { useState } from 'react';
import { Menu, X, Shield, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  onAdminLogin: (success: boolean) => void;
  isAdmin: boolean;
  onAdminLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onAdminLogin, 
  isAdmin, 
  onAdminLogout 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleLogin = () => {
    if (password === 'outing2026') {
      onAdminLogin(true);
      setPassword('');
      setLoginError('');
      setDialogOpen(false);
    } else {
      setLoginError('密码错误');
    }
  };

  const handleLogout = () => {
    onAdminLogout();
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-red-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo区域 */}
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="鸥停大学Logo" 
              className="h-12 w-12 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg leading-tight">
                鸥停大学学报
              </span>
              <span className="text-red-500 text-xs tracking-wider">
                OUTING UNIVERSITY JOURNAL
              </span>
            </div>
          </div>

          {/* 桌面导航 */}
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('articles')}
              className="text-gray-300 hover:text-red-500 transition-colors text-sm"
            >
              文章浏览
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-300 hover:text-red-500 transition-colors text-sm"
            >
              关于学报
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-300 hover:text-red-500 transition-colors text-sm"
            >
              联系方式
            </button>
            
            {/* 管理员入口 - 明显的按钮 */}
            {isAdmin ? (
              <div className="flex items-center gap-3 pl-4 border-l border-red-900/50">
                <span className="text-red-500 text-sm flex items-center gap-1.5 bg-red-950/30 px-3 py-1.5 rounded">
                  <User className="w-4 h-4" />
                  管理员
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                  className="border-red-600/50 text-red-400 hover:text-red-300 hover:bg-red-950/50 hover:border-red-500"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  退出
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setDialogOpen(true)}
                className="border-red-900/50 text-gray-400 hover:text-red-500 hover:border-red-600/50 hover:bg-red-950/20"
              >
                <Shield className="w-4 h-4 mr-1.5" />
                管理员登录
              </Button>
            )}
          </nav>

          {/* 移动端菜单按钮 */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* 移动端菜单 */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-red-900/30">
            <nav className="flex flex-col gap-3">
              <button 
                onClick={() => scrollToSection('articles')}
                className="text-gray-300 hover:text-red-500 transition-colors text-left py-2"
              >
                文章浏览
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-300 hover:text-red-500 transition-colors text-left py-2"
              >
                关于学报
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-300 hover:text-red-500 transition-colors text-left py-2"
              >
                联系方式
              </button>
              
              {/* 移动端管理员入口 */}
              {isAdmin ? (
                <div className="flex items-center justify-between py-2 border-t border-red-900/30 mt-2 pt-3">
                  <span className="text-red-500 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    管理员模式
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleLogout}
                    className="border-red-600 text-red-500 hover:bg-red-950"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    退出
                  </Button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setDialogOpen(true);
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors text-left py-2 border-t border-red-900/30 mt-2 pt-3 flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  管理员登录
                </button>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* 登录弹窗 */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-gray-900 border-red-900/50 max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-500" />
              管理员登录
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="text-sm text-gray-500">
              请输入管理员密码以继续
            </div>
            <Input
              type="password"
              placeholder="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="bg-gray-800 border-gray-700 text-white"
              autoFocus
            />
            {loginError && (
              <p className="text-red-500 text-sm">{loginError}</p>
            )}
            <div className="flex gap-3">
              <Button 
                variant="outline"
                onClick={() => setDialogOpen(false)}
                className="flex-1 border-gray-700 text-gray-400 hover:bg-gray-800"
              >
                取消
              </Button>
              <Button 
                onClick={handleLogin}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                登录
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;

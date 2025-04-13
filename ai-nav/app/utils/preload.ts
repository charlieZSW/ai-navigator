import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

/**
 * 预加载关键页面的实用工具
 * 这个函数可以在用户浏览主页时预加载其他重要页面
 */
export function usePreloadPages() {
  // 只在客户端使用
  if (typeof window === 'undefined') return null;
  
  const router = useRouter();
  
  /**
   * 预加载指定的路径
   * 使用 useCallback 避免函数在每次渲染时重新创建
   */
  const preload = useCallback((paths: string[]) => {
    // 使用 setTimeout 延迟预加载，确保不影响当前页面的加载
    const timer = setTimeout(() => {
      paths.forEach(path => {
        router.prefetch(path);
      });
    }, 1000); // 1秒后开始预加载

    // 清理函数，防止内存泄漏
    return () => clearTimeout(timer);
  }, [router]);
  
  return { preload };
}

/**
 * 获取关键页面列表
 * 这些是应用中最常访问的页面
 */
export const KEY_PAGES = [
  '/models',
  '/datasets',
  '/tutorials',
  '/frameworks',
  '/resources'
]; 
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PRIMARY_CATEGORIES } from '../../data/tutorials';

// 重定向组件，将旧的基础页面重定向到新的统一筛选页面
export default function FoundationsPage() {
  const router = useRouter();
  
  useEffect(() => {
    // 重定向到新的统一筛选页面，使用对应的筛选参数
    router.replace(`/tutorials?category=${PRIMARY_CATEGORIES.FOUNDATIONS}`);
  }, [router]);
  
  // 显示加载状态，直到重定向完成
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-slate-800">正在重定向...</h2>
        <p className="text-slate-600 mt-2">
          页面已迁移，正在为您跳转到新的筛选系统
        </p>
      </div>
    </div>
  );
}

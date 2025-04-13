"use client";

import { useState, useEffect, Suspense, lazy } from 'react';
import dynamic from 'next/dynamic';

interface LazyComponentProps {
  importFunc: () => Promise<{ default: React.ComponentType<any> }>;
  fallback: React.ReactNode;
  props?: any;
}

/**
 * LazyComponent - 用于组件懒加载的封装组件
 * 
 * 使用方法：
 * <LazyComponent 
 *   importFunc={() => import('../components/HeavyComponent')}
 *   fallback={<div>Loading...</div>}
 *   props={{ someProp: value }}
 * />
 */
export default function LazyComponent({ importFunc, fallback, props = {} }: LazyComponentProps) {
  // 服务器端不加载，返回 fallback
  if (typeof window === 'undefined') {
    return <>{fallback}</>;
  }
  
  // 使用 Next.js 的 dynamic import
  const DynamicComponent = dynamic(importFunc, {
    loading: () => <>{fallback}</>,
    ssr: false, // 禁用服务端渲染以优化初始加载
  });
  
  return <DynamicComponent {...props} />;
}

/**
 * 创建一个懒加载组件的简单封装函数
 * 
 * 使用方法：
 * const LazyHeavyComponent = createLazyComponent(() => import('../components/HeavyComponent'));
 * 
 * 然后在 JSX 中使用：
 * <LazyHeavyComponent fallback={<Spinner />} />
 */
export function createLazyComponent(importFunc: () => Promise<{ default: React.ComponentType<any> }>) {
  return ({ fallback, ...props }: { fallback: React.ReactNode } & any) => (
    <LazyComponent importFunc={importFunc} fallback={fallback} props={props} />
  );
} 
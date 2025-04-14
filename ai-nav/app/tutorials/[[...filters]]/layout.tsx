import React from 'react';
import { PRIMARY_CATEGORIES } from '../../data/tutorials';

export function generateStaticParams(): { filters: string[] }[] {
  // 基础路径 - 空筛选器
  const paths: { filters: string[] }[] = [{ filters: [] }];
  
  // 为每个主分类添加路径
  Object.keys(PRIMARY_CATEGORIES || {}).forEach(category => {
    paths.push({ filters: [category] });
  });
  
  return paths;
}

export default function TutorialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 
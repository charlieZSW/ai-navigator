"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  objectFit = 'cover'
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  
  // 处理图像加载完成事件
  const handleLoad = () => {
    setLoaded(true);
  };
  
  // 使用骨架屏效果
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {/* 骨架屏效果 */}
      {!loaded && (
        <div 
          className="absolute inset-0 bg-slate-100 animate-pulse rounded-md"
          style={{ width, height }}
        />
      )}
      
      {/* 实际图像，使用 Next.js Image 组件优化 */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleLoad}
        priority={priority}
        className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ objectFit }}
        sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${width}px`}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdQJAAIBI4QAAAABJRU5ErkJggg=="
      />
    </div>
  );
} 
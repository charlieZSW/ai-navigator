'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CategoryTabs from '../components/CategoryTabs';
import { frameworks, frameworkCategories } from '../data/frameworks';

export default function FrameworksPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // 懒加载相关状态
  const ITEMS_PER_PAGE = 9; // 每页显示9个卡片
  const [currentPage, setCurrentPage] = useState(1);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  
  // 创建一个状态对象来跟踪每个卡片的展开状态
  const [expandedDescriptions, setExpandedDescriptions] = useState<{[key: string]: boolean}>({});
  
  // Filter frameworks based on category and search
  const filteredFrameworks = frameworks.filter(framework => {
    const matchesCategory = activeCategory === 'All' || framework.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      framework.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      framework.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      framework.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });
  
  // 计算当前应该显示的框架数据
  const visibleFrameworks = filteredFrameworks.slice(0, currentPage * ITEMS_PER_PAGE);
  const hasMoreItems = visibleFrameworks.length < filteredFrameworks.length;
  
  // 加载更多函数
  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };
  
  // 当筛选条件变化时，重置页码
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);
  
  // 使用IntersectionObserver实现懒加载
  useEffect(() => {
    if (!loadMoreRef.current || !hasMoreItems) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreItems) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(loadMoreRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, [hasMoreItems, currentPage]);
  
  // 切换指定ID的卡片描述展开状态
  const toggleDescription = (id: string) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // 格式化链接，确保有http前缀
  const formatLink = (link: string) => {
    return link.startsWith('http') ? link : `https://${link}`;
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">AI Open Source Frameworks</h1>
          <p className="text-slate-600 max-w-3xl">
            Discover and learn various AI and machine learning frameworks to help you quickly build, train, and deploy AI models
          </p>
        </div>
        
        {/* Search bar */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <input
              type="text"
              placeholder="Search frameworks, descriptions, or tags..."
              className="w-full bg-white text-slate-800 py-3 px-4 rounded-md border border-slate-200 focus:outline-none focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Category tabs */}
        <div>
          <CategoryTabs 
            categories={frameworkCategories} 
            activeCategory={activeCategory} 
            onChange={setActiveCategory} 
          />
        </div>
        
        {/* Filtering results info */}
        <div className="mb-8 text-slate-600">
          Found <span className="text-slate-800 font-semibold">{filteredFrameworks.length}</span> frameworks
          {activeCategory !== 'All' && (<span> in <span className="text-blue-600">{activeCategory}</span> category</span>)}
          {searchQuery && (<span> matching "<span className="text-blue-600">{searchQuery}</span>"</span>)}
        </div>
        
        {/* Frameworks list */}
        {filteredFrameworks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleFrameworks.map((framework, index) => (
              <div key={framework.id} className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:border-blue-300 transition-all transform hover:-translate-y-1 flex flex-col h-full">
                <div className="p-5 flex-grow">
                  <Link 
                    href={formatLink(framework.link)}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xl font-semibold text-slate-800 hover:text-blue-500 transition-all block mb-2"
                  >
                    {framework.title}
                  </Link>
                  
                  <div>
                    <p className={`text-slate-600 text-sm mb-1 ${expandedDescriptions[framework.id] ? '' : 'line-clamp-2'}`}>
                      {framework.description}
                    </p>
                    
                    {/* 描述展开/收起按钮 - 仅当描述可能被截断时显示 */}
                    {framework.description.length > 100 && (
                      <button 
                        onClick={() => toggleDescription(framework.id)} 
                        className="text-xs text-blue-500 hover:text-blue-600 mb-2 cursor-pointer"
                      >
                        {expandedDescriptions[framework.id] ? 'Collapse' : 'View Full Description'}
                      </button>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {framework.category && (
                      <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                        {framework.category}
                      </span>
                    )}
                    
                    {framework.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    
                    {framework.stars !== undefined && framework.stars > 0 && (
                      <span className="text-xs px-2 py-1 bg-yellow-50 text-yellow-600 rounded-full whitespace-nowrap flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        {framework.stars > 1000 ? `${(framework.stars / 1000).toFixed(1)}k` : framework.stars}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="bg-slate-50 px-5 py-3 flex justify-between items-center mt-auto">
                  <div className="flex items-center space-x-4">
                    <Link 
                      href={formatLink(framework.link)}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm text-blue-500 hover:text-blue-600 transition-all flex items-center group"
                    >
                      Visit Site
                      <svg className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </Link>
                    
                    {framework.repoLink && (
                      <Link 
                        href={formatLink(framework.repoLink)}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm text-blue-500 hover:text-blue-600 transition-all flex items-center group"
                      >
                        Repository
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                        </svg>
                      </Link>
                    )}
                    
                    {framework.docsLink && (
                      <Link 
                        href={formatLink(framework.docsLink)}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm text-blue-500 hover:text-blue-600 transition-all flex items-center group"
                      >
                        Docs
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-lg p-8 text-center">
            <p className="text-slate-600 mb-2">No matching frameworks found</p>
            <p className="text-slate-500 text-sm">
              Try changing your search terms or selecting a different category
            </p>
          </div>
        )}
        
        {/* Load More Indicator */}
        {filteredFrameworks.length > 0 && (
          <div 
            ref={loadMoreRef} 
            className="py-4 text-center mt-6"
          >
            {hasMoreItems ? (
              <button
                onClick={loadMore}
                className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
              >
                Load More Frameworks
              </button>
            ) : (
              <span className="text-slate-500 text-sm">All {filteredFrameworks.length} frameworks loaded</span>
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
} 
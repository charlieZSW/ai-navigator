'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CategoryTabs from '../components/CategoryTabs';
import { specialResources, specialCategories } from '../data/specialResources';

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // 懒加载相关状态
  const ITEMS_PER_PAGE = 9; // 每页显示9个卡片
  const [currentPage, setCurrentPage] = useState(1);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  
  // 创建一个状态对象来跟踪每个卡片的展开状态
  const [expandedDescriptions, setExpandedDescriptions] = useState<{[key: string]: boolean}>({});
  
  // 映射UI分类到数据分类
  const categoryMapping: { [key: string]: string } = {
    'All': 'all',
    'Beginner Guide': 'beginner',
    'Compute Resources': 'compute',
    'Research Tracking': 'research'
  };
  
  // Filter resources based on category and search
  const filteredResources = specialResources.filter(resource => {
    const mappedCategory = categoryMapping[activeCategory];
    const matchesCategory = mappedCategory === 'all' || resource.category === mappedCategory;
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });
  
  // 计算当前应该显示的资源数据
  const visibleResources = filteredResources.slice(0, currentPage * ITEMS_PER_PAGE);
  const hasMoreItems = visibleResources.length < filteredResources.length;
  
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
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Featured Resources</h1>
          <p className="text-slate-600 max-w-3xl">
            Curated AI and machine learning resources, including beginner guides, compute resources, and research tracking tools
          </p>
        </div>
        
        {/* Search bar */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <input
              type="text"
              placeholder="Search resources, descriptions, or tags..."
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
            categories={specialCategories} 
            activeCategory={activeCategory} 
            onChange={setActiveCategory} 
          />
        </div>
        
        {/* Filtering results info */}
        <div className="mb-8 text-slate-600">
          Found <span className="text-slate-800 font-semibold">{filteredResources.length}</span> resources
          {activeCategory !== 'All' && (<span> in <span className="text-blue-600">{activeCategory}</span> category</span>)}
          {searchQuery && (<span> matching "<span className="text-blue-600">{searchQuery}</span>"</span>)}
        </div>
        
        {/* Featured areas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link 
            href="/resources/beginner"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6 hover:from-blue-600 hover:to-blue-700 transition-all transform hover:-translate-y-1 hover:shadow-lg flex flex-col h-full"
          >
            <div className="flex-grow">
              <h3 className="text-xl font-bold mb-3">Beginner's Guide</h3>
              <p className="text-blue-100 mb-4">
                A comprehensive learning path for those new to AI, including foundational resources and practical advice
              </p>
            </div>
            <div className="flex items-center font-medium group mt-auto">
              View Resources
              <svg className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </Link>
          
          <Link 
            href="/resources/compute"
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-6 hover:from-purple-600 hover:to-purple-700 transition-all transform hover:-translate-y-1 hover:shadow-lg flex flex-col h-full"
          >
            <div className="flex-grow">
              <h3 className="text-xl font-bold mb-3">Compute Resources</h3>
              <p className="text-purple-100 mb-4">
                Find high-quality computing resources for AI development, including cloud services and local computing options
              </p>
            </div>
            <div className="flex items-center font-medium group mt-auto">
              View Resources
              <svg className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </Link>
          
          <Link 
            href="/resources/research"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6 hover:from-green-600 hover:to-green-700 transition-all transform hover:-translate-y-1 hover:shadow-lg flex flex-col h-full"
          >
            <div className="flex-grow">
              <h3 className="text-xl font-bold mb-3">Research Tracking</h3>
              <p className="text-green-100 mb-4">
                Stay up-to-date with latest AI research developments, academic conferences, and top research institutions
              </p>
            </div>
            <div className="flex items-center font-medium group mt-auto">
              View Resources
              <svg className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </Link>
        </div>
        
        {/* Resources list */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleResources.map((resource, index) => (
              <div key={resource.id} className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:border-blue-300 transition-all transform hover:-translate-y-1 flex flex-col h-full">
                <div className="p-5 flex-grow">
                  <Link 
                    href={resource.link}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xl font-semibold text-slate-800 hover:text-blue-500 transition-all block mb-2"
                  >
                    {resource.title}
                  </Link>
                  
                  <div>
                    <p className={`text-slate-600 text-sm mb-1 ${expandedDescriptions[resource.id] ? '' : 'line-clamp-2'}`}>
                      {resource.description}
                    </p>
                    
                    {/* 描述展开/收起按钮 - 仅当描述可能被截断时显示 */}
                    {resource.description.length > 100 && (
                      <button 
                        onClick={() => toggleDescription(resource.id)} 
                        className="text-xs text-blue-500 hover:text-blue-600 mb-2 cursor-pointer"
                      >
                        {expandedDescriptions[resource.id] ? 'Collapse' : 'View Full Description'}
                      </button>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {resource.category && (
                      <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                        {resource.category}
                      </span>
                    )}
                    
                    {resource.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-slate-50 px-5 py-3 flex justify-between items-center mt-auto">
                  <Link 
                    href={resource.link}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-blue-500 hover:text-blue-600 transition-all flex items-center group"
                  >
                    View Resource
                    <svg className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-lg p-8 text-center">
            <p className="text-slate-600 mb-2">No matching resources found</p>
            <p className="text-slate-500 text-sm">
              Try changing your search terms or selecting a different category
            </p>
          </div>
        )}
        
        {/* Load More Indicator */}
        {filteredResources.length > 0 && (
          <div 
            ref={loadMoreRef} 
            className="py-4 text-center mt-6"
          >
            {hasMoreItems ? (
              <button
                onClick={loadMore}
                className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
              >
                Load More Resources
              </button>
            ) : (
              <span className="text-slate-500 text-sm">All {filteredResources.length} resources loaded</span>
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
} 
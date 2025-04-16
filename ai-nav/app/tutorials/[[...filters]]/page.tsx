'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ResourceCard from '../../components/ResourceCard';
import { 
  tutorials, 
  PRIMARY_CATEGORIES, 
  SUB_CATEGORIES, 
  CATEGORY_NAMES,
  SUB_CATEGORY_NAMES,
  DIFFICULTY_NAMES,
  TYPE_NAMES,
  LANGUAGE_NAMES
} from '../../data/tutorials';
import { migrateTutorialsData } from '../../utils/dataMigration';
import LearningPathMap from '../../components/LearningPathMap';

// Configure this page to use the Edge Runtime for Cloudflare Pages compatibility
export const runtime = 'edge';

// 统一的教程页面组件
export default function TutorialsPage() {
  // 路由和参数相关钩子
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // 将旧教程数据转换为新格式
  const tutorialsNew = migrateTutorialsData(tutorials);
  
  // 解析URL参数获取筛选条件
  const [filters, setFilters] = useState({
    primaryCategory: searchParams.get('category') || 'all',
    subCategory: searchParams.get('subcategory') || 'all',
    difficulty: searchParams.get('difficulty') || 'all',
    type: searchParams.get('type') || 'all',
    price: searchParams.get('price') || 'all',
    language: searchParams.get('language') || 'all',
    search: searchParams.get('q') || '',
  });
  
  // 可用的子分类
  const [availableSubCategories, setAvailableSubCategories] = useState<string[]>(['all']);
  
  // 当主分类改变时，更新可用的子分类
  useEffect(() => {
    const subCats = filters.primaryCategory === 'all' 
      ? ['all'] 
      : (SUB_CATEGORIES as Record<string, string[]>)[filters.primaryCategory] || ['all'];
    
    setAvailableSubCategories(subCats);
    
    // 如果当前选中的子分类不在新的子分类列表中，重置为"all"
    if (!subCats.includes(filters.subCategory)) {
      updateFilters({ ...filters, subCategory: 'all' });
    }
  }, [filters.primaryCategory]);
  
  // 统一的筛选逻辑
  const filteredTutorials = tutorialsNew.filter(tutorial => {
    // 主分类筛选
    const matchesPrimaryCategory = 
      filters.primaryCategory === 'all' || 
      tutorial.primaryCategory === filters.primaryCategory;
    
    // 子分类筛选
    const matchesSubCategory = 
      filters.subCategory === 'all' || 
      tutorial.subCategories.includes(filters.subCategory);
    
    // 难度筛选
    const matchesDifficulty = 
      filters.difficulty === 'all' || 
      tutorial.difficulty === filters.difficulty;
    
    // 类型筛选
    const matchesType = 
      filters.type === 'all' || 
      tutorial.type === filters.type;
    
    // 价格筛选
    const matchesPrice = 
      filters.price === 'all' || 
      (filters.price === 'free' && tutorial.isFree) || 
      (filters.price === 'paid' && !tutorial.isFree);
    
    // 语言筛选
    const matchesLanguage = 
      filters.language === 'all' || 
      tutorial.language === filters.language;
    
    // 搜索筛选
    const matchesSearch = 
      filters.search === '' || 
      tutorial.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      tutorial.topics.some(topic => topic.toLowerCase().includes(filters.search.toLowerCase()));
    
    return matchesPrimaryCategory && matchesSubCategory && matchesDifficulty && 
           matchesType && matchesPrice && matchesLanguage && matchesSearch;
  });
  
  // 更新URL参数而不刷新页面
  const updateFilters = (newFilters: typeof filters) => {
    const params = new URLSearchParams();
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== 'all' && value !== '') {
        params.set(key, value as string);
      }
    });
    
    // 更新URL但不刷新页面
    router.replace(`/tutorials?${params.toString()}`, { scroll: false });
    setFilters(newFilters);
  };
  
  // 处理搜索输入变化
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFilters({ ...filters, search: value });
  };
  
  // 处理主分类变化
  const handlePrimaryCategoryChange = (category: string) => {
    updateFilters({ 
      ...filters, 
      primaryCategory: category, 
      subCategory: 'all' // 重置子分类
    });
  };
  
  // 处理子分类变化
  const handleSubCategoryChange = (subCategory: string) => {
    updateFilters({ ...filters, subCategory });
  };
  
  // 处理难度变化
  const handleDifficultyChange = (difficulty: string) => {
    updateFilters({ ...filters, difficulty });
  };
  
  // 处理类型变化
  const handleTypeChange = (type: string) => {
    updateFilters({ ...filters, type });
  };
  
  // 处理价格变化
  const handlePriceChange = (price: string) => {
    updateFilters({ ...filters, price });
  };
  
  // 处理语言变化
  const handleLanguageChange = (language: string) => {
    updateFilters({ ...filters, language });
  };
  
  // 重置所有筛选
  const resetFilters = () => {
    updateFilters({
      primaryCategory: 'all',
      subCategory: 'all',
      difficulty: 'all',
      type: 'all',
      price: 'all',
      language: 'all',
      search: '',
    });
  };
  
  // 获取主分类显示名称
  const getPrimaryCategoryDisplayName = (key: string) => {
    return (CATEGORY_NAMES as Record<string, string>)[key] || key;
  };
  
  // 获取子分类显示名称
  const getSubCategoryDisplayName = (key: string) => {
    return (SUB_CATEGORY_NAMES as Record<string, string>)[key] || key;
  };
  
  // 获取难度显示名称
  const getDifficultyDisplayName = (key: string) => {
    return (DIFFICULTY_NAMES as Record<string, string>)[key] || key;
  };
  
  // 获取类型显示名称
  const getTypeDisplayName = (key: string) => {
    return (TYPE_NAMES as Record<string, string>)[key] || key;
  };
  
  // 获取语言显示名称
  const getLanguageDisplayName = (key: string) => {
    return (LANGUAGE_NAMES as Record<string, string>)[key] || key;
  };
  
  // 筛选结果统计组件
  const FilterStats = () => {
    // 构建描述筛选条件的文本
    const buildFilterDescription = () => {
      const parts: string[] = [];
      
      if (filters.primaryCategory !== 'all') {
        parts.push(`Category "${getPrimaryCategoryDisplayName(filters.primaryCategory)}"`);
      }
      
      if (filters.subCategory !== 'all') {
        parts.push(`Subcategory "${getSubCategoryDisplayName(filters.subCategory)}"`);
      }
      
      if (filters.difficulty !== 'all') {
        parts.push(`Difficulty "${getDifficultyDisplayName(filters.difficulty)}"`);
      }
      
      if (filters.type !== 'all') {
        parts.push(`Type "${getTypeDisplayName(filters.type)}"`);
      }
      
      if (filters.price !== 'all') {
        parts.push(`${filters.price === 'free' ? 'Free' : 'Paid'}`);
      }
      
      if (filters.language !== 'all') {
        parts.push(`Language "${getLanguageDisplayName(filters.language)}"`);
      }
      
      if (filters.search) {
        parts.push(`Contains "${filters.search}" keyword`);
      }
      
      return parts.join(', ');
    };
    
    // 判断是否应用了筛选条件
    const hasFilters = filters.primaryCategory !== 'all' || 
                       filters.subCategory !== 'all' || 
                       filters.difficulty !== 'all' || 
                       filters.type !== 'all' || 
                       filters.price !== 'all' || 
                       filters.language !== 'all' || 
                       filters.search !== '';
    
    return (
      <div className="mb-3 p-3 bg-blue-50 rounded-lg text-slate-700 border border-blue-100 shadow-sm">
        <p className="text-base">
          Found <span className="font-bold text-blue-700 text-lg">{filteredTutorials.length}</span> resources
          {hasFilters && (
            <span className="ml-2">, {buildFilterDescription()}</span>
          )}
        </p>
      </div>
    );
  };
  
  // 移除所有复杂的状态和ref，简化实现
  const ITEMS_PER_PAGE = 9; // 每页显示9个卡片（3列 x 3行）
  const [currentPage, setCurrentPage] = useState(1);
  
  // 计算当前应该显示的教程数据
  const visibleTutorials = filteredTutorials.slice(0, currentPage * ITEMS_PER_PAGE);
  const hasMoreItems = visibleTutorials.length < filteredTutorials.length;
  
  // 加载更多函数
  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };
  
  // 底部观察器ref
  const loadMoreRef = useRef<HTMLDivElement>(null);
  
  // 当筛选条件变化时，重置页码
  useEffect(() => {
    setCurrentPage(1);
  }, [JSON.stringify(filters)]); // 使用JSON.stringify避免对象引用变化造成的无限循环
  
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
  
  // 创建一个状态对象来跟踪每个卡片的展开状态
  const [expandedDescriptions, setExpandedDescriptions] = useState<{[key: string]: boolean}>({});
  
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
        {/* 标题部分，已移除面包屑导航 */}
        <div className="mb-6 animate-fade-in">
          <h1 className="text-3xl font-bold text-slate-800 mb-3">AI Learning Tutorials & Resources</h1>
          <p className="text-slate-600 max-w-3xl">
            A curated collection of AI and machine learning tutorial resources, including courses, videos, articles, and books to help you learn AI-related knowledge efficiently.
          </p>
        </div>
        
        {/* 交互式学习路径 - 折叠式思维导图组件 - 现在无论选择哪个分类都会显示 */}
        <div className="mb-8">
          <LearningPathMap />
        </div>
        
        {/* 搜索栏和重置筛选按钮 */}
        <div className="mb-6 flex flex-wrap items-center justify-between">
          <div className="relative w-full md:w-auto md:flex-1 md:max-w-xl mb-3 md:mb-0">
            <input
              type="text"
              placeholder="Search tutorials, descriptions or tags..."
              className="w-full bg-white text-slate-800 py-3 px-5 rounded-md border border-slate-200 focus:outline-none focus:border-blue-500 text-base"
              value={filters.search}
              onChange={handleSearchChange}
            />
            <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
          <button
            onClick={resetFilters}
            className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 flex items-center transition-all hover:bg-blue-50 rounded-md"
          >
            <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Reset All Filters
          </button>
        </div>
        
        {/* 主分类筛选 */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-800 mb-3">Main Categories</h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {Object.values(PRIMARY_CATEGORIES).map((category) => (
              <button
                key={category}
                onClick={() => handlePrimaryCategoryChange(category)}
                className={`px-4 py-2 rounded-md text-base font-medium transition-all ${
                  filters.primaryCategory === category
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
                }`}
              >
                {getPrimaryCategoryDisplayName(category)}
              </button>
            ))}
          </div>
        </div>
        
        {/* 多级筛选 */}
        <div className="mb-4 bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          {/* 筛选标题和重置按钮 */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-medium text-slate-700">Filter Conditions</h3>
            <button 
              onClick={resetFilters}
              className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Reset Filters
            </button>
          </div>
          
          {/* 子分类筛选 - 仅当选择了主分类时显示 */}
          {filters.primaryCategory !== 'all' && availableSubCategories.length > 1 && (
            <div className="mb-3">
              <h3 className="text-base font-medium text-slate-700 mb-2">Subcategories</h3>
              <div className="flex flex-wrap gap-2">
                {availableSubCategories.map((subCategory) => (
                  <button
                    key={subCategory}
                    onClick={() => handleSubCategoryChange(subCategory)}
                    className={`px-4 py-2 rounded-md text-base transition-all ${
                      filters.subCategory === subCategory
                        ? 'bg-green-500 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {getSubCategoryDisplayName(subCategory)}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 难度筛选 */}
            <div>
              <h3 className="text-base font-medium text-slate-700 mb-2">Difficulty Level</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(DIFFICULTY_NAMES).map(([key, name]) => (
                  <button
                    key={key}
                    onClick={() => handleDifficultyChange(key)}
                    className={`px-4 py-2 text-sm rounded-lg transition-all ${
                      filters.difficulty === key
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 资源类型 */}
            <div>
              <h3 className="text-base font-medium text-slate-700 mb-2">Resource Type</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(TYPE_NAMES).map(([key, name]) => (
                  <button
                    key={key}
                    onClick={() => handleTypeChange(key)}
                    className={`px-4 py-2 text-sm rounded-lg transition-all ${
                      filters.type === key
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 价格 */}
            <div>
              <h3 className="text-base font-medium text-slate-700 mb-2">Price</h3>
              <div className="flex flex-wrap gap-2">
                {['all', 'free', 'paid'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handlePriceChange(option)}
                    className={`px-4 py-2 text-sm rounded-lg transition-all ${
                      filters.price === option
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {option === 'all' ? 'All Prices' : option === 'free' ? 'Free' : 'Paid'}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* 语言筛选 */}
          <div className="mt-4">
            <h3 className="text-base font-medium text-slate-700 mb-2">Language</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(LANGUAGE_NAMES).map(([key, name]) => (
                <button
                  key={key}
                  onClick={() => handleLanguageChange(key)}
                  className={`px-4 py-2 text-sm rounded-lg transition-all ${
                    filters.language === key
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Filter Statistics */}
        <FilterStats />
        
        {/* Tutorial Card Grid - Lazy Loading */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 mb-4">
          {visibleTutorials.map((tutorial) => (
            <div key={tutorial.id} className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:border-blue-300 transition-all transform hover:-translate-y-1 flex flex-col h-[280px]">
              <div className="p-4 flex-grow">
                <div className="flex justify-between items-start mb-1 min-h-[50px]">
                  <Link 
                    href={formatLink(tutorial.link)}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xl font-semibold text-slate-800 hover:text-blue-500 transition-all line-clamp-2 leading-7"
                  >
                    {tutorial.title}
                  </Link>
                  
                  {tutorial.isFree !== undefined && (
                    <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ml-2 ${tutorial.isFree ? 'bg-emerald-100 text-emerald-600' : 'bg-purple-100 text-purple-600'}`}>
                      {tutorial.isFree ? 'Free' : 'Paid'}
                    </span>
                  )}
                </div>
                
                <div className="mb-2 min-h-[80px]">
                  <p className={`text-slate-600 text-sm ${expandedDescriptions[tutorial.id] ? '' : 'line-clamp-2'} leading-snug`}>
                    {tutorial.description}
                  </p>
                  
                  {/* 描述展开/收起按钮 - 仅当描述可能被截断时显示 */}
                  {tutorial.description.length > 100 && (
                    <button 
                      onClick={() => toggleDescription(tutorial.id)} 
                      className="text-xs text-blue-500 hover:text-blue-600 mt-1 cursor-pointer"
                    >
                      {expandedDescriptions[tutorial.id] ? 'Collapse' : 'View Full Description'}
                    </button>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-1 mb-1.5">
                  <div className="flex flex-wrap gap-1 mb-0.5">
                    {tutorial.difficulty && (
                      <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-600 rounded-full whitespace-nowrap">
                        {getDifficultyDisplayName(tutorial.difficulty)}
                      </span>
                    )}
                    
                    {tutorial.type && (
                      <span className="text-xs px-2 py-0.5 bg-pink-100 text-pink-600 rounded-full whitespace-nowrap">
                        {getTypeDisplayName(tutorial.type)}
                      </span>
                    )}
                    
                    <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full whitespace-nowrap">
                      {getPrimaryCategoryDisplayName(tutorial.primaryCategory)}
                    </span>
                  </div>
                  
                  {tutorial.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {tutorial.topics.slice(0, 2).map((tag, index) => (
                        <span 
                          key={index}
                          className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-slate-50 px-4 py-3 flex justify-between items-center mt-auto">
                <Link 
                  href={formatLink(tutorial.link)}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-blue-500 hover:text-blue-600 transition-all flex items-center group"
                >
                  {getTypeDisplayName(tutorial.type) === 'Course' ? 'Start Learning' : 
                   getTypeDisplayName(tutorial.type) === 'Video' ? 'Watch Video' :
                   getTypeDisplayName(tutorial.type) === 'Article' ? 'Read Article' : 
                   getTypeDisplayName(tutorial.type) === 'Book' ? 'View Book' : 'View Resource'}
                  <svg className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Load More Indicator */}
        {filteredTutorials.length > 0 && (
          <div 
            ref={loadMoreRef} 
            className="py-4 text-center"
          >
            {hasMoreItems ? (
              <button
                onClick={loadMore}
                className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
              >
                Load More Resources
              </button>
            ) : (
              <span className="text-slate-500 text-sm">Loaded all {filteredTutorials.length} resources</span>
            )}
          </div>
        )}
        
        {/* No Results Message */}
        {filteredTutorials.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-500 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">No matching tutorial resources found</h2>
            <p className="text-slate-600 max-w-md mx-auto mb-6">
              Try adjusting your filter criteria or search terms to see more tutorial resources.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
} 
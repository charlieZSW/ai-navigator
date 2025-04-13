import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { specialResources } from '../../data/specialResources';

export default function BeginnerResourcesPage() {
  // Filter resources for beginner category
  const beginnerResources = specialResources.filter(
    (resource) => resource.category === 'beginner'
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">AI 初学者指南</h1>
          <p className="text-slate-600 max-w-3xl">
            欢迎来到人工智能的世界！这个指南为初学者提供了系统学习 AI 的路径和精选资源，帮助你从基础知识开始，逐步掌握机器学习和深度学习技能。
          </p>
        </div>
        
        {/* Learning Path Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Recommended Learning Path</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* 学习阶段 1 - 基础知识 */}
            <Link href="/tutorials/foundations" className="group bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all hover:border-blue-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-all">阶段 1: 基础知识</h3>
              <p className="text-slate-600 mb-4">开始掌握 AI 所需的基本技能和概念，包括 Python 编程、数学基础和数据分析。</p>
              <span className="text-blue-600 group-hover:text-blue-800 transition-all flex items-center text-sm">
                浏览基础知识资源
                <svg className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            </Link>
            
            {/* 学习阶段 2 - 基础机器学习 */}
            <Link href="/tutorials/machine-learning" className="group bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all hover:border-blue-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-all">阶段 2: 基础机器学习</h3>
              <p className="text-slate-600 mb-4">学习机器学习算法、模型评估方法和基础应用，为深度学习打下基础。</p>
              <span className="text-blue-600 group-hover:text-blue-800 transition-all flex items-center text-sm">
                浏览机器学习资源
                <svg className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            </Link>
            
            {/* 学习阶段 3 - 深度学习 */}
            <Link href="/tutorials/deep-learning" className="group bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all hover:border-blue-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-all">阶段 3: 高级深度学习</h3>
              <p className="text-slate-600 mb-4">深入学习神经网络、深度学习框架和前沿应用，为实际 AI 项目开发做准备。</p>
              <span className="text-blue-600 group-hover:text-blue-800 transition-all flex items-center text-sm">
                浏览深度学习资源
                <svg className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            </Link>
          </div>
        </div>
        
        {/* Beginner Resources Section */}
        <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Beginner Resources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {beginnerResources.map((resource) => (
                    <div key={resource.id} className="bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-all hover:border-blue-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full">
                        <div className="p-5 flex-grow">
                            <a 
                                href={resource.link}
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-xl font-semibold text-slate-800 hover:text-blue-600 transition-all block mb-2"
                            >
                                {resource.title}
                            </a>
                            
                            <p className="text-slate-600 text-sm mb-3">{resource.description}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
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
                        
                        <div className="bg-slate-50 px-5 py-3 flex justify-between items-center">
                            <a 
                                href={resource.link}
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-sm text-blue-600 hover:text-blue-800 transition-all flex items-center group"
                            >
                                访问资源
                                <svg className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
        {/* Other Recommendations */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Other Recommended Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-slate-800 font-medium mb-3">Online Courses</h3>
              <ul className="space-y-2">
                <li className="text-slate-600">
                  <a 
                    href="https://www.coursera.org/learn/machine-learning" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-all"
                  >
                    Machine Learning (Andrew Ng, Coursera)
                  </a>
                </li>
                <li className="text-slate-600">
                  <a 
                    href="https://www.fast.ai/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-all"
                  >
                    Practical Deep Learning for Coders (fast.ai)
                  </a>
                </li>
                <li className="text-slate-600">
                  <a 
                    href="https://www.udacity.com/course/intro-to-machine-learning-with-pytorch--ud188" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-all"
                  >
                    Intro to Machine Learning with PyTorch (Udacity)
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-slate-800 font-medium mb-3">Books</h3>
              <ul className="space-y-2">
                <li className="text-slate-600">
                  <a 
                    href="https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-all"
                  >
                    Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow
                  </a>
                </li>
                <li className="text-slate-600">
                  <a 
                    href="https://www.deeplearningbook.org/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-all"
                  >
                    Deep Learning (Goodfellow, Bengio, Courville)
                  </a>
                </li>
                <li className="text-slate-600">
                  <a 
                    href="https://www.manning.com/books/deep-learning-with-python" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-all"
                  >
                    Deep Learning with Python (François Chollet)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 
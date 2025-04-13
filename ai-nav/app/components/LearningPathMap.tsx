'use client';

import { useState } from 'react';
import { PRIMARY_CATEGORIES } from '../data/tutorials';
import dynamic from 'next/dynamic';

// 客户端专用组件，使用动态导入避免SSR错误
const LearningPathGraph = dynamic(() => import('./LearningPathGraph'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[550px] bg-slate-50 rounded-lg border border-slate-200">
      <div className="text-slate-500">
        <svg className="animate-spin h-10 w-10 mb-2 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-center">Loading learning path map...</p>
      </div>
    </div>
  )
});

export default function LearningPathMap() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'graph' | 'tips'>('graph');
  
  // 构建学习路径数据 (将在子组件中使用)
  const learningPathData = {
    id: 'root',
    label: 'AI Learning Path',
    children: [
      {
        id: 'foundations',
        label: 'Foundations',
        description: 'Python, Mathematics, Data Analysis',
        category: PRIMARY_CATEGORIES.FOUNDATIONS,
        style: { fill: '#EFF6FF', stroke: '#BFDBFE' },
        labelCfg: { style: { fill: '#1E40AF' } },
        children: [
          {
            id: 'machine-learning',
            label: 'Machine Learning',
            description: 'Supervised/Unsupervised Learning, Evaluation',
            category: PRIMARY_CATEGORIES.MACHINE_LEARNING,
            style: { fill: '#FFFBEB', stroke: '#FDE68A' },
            labelCfg: { style: { fill: '#92400E' } },
            children: [
              {
                id: 'deep-learning',
                label: 'Deep Learning',
                description: 'Neural Networks, CNN, RNN, Transformers',
                category: PRIMARY_CATEGORIES.DEEP_LEARNING,
                style: { fill: '#F5F3FF', stroke: '#DDD6FE' },
                labelCfg: { style: { fill: '#5B21B6' } },
                children: [
                  {
                    id: 'nlp',
                    label: 'Natural Language Processing',
                    description: 'Text Processing, Language Models, Applications',
                    category: PRIMARY_CATEGORIES.NLP,
                    style: { fill: '#ECFDF5', stroke: '#A7F3D0' },
                    labelCfg: { style: { fill: '#065F46' } },
                  },
                  {
                    id: 'computer-vision',
                    label: 'Computer Vision',
                    description: 'Image Processing, Object Detection, Segmentation',
                    category: PRIMARY_CATEGORIES.COMPUTER_VISION,
                    style: { fill: '#EEF2FF', stroke: '#C7D2FE' },
                    labelCfg: { style: { fill: '#3730A3' } },
                  },
                  {
                    id: 'reinforcement-learning',
                    label: 'Reinforcement Learning',
                    description: 'MDP, RL Algorithms, Deep RL',
                    category: PRIMARY_CATEGORIES.REINFORCEMENT_LEARNING,
                    style: { fill: '#FEF2F2', stroke: '#FECACA' },
                    labelCfg: { style: { fill: '#991B1B' } },
                  },
                  {
                    id: 'generative-ai',
                    label: 'Generative AI',
                    description: 'GANs, Diffusion Models, Large Language Models',
                    category: PRIMARY_CATEGORIES.GENERATIVE_AI,
                    style: { fill: '#FDF2F8', stroke: '#FBCFE8' },
                    labelCfg: { style: { fill: '#9D174D' } },
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'tools-platforms',
        label: 'Tools & Platforms',
        description: 'Development Environments, Cloud Services, MLOps',
        category: PRIMARY_CATEGORIES.TOOLS,
        style: { fill: '#F8FAFC', stroke: '#E2E8F0' },
        labelCfg: { style: { fill: '#334155' } },
      }
    ]
  };

  // 学习路径详细提示
  const learningPathTips = [
    {
      title: 'Foundations',
      description: 'Build a solid foundation in mathematics, programming, and data analysis',
      tips: [
        'Python programming is an essential skill',
        'Linear algebra and probability statistics are key mathematical foundations',
        'Data visualization and preprocessing are must-have skills',
        'Recommended resources: Python basics courses, Khan Academy math courses'
      ]
    },
    {
      title: 'Machine Learning',
      description: 'Master core algorithms and evaluation methods',
      tips: [
        'Understand the difference between supervised and unsupervised learning',
        'Learn common algorithms: linear regression, decision trees, clustering, etc.',
        'Master evaluation methods such as cross-validation, confusion matrix, etc.',
        'Recommended resources: Andrew Ng\'s machine learning course, Scikit-learn documentation'
      ]
    },
    {
      title: 'Deep Learning',
      description: 'Explore neural network architectures and training techniques',
      tips: [
        'Understand neural network basics and backpropagation principles',
        'Learn architectures like CNN, RNN, and Transformer',
        'Master overfitting prevention and model optimization techniques',
        'Recommended resources: Deep Learning Specialization, PyTorch/TensorFlow tutorials'
      ]
    },
    {
      title: 'Specialized Directions',
      description: 'Choose specialized areas to learn in-depth based on your interests',
      tips: [
        'Natural Language Processing: text processing, language models, large language model applications',
        'Computer Vision: image classification, object detection, image segmentation',
        'Reinforcement Learning: MDP, policy optimization, deep reinforcement learning',
        'Generative AI: GANs, diffusion models, text-to-image generation'
      ]
    },
    {
      title: 'Tools & Platforms',
      description: 'Essential tools throughout the learning process',
      tips: [
        'Development environments: Jupyter, VS Code, Google Colab',
        'Deep learning frameworks: PyTorch, TensorFlow, JAX',
        'Cloud computing platforms: AWS, Google Cloud, Azure',
        'MLOps tools: Docker, Kubernetes, MLflow'
      ]
    }
  ];

  return (
    <div className="mb-8 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
      {/* 折叠/展开按钮 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-5 flex items-center justify-between hover:from-blue-600 hover:to-indigo-700 transition-all"
      >
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          <span className="text-lg font-medium">View AI Learning Path</span>
        </div>
        <svg 
          className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'transform rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      {/* 思维导图内容 - 展开时显示 */}
      {isExpanded && (
        <div className="bg-white">
          <div className="border-b border-slate-200">
            <div className="flex">
              <button
                className={`py-3 px-6 font-medium text-sm flex-1 transition-colors ${activeTab === 'graph' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-slate-600 hover:bg-slate-50'}`}
                onClick={() => setActiveTab('graph')}
              >
                Interactive Learning Path Map
              </button>
              <button
                className={`py-3 px-6 font-medium text-sm flex-1 transition-colors ${activeTab === 'tips' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-slate-600 hover:bg-slate-50'}`}
                onClick={() => setActiveTab('tips')}
              >
                Detailed Learning Tips
              </button>
            </div>
          </div>
          
          {activeTab === 'graph' && (
            <div>
              <div className="px-6 py-4 bg-blue-50">
                <h2 className="text-xl font-bold text-slate-800">AI Learning Path</h2>
                <p className="text-sm text-slate-600">
                  A scientifically arranged learning path from basics to advanced topics. <span className="font-medium">Click any node to explore related tutorials</span>.
                </p>
              </div>
              
              {/* 使用 ReactFlow 实现的可视化图表 */}
              <LearningPathGraph data={learningPathData} />
            </div>
          )}
          
          {/* 详细学习建议选项卡 */}
          {activeTab === 'tips' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-6">AI Learning Path Detailed Guide</h2>
              
              <div className="space-y-8">
                {learningPathTips.map((section, index) => (
                  <div key={index} className="p-4 rounded-lg border" style={{
                    borderColor: index === 0 ? '#BFDBFE' : index === 1 ? '#FDE68A' : index === 2 ? '#DDD6FE' : index === 4 ? '#E2E8F0' : '#D1D5DB',
                    background: index === 0 ? 'rgba(239, 246, 255, 0.5)' : index === 1 ? 'rgba(255, 251, 235, 0.5)' : index === 2 ? 'rgba(245, 243, 255, 0.5)' : index === 4 ? 'rgba(248, 250, 252, 0.5)' : 'rgba(249, 250, 251, 0.5)',
                  }}>
                    <h3 className="text-lg font-bold mb-1" style={{
                      color: index === 0 ? '#1E40AF' : index === 1 ? '#92400E' : index === 2 ? '#5B21B6' : index === 4 ? '#334155' : '#374151',
                    }}>{section.title}</h3>
                    <p className="text-sm text-slate-600 mb-3">{section.description}</p>
                    
                    <ul className="space-y-2">
                      {section.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start">
                          <svg className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" style={{
                            color: index === 0 ? '#3B82F6' : index === 1 ? '#F59E0B' : index === 2 ? '#8B5CF6' : index === 4 ? '#64748B' : '#6B7280',
                          }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="text-lg font-bold text-blue-800 mb-2">Learning Tips</h3>
                <p className="text-sm text-blue-700 mb-3">
                  AI learning is a gradual process, please pay attention to the following points:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 font-bold mr-2">•</span>
                    <span className="text-sm">Always keep <strong>practice and theory together</strong>, and practice algorithms</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 font-bold mr-2">•</span>
                    <span className="text-sm">Choose a <strong>deep field</strong> to learn, rather than superficial</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 font-bold mr-2">•</span>
                    <span className="text-sm">Participate in <strong>open source projects</strong> is the best way to improve practical ability</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 font-bold mr-2">•</span>
                    <span className="text-sm">Pay attention to <strong>frontier research</strong>, and read top conference papers regularly</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
          
          {/* 收起按钮 */}
          <div className="flex justify-center py-4 border-t border-slate-200">
            <button
              onClick={() => setIsExpanded(false)}
              className="text-sm text-blue-500 hover:text-blue-700 flex items-center px-4 py-2 border border-blue-200 rounded-full hover:bg-blue-50 transition-colors"
            >
              <span>Close Learning Path</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 
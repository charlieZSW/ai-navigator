"use client";

import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { specialResources } from '../../data/specialResources';

export default function ResearchResourcesPage() {
  // Filter resources for research category
  const researchResources = specialResources.filter(
    (resource) => resource.category === 'research'
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">AI Research Tracking</h1>
          <p className="text-slate-600 max-w-3xl">
            Stay up-to-date with the latest AI research developments, academic conferences, and top research institutions.
          </p>
        </div>
        
        {/* Key Conferences Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Key AI Academic Conferences</h2>
          
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-6 py-4 text-left text-slate-800">Conference</th>
                    <th className="px-6 py-4 text-left text-slate-800">Focus Area</th>
                    <th className="px-6 py-4 text-left text-slate-800">Typical Dates</th>
                    <th className="px-6 py-4 text-left text-slate-800">Website</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-800 font-medium">NeurIPS</td>
                    <td className="px-6 py-4 text-slate-600">
                      Machine Learning, Neural Networks
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      December
                    </td>
                    <td className="px-6 py-4">
                      <a 
                        href="https://neurips.cc/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-all"
                      >
                        neurips.cc
                      </a>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-800 font-medium">ICML</td>
                    <td className="px-6 py-4 text-slate-600">
                      Machine Learning
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      July
                    </td>
                    <td className="px-6 py-4">
                      <a 
                        href="https://icml.cc/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-all"
                      >
                        icml.cc
                      </a>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-800 font-medium">ICLR</td>
                    <td className="px-6 py-4 text-slate-600">
                      Representation Learning
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      April-May
                    </td>
                    <td className="px-6 py-4">
                      <a 
                        href="https://iclr.cc/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-all"
                      >
                        iclr.cc
                      </a>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-800 font-medium">CVPR</td>
                    <td className="px-6 py-4 text-slate-600">
                      Computer Vision
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      June
                    </td>
                    <td className="px-6 py-4">
                      <a 
                        href="https://cvpr.thecvf.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-all"
                      >
                        cvpr.thecvf.com
                      </a>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-800 font-medium">ACL</td>
                    <td className="px-6 py-4 text-slate-600">
                      Natural Language Processing
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      July
                    </td>
                    <td className="px-6 py-4">
                      <a 
                        href="https://www.aclweb.org/portal/acl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-all"
                      >
                        aclweb.org
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Research Resources Section */}
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">Research Tracking Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {researchResources.map((resource, index) => (
            <div 
              key={resource.id} 
              className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden hover:border-blue-300 hover:shadow-md transition-all transform hover:-translate-y-1" 
            >
              <div className="p-5">
                <a 
                  href={resource.link}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xl font-semibold text-slate-800 hover:text-blue-600 transition-all block mb-2"
                >
                  {resource.title}
                </a>
                
                <p className="text-slate-600 text-sm mb-3">{resource.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full"
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
                  className="text-sm text-blue-500 hover:text-blue-700 transition-all flex items-center group"
                >
                  Visit Resource
                  <svg className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {/* Research Institutions */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Top AI Research Institutions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all">
              <h3 className="text-slate-800 font-medium mb-3">Academic Research Labs</h3>
              <ul className="space-y-3">
                <li className="text-slate-600">
                  <a 
                    href="https://ai.stanford.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-all"
                  >
                    Stanford AI Lab
                  </a>
                  <p className="text-xs mt-1 text-slate-500">
                    Researching fundamental questions in artificial intelligence
                  </p>
                </li>
                <li className="text-slate-600">
                  <a 
                    href="https://www.csail.mit.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-all"
                  >
                    MIT CSAIL
                  </a>
                  <p className="text-xs mt-1 text-slate-500">
                    MIT's largest research lab focusing on computer science and AI
                  </p>
                </li>
                <li className="text-slate-600">
                  <a 
                    href="https://www.berkeley.edu/research-area/artificial-intelligence"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-all"
                  >
                    Berkeley AI Research
                  </a>
                  <p className="text-xs mt-1 text-slate-500">
                    Working on fundamental advances in computer vision, machine learning, robotics
                  </p>
                </li>
              </ul>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all">
              <h3 className="text-slate-800 font-medium mb-3">Industry Research Labs</h3>
              <ul className="space-y-3">
                <li className="text-slate-600">
                  <a 
                    href="https://www.deepmind.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-all"
                  >
                    Google DeepMind
                  </a>
                  <p className="text-xs mt-1 text-slate-500">
                    Research lab focusing on AGI through deep learning approaches
                  </p>
                </li>
                <li className="text-slate-600">
                  <a 
                    href="https://openai.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-all"
                  >
                    OpenAI
                  </a>
                  <p className="text-xs mt-1 text-slate-500">
                    Research lab developing safe and beneficial AI
                  </p>
                </li>
                <li className="text-slate-600">
                  <a 
                    href="https://research.facebook.com/ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-all"
                  >
                    Meta AI Research
                  </a>
                  <p className="text-xs mt-1 text-slate-500">
                    Advancing the field of machine intelligence through open research
                  </p>
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
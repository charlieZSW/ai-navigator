"use client";

import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { specialResources } from '../../data/specialResources';

export default function ComputeResourcesPage() {
  // Filter resources for compute category
  const computeResources = specialResources.filter(
    (resource) => resource.category === 'compute'
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">AI Compute Resources</h1>
          <p className="text-slate-600 max-w-3xl">
            Find the right GPU/TPU computing resources for your AI projects, including free options, cloud services, and cost comparisons.
          </p>
        </div>
        
        {/* Comparison table */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Compute Resource Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-slate-200 rounded-lg">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-left text-slate-800">Platform</th>
                  <th className="px-6 py-4 text-left text-slate-800">Free Quota</th>
                  <th className="px-6 py-4 text-left text-slate-800">Hardware</th>
                  <th className="px-6 py-4 text-left text-slate-800">Best For</th>
                  <th className="px-6 py-4 text-left text-slate-800">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-800 font-medium">Google Colab</td>
                  <td className="px-6 py-4 text-slate-600">
                    <span className="text-emerald-600">✓</span> 
                    12-hour sessions, K80/T4/P100 GPUs with limitations
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    K80/T4/P100 GPUs (varies), ~12GB RAM
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    Learning, prototyping, simple projects
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    Jupyter notebook environment, session timeouts, paid plans available
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-800 font-medium">Kaggle Kernels</td>
                  <td className="px-6 py-4 text-slate-600">
                    <span className="text-emerald-600">✓</span> 
                    30-hour weekly quota, P100 GPU
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    P100 GPU, 13GB RAM
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    Data science competitions, dataset analysis
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    Integrated with datasets, easy sharing, community focus
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-800 font-medium">Lambda Cloud</td>
                  <td className="px-6 py-4 text-slate-600">
                    <span className="text-red-600">✗</span> 
                    No free tier
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    Various NVIDIA GPUs (RTX 3090, A100, A6000, etc.)
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    Extended training jobs, research work
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    Per-second billing, good price-performance ratio
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-800 font-medium">Vast.ai</td>
                  <td className="px-6 py-4 text-slate-600">
                    <span className="text-red-600">✗</span> 
                    No free tier
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    Various rented community GPUs (wide range)
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    Cost-sensitive projects, flexible GPU needs
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    Marketplace model, highly variable pricing and availability
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Compute Resources */}
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">Available Compute Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {computeResources.map((resource) => (
            <div key={resource.id} className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden hover:border-blue-300 hover:shadow-md transition-all flex flex-col h-full">
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
              
              <div className="bg-slate-50 px-5 py-3 flex justify-between items-center mt-auto">
                <a 
                  href={resource.link}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-blue-600 hover:text-blue-800 transition-all flex items-center group"
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
        
        {/* Choosing compute guide */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">How to Choose the Right Compute Resource</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-slate-800 font-medium mb-2">1. Consider Your Needs</h3>
              <p className="text-slate-600">
                Start by assessing your project's requirements: model size, training time, memory needs, and budget constraints. 
                Beginners with smaller projects may be fine with free options like Google Colab, while larger projects 
                might require dedicated cloud GPUs.
              </p>
            </div>
            
            <div>
              <h3 className="text-slate-800 font-medium mb-2">2. Understand Hardware Differences</h3>
              <p className="text-slate-600">
                Different GPU models offer varying performance. For deep learning, consider VRAM capacity first 
                (determines max model/batch size), then computational power (affects training speed). TPUs excel 
                at specific workloads like transformers and CNNs.
              </p>
            </div>
            
            <div>
              <h3 className="text-slate-800 font-medium mb-2">3. Balance Cost and Availability</h3>
              <p className="text-slate-600">
                Free resources have limitations like usage quotas, timeouts, and lower priority. For serious work, 
                calculate the total cost over time rather than just hourly rates. Consider spot/preemptible instances 
                for non-urgent workloads to save costs.
              </p>
            </div>
            
            <div>
              <h3 className="text-slate-800 font-medium mb-2">4. Evaluate Environment and Support</h3>
              <p className="text-slate-600">
                Consider the development environment, pre-installed libraries, storage options, and networking capabilities. 
                Some platforms offer optimized containers for ML frameworks, while others provide better integration with 
                specific cloud ecosystems.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 
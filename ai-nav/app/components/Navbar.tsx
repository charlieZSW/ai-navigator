"use client";

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Determine if the link is the current active page
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };
  
  // Get style for active link
  const getLinkClassName = (path: string) => {
    const baseClasses = "px-3 py-2 text-sm font-medium relative transition-all duration-300";
    
    if (isActive(path)) {
      return `${baseClasses} text-blue-600 font-semibold active-link`;
    }
    
    return `${baseClasses} text-slate-700 hover:text-blue-600`;
  };
  
  // Get mobile menu link style
  const getMobileLinkClassName = (path: string) => {
    const baseClasses = "block px-3 py-2 text-base font-medium relative transition-all duration-300";
    
    if (isActive(path)) {
      return `${baseClasses} text-blue-600 bg-blue-50 font-semibold`;
    }
    
    return `${baseClasses} text-slate-700 hover:text-blue-600 hover:bg-blue-50`;
  };
  
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className={`text-xl font-bold transition-all duration-300 ${isActive('/') ? 'text-blue-700' : 'text-blue-600'}`}>AI Navigator</span>
            </Link>
            
            <div className="hidden sm:ml-8 sm:flex sm:space-x-6 items-center">
              <Link href="/models" className={getLinkClassName('/models')}>
                Models
                {isActive('/models') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 animate-fadeInWidth"></span>}
              </Link>
              <Link href="/datasets" className={getLinkClassName('/datasets')}>
                Datasets
                {isActive('/datasets') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 animate-fadeInWidth"></span>}
              </Link>
              <Link href="/tutorials" className={getLinkClassName('/tutorials')}>
                Tutorials
                {isActive('/tutorials') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 animate-fadeInWidth"></span>}
              </Link>
              <Link href="/frameworks" className={getLinkClassName('/frameworks')}>
                Frameworks
                {isActive('/frameworks') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 animate-fadeInWidth"></span>}
              </Link>
              <Link href="/resources" className={getLinkClassName('/resources')}>
                Resources
                {isActive('/resources') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 animate-fadeInWidth"></span>}
              </Link>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center">
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer" 
              className="text-slate-500 hover:text-blue-600 ml-4"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.92.678 1.855 0 1.337-.012 2.419-.012 2.747 0 .268.18.58.688.48A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
          </div>
          
          <div className="flex items-center sm:hidden">
            <button 
              type="button" 
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="sm:hidden bg-white border-t border-slate-200">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              href="/models" 
              className={getMobileLinkClassName('/models')}
              onClick={() => setIsMenuOpen(false)}
            >
              Models
            </Link>
            <Link 
              href="/datasets" 
              className={getMobileLinkClassName('/datasets')}
              onClick={() => setIsMenuOpen(false)}
            >
              Datasets
            </Link>
            <Link 
              href="/tutorials" 
              className={getMobileLinkClassName('/tutorials')}
              onClick={() => setIsMenuOpen(false)}
            >
              Tutorials
            </Link>
            <Link 
              href="/frameworks" 
              className={getMobileLinkClassName('/frameworks')}
              onClick={() => setIsMenuOpen(false)}
            >
              Frameworks
            </Link>
            <Link 
              href="/resources" 
              className={getMobileLinkClassName('/resources')}
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </Link>
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer" 
              className="flex items-center px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.92.678 1.855 0 1.337-.012 2.419-.012 2.747 0 .268.18.58.688.48A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      )}
      
      <style jsx global>{`
        @keyframes fadeInWidth {
          from { width: 0; }
          to { width: 100%; }
        }
        
        .animate-fadeInWidth {
          animation: fadeInWidth 0.3s ease-in-out forwards;
        }
        
        .active-link {
          position: relative;
        }
      `}</style>
    </nav>
  );
} 
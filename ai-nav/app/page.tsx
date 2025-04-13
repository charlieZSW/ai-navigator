"use client";

import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { models } from './data/models';
import { datasets } from './data/datasets';
import { tutorials } from './data/tutorials';
import { frameworks } from './data/frameworks';
import { specialResources } from './data/specialResources';
import ResourceCard from './components/ResourceCard';
import { useEffect, useState, useRef } from 'react';

export default function Home() {
  // Get a few items from each category for the homepage
  const featuredModels = models.slice(0, 3);
  const featuredDatasets = datasets.slice(0, 3);
  const featuredTutorials = tutorials.filter(tutorial => tutorial.difficulty === 'beginner').slice(0, 3);
  
  // Count the actual number of resources for stats display
  const modelsCount = models.length;
  const datasetsCount = datasets.length;
  const tutorialsCount = tutorials.length;
  const frameworksCount = frameworks.length;
  
  // Animation control states
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const resourcesRef = useRef(null);
  const aboutRef = useRef(null);
  
  // Mouse tracking glow effect states
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [showGlow, setShowGlow] = useState(false);
  const heroRef = useRef(null);
  
  // State to ensure glow effect only renders client-side
  const [isMounted, setIsMounted] = useState(false);
  
  // Use useEffect to mark component as mounted on client
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Handle mouse movement to update glow position
  const handleMouseMove = (e: React.MouseEvent) => {
    if (heroRef.current) {
      const rect = (heroRef.current as HTMLElement).getBoundingClientRect();
      setGlowPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setShowGlow(true);
    }
  };
  
  // Handle mouse leave event
  const handleMouseLeave = () => {
    setShowGlow(false);
  };
  
  // Scroll observation effect
  useEffect(() => {
    setIsVisible(true);
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          (entry.target as HTMLElement).style.opacity = '1';
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    if (statsRef.current) observer.observe(statsRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (resourcesRef.current) observer.observe(resourcesRef.current);
    if (aboutRef.current) observer.observe(aboutRef.current);
    
    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current);
      if (featuresRef.current) observer.unobserve(featuresRef.current);
      if (resourcesRef.current) observer.unobserve(resourcesRef.current);
      if (aboutRef.current) observer.unobserve(aboutRef.current);
    };
  }, []);
  
  // Number growth animation effect
  const [stats, setStats] = useState({
    models: 0,
    datasets: 0,
    tutorials: 0,
    frameworks: 0
  });
  
  useEffect(() => {
    const duration = 600; // Shorter animation duration
    
    // Use smoother animation method
    const animateValue = (
      start: number, 
      end: number, 
      duration: number, 
      setValue: (value: number) => void
    ) => {
      let startTimestamp: number | null = null;
      
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // Use easing function for more natural number growth
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);
        setValue(Math.floor(start + easeOutQuad * (end - start)));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      
      window.requestAnimationFrame(step);
    };
    
    // Apply animation to each stat number
    animateValue(0, modelsCount, duration, (value: number) => {
      setStats(prev => ({ ...prev, models: value }));
    });
    
    animateValue(0, datasetsCount, duration, (value: number) => {
      setStats(prev => ({ ...prev, datasets: value }));
    });
    
    animateValue(0, tutorialsCount, duration, (value: number) => {
      setStats(prev => ({ ...prev, tutorials: value }));
    });
    
    animateValue(0, frameworksCount, duration, (value: number) => {
      setStats(prev => ({ ...prev, frameworks: value }));
    });
    
  }, [modelsCount, datasetsCount, tutorialsCount, frameworksCount]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Navbar />
      
      {/* Hero section with enhanced animation */}
      <div 
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0 opacity-30 bg-grid-pattern"></div>
        
        {/* Optimized floating animation elements */}
        <div className="absolute top-20 left-10 w-20 h-20 circle-pattern opacity-50 float" style={{ animationDuration: '5s' }}></div>
        <div className="absolute bottom-40 right-10 w-32 h-32 circle-pattern opacity-40 float-slow" style={{ animationDelay: '0.5s', animationDuration: '7s' }}></div>
        <div className="absolute top-40 right-20 w-16 h-16 circle-pattern opacity-30 float" style={{ animationDelay: '1s', animationDuration: '6s' }}></div>
        
        {/* Mouse tracking glow effect - client-side only */}
        {isMounted && (
          <div 
            className="hero-glow" 
            style={{
              left: `${glowPosition.x}px`,
              top: `${glowPosition.y}px`,
              opacity: showGlow ? 0.7 : 0,
              position: 'absolute',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0) 70%)',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              zIndex: 1,
              transition: 'opacity 0.3s ease'
            }}
          />
        )}
        
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="text-center">
            <h1 
              className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 opacity-0"
              style={{ 
                animation: 'fadeInUp 0.8s ease-out forwards',
                animationDelay: '0.1s'
              }}
            >
              AI and Machine Learning Resources Navigator
            </h1>
            <p 
              className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 opacity-0"
              style={{ 
                animation: 'fadeInUp 0.8s ease-out forwards',
                animationDelay: '0.4s'
              }}
            >
              Discover and explore high-quality resources for AI and machine learning, 
              including models, datasets, tutorials, and frameworks
            </p>
            <div 
              className="flex flex-wrap justify-center gap-4 opacity-0"
              style={{ 
                animation: 'fadeInUp 0.8s ease-out forwards',
                animationDelay: '0.7s'
              }}
            >
              <Link 
                href="/models" 
                className="bg-blue-500 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-600 transition-all transform hover:-translate-y-1 hover:shadow-lg hover:glow-blue"
              >
                Explore Models
              </Link>
              <Link 
                href="/datasets" 
                className="bg-white text-slate-800 px-5 py-3 rounded-lg font-medium hover:bg-slate-100 transition-all transform hover:-translate-y-1 hover:shadow-lg"
              >
                Browse Datasets
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>
      
      {/* Stats with number animation */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 opacity-0">
          <div className="bg-white border border-slate-200 rounded-lg p-6 text-center shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-blue-300">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.models}+</div>
            <div className="text-slate-600">AI Models</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-6 text-center shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-blue-300" style={{ transitionDelay: '100ms' }}>
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.datasets}+</div>
            <div className="text-slate-600">Datasets</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-6 text-center shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-blue-300" style={{ transitionDelay: '200ms' }}>
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.tutorials}+</div>
            <div className="text-slate-600">Tutorials</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-6 text-center shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-blue-300" style={{ transitionDelay: '300ms' }}>
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.frameworks}+</div>
            <div className="text-slate-600">Frameworks</div>
          </div>
        </div>
        
        {/* Features section */}
        <div ref={featuresRef} className="mb-20 opacity-0">
          <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Why Use AI Navigator</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Curated Resources</h3>
              <p className="text-slate-600">
                Hand-picked AI and ML resources selected for quality, relevance, and usefulness for practitioners at all levels.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Learning Paths</h3>
              <p className="text-slate-600">
                Structured learning paths to guide you from beginner to advanced levels in different AI specializations.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Community Rated</h3>
              <p className="text-slate-600">
                Resources are rated and reviewed by the AI community to ensure you're getting the most valuable content.
              </p>
            </div>
          </div>
        </div>
        
        {/* Featured resources */}
        <div ref={resourcesRef} className="mb-20 opacity-0">
          <h2 className="text-3xl font-bold text-slate-800 mb-2 text-center">Featured Resources</h2>
          <p className="text-slate-600 text-center mb-8 max-w-3xl mx-auto">
            Explore some of our top resources in different categories
          </p>
          
          <div className="grid gap-8">
            <div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Featured Models
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {featuredModels.map(model => (
                  <ResourceCard 
                    key={model.id}
                    id={model.id}
                    title={model.title}
                    description={model.description}
                    link={model.link}
                    tags={model.tags}
                    category={model.category}
                    isFree={model.isFree}
                    variant="model"
                  />
                ))}
              </div>
              <div className="text-center mt-4">
                <Link href="/models" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                  View all models
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Featured Datasets
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {featuredDatasets.map(dataset => (
                  <ResourceCard 
                    key={dataset.id}
                    id={dataset.id}
                    title={dataset.title}
                    description={dataset.description}
                    link={dataset.link}
                    tags={dataset.tags}
                    category={dataset.category}
                    format={dataset.format}
                    size={dataset.size}
                    variant="dataset"
                  />
                ))}
              </div>
              <div className="text-center mt-4">
                <Link href="/datasets" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                  View all datasets
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Beginner Tutorials
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {featuredTutorials.map(tutorial => (
                  <ResourceCard 
                    key={tutorial.id}
                    id={tutorial.id}
                    title={tutorial.title}
                    description={tutorial.description}
                    link={tutorial.link}
                    tags={tutorial.tags}
                    difficulty={tutorial.difficulty}
                    type={tutorial.type}
                    category={tutorial.category}
                    variant="tutorial"
                  />
                ))}
              </div>
              <div className="text-center mt-4">
                <Link href="/tutorials" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                  View all tutorials
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* About section */}
        <div ref={aboutRef} className="opacity-0">
          <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">About AI Navigator</h2>
            <p className="text-slate-600 mb-4">
              AI Navigator is a comprehensive resource center for artificial intelligence and machine learning enthusiasts, 
              practitioners, and researchers. Our mission is to provide a curated collection of high-quality resources 
              to help you navigate the complex world of AI.
            </p>
            <p className="text-slate-600 mb-4">
              Whether you're a beginner just starting your AI journey or an experienced researcher looking for specific tools, 
              we aim to make it easy to discover the resources you need.
            </p>
            <p className="text-slate-600">
              The platform is continuously updated with the latest models, datasets, tutorials, and frameworks to keep you 
              at the forefront of AI advancements.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

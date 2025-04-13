"use client";

import Link from 'next/link';
import { useState } from 'react';

interface ResourceCardProps {
  id: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
  category?: string;
  isFree?: boolean;
  difficulty?: string;
  type?: string;
  size?: string;
  format?: string;
  repoLink?: string;
  docsLink?: string;
  stars?: number;
  variant?: 'dataset' | 'tutorial' | 'model' | 'framework' | 'default';
}

export default function ResourceCard({ 
  id, 
  title, 
  description, 
  link, 
  tags, 
  category,
  isFree, 
  difficulty, 
  type,
  size,
  format,
  repoLink,
  docsLink,
  stars,
  variant = 'default'
}: ResourceCardProps) {
  // State for expansion control
  const [isTitleExpanded, setIsTitleExpanded] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  
  // Ensure links have http prefix
  const formattedLink = link.startsWith('http') ? link : `https://${link}`;
  const formattedRepoLink = repoLink ? (repoLink.startsWith('http') ? repoLink : `https://${repoLink}`) : '';
  const formattedDocsLink = docsLink ? (docsLink.startsWith('http') ? docsLink : `https://${docsLink}`) : '';

  // Set card height based on card type
  const getCardHeight = () => {
    // Don't set fixed height if title or description is expanded
    if (isTitleExpanded || isDescriptionExpanded) {
      return '';
    }
    
    switch (variant) {
      case 'dataset':
        return 'h-[320px]'; // Dataset card height reduced to 320px (was 350px)
      case 'tutorial':
        return 'h-[280px]'; // Tutorial card height increased
      case 'framework':
        return 'h-[280px]'; // Framework card height reduced to 280px (was 300px)
      case 'model':
        return 'h-[330px]'; // Model card medium height unchanged
      default:
        return 'h-[320px]'; // Default height
    }
  };

  // Get button text for action
  const getActionText = () => {
    if (type === 'course') return 'Start Learning';
    if (type === 'video') return 'Watch Video';
    if (type === 'article') return 'Read Article';
    if (type === 'book') return 'View Book';
    
    if (category === 'Image Datasets' || category === 'Text Datasets' || 
        category === 'Audio Datasets' || category === 'Multimodal Datasets' || 
        category === 'Tabular Datasets') return 'Access Dataset';
    
    if (variant === 'framework') return 'Visit Framework';
    
    return 'View Link';
  };

  // Get content padding based on card type
  const getContentPadding = () => {
    if (variant === 'tutorial' || variant === 'framework') {
      return 'p-4'; // Reduced internal padding for tutorial and framework cards
    }
    return 'p-5'; // Original padding for other cards
  };

  // Get margin between title and description
  const getTitleMargin = () => {
    if (variant === 'framework') {
      return 'mb-0.5'; // Smaller margin below title for framework cards
    }
    return variant === 'tutorial' ? 'mb-1' : 'mb-2';  // Different spacing based on card type
  };

  return (
    <div className={`bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md hover:border-blue-300 transition-all ${getCardHeight()} flex flex-col`}>
      <div className={`${getContentPadding()} flex flex-col flex-grow`}>
        {/* Title area: fixed height, space for two lines, reduced bottom margin based on card type */}
        <div className={`flex justify-between items-start ${getTitleMargin()} min-h-[50px]`}>
          <div className="flex-grow">
            <Link 
              href={formattedLink}
              target="_blank" 
              rel="noopener noreferrer" 
              className={`text-xl font-semibold text-slate-800 hover:text-blue-500 transition-all ${isTitleExpanded ? '' : 'line-clamp-2'} leading-7`}
            >
              {title}
            </Link>
            
            {/* Title expand/collapse button - only shown when title might be truncated */}
            {title.length > 50 && (
              <button 
                onClick={() => setIsTitleExpanded(!isTitleExpanded)} 
                className="text-xs text-blue-500 hover:text-blue-600 mt-1 cursor-pointer"
              >
                {isTitleExpanded ? 'Collapse' : 'View Full Title'}
              </button>
            )}
          </div>
          
          {isFree !== undefined && (
            <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ml-2 ${isFree ? 'bg-emerald-100 text-emerald-600' : 'bg-purple-100 text-purple-600'}`}>
              {isFree ? 'Free' : 'Paid'}
            </span>
          )}
        </div>
        
        {/* Description area: adjusted bottom margin and minimum height based on card type */}
        <div className={`${variant === 'framework' ? 'mb-2 min-h-[50px]' : (variant === 'tutorial' ? 'mb-2 min-h-[80px]' : (variant === 'dataset' ? 'mb-3 min-h-[70px]' : 'mb-3 min-h-[80px]'))}`}>
          <p className={`text-slate-600 text-sm ${isDescriptionExpanded ? '' : (variant === 'dataset' || variant === 'framework' ? 'line-clamp-3' : 'line-clamp-4')} ${variant === 'tutorial' ? 'leading-snug' : 'leading-normal'}`}>{description}</p>
          
          {/* Description expand/collapse button - lower threshold for tutorial cards */}
          {(description.length > 150 || (variant === 'tutorial' && description.length > 120)) && (
            <button 
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)} 
              className="text-xs text-blue-500 hover:text-blue-600 mt-1 cursor-pointer"
            >
              {isDescriptionExpanded ? 'Collapse' : 'View Full Description'}
            </button>
          )}
        </div>
        
        {/* Different tag layouts based on card type */}
        {variant === 'tutorial' ? (
          // Tutorial card tag layout - more compact
          <div className="flex flex-wrap gap-1 mb-1.5">
            <div className="flex flex-wrap gap-1 mb-0.5">
              {difficulty && (
                <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-600 rounded-full whitespace-nowrap">
                  {difficulty}
                </span>
              )}
              
              {type && (
                <span className="text-xs px-2 py-0.5 bg-pink-100 text-pink-600 rounded-full whitespace-nowrap">
                  {type}
                </span>
              )}
              
              {category && (
                <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full whitespace-nowrap">
                  {category}
                </span>
              )}
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {tags.slice(0, 2).map((tag, index) => (
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
        ) : variant === 'framework' ? (
          // Framework card tag layout
          <div className="flex flex-wrap gap-1 mb-1">
            {category && (
              <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full whitespace-nowrap">
                {category}
              </span>
            )}
            
            {tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
            
            {stars !== undefined && stars > 0 && (
              <span className="text-xs px-2 py-0.5 bg-yellow-50 text-yellow-600 rounded-full whitespace-nowrap flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {stars > 1000 ? `${(stars / 1000).toFixed(1)}k` : stars}
              </span>
            )}
          </div>
        ) : variant === 'dataset' ? (
          // Dataset card tag layout
          <div className="flex flex-wrap gap-1 mb-auto">
            {category && (
              <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full whitespace-nowrap">
                {category}
              </span>
            )}
            
            {tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
            
            {format && (
              <span className="text-xs px-2 py-0.5 bg-teal-50 text-teal-600 rounded-full whitespace-nowrap">
                {format}
              </span>
            )}
            
            {size && (
              <span className="text-xs px-2 py-0.5 bg-violet-50 text-violet-600 rounded-full whitespace-nowrap">
                {size}
              </span>
            )}
          </div>
        ) : (
          // Default tag layout (for models and other types)
          <div className="flex flex-wrap gap-1 mb-auto">
            {category && (
              <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full whitespace-nowrap">
                {category}
              </span>
            )}
            
            {tags.map((tag, index) => (
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
      
      {/* Card footer with link button */}
      <div className={`bg-slate-50 border-t border-slate-200 p-3 mt-auto`}>
        <div className="flex justify-between items-center">
          <a 
            href={formattedLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center transition-all"
          >
            {getActionText()}
            <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
          
          {/* Additional links for frameworks */}
          {variant === 'framework' && (
            <div className="flex space-x-3">
              {formattedRepoLink && (
                <a 
                  href={formattedRepoLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-500 hover:text-blue-600 transition-all"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
              )}
              
              {formattedDocsLink && (
                <a 
                  href={formattedDocsLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-500 hover:text-blue-600 transition-all"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM8 17h8v-1H8v1zm0-3h8v-1H8v1zm0-3h8v-1H8v1z"/>
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
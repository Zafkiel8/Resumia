import React from 'react';
import { Clock, ExternalLink, Tag } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onClick: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `hace ${diffInMinutes}m`;
    } else if (diffInMinutes < 1440) {
      return `hace ${Math.floor(diffInMinutes / 60)}h`;
    } else {
      return `hace ${Math.floor(diffInMinutes / 1440)}d`;
    }
  };

  return (
    <article 
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={() => onClick(article)}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
            {article.title}
          </h2>
        </div>
        
        <div className="space-y-3">
          <ul className="space-y-2">
            {article.summary_bullets.map((bullet, index) => (
              <li key={index} className="flex items-start space-x-2 text-gray-700">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {article.topics.slice(0, 3).map((topic, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
            >
              <Tag className="w-3 h-3 mr-1" />
              {topic}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="font-medium">{article.source.name}</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{formatTimeAgo(article.published_at)}</span>
            </div>
            <span>{article.reading_time} min lectura</span>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              window.open(article.canonical_url, '_blank', 'noopener,noreferrer');
            }}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
          >
            <span>Leer fuente</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
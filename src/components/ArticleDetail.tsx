import React from 'react';
import { ArrowLeft, Clock, ExternalLink, Tag, Share, Bookmark } from 'lucide-react';
import { Article } from '../types';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onBack }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al feed</span>
          </button>
          
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <span className="font-medium">{article.source.name}</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{formatDate(article.published_at)}</span>
              </div>
              <span>{article.reading_time} min lectura</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors">
                <Share className="w-4 h-4" />
                <span>Compartir</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors">
                <Bookmark className="w-4 h-4" />
                <span>Guardar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="space-y-8">
            {/* Summary paragraph */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Resumen ejecutivo</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {article.summary_paragraph}
              </p>
            </div>
            
            {/* Key points */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Puntos clave</h2>
              <ul className="space-y-4">
                {article.summary_bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Topics and metadata */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Categorías</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.topics.map((topic, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Región</h3>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    {article.country || 'Global'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Source link */}
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <p className="text-gray-600 mb-4">
                Para leer el artículo completo y obtener más detalles, visita la fuente original:
              </p>
              <button 
                onClick={() => window.open(article.canonical_url, '_blank', 'noopener,noreferrer')}
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <span>Leer en {article.source.name}</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
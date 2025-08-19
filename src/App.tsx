import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { ArticleCard } from './components/ArticleCard';
import { ArticleDetail } from './components/ArticleDetail';
import { LoadingCard } from './components/LoadingCard';
import { Stats } from './components/Stats';
import { mockArticles } from './data/mockArticles';
import { Article } from './types';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'todas') {
      return mockArticles;
    }
    
    return mockArticles.filter(article => 
      article.topics.includes(selectedCategory) || 
      article.country === selectedCategory
    );
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setLoading(true);
    setSelectedCategory(category);
    setTimeout(() => setLoading(false), 500); // Simulate loading
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleBackToFeed = () => {
    setSelectedArticle(null);
  };

  if (selectedArticle) {
    return <ArticleDetail article={selectedArticle} onBack={handleBackToFeed} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        selectedCategory={selectedCategory} 
        onCategoryChange={handleCategoryChange}
      />
      
      <Stats />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {selectedCategory === 'todas' 
              ? 'Últimas noticias resumidas' 
              : `Noticias de ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`
            }
          </h2>
          <p className="text-gray-600">
            Resúmenes precisos y neutrales generados por IA en tiempo real
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <LoadingCard key={index} />
            ))
          ) : filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                onClick={handleArticleClick}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No hay noticias disponibles
              </h3>
              <p className="text-gray-500">
                No se encontraron artículos para esta categoría en este momento.
              </p>
            </div>
          )}
        </div>
        
        {filteredArticles.length > 0 && !loading && (
          <div className="text-center mt-12">
            <button className="bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Cargar más noticias
            </button>
          </div>
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ResumenIA</h3>
              <p className="text-gray-600 mb-4">
                Noticias resumidas con inteligencia artificial. Ahorra tiempo sin perderte lo importante.
              </p>
              <p className="text-sm text-gray-500">
                Todos los resúmenes enlazan a fuentes originales verificadas.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Categorías</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Tecnología</a></li>
                <li><a href="#" className="hover:text-gray-900">Deportes</a></li>
                <li><a href="#" className="hover:text-gray-900">Economía</a></li>
                <li><a href="#" className="hover:text-gray-900">Ciencia</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Acerca de</a></li>
                <li><a href="#" className="hover:text-gray-900">Privacidad</a></li>
                <li><a href="#" className="hover:text-gray-900">Términos</a></li>
                <li><a href="#" className="hover:text-gray-900">Contacto</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-8 mt-8 text-center text-sm text-gray-500">
            <p>© 2025 ResumenIA. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
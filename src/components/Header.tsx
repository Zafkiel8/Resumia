import React from 'react';
import { Newspaper, Search, Bell } from 'lucide-react';

interface HeaderProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'todas', label: 'Todas' },
  { id: 'tecnologia', label: 'Tecnología' },
  { id: 'deportes', label: 'Deportes' },
  { id: 'espana', label: 'España' },
  { id: 'mundo', label: 'Mundo' },
  { id: 'economia', label: 'Economía' },
  { id: 'ciencia', label: 'Ciencia' }
];

export const Header: React.FC<HeaderProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Newspaper className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Resumen<span className="text-blue-600">IA</span>
              </h1>
            </div>
            <div className="hidden md:block">
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                Noticias resumidas por IA
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Newsletter
            </button>
          </div>
        </div>
        
        {/* Category filters */}
        <div className="border-t border-gray-100">
          <nav className="flex space-x-8 overflow-x-auto py-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedCategory === category.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {category.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
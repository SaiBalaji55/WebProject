import React from 'react';
import { Portfolio, Template } from '../../types';

const templates: Template[] = [
  {
    id: 'modern',
    name: 'Modern Professional',
    category: 'developer',
    preview: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
  },
  {
    id: 'creative',
    name: 'Creative Portfolio',
    category: 'designer',
    preview: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    category: 'writer',
    preview: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
  },
];

interface Props {
  portfolio: Portfolio;
  onChange: (template: Template) => void;
}

export function TemplateSelector({ portfolio, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <div
          key={template.id}
          className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
            portfolio.template.id === template.id
              ? 'ring-2 ring-blue-500 scale-105'
              : 'hover:scale-105'
          }`}
          onClick={() => onChange(template)}
        >
          <img
            src={template.preview}
            alt={template.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <h3 className="text-white font-semibold">{template.name}</h3>
            <p className="text-gray-200 text-sm capitalize">{template.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
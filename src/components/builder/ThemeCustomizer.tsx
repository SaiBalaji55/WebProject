import React from 'react';
import { Portfolio } from '../../types';
import { Palette, Type } from 'lucide-react';

interface Props {
  portfolio: Portfolio;
  onChange: (theme: Portfolio['theme']) => void;
}

const fontOptions = [
  'Inter',
  'Roboto',
  'Poppins',
  'Montserrat',
  'Open Sans'
];

export function ThemeCustomizer({ portfolio, onChange }: Props) {
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Palette className="h-5 w-5 mr-2" />
          Color Scheme
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Color
            </label>
            <input
              type="color"
              value={portfolio.theme.primaryColor}
              onChange={(e) => onChange({ ...portfolio.theme, primaryColor: e.target.value })}
              className="h-10 w-full rounded-md cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secondary Color
            </label>
            <input
              type="color"
              value={portfolio.theme.secondaryColor}
              onChange={(e) => onChange({ ...portfolio.theme, secondaryColor: e.target.value })}
              className="h-10 w-full rounded-md cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Type className="h-5 w-5 mr-2" />
          Typography
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Family
          </label>
          <select
            value={portfolio.theme.fontFamily}
            onChange={(e) => onChange({ ...portfolio.theme, fontFamily: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {fontOptions.map(font => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
        <div className="space-y-4">
          <div style={{ fontFamily: portfolio.theme.fontFamily }}>
            <h1 style={{ color: portfolio.theme.primaryColor }} className="text-2xl font-bold">
              Sample Heading
            </h1>
            <p style={{ color: portfolio.theme.secondaryColor }} className="text-lg">
              This is how your text will look with the selected font and colors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
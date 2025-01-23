import React, { useState } from 'react';
import { Portfolio, Skill } from '../../types';
import { Plus, X } from 'lucide-react';

interface Props {
  portfolio: Portfolio;
  onChange: (skills: Skill[]) => void;
}

const skillCategories = [
  'Programming Languages',
  'Frameworks & Libraries',
  'Tools & Technologies',
  'Soft Skills',
  'Design',
  'Languages',
  'Other'
];

export function SkillsForm({ portfolio, onChange }: Props) {
  const [newSkill, setNewSkill] = useState<Omit<Skill, 'id'>>({
    name: '',
    category: skillCategories[0],
    level: 3
  });

  const addSkill = () => {
    if (newSkill.name.trim()) {
      onChange([...portfolio.skills, newSkill]);
      setNewSkill({
        name: '',
        category: newSkill.category,
        level: 3
      });
    }
  };

  const removeSkill = (skillToRemove: Skill) => {
    onChange(portfolio.skills.filter(skill => skill.name !== skillToRemove.name));
  };

  const getSkillsByCategory = (category: string) => {
    return portfolio.skills.filter(skill => skill.category === category);
  };

  return (
    <div className="space-y-8">
      {/* Add new skill form */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Skill</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skill Name
            </label>
            <input
              type="text"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., React.js"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={newSkill.category}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {skillCategories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Proficiency Level (1-5)
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
          </div>
        </div>
        <button
          onClick={addSkill}
          disabled={!newSkill.name.trim()}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </button>
      </div>

      {/* Skills list by category */}
      <div className="space-y-6">
        {skillCategories.map(category => {
          const skills = getSkillsByCategory(category);
          if (skills.length === 0) return null;

          return (
            <div key={category} className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map(skill => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{skill.name}</div>
                      <div className="mt-1 flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full mr-1 ${
                              index < skill.level ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-2 text-gray-400 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {portfolio.skills.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No skills added yet. Start by adding your first skill above!</p>
        </div>
      )}
    </div>
  );
}
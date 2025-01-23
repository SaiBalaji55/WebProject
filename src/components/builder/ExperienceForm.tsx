import React, { useState } from 'react';
import { Portfolio, Experience } from '../../types';
import { Briefcase, Calendar, MapPin, Plus, X, Save, AlertCircle } from 'lucide-react';

interface Props {
  portfolio: Portfolio;
  onChange: (experience: Experience[]) => void;
}

const initialExperience: Experience = {
  title: '',
  company: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  description: ''
};

const dummyExperience: Experience[] = [
  {
    title: "Senior Frontend Developer (Example)",
    company: "Tech Solutions Inc.",
    location: "San Francisco, CA",
    startDate: "2021-01",
    endDate: undefined,
    current: true,
    description: "This is an example entry. Add your own experience using the 'Add Experience' button below."
  }
];

export function ExperienceForm({ portfolio, onChange }: Props) {
  const [experience, setExperience] = useState<Experience[]>(dummyExperience);
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [newExperience, setNewExperience] = useState<Experience>(initialExperience);

  const handleAddExperience = () => {
    if (newExperience.title && newExperience.company) {
      const updatedExperience = [...experience, newExperience];
      setExperience(updatedExperience);
      onChange(updatedExperience);
      setNewExperience(initialExperience);
      setIsAddingExperience(false);
    }
  };

  const handleRemoveExperience = (index: number) => {
    const updatedExperience = experience.filter((_, i) => i !== index);
    setExperience(updatedExperience);
    onChange(updatedExperience);
  };

  return (
    <div className="space-y-6">
      {experience.length === 1 && experience[0].title.includes("Example") && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-800">Example Experience</h4>
            <p className="text-sm text-blue-600 mt-1">
              This is a sample experience entry. Feel free to remove it and add your own work experience using the form below.
            </p>
          </div>
        </div>
      )}

      {experience.map((exp, index) => (
        <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
                {exp.title}
              </h3>
              <p className="text-lg text-gray-700 mt-1">{exp.company}</p>
            </div>
            <div className="flex items-center space-x-2">
              {exp.current && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Current
                </span>
              )}
              <button
                onClick={() => handleRemoveExperience(index)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="flex items-center text-gray-600 space-x-4 mb-4">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
            </span>
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {exp.location}
            </span>
          </div>
          <p className="text-gray-600">{exp.description}</p>
        </div>
      ))}

      {isAddingExperience ? (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Experience</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                value={newExperience.title}
                onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter job title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                type="text"
                value={newExperience.company}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={newExperience.location}
                onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter location"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="month"
                  value={newExperience.startDate}
                  onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {!newExperience.current && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="month"
                    value={newExperience.endDate}
                    onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="current"
                checked={newExperience.current}
                onChange={(e) => setNewExperience({ ...newExperience, current: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="current" className="ml-2 text-sm text-gray-700">
                I currently work here
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newExperience.description}
                onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                placeholder="Describe your responsibilities and achievements"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsAddingExperience(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddExperience}
                disabled={!newExperience.title || !newExperience.company}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4 inline-block mr-1" />
                Save Experience
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingExperience(true)}
          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
        >
          <Plus className="h-6 w-6 mx-auto" />
          <span className="block mt-2">Add New Experience</span>
        </button>
      )}
    </div>
  );
}
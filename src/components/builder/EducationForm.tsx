import React, { useState } from 'react';
import { Portfolio, Education } from '../../types';
import { GraduationCap, Calendar, MapPin, Plus, X, Save, AlertCircle } from 'lucide-react';

interface Props {
  portfolio: Portfolio;
  onChange: (education: Education[]) => void;
}

const initialEducation: Education = {
  degree: '',
  institution: '',
  location: '',
  startYear: '',
  endYear: '',
  current: false,
  description: ''
};

const dummyEducation: Education[] = [
  {
    degree: "Master of Science in Computer Science (Example)",
    institution: "Stanford University",
    location: "Stanford, CA",
    startYear: "2019",
    endYear: "2021",
    current: false,
    description: "This is an example entry. Add your own education using the 'Add Education' button below."
  }
];

export function EducationForm({ portfolio, onChange }: Props) {
  const [education, setEducation] = useState<Education[]>(dummyEducation);
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [newEducation, setNewEducation] = useState<Education>(initialEducation);

  const handleAddEducation = () => {
    if (newEducation.degree && newEducation.institution) {
      const updatedEducation = [...education, newEducation];
      setEducation(updatedEducation);
      onChange(updatedEducation);
      setNewEducation(initialEducation);
      setIsAddingEducation(false);
    }
  };

  const handleRemoveEducation = (index: number) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    setEducation(updatedEducation);
    onChange(updatedEducation);
  };

  return (
    <div className="space-y-6">
      {education.length === 1 && education[0].degree.includes("Example") && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-800">Example Education Entry</h4>
            <p className="text-sm text-blue-600 mt-1">
              This is a sample education entry to show you the layout. Click the remove button (X) and use the "Add Education" button below to add your own education details.
            </p>
          </div>
        </div>
      )}

      {education.map((edu, index) => (
        <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                {edu.degree}
              </h3>
              <p className="text-lg text-gray-700 mt-1">{edu.institution}</p>
            </div>
            <div className="flex items-center space-x-2">
              {edu.current && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Current
                </span>
              )}
              <button
                onClick={() => handleRemoveEducation(index)}
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Remove education entry"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="flex items-center text-gray-600 space-x-4 mb-4">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {edu.startYear} - {edu.current ? 'Present' : edu.endYear}
            </span>
            {edu.location && (
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {edu.location}
              </span>
            )}
          </div>
          {edu.description && <p className="text-gray-600">{edu.description}</p>}
        </div>
      ))}

      {isAddingEducation ? (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Education</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree
              </label>
              <input
                type="text"
                value={newEducation.degree}
                onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter degree or certification"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institution
              </label>
              <input
                type="text"
                value={newEducation.institution}
                onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter school or institution name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={newEducation.location}
                onChange={(e) => setNewEducation({ ...newEducation, location: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter location"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Year
                </label>
                <input
                  type="text"
                  value={newEducation.startYear}
                  onChange={(e) => setNewEducation({ ...newEducation, startYear: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="YYYY"
                />
              </div>
              {!newEducation.current && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Year
                  </label>
                  <input
                    type="text"
                    value={newEducation.endYear}
                    onChange={(e) => setNewEducation({ ...newEducation, endYear: e.target.value })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="YYYY"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="current"
                checked={newEducation.current}
                onChange={(e) => setNewEducation({ ...newEducation, current: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="current" className="ml-2 text-sm text-gray-700">
                I am currently studying here
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newEducation.description}
                onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                placeholder="Add any relevant details about your studies"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsAddingEducation(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEducation}
                disabled={!newEducation.degree || !newEducation.institution}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4 inline-block mr-1" />
                Save Education
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingEducation(true)}
          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
        >
          <Plus className="h-6 w-6 mx-auto" />
          <span className="block mt-2">Add New Education</span>
        </button>
      )}
    </div>
  );
}
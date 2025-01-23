import React from 'react';
import { Portfolio } from '../../types';
import { User, Mail, MapPin, Briefcase, GraduationCap, Code } from 'lucide-react';

interface Props {
  portfolio: Portfolio;
}

export function Preview({ portfolio }: Props) {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden portfolio-preview">
      {/* Header */}
      <div 
        className="p-8"
        style={{ 
          backgroundColor: portfolio.theme.primaryColor,
          fontFamily: portfolio.theme.fontFamily 
        }}
      >
        <div className="text-white">
          <h1 className="text-3xl font-bold mb-2">{portfolio.personalInfo.name}</h1>
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              {portfolio.personalInfo.email}
            </span>
            {portfolio.personalInfo.location && (
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {portfolio.personalInfo.location}
              </span>
            )}
          </div>
          <p className="mt-4">{portfolio.personalInfo.bio}</p>
        </div>
      </div>

      {/* Skills */}
      <div className="p-8 border-b">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Code className="h-6 w-6 mr-2" />
          Skills
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {portfolio.skills.map((skill, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg">
              <div className="font-medium">{skill.name}</div>
              <div className="flex mt-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full mr-1 ${
                      i < skill.level ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="p-8 border-b">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Briefcase className="h-6 w-6 mr-2" />
          Experience
        </h2>
        <div className="space-y-6">
          {portfolio.experience.map((exp, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold">{exp.title}</h3>
              <p className="text-gray-600">{exp.company}</p>
              <p className="text-sm text-gray-500">
                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </p>
              <p className="mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <GraduationCap className="h-6 w-6 mr-2" />
          Education
        </h2>
        <div className="space-y-6">
          {portfolio.education.map((edu, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold">{edu.degree}</h3>
              <p className="text-gray-600">{edu.institution}</p>
              <p className="text-sm text-gray-500">
                {edu.startYear} - {edu.current ? 'Present' : edu.endYear}
              </p>
              {edu.description && <p className="mt-2">{edu.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
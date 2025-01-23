import React, { useState } from 'react';
import { Portfolio } from '../types';
import { TemplateSelector } from './builder/TemplateSelector';
import { PersonalInfoForm } from './builder/PersonalInfoForm';
import { SkillsForm } from './builder/SkillsForm';
import { ProjectsForm } from './builder/ProjectsForm';
import { ExperienceForm } from './builder/ExperienceForm';
import { EducationForm } from './builder/EducationForm';
import { ThemeCustomizer } from './builder/ThemeCustomizer';
import { Preview } from './builder/Preview';
import { Export } from './builder/Export';
import { ArrowLeft, ArrowRight, Wand2, CheckCircle2 } from 'lucide-react';

interface PortfolioBuilderProps {
  initialUserData: { username: string; email: string } | null;
}

const defaultPortfolio: Portfolio = {
  template: {
    id: 'modern',
    name: 'Modern Professional',
    category: 'developer',
    preview: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
  },
  personalInfo: {
    name: '',
    email: '',
    bio: '',
  },
  skills: [],
  projects: [],
  experience: [],
  education: [],
  theme: {
    primaryColor: '#3b82f6',
    secondaryColor: '#1e40af',
    fontFamily: 'Inter',
  },
};

const steps = [
  { id: 'template', title: 'Choose Template' },
  { id: 'personal', title: 'Personal Info' },
  { id: 'skills', title: 'Skills' },
  { id: 'projects', title: 'Projects' },
  { id: 'experience', title: 'Experience' },
  { id: 'education', title: 'Education' },
  { id: 'customize', title: 'Customize' },
  { id: 'preview', title: 'Preview & Export' },
];

export function PortfolioBuilder({ initialUserData }: PortfolioBuilderProps) {
  const [portfolio, setPortfolio] = useState<Portfolio>({
    ...defaultPortfolio,
    personalInfo: {
      ...defaultPortfolio.personalInfo,
      name: initialUserData?.username || '',
      email: initialUserData?.email || '',
    },
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);

  const updatePortfolio = (section: keyof Portfolio, data: any) => {
    setPortfolio(prev => ({ ...prev, [section]: data }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === steps.length - 1) {
      setShowThankYou(true);
      setTimeout(() => {
        setShowThankYou(false);
      }, 5000);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const getCurrentComponent = () => {
    switch (steps[currentStep].id) {
      case 'template':
        return <TemplateSelector portfolio={portfolio} onChange={(t) => updatePortfolio('template', t)} />;
      case 'personal':
        return <PersonalInfoForm portfolio={portfolio} onChange={(p) => updatePortfolio('personalInfo', p)} />;
      case 'skills':
        return <SkillsForm portfolio={portfolio} onChange={(s) => updatePortfolio('skills', s)} />;
      case 'projects':
        return <ProjectsForm portfolio={portfolio} onChange={(p) => updatePortfolio('projects', p)} />;
      case 'experience':
        return <ExperienceForm portfolio={portfolio} onChange={(e) => updatePortfolio('experience', e)} />;
      case 'education':
        return <EducationForm portfolio={portfolio} onChange={(e) => updatePortfolio('education', e)} />;
      case 'customize':
        return <ThemeCustomizer portfolio={portfolio} onChange={(t) => updatePortfolio('theme', t)} />;
      case 'preview':
        return (
          <div className="space-y-4">
            <Preview portfolio={portfolio} />
            <Export portfolio={portfolio} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showThankYou && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-200 text-green-800 px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <div>
            <h4 className="font-medium">Thank you for using the AI Portfolio Builder!</h4>
            <p className="text-sm text-green-600">Your portfolio has been created successfully.</p>
          </div>
        </div>
      )}

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wand2 className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">
                AI Portfolio Builder
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h2>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
            {getCurrentComponent()}
          </div>

          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </button>
            <button
              onClick={handleNext}
              className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
import React, { useState } from 'react';
import { Portfolio, Project } from '../../types';
import { Plus, X, Link, Image, Save, AlertCircle } from 'lucide-react';

interface Props {
  portfolio: Portfolio;
  onChange: (projects: Project[]) => void;
}

const initialProject: Project = {
  title: '',
  description: '',
  images: [],
  links: [],
  technologies: []
};

export function ProjectsForm({ portfolio, onChange }: Props) {
  const [projects, setProjects] = useState<Project[]>([{
    title: "Weather Dashboard (Example)",
    description: "This is an example project. You can remove it and add your own projects using the 'Add New Project' button below.",
    images: ["https://images.unsplash.com/photo-1504608524841-42fe6f032b4b"],
    links: [
      { title: "GitHub", url: "https://github.com" }
    ],
    technologies: ["JavaScript", "OpenWeather API", "Mapbox"]
  }]);

  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState<Project>(initialProject);
  const [newTechnology, setNewTechnology] = useState('');
  const [newLink, setNewLink] = useState({ title: '', url: '' });

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      const updatedProjects = [...projects, newProject];
      setProjects(updatedProjects);
      onChange(updatedProjects);
      setNewProject(initialProject);
      setIsAddingProject(false);
    }
  };

  const handleRemoveProject = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
    onChange(updatedProjects);
  };

  const addTechnology = () => {
    if (newTechnology.trim()) {
      setNewProject({
        ...newProject,
        technologies: [...newProject.technologies, newTechnology.trim()]
      });
      setNewTechnology('');
    }
  };

  const removeTechnology = (techIndex: number) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies.filter((_, i) => i !== techIndex)
    });
  };

  const addLink = () => {
    if (newLink.title && newLink.url) {
      setNewProject({
        ...newProject,
        links: [...newProject.links, newLink]
      });
      setNewLink({ title: '', url: '' });
    }
  };

  const removeLink = (linkIndex: number) => {
    setNewProject({
      ...newProject,
      links: newProject.links.filter((_, i) => i !== linkIndex)
    });
  };

  return (
    <div className="space-y-6">
      {projects.length === 1 && projects[0].title.includes("Example") && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-800">Example Project</h4>
            <p className="text-sm text-blue-600 mt-1">
              This is a sample project to demonstrate the layout. Feel free to remove it and add your own projects using the form below.
            </p>
          </div>
        </div>
      )}

      {projects.map((project, index) => (
        <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
            <button
              onClick={() => handleRemoveProject(index)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-gray-600 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          {project.images[0] && (
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}
          <div className="flex gap-2">
            {project.links.map((link, linkIndex) => (
              <a
                key={linkIndex}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                <Link className="h-4 w-4 mr-1" />
                {link.title}
              </a>
            ))}
          </div>
        </div>
      ))}

      {isAddingProject ? (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Project</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Title
              </label>
              <input
                type="text"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter project title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                placeholder="Describe your project"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Technologies Used
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Add technology"
                />
                <button
                  onClick={addTechnology}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newProject.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tech}
                    <button
                      onClick={() => removeTechnology(index)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Links
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newLink.title}
                  onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Link title (e.g., GitHub)"
                />
                <input
                  type="url"
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="URL"
                />
                <button
                  onClick={addLink}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newProject.links.map((link, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    <Link className="h-4 w-4 mr-1" />
                    {link.title}
                    <button
                      onClick={() => removeLink(index)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Image URL
              </label>
              <input
                type="url"
                value={newProject.images[0] || ''}
                onChange={(e) => setNewProject({ ...newProject, images: [e.target.value] })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter image URL"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsAddingProject(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProject}
                disabled={!newProject.title || !newProject.description}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4 inline-block mr-1" />
                Save Project
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingProject(true)}
          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
        >
          <Plus className="h-6 w-6 mx-auto" />
          <span className="block mt-2">Add New Project</span>
        </button>
      )}
    </div>
  );
}
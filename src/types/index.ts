export type Template = {
  id: string;
  name: string;
  category: string;
  preview: string;
};

export type PersonalInfo = {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  bio: string;
  avatar?: string;
};

export type Skill = {
  name: string;
  category: string;
  level: number;
};

export type Project = {
  title: string;
  description: string;
  images: string[];
  links: { title: string; url: string }[];
  technologies: string[];
};

export type Experience = {
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
};

export type Education = {
  degree: string;
  institution: string;
  location?: string;
  startYear: string;
  endYear?: string;
  current: boolean;
  description?: string;
};

export type Portfolio = {
  template: Template;
  personalInfo: PersonalInfo;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
};
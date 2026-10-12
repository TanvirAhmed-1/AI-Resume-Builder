import { ResumeData } from "@/lib/validations/resume";

export const DEFAULT_RESUME_DATA: ResumeData = {
  id: "demo-resume-default",
  title: "Alex Morgan - Lead Software Architect",
  templateId: "soft-clean",
  themeColor: "#2563eb",
  fontFamily: "Inter",
  fontSize: "base",
  pageMargin: "normal",
  columnLayout: "right-sidebar",
  sectionOrder: [
    "summary",
    "experience",
    "education",
    "projects",
    "skills",
    "certifications",
    "languages",
  ],
  sectionColumns: {
    summary: "full",
    experience: "left",
    education: "left",
    projects: "left",
    skills: "right",
    certifications: "right",
    languages: "right",
  },
  sectionStyles: {
    skills: "tags",
    experience: "modern",
  },
  personalInfo: {
    fullName: "Tanvir Ahmed",
    headline: "Lead Full Stack Software Engineer",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    email: "tanvirahmed1078@gmail.com",
    phone: "+880 1786-924911",
    location: "Mirpur 1, Dhaka, Bangladesh",
    website: "https://tanvirahmed.dev",
    linkedin: "https://linkedin.com/in/tanvirahmed",
    github: "https://github.com/tanvirahmed",
    summary:
      "Full Stack Software Engineer with 6+ years of experience designing scalable SaaS architectures, real-time web applications, and cloud-native systems. Proficient in React, Next.js, TypeScript, Node.js, and PostgreSQL with a passion for clean code, high performance, and intuitive user experiences.",
  },
  experiences: [
    {
      id: "exp-1",
      company: "CloudScale Technologies",
      position: "Lead Full Stack Engineer",
      location: "San Francisco, CA (Remote)",
      startDate: "2022-03",
      endDate: "Present",
      isCurrent: true,
      description:
        "• Architected and migrated legacy monolith to modular Next.js 15 and event-driven microservices, improving P99 API response times by 42%.\n• Mentored a high-performing engineering squad of 8 engineers and introduced end-to-end integration testing with Vitest and Playwright.\n• Designed multi-tenant PostgreSQL partitioning and Prisma ORM schemas reducing DB query latency by 35%.",
      order: 0,
    },
    {
      id: "exp-2",
      company: "Nexus Digital Labs",
      position: "Senior Software Engineer",
      location: "Austin, TX",
      startDate: "2019-06",
      endDate: "2022-02",
      isCurrent: false,
      description:
        "• Built responsive client-facing web applications with React, TypeScript, and Tailwind CSS serving 500k+ monthly active users.\n• Developed resilient payment webhooks and automated billing pipelines with Stripe SDK.\n• Implemented secure JWT session authentication, OAuth 2.0 social logins, and role-based access control.",
      order: 1,
    },
    {
      id: "exp-3",
      company: "Apex Tech Innovations",
      position: "Software Engineer",
      location: "Dhaka, Bangladesh",
      startDate: "2017-08",
      endDate: "2019-05",
      isCurrent: false,
      description:
        "• Developed reusable component libraries and state management patterns using React and Redux.\n• Collaborated with UX/UI designers to transform Figma prototypes into pixel-perfect accessible interfaces.",
      order: 2,
    },
  ],
  educations: [
    {
      id: "edu-1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science in Computer Science",
      fieldOfStudy: "Computer Science & Engineering",
      startDate: "2015-09",
      endDate: "2019-05",
      score: "3.85 GPA",
      location: "Berkeley, CA",
      order: 0,
    },
    {
      id: "edu-2",
      institution: "Dhaka Residential Model College",
      degree: "Higher Secondary Certificate (HSC)",
      fieldOfStudy: "Science",
      startDate: "2013-06",
      endDate: "2015-05",
      score: "GPA 5.00 / 5.00",
      location: "Dhaka, Bangladesh",
      order: 1,
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "AI-Powered FlowCV SaaS Engine",
      subtitle: "Full-Stack SaaS Platform",
      url: "https://flowcv-demo.dev",
      githubUrl: "https://github.com/tanvirahmed/flowcv-builder",
      startDate: "2024-01",
      endDate: "2024-05",
      description:
        "Engineered a high-performance CV builder with real-time A4 rendering, structured AI extraction, and dynamic multi-page PDF generation.",
      technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
      order: 0,
    },
    {
      id: "proj-2",
      title: "CloudScale Microservices Gateway",
      subtitle: "API Gateway & Monitoring",
      url: "https://gateway.cloudscale.io",
      githubUrl: "https://github.com/tanvirahmed/cloud-gateway",
      startDate: "2023-04",
      endDate: "2023-11",
      description:
        "High-throughput reverse proxy handling 20M+ daily requests with rate limiting, Redis caching, and Prometheus metrics monitoring.",
      technologies: ["Node.js", "Redis", "Docker", "AWS ECS"],
      order: 1,
    },
  ],
  skills: [
    {
      id: "skill-1",
      category: "Frontend & UI",
      skills: ["React 19", "Next.js 15", "TypeScript", "Tailwind CSS", "shadcn/ui", "HTML5 / CSS3"],
      order: 0,
    },
    {
      id: "skill-2",
      category: "Backend & Cloud",
      skills: ["Node.js", "Express", "PostgreSQL", "Prisma ORM", "Redis", "Docker", "AWS S3 / ECS"],
      order: 1,
    },
    {
      id: "skill-3",
      category: "Tools & Testing",
      skills: ["Git", "GitHub Actions", "Vitest", "Playwright", "REST & GraphQL", "CI/CD"],
      order: 2,
    },
  ],
  certs: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      issueDate: "2023-08",
      expiryDate: "2026-08",
      url: "https://aws.amazon.com/verification",
      order: 0,
    },
    {
      id: "cert-2",
      name: "Meta Certified Full-Stack Developer Professional",
      issuer: "Meta / Coursera",
      issueDate: "2022-11",
      expiryDate: "Lifetime",
      url: "https://coursera.org/verify/meta-full-stack",
      order: 1,
    },
  ],
  languages: [
    {
      id: "lang-1",
      name: "English",
      proficiency: "Native / Bilingual",
      order: 0,
    },
    {
      id: "lang-2",
      name: "Bengali",
      proficiency: "Native",
      order: 1,
    },
    {
      id: "lang-3",
      name: "German",
      proficiency: "Conversational (B1)",
      order: 2,
    },
  ],
  customs: [],
};

/**
 * Merges partial resume data with default resume data so that no template
 * is ever left with missing or empty arrays.
 */
export function mergeWithDefaultData(data?: Partial<ResumeData> | null): ResumeData {
  if (!data) return DEFAULT_RESUME_DATA;

  return {
    ...DEFAULT_RESUME_DATA,
    ...data,
    personalInfo: {
      ...DEFAULT_RESUME_DATA.personalInfo,
      ...(data.personalInfo || {}),
      fullName: data.personalInfo?.fullName || DEFAULT_RESUME_DATA.personalInfo.fullName,
      headline: data.personalInfo?.headline ?? DEFAULT_RESUME_DATA.personalInfo.headline,
      summary: data.personalInfo?.summary ?? DEFAULT_RESUME_DATA.personalInfo.summary,
    },
    experiences:
      data.experiences && data.experiences.length > 0
        ? data.experiences
        : DEFAULT_RESUME_DATA.experiences,
    educations:
      data.educations && data.educations.length > 0
        ? data.educations
        : DEFAULT_RESUME_DATA.educations,
    projects:
      data.projects && data.projects.length > 0
        ? data.projects
        : DEFAULT_RESUME_DATA.projects,
    skills:
      data.skills && data.skills.length > 0
        ? data.skills
        : DEFAULT_RESUME_DATA.skills,
    certs:
      data.certs && data.certs.length > 0
        ? data.certs
        : DEFAULT_RESUME_DATA.certs,
    languages:
      data.languages && data.languages.length > 0
        ? data.languages
        : DEFAULT_RESUME_DATA.languages,
    themeColor: data.themeColor || DEFAULT_RESUME_DATA.themeColor,
    fontFamily: data.fontFamily || DEFAULT_RESUME_DATA.fontFamily,
    fontSize: data.fontSize || DEFAULT_RESUME_DATA.fontSize,
    pageMargin: data.pageMargin || DEFAULT_RESUME_DATA.pageMargin,
    templateId: data.templateId || DEFAULT_RESUME_DATA.templateId,
    columnLayout: data.columnLayout || DEFAULT_RESUME_DATA.columnLayout,
    sectionOrder:
      data.sectionOrder && data.sectionOrder.length > 0
        ? data.sectionOrder
        : DEFAULT_RESUME_DATA.sectionOrder,
    sectionColumns:
      data.sectionColumns && Object.keys(data.sectionColumns).length > 0
        ? data.sectionColumns
        : DEFAULT_RESUME_DATA.sectionColumns,
    sectionStyles:
      data.sectionStyles && Object.keys(data.sectionStyles).length > 0
        ? data.sectionStyles
        : DEFAULT_RESUME_DATA.sectionStyles,
  };
}

export const TEMPLATE_PREVIEW_PERSONAS: Record<string, Partial<ResumeData>> = {
  "editorial-rule": {
    templateId: "editorial-rule",
    themeColor: "#18181b",
    personalInfo: {
      fullName: "Lena Hoffmann",
      headline: "Operations Manager",
      avatarUrl: "",
      email: "lena.hoffmann@email.com",
      phone: "+49 151 4827 6391",
      location: "Berlin, Germany",
      website: "https://lenahoffmann.de",
      linkedin: "https://linkedin.com/in/lena-hoffmann",
      github: "",
      summary:
        "Operations professional with 7+ years of experience supporting logistics, process improvement, and cross-functional coordination in fast-paced business environments. Strong track record of improving workflows, managing vendors, and delivering reliable service levels across daily operations. Combines analytical thinking with hands-on leadership to help growing organizations scale efficiently.",
    },
    experiences: [
      {
        id: "er-1",
        company: "Sava Retail Group",
        position: "Operations Manager",
        location: "Berlin, Germany",
        startDate: "2022",
        endDate: "Present",
        isCurrent: true,
        description:
          "• Lead daily operations across warehousing, procurement, and support teams.\n• Improved order accuracy by redesigning internal handoff procedures.\n• Managed vendor contracts and reduced annual service costs by 14%.\n• Built KPI dashboards for capacity, service, and productivity tracking.",
        order: 0,
      },
      {
        id: "er-2",
        company: "Urban Freight Solutions",
        position: "Operations Coordinator",
        location: "Hamburg, Germany",
        startDate: "2019",
        endDate: "2022",
        isCurrent: false,
        description:
          "• Coordinated transport schedules and resolved delivery escalations promptly.\n• Standardized reporting processes for weekly management reviews.\n• Supported onboarding and training for new operational team members.",
        order: 1,
      },
      {
        id: "er-3",
        company: "GreenLine Services",
        position: "Operations Analyst",
        location: "Berlin, Germany",
        startDate: "2017",
        endDate: "2019",
        isCurrent: false,
        description:
          "• Analyzed process data to identify workflow bottlenecks and material waste.\n• Generated monthly fulfillment performance and vendor compliance summaries.",
        order: 2,
      },
    ],
    educations: [
      {
        id: "er-edu-1",
        institution: "Humboldt University of Berlin",
        degree: "M.Sc. Management",
        fieldOfStudy: "Operations & Supply Chain",
        startDate: "2015",
        endDate: "2017",
        score: "Berlin, Germany",
        location: "Berlin, Germany",
        order: 0,
      },
      {
        id: "er-edu-2",
        institution: "University of Cologne",
        degree: "B.A. Business Administration",
        fieldOfStudy: "Business Administration",
        startDate: "2011",
        endDate: "2015",
        score: "Cologne, Germany",
        location: "Cologne, Germany",
        order: 1,
      },
    ],
    skills: [
      {
        id: "er-sk-1",
        category: "Core Competencies",
        skills: [
          "Process Improvement",
          "Supply Chain Coordination",
          "Vendor Management",
          "KPI Reporting",
          "Budget Tracking",
          "ERP Systems",
          "Inventory Planning",
          "SAP",
          "Continuous Improvement",
        ],
        order: 0,
      },
    ],
    languages: [
      { id: "er-l-1", name: "German", proficiency: "Native", order: 0 },
      { id: "er-l-2", name: "English", proficiency: "Fluent", order: 1 },
      { id: "er-l-3", name: "French", proficiency: "Conversational", order: 2 },
    ],
    certs: [
      {
        id: "er-c-1",
        name: "Lean Six Sigma Green Belt",
        issuer: "APICS Certified in Logistics & Transportation",
        issueDate: "2021",
        expiryDate: "",
        url: "",
        order: 0,
      },
    ],
  },
  "saffron-line": {
    templateId: "saffron-line",
    themeColor: "#d97706",
    personalInfo: {
      fullName: "Matteo Ricci",
      headline: "Head of Operations",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      email: "matteo.ricci@oper-group.it",
      phone: "+39 02 4819 2921",
      location: "Milan, Italy",
      website: "https://matteoricci.it",
      linkedin: "https://linkedin.com/in/matteo-ricci",
      github: "",
      summary:
        "Operations leader with 10+ years of experience building efficient, scalable processes across logistics, customer operations, and service delivery. Strong background in process optimization, team leadership, vendor management, and KPI-driven performance improvement.",
    },
    experiences: [
      {
        id: "sf-1",
        company: "Brewi Operations",
        position: "Head of Operations",
        location: "Milan, Italy",
        startDate: "2021",
        endDate: "Present",
        isCurrent: true,
        description:
          "• Directed multi-site operations strategy across Italy, improving service consistency and reducing process bottlenecks across regional teams.\n• Oversee workflow planning, vendor performance, and budget allocation for daily operations supporting more than 120 employees.\n• Drove continuous improvement initiatives that increased operational efficiency by 18% and strengthened customer service delivery metrics.",
        order: 0,
      },
      {
        id: "sf-2",
        company: "Spillo Italia",
        position: "Operations Manager",
        location: "Bologna, Italy",
        startDate: "2017",
        endDate: "2021",
        isCurrent: false,
        description:
          "• Led end-to-end warehouse and last-mile operations, improving fulfillment accuracy and reducing arranged delivery delays.\n• Implemented performance dashboards and SOP updates that increased team productivity.",
        order: 1,
      },
    ],
    educations: [
      {
        id: "sf-edu-1",
        institution: "SDA Bocconi School of Management",
        degree: "Executive Certificate in Supply Chain",
        fieldOfStudy: "Operations & Management",
        startDate: "2016",
        endDate: "2016",
        score: "Milan, Italy",
        location: "Milan, Italy",
        order: 0,
      },
      {
        id: "sf-edu-2",
        institution: "University of Milan",
        degree: "B.Sc. Industrial Economics",
        fieldOfStudy: "Economics",
        startDate: "2009",
        endDate: "2013",
        score: "Milan, Italy",
        location: "Milan, Italy",
        order: 1,
      },
    ],
    skills: [
      {
        id: "sf-sk-1",
        category: "Operations Leadership",
        skills: ["Operations Strategy", "Process Optimization", "Budget Planning", "Vendor Management", "Change Management", "Team Leadership"],
        order: 0,
      },
    ],
    languages: [
      { id: "sf-l-1", name: "Italian", proficiency: "Native", order: 0 },
      { id: "sf-l-2", name: "English", proficiency: "Fluent", order: 1 },
      { id: "sf-l-3", name: "French", proficiency: "Intermediate", order: 2 },
    ],
  },
  "steady-form": {
    templateId: "steady-form",
    themeColor: "#059669",
    personalInfo: {
      fullName: "Rohan K. Patel",
      headline: "Project Engineer",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      email: "rohan.patel@engmail.com",
      phone: "+91 98765 43210",
      location: "Ahmedabad, India",
      website: "https://rohankpatel.dev",
      linkedin: "https://linkedin.com/in/rohankpatel",
      github: "",
      summary:
        "Project Engineer with 6+ years of experience supporting industrial and architectural projects in fast-paced engineering environments. Strong background in project coordination, vendor management, technical documentation, and site execution, with a consistent focus on quality, safety, and on-time delivery.",
    },
    experiences: [
      {
        id: "st-1",
        company: "Adani Infrastructure",
        position: "Project Engineer",
        location: "Ahmedabad, India",
        startDate: "04/2022",
        endDate: "Present",
        isCurrent: true,
        description:
          "• Lead project coordination across teams for utility infrastructure upgrades.\n• Improved project tracking accuracy by standardizing reporting formats.\n• Coordinated vendor communication, material schedules, and technical documentation.",
        order: 0,
      },
      {
        id: "st-2",
        company: "Larsen & Toubro",
        position: "Mechanical Engineer",
        location: "Vadodara, India",
        startDate: "07/2019",
        endDate: "03/2022",
        isCurrent: false,
        description:
          "• Monitored equipment installation support for manufacturing projects.\n• Ensured compliance with safety standards and vendor milestones.",
        order: 1,
      },
    ],
    educations: [
      {
        id: "st-edu-1",
        institution: "Gujarat Technological University",
        degree: "Bachelor of Engineering in Mechanical Engineering",
        fieldOfStudy: "Mechanical Engineering",
        startDate: "2013",
        endDate: "2017",
        score: "Ahmedabad, India",
        location: "Ahmedabad, India",
        order: 0,
      },
    ],
    skills: [
      {
        id: "st-sk-1",
        category: "Engineering Skills",
        skills: ["Project Coordination", "Mechanical Systems", "Technical Documentation", "Vendor Management", "Quality Assurance", "Site Execution"],
        order: 0,
      },
    ],
    languages: [
      { id: "st-l-1", name: "English", proficiency: "Fluent", order: 0 },
      { id: "st-l-2", name: "Hindi", proficiency: "Native", order: 1 },
      { id: "st-l-3", name: "Gujarati", proficiency: "Native", order: 2 },
    ],
  },
  "precision-line": {
    templateId: "precision-line",
    themeColor: "#047857",
    personalInfo: {
      fullName: "Olivia Bennett",
      headline: "Head of Customer Service",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      email: "olivia.bennett@email.com",
      phone: "+61 407 982 991",
      location: "Sydney, Australia",
      website: "https://oliviabennett.com",
      linkedin: "https://linkedin.com/in/olivia-bennett",
      github: "",
      summary:
        "Customer service leader with 8+ years of experience building high-performing support functions across retail, telecomm, financial services, and digital environments. Brings strong experience in service operations, team leadership, customer journey improvement, and operational readiness. Known for driving measurable gains in customer satisfaction, first-contact resolution, and workflow efficiency.",
    },
    experiences: [
      {
        id: "pr-1",
        company: "BrightView Media",
        position: "Head of Customer Service",
        location: "Sydney, Australia",
        startDate: "2020",
        endDate: "Present",
        isCurrent: true,
        description:
          "• Lead team of 4 managers and 26 service professionals, improving CSAT from 82% to 93% within two years.\n• Drove contact transformation initiatives including self-service onboarding and knowledge base optimization.\n• Partnered with Product and Operations leaders to improve resolution times and complaint reduction.",
        order: 0,
      },
      {
        id: "pr-2",
        company: "Southern Care Retail Group",
        position: "Customer Service Manager",
        location: "Melbourne, Australia",
        startDate: "2016",
        endDate: "2020",
        isCurrent: false,
        description:
          "• Oversaw customer contact center and in-store service support functions across omnichannel stores.\n• Led performance management and training programs that increased first-contact resolution by 19%.",
        order: 1,
      },
    ],
    educations: [
      {
        id: "pr-edu-1",
        institution: "Macquarie University",
        degree: "Master of Business Administration",
        fieldOfStudy: "Business Administration",
        startDate: "2014",
        endDate: "2016",
        score: "Sydney, Australia",
        location: "Sydney, Australia",
        order: 0,
      },
    ],
    skills: [
      {
        id: "pr-sk-1",
        category: "Service Leadership",
        skills: ["Customer Service Operations", "Contact Center Leadership", "Customer Journey Mapping", "Quality Assurance", "Performance Coaching", "Process Optimization"],
        order: 0,
      },
    ],
    languages: [
      { id: "pr-l-1", name: "English", proficiency: "Native", order: 0 },
      { id: "pr-l-2", name: "French", proficiency: "Conversational", order: 1 },
      { id: "pr-l-3", name: "Spanish", proficiency: "Basic", order: 2 },
    ],
  },
};

export function getTemplatePreviewData(templateId: string): ResumeData {
  const persona = TEMPLATE_PREVIEW_PERSONAS[templateId];
  if (persona) {
    return mergeWithDefaultData({
      ...DEFAULT_RESUME_DATA,
      ...persona,
      templateId,
    });
  }

  return mergeWithDefaultData({
    ...DEFAULT_RESUME_DATA,
    templateId,
  });
}


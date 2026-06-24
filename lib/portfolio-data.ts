export type ProjectVisibility = "Public live" | "Internal system" | "Academic build" | "Case study draft";

export type Project = {
  slug: string;
  title: string;
  archiveTitle: string;
  category: string;
  summary: string;
  role: string;
  timeline: string;
  visibility: ProjectVisibility;
  status: string;
  liveUrl?: string;
  githubUrl?: string;
  previewMode: "live" | "placeholder";
  placeholder: string;
  accent: "cyan" | "amber" | "green" | "violet";
  tech: string[];
  disciplines: string[];
  objective: string;
  context: string;
  contribution: string[];
  architecture: string[];
  nextContent: string[];
};

export const projects: Project[] = [
  {
    slug: "perfish",
    title: "Perfish Integrated Fisheries System",
    archiveTitle: "Perfish",
    category: "Fisheries operations",
    summary:
      "A fisheries operation system concept covering procurement, cold-storage flow, release of goods, and operational reporting.",
    role: "System Analyst & Full-Stack Engineer",
    timeline: "2026",
    visibility: "Public live",
    status: "Live preview available",
    liveUrl: "https://perfish-frontend.vercel.app/",
    previewMode: "live",
    placeholder: "/placeholders/project-perfish.svg",
    accent: "cyan",
    tech: ["Next.js", "Spring Boot", "PostgreSQL", "REST API", "ERD", "System Analysis"],
    disciplines: ["Requirement mapping", "Business process", "Database design", "Frontend implementation"],
    objective:
      "Turn messy operational flows into a coherent system blueprint that can be discussed by business users and implemented by engineers.",
    context:
      "The project sits around fishery operations where procurement, stock movement, cold storage, and goods release need clearer visibility.",
    contribution: [
      "Mapped as-is and to-be business processes for operational modules.",
      "Designed ERD/module boundaries and translated workflows into technical references.",
      "Contributed to implementation across interface and service layers.",
      "Prepared the project to become a deeper case study once screenshots and implementation details are finalized.",
    ],
    architecture: ["Business process map", "Module definition", "REST service boundary", "Operational dashboard", "Database model"],
    nextContent: [
      "Add approved product screenshots from procurement, storage, and release modules.",
      "Add GitHub/repository link if the code can be shared publicly.",
      "Add measurable outcomes after stakeholder approval.",
    ],
  },
  {
    slug: "rajawali-lelang",
    title: "Rajawali Lelang Indonesia",
    archiveTitle: "Rajawali Lelang",
    category: "Property auction platform",
    summary:
      "A public property-auction platform overview with listing discovery, auction information, KPR/support entry points, and user guidance.",
    role: "Project contribution placeholder",
    timeline: "2026",
    visibility: "Public live",
    status: "Live preview available",
    liveUrl: "https://www.rajawalilelangindo.com/",
    previewMode: "live",
    placeholder: "/placeholders/project-rajawali.svg",
    accent: "amber",
    tech: ["Next.js", "TypeScript", "Tailwind", "Responsive UI", "Product Flow"],
    disciplines: ["Product discovery", "Listing UX", "Public web", "Conversion flow"],
    objective:
      "Show a marketplace-style public web experience where users can discover property auctions and understand the next action quickly.",
    context:
      "The public website positions Rajawali Lelang Indonesia around easy, safe, and profitable property auction discovery.",
    contribution: [
      "Placeholder: add exact role and ownership once confirmed.",
      "Placeholder: add the modules or screens Sayyid contributed to.",
      "Placeholder: add implementation decisions and collaboration notes.",
    ],
    architecture: ["Public landing", "Auction listing discovery", "Property detail entry", "Contact/notification CTA", "Support content"],
    nextContent: [
      "Replace this placeholder with exact contribution scope.",
      "Add approved screenshots from homepage, listing, and detail pages.",
      "Add GitHub/design links if publishable.",
    ],
  },
  {
    slug: "custom-erp-system",
    title: "Custom ERP System",
    archiveTitle: "Custom ERP System",
    category: "Enterprise workflow",
    summary: "Procurement and warehouse business logic translated into configurable ERP behavior.",
    role: "Solution Engineer Intern",
    timeline: "2026",
    visibility: "Internal system",
    status: "Private case study placeholder",
    previewMode: "placeholder",
    placeholder: "/placeholders/project-generic.svg",
    accent: "green",
    tech: ["ERP", "Business Process", "Procurement", "Warehouse", "SQL"],
    disciplines: ["Requirement translation", "Business logic", "Stakeholder communication", "Configuration thinking"],
    objective:
      "Connect business process requirements with implementable ERP logic for procurement and warehouse operations.",
    context:
      "Enterprise workflows need precise interpretation because small differences in process rules can change the whole system behavior.",
    contribution: [
      "Translated procurement and warehouse requirements into system behavior.",
      "Clarified business logic and edge cases through structured communication.",
      "Documented assumptions so implementation could stay aligned with operations.",
    ],
    architecture: ["Requirement intake", "Process rule mapping", "ERP configuration logic", "Validation scenario", "Operational handoff"],
    nextContent: ["Add anonymized workflow diagram.", "Add approved screenshots if available.", "Add stronger before/after business impact."],
  },
  {
    slug: "ciptadra-tms",
    title: "Ciptadra TMS",
    archiveTitle: "Ciptadra TMS",
    category: "Operations visibility",
    summary: "A timesheet/man-hour visibility system for expected versus actual work tracking.",
    role: "Full-Stack Developer Intern",
    timeline: "2025",
    visibility: "Internal system",
    status: "Private case study placeholder",
    previewMode: "placeholder",
    placeholder: "/placeholders/project-generic.svg",
    accent: "cyan",
    tech: ["Next.js", "Node.js", "PostgreSQL", "REST API", "Dashboard"],
    disciplines: ["Frontend implementation", "API integration", "Operational reporting", "Data display"],
    objective:
      "Make work visibility clearer by comparing planned and actual man-hours in an operational interface.",
    context:
      "Operational teams need a readable way to see progress, variance, and work allocation without digging through scattered data.",
    contribution: [
      "Built Next.js interface pieces for operational workflows.",
      "Integrated backend APIs and display states for tracking data.",
      "Helped turn reporting needs into usable UI structures.",
    ],
    architecture: ["Timesheet input", "Expected/actual comparison", "API layer", "Dashboard view", "Report-ready data"],
    nextContent: ["Add anonymized screen flow.", "Add exact stack details.", "Add role split between frontend/backend."],
  },
  {
    slug: "sinsera",
    title: "Sinsera",
    archiveTitle: "Sinsera",
    category: "Education system",
    summary: "A modular school information system for operational and academic workflows.",
    role: "Full-Stack Developer Intern",
    timeline: "2025",
    visibility: "Internal system",
    status: "Private case study placeholder",
    previewMode: "placeholder",
    placeholder: "/placeholders/project-generic.svg",
    accent: "violet",
    tech: ["Next.js", "Node.js", "PostgreSQL", "UI Modules", "REST API"],
    disciplines: ["Module UI", "API wiring", "School operations", "Reusable screens"],
    objective: "Support school operations through modular screens that map cleanly to real administrative workflows.",
    context:
      "School information systems become valuable when the interface mirrors the way staff actually manage records and daily operations.",
    contribution: [
      "Developed modular interface pieces for school operational workflows.",
      "Connected UI behavior with backend data needs.",
      "Helped maintain consistency across repeated module patterns.",
    ],
    architecture: ["Module navigation", "Record management", "Role-based workflow", "API integration", "Reusable UI"],
    nextContent: ["Add module list.", "Add safe screenshot placeholders.", "Add exact contribution scope per module."],
  },
  {
    slug: "sizopi",
    title: "SIZOPI",
    archiveTitle: "SIZOPI",
    category: "Database system",
    summary: "A database-driven zoo information system focused on relational modeling and operational records.",
    role: "Academic team project",
    timeline: "2025",
    visibility: "Academic build",
    status: "Case study draft",
    previewMode: "placeholder",
    placeholder: "/placeholders/project-generic.svg",
    accent: "green",
    tech: ["PostgreSQL", "ERD", "SQL", "Database Design", "Django"],
    disciplines: ["Data modeling", "Relational design", "Query logic", "Team implementation"],
    objective: "Practice designing a domain-heavy database system where schema quality drives the whole application.",
    context:
      "Zoo operations include entities such as animals, staff, habitat, care, and records that need a careful relational structure.",
    contribution: [
      "Contributed to database modeling and implementation logic.",
      "Worked with relational structure and application behavior.",
      "Prepared the project as evidence of database design thinking.",
    ],
    architecture: ["ERD", "Relational schema", "CRUD flow", "Operational records", "Application layer"],
    nextContent: ["Add ERD image.", "Add GitHub link if public.", "Add screenshots of core flows."],
  },
  {
    slug: "insurance-web-app",
    title: "Insurance Web App",
    archiveTitle: "Insurance Web App",
    category: "Fintech workflow",
    summary: "Policy and claim management workflow prototype for insurance operations.",
    role: "Academic/project build",
    timeline: "2024",
    visibility: "Case study draft",
    status: "Placeholder ready",
    previewMode: "placeholder",
    placeholder: "/placeholders/project-generic.svg",
    accent: "cyan",
    tech: ["Java", "Spring Boot", "SQL", "Workflow", "Web App"],
    disciplines: ["Workflow modeling", "Backend logic", "Policy data", "Claim flow"],
    objective: "Represent policy and claim workflows as a system that can guide operations and reduce process ambiguity.",
    context:
      "Insurance workflows are useful portfolio material because they combine data records, approval states, and clear user roles.",
    contribution: [
      "Worked on policy/claim workflow logic.",
      "Structured application behavior around operational states.",
      "Prepared the project for a more complete case study later.",
    ],
    architecture: ["Policy records", "Claim state", "Approval flow", "Backend logic", "User interface"],
    nextContent: ["Add screenshots.", "Add architecture diagram.", "Add repo or demo link if available."],
  },
  {
    slug: "barcelona-match-insight",
    title: "Barcelona Match Insight",
    archiveTitle: "Barcelona Match Insight",
    category: "Machine learning",
    summary: "Outcome and possession prediction exploration around football match data.",
    role: "Data/ML project",
    timeline: "2024",
    visibility: "Case study draft",
    status: "Placeholder ready",
    previewMode: "placeholder",
    placeholder: "/placeholders/project-generic.svg",
    accent: "amber",
    tech: ["Python", "Machine Learning", "Pandas", "Modeling", "Visualization"],
    disciplines: ["Data cleaning", "Feature thinking", "Model evaluation", "Insight communication"],
    objective: "Use football match data as a compact way to show analytical thinking and model interpretation.",
    context:
      "The project explores how match statistics can be shaped into prediction tasks and communicated as useful insight.",
    contribution: [
      "Prepared and analyzed match-related data.",
      "Explored prediction framing for outcome and possession.",
      "Positioned the result as an analytics case study placeholder.",
    ],
    architecture: ["Dataset preparation", "Feature engineering", "Model training", "Evaluation", "Insight presentation"],
    nextContent: ["Add notebook or GitHub link.", "Add charts.", "Add exact model and evaluation metrics."],
  },
];

export const featuredProjects = projects.filter((project) => ["perfish", "rajawali-lelang"].includes(project.slug));

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

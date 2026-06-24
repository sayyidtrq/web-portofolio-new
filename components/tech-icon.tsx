import { Braces, Code2, Database, FileCode2, GitBranch, LayoutDashboard, Network, PenTool, ServerCog, Workflow } from "lucide-react";

const techMap: Record<string, { label: string; glyph: string; tone: string }> = {
  "Next.js": { label: "Next.js", glyph: "N", tone: "neutral" },
  TypeScript: { label: "TypeScript", glyph: "TS", tone: "blue" },
  JavaScript: { label: "JavaScript", glyph: "JS", tone: "amber" },
  "Spring Boot": { label: "Spring Boot", glyph: "SB", tone: "green" },
  PostgreSQL: { label: "PostgreSQL", glyph: "PG", tone: "cyan" },
  "REST API": { label: "REST API", glyph: "API", tone: "violet" },
  ERD: { label: "ERD", glyph: "ERD", tone: "cyan" },
  "System Analysis": { label: "System Analysis", glyph: "SA", tone: "amber" },
  "Responsive UI": { label: "Responsive UI", glyph: "UI", tone: "cyan" },
  "Product Flow": { label: "Product Flow", glyph: "PF", tone: "amber" },
  Tailwind: { label: "Tailwind", glyph: "TW", tone: "cyan" },
  ERP: { label: "ERP", glyph: "ERP", tone: "green" },
  Procurement: { label: "Procurement", glyph: "PR", tone: "amber" },
  Warehouse: { label: "Warehouse", glyph: "WH", tone: "green" },
  SQL: { label: "SQL", glyph: "SQL", tone: "cyan" },
  "Node.js": { label: "Node.js", glyph: "ND", tone: "green" },
  Dashboard: { label: "Dashboard", glyph: "DB", tone: "violet" },
  "UI Modules": { label: "UI Modules", glyph: "MOD", tone: "cyan" },
  "Database Design": { label: "Database Design", glyph: "DD", tone: "cyan" },
  Django: { label: "Django", glyph: "DJ", tone: "green" },
  Java: { label: "Java", glyph: "JV", tone: "amber" },
  Workflow: { label: "Workflow", glyph: "WF", tone: "violet" },
  "Web App": { label: "Web App", glyph: "WEB", tone: "cyan" },
  Python: { label: "Python", glyph: "PY", tone: "blue" },
  "Machine Learning": { label: "Machine Learning", glyph: "ML", tone: "violet" },
  Pandas: { label: "Pandas", glyph: "PD", tone: "neutral" },
  Modeling: { label: "Modeling", glyph: "MD", tone: "amber" },
  Visualization: { label: "Visualization", glyph: "VIZ", tone: "green" },
};

const iconByTone = {
  neutral: Code2,
  blue: FileCode2,
  amber: Workflow,
  green: ServerCog,
  cyan: Database,
  violet: Network,
} as const;

export function TechIcon({ tech, compact = false }: { tech: string; compact?: boolean }) {
  const token = techMap[tech] ?? { label: tech, glyph: tech.slice(0, 3).toUpperCase(), tone: "neutral" };
  const Icon = iconByTone[token.tone as keyof typeof iconByTone] ?? Code2;

  return (
    <span className={`tech-pill ${token.tone} ${compact ? "compact" : ""}`} aria-label={token.label}>
      <i aria-hidden="true">{compact ? <Icon size={13} /> : token.glyph}</i>
      <b>{token.label}</b>
    </span>
  );
}

export function DisciplineIcon({ label }: { label: string }) {
  const lower = label.toLowerCase();
  const Icon = lower.includes("database") || lower.includes("data")
    ? Database
    : lower.includes("flow") || lower.includes("process")
      ? GitBranch
      : lower.includes("design") || lower.includes("ui")
        ? PenTool
        : lower.includes("dashboard") || lower.includes("interface")
          ? LayoutDashboard
          : lower.includes("api") || lower.includes("service")
            ? Braces
            : Code2;

  return (
    <span className="discipline-chip">
      <Icon size={14} />
      {label}
    </span>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ExternalLink, FileCode2, ImagePlus, Layers3, Radar, Route, ScanSearch } from "lucide-react";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { DisciplineIcon, TechIcon } from "@/components/tech-icon";
import { getProject, projects } from "@/lib/portfolio-data";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Project not found | STGM Portfolio",
    };
  }

  return {
    title: `${project.archiveTitle} | Sayyid Thariq Portfolio`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="site-shell project-detail-shell">
      <SiteHeader />
      <main className="project-detail wrap">
        <Link className="back-link" href="/#systems">
          <ArrowLeft size={16} />
          Back to selected systems
        </Link>

        <section className={`detail-hero ${project.accent}`} data-reveal>
          <div className="detail-copy">
            <p className="eyebrow">{project.category}</p>
            <h1>{project.title}</h1>
            <p className="lead">{project.summary}</p>
            <div className="detail-actions">
              {project.liveUrl ? (
                <a className="btn primary" href={project.liveUrl} target="_blank" rel="noreferrer">
                  Open live project
                  <ExternalLink size={17} />
                </a>
              ) : null}
              {project.githubUrl ? (
                <a className="btn secondary" href={project.githubUrl} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              ) : (
                <span className="btn secondary ghost">
                  GitHub slot ready
                </span>
              )}
            </div>
          </div>
          <div className="detail-meta-grid">
            {[
              ["Role", project.role],
              ["Timeline", project.timeline],
              ["Visibility", project.visibility],
              ["Status", project.status],
            ].map(([label, value]) => (
              <div className="detail-meta-card" key={label}>
                <span>{label}</span>
                <b>{value}</b>
              </div>
            ))}
          </div>
        </section>

        <section className="detail-preview section-mini" data-reveal>
          <div className="browser-frame">
            <div className="browser-chrome">
              <i />
              <i />
              <i />
              <span>{project.liveUrl ?? "local project media placeholder"}</span>
            </div>
            <div className="browser-canvas">
              {project.previewMode === "live" && project.liveUrl ? (
                <iframe title={`${project.archiveTitle} live preview`} src={project.liveUrl} loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
              ) : (
                <Image src={project.placeholder} alt={project.archiveTitle + " media placeholder"} fill sizes="(max-width: 1050px) 100vw, 65vw" unoptimized />
              )}
              <div className="preview-fallback">
                <ImagePlus size={26} />
                <b>Screenshot slot ready</b>
                <span>Replace placeholder or add approved screenshot later.</span>
              </div>
            </div>
          </div>
          <aside className="preview-note">
            <ScanSearch size={28} />
            <h2>Overview media plan</h2>
            <p>
              This area is prepared for either a live public preview or a project screenshot. If a public website blocks iframe embedding, the live button still opens the project directly.
            </p>
            <code>{project.placeholder}</code>
          </aside>
        </section>

        <section className="detail-grid section-mini">
          <article className="detail-panel" data-reveal>
            <Radar size={24} />
            <h2>Project objective</h2>
            <p>{project.objective}</p>
          </article>
          <article className="detail-panel" data-reveal>
            <Route size={24} />
            <h2>Context</h2>
            <p>{project.context}</p>
          </article>
        </section>

        <section className="detail-system section-mini" data-reveal>
          <div>
            <p className="eyebrow">System thinking</p>
            <h2>How the project is framed.</h2>
          </div>
          <div className="architecture-rail">
            {project.architecture.map((item, index) => (
              <div className="architecture-step" key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <b>{item}</b>
                {index < project.architecture.length - 1 ? <ArrowRight size={15} /> : null}
              </div>
            ))}
          </div>
        </section>

        <section className="detail-grid section-mini">
          <article className="detail-panel tall" data-reveal>
            <Layers3 size={24} />
            <h2>Contribution notes</h2>
            <ul>
              {project.contribution.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="detail-panel tall" data-reveal>
            <FileCode2 size={24} />
            <h2>Tech stack</h2>
            <div className="tech-cloud">
              {project.tech.map((tech) => (
                <TechIcon tech={tech} key={tech} />
              ))}
            </div>
            <div className="discipline-cloud">
              {project.disciplines.map((discipline) => (
                <DisciplineIcon label={discipline} key={discipline} />
              ))}
            </div>
          </article>
        </section>

        <section className="screenshot-slots section-mini" data-reveal>
          <div className="slot-head">
            <p className="eyebrow">Ready-to-fill assets</p>
            <h2>Drop screenshots, diagrams, or repo links here later.</h2>
          </div>
          {["Product overview", "Core workflow", "System / ERD diagram"].map((slot, index) => (
            <div className="screenshot-slot" key={slot}>
              <ImagePlus size={22} />
              <b>{slot}</b>
              <span>{project.nextContent[index] ?? "Add approved project evidence."}</span>
            </div>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}


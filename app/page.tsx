import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BriefcaseBusiness, Check, Code2, Database, ExternalLink, FileText, GitBranch, ImagePlus, Mail, Network, PackageCheck, PanelsTopLeft, Radar, School, ServerCog, Snowflake, Target, Users, Warehouse } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TechIcon } from "@/components/tech-icon";
import { SystemBlueprintHero } from "@/components/system-blueprint-hero";
import { featuredProjects, projects, type Project } from "@/lib/portfolio-data";

const caps = [
  ["01", "Product & Business", "Requirement gathering, business process analysis, as-is and to-be mapping, user flows, and module definition.", BriefcaseBusiness, "cyan"],
  ["02", "System Design", "ERD and database design, system documentation, REST API design, module boundaries, and technical references.", Network, "amber"],
  ["03", "Engineering", "Java, TypeScript, Go, SQL, Spring Boot, Next.js, Node.js, Django, Vue.js, Flutter, and PostgreSQL.", Code2, "cyan"],
  ["04", "Collaboration", "Technical communication, teaching, leadership, project coordination, and analytical problem solving.", Users, "green"],
] as const;

const jobs = [
  ["JAN 2025 — JUN 2025", "Building foundations", "Teaching Assistant · Programming Foundations 2", "Helped students model Java applications and learned to explain technical decisions clearly.", "cyan"],
  ["JUL 2025 — OCT 2025", "Delivering features", "Full-Stack Developer Intern · Ciptadrasoft Indo", "Built Next.js interfaces and Node.js APIs for school operational workflows.", "cyan"],
  ["FEB 2026 — JUN 2026", "Designing systems", "System Analyst · PT Perikanan Indonesia", "Mapped as-is and to-be processes, designed ERDs and modules, then contributed to implementation.", "amber"],
  ["JAN 2026 — JUN 2026", "Translating business", "Solution Engineer Intern · Mekari", "Translated procurement and warehouse requirements into configurable ERP logic.", "green"],
] as const;

const flowNodes = [
  { Icon: PackageCheck, number: "01", title: "Procurement", tone: "amber" },
  { Icon: Snowflake, number: "02", title: "Cold storage", tone: "cyan" },
  { Icon: Warehouse, number: "03", title: "Goods release", tone: "green" },
] as const;

const intentPillars = [
  ["Product judgment", "Understand the problem, user, business rule, and adoption risk before choosing the architecture.", Target],
  ["System clarity", "Translate workflows into modules, ERDs, APIs, service boundaries, and implementation-ready references.", Radar],
  ["Delivery credibility", "Stay close enough to engineering so architectural decisions remain buildable and testable.", ServerCog],
] as const;

function Heading({ index, title, copy }: { index: string; title: string; copy?: string }) {
  return (
    <div className="section-head" data-reveal>
      <span>{index}</span>
      <div>
        <h2>{title}</h2>
        {copy ? <p>{copy}</p> : null}
      </div>
    </div>
  );
}

function FeaturedProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`featured-project ${project.accent}`} data-reveal style={{ "--reveal-delay": `${index * 120}ms` } as CSSProperties}>
      <div className="featured-copy">
        <div className="meta"><span>{project.category}</span><span>{project.visibility}</span></div>
        <h3>{project.archiveTitle}</h3>
        <p className="role">{project.role}</p>
        <p>{project.summary}</p>
        <div className="checks">
          {project.disciplines.slice(0, 4).map((item) => <span key={item}><Check size={13} />{item}</span>)}
        </div>
        <div className="mini-tech-cloud">
          {project.tech.slice(0, 5).map((tech) => <TechIcon compact tech={tech} key={tech} />)}
        </div>
        <div className="card-actions">
          <Link className="inline-link" href={`/projects/${project.slug}`}>View project detail <ArrowRight size={16} /></Link>
          {project.liveUrl ? <a className="inline-link muted" href={project.liveUrl} target="_blank" rel="noreferrer">Live site <ExternalLink size={15} /></a> : null}
        </div>
      </div>
      <div className="live-preview-card">
        <div className="browser-chrome"><i /><i /><i /><span>{project.liveUrl ?? "preview placeholder"}</span></div>
        <div className="browser-canvas mini">
          {project.previewMode === "live" && project.liveUrl ? (
            <iframe title={`${project.archiveTitle} live preview`} src={project.liveUrl} loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
          ) : <Image src={project.placeholder} alt={`${project.archiveTitle} placeholder`} fill sizes="(max-width: 1050px) 100vw, 55vw" unoptimized />}
          <div className="preview-badge"><ImagePlus size={14} />Replaceable media slot</div>
        </div>
      </div>
    </article>
  );
}

function ArchiveCard({ project, index }: { project: Project; index: number }) {
  const iconMap = {
    perfish: Network,
    "rajawali-lelang": PanelsTopLeft,
    "custom-erp-system": Network,
    "ciptadra-tms": PanelsTopLeft,
    sinsera: School,
    sizopi: Database,
    "insurance-web-app": FileText,
    "barcelona-match-insight": GitBranch,
  } as const;
  const Icon = iconMap[project.slug as keyof typeof iconMap] ?? Code2;

  return (
    <Link className={`archive-card ${project.accent}`} href={`/projects/${project.slug}`} key={project.slug} data-reveal style={{ "--reveal-delay": `${(index % 3) * 90}ms` } as CSSProperties}>
      <div>
        <span>{project.category}</span>
        <Icon />
      </div>
      <h3>{project.archiveTitle}</h3>
      <p>{project.summary}</p>
      <div className="archive-techs">
        {project.tech.slice(0, 3).map((tech) => <TechIcon compact tech={tech} key={tech} />)}
      </div>
      <div className="bars"><i /><i /><i /><i className={index % 3 === 0 ? "off" : ""} /></div>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="site-shell">
      <ScrollReveal />
      <SiteHeader />
      <main>
        <SystemBlueprintHero />

        <section className="section wrap" id="systems">
          <Heading index="01 / SELECTED SYSTEMS" title="Live project previews, not just dead cards." copy="Two public project links are prepared with browser-style previews, detail routes, tech stack tokens, and screenshot placeholders." />
          <div className="featured-grid">
            {featuredProjects.map((project, index) => <FeaturedProjectCard project={project} index={index} key={project.slug} />)}
          </div>
          <article className="flagship process-strip" data-reveal>
            <div className="project-copy">
              <div className="meta"><span>Flagship process</span><span>Fisheries operations</span></div>
              <h3>Perfish Flow</h3>
              <p className="role">From business process to buildable system</p>
              <p>This strip stays as a quick visual explanation of the operational flow: procurement, cold storage, and goods release.</p>
              <Link className="inline-link" href="/projects/perfish">Open full Perfish case study <ArrowRight size={16} /></Link>
            </div>
            <div className="system-visual">
              <div className="visual-grid" />
              {flowNodes.map(({ Icon, number, title, tone }, index) => (
                <div className="flow-fragment" key={title}>
                  <div className={`flow-node ${tone}`}>
                    <Icon />
                    <small>{number}</small>
                    <b>{title}</b>
                  </div>
                  {index < 2 ? <ArrowRight className="flow-arrow" /> : null}
                </div>
              ))}
              <div className="architecture"><span>Next.js interface</span><span>Spring Boot services</span><span>PostgreSQL</span></div>
            </div>
          </article>
        </section>

        <section className="section wrap" id="persona">
          <Heading index="02 / PERSONA" title="I like understanding the whole system." />
          <div className="persona">
            <div className="portrait photo-card" data-reveal>
              <Image src="/placeholders/sayyid-portrait.svg" alt="Sayyid portrait placeholder" width={1200} height={1500} priority unoptimized />
            </div>
            <div className="persona-copy" data-reveal style={{ "--reveal-delay": "120ms" } as CSSProperties}>
              <p className="statement">My curiosity moves across the entire software-development lifecycle. I don&apos;t just want to build it; I want to know why it is built and how it affects the business.</p>
              <p>From gathering requirements and mapping business processes to architecting the database and writing implementation code, I connect intention and execution.</p>
              <div className="loop">{["Understand", "Design", "Deliver"].map((item, index) => <div className="loop-part" key={item}><div><small>0{index + 1}</small><b>{item}</b></div>{index < 2 ? <ArrowRight /> : null}</div>)}</div>
            </div>
          </div>
          <div className="evidence" data-reveal>{["University of Indonesia", "Information Systems", "cGPA 3.61 / 4.00", "Teaching & leadership", "EPT 583 / 677"].map((item) => <span key={item}>{item}</span>)}</div>
        </section>

        <section className="section wrap">
          <Heading index="03 / CAPABILITY MODEL" title="Working across the layers." copy="The goal is not to know one isolated layer. It is to understand how the layers affect one another." />
          <div className="cap-stack">{caps.map(([number, title, description, Icon, color], index) => <article className={`cap-row ${color}`} key={title} data-reveal style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}><span>{number}</span><div className="cap-icon"><Icon /></div><div><h3>{title}</h3><p>{description}</p></div><ArrowRight /></article>)}</div>
        </section>

        <section className="section wrap" id="journey">
          <Heading index="04 / EXPERIENCE JOURNEY" title="A growing scope of responsibility." copy="From learning how software is built to translating operational processes into working solutions." />
          <div className="journey"><div className="journey-line" />{jobs.map(([date, stage, role, detail, tone], index) => <article className={`job ${tone}`} key={stage} data-reveal><div className="job-title"><span>{date}</span><h3>{stage}</h3><p>{role}</p></div><i>{String(index + 1).padStart(2, "0")}</i><div className="job-copy"><p>{detail}</p></div></article>)}</div>
        </section>

        <section className="section wrap">
          <Heading index="05 / PROJECT ARCHIVE" title="More systems I have helped shape." copy="Every card now routes to a detail page, carries tech stack icons, and has space for future screenshots or GitHub links." />
          <div className="archive">{projects.map((project, index) => <ArchiveCard project={project} index={index} key={project.slug} />)}</div>
        </section>

        <section className="section intention-v2 wrap" id="intention">
          <div className="intention-copy" data-reveal>
            <p className="eyebrow">06 / ARCHITECTURE DIRECTION</p>
            <h2>Objective: become the bridge between product intent, system design, and working software.</h2>
            <p>The objective of this section is to make the career direction explicit: not “I like architecture” in abstract, but “I am training to make better product-system-engineering decisions.”</p>
          </div>
          <div className="objective-card" data-reveal style={{ "--reveal-delay": "120ms" } as CSSProperties}>
            <span>Strong intention</span>
            <b>Solution Architect who understands product, system, and development.</b>
            <p>I want architecture to stay close to reality: clear enough for business discussion, structured enough for engineering, and practical enough to ship.</p>
          </div>
          <div className="intent-pillars">
            {intentPillars.map(([title, copy, Icon], index) => <article className="intent-pillar" key={title} data-reveal style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}><Icon /><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
          <div className="direction-map" data-reveal>
            <div className="map-line" />{[["Now", "System Analyst + Full-Stack Engineer", "cyan"], ["Growing through", "Product understanding + Solution engineering + System design", "neutral"], ["Direction", "Solution Architect", "amber"]].map(([label, body, color]) => <div className={`map-step ${color}`} key={label}><span>{label}</span><b>{body}</b></div>)}
          </div>
        </section>

        <section className="section contact wrap" id="contact" data-reveal>
          <FileText />
          <h2>Let&apos;s discuss the system behind the idea.</h2>
          <p>Whether it starts with a business process, a product idea, or a technical challenge, I&apos;d be glad to understand the problem and explore what the right system could look like.</p>
          <div className="actions"><a className="btn primary" href="mailto:sayyidthariq02@gmail.com"><Mail size={18} />Email me</a><a className="btn secondary" href="https://www.linkedin.com/in/sayyid-thariq-gilang-mutaqien/" target="_blank" rel="noreferrer">LinkedIn <ExternalLink size={17} /></a></div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}




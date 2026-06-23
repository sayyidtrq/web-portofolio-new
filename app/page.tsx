import { ArrowDownRight, ArrowRight, BriefcaseBusiness, Check, Code2, Database, ExternalLink, FileText, GitBranch, Mail, Network, PackageCheck, PanelsTopLeft, ScanSearch, School, Snowflake, Users, Warehouse } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

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
const projects = [
  ["Custom ERP System", "Procurement and warehouse business logic", "Enterprise", Network],
  ["Ciptadra TMS", "Expected and actual man-hour visibility", "Operations", PanelsTopLeft],
  ["Sinsera", "Modular school information system", "Education", School],
  ["SIZOPI", "Database-driven zoo information system", "Database", Database],
  ["Insurance Web App", "Policy and claim management workflows", "Fintech", FileText],
  ["Barcelona Match Insight", "Outcome and possession prediction", "ML", GitBranch],
] as const;
const flowNodes = [
  { Icon: PackageCheck, number: "01", title: "Procurement", tone: "amber" },
  { Icon: Snowflake, number: "02", title: "Cold storage", tone: "cyan" },
  { Icon: Warehouse, number: "03", title: "Goods release", tone: "green" },
] as const;

function Heading({ index, title, copy }: { index: string; title: string; copy?: string }) {
  return <div className="section-head"><span>{index}</span><div><h2>{title}</h2>{copy && <p>{copy}</p>}</div></div>;
}
function Blueprint() {
  return <div className="blueprint"><div className="axis" />{[["01","Business intent","amber"],["02","Process analysis","cyan"],["03","System design","cyan"],["04","Technical delivery","cyan"],["05","Working solution","green"]].map(([n,t,c],i)=><div className={`bp-node ${c}`} key={t}><i/><small>Phase {n}</small><b>{t}</b>{i===2&&<div><span>Data model</span><span>Modules</span></div>}</div>)}</div>;
}

export default function Home() {
 return <div className="site-shell"><SiteHeader/><main>
  <section className="hero wrap" id="home"><div className="hero-copy"><p className="eyebrow">Sayyid Thariq Gilang Mutaqien</p><h1>I turn business complexity into systems that <em>ship.</em></h1><p className="lead">I analyze how a business works, design how its system should work, and help build the solution—from process flows and ERDs to backend services and user interfaces.</p><p className="career"><i/>System Analyst & Full-Stack Engineer · Growing toward Solution Architecture</p><div className="actions"><a className="btn primary" href="#systems">Explore selected systems <ArrowDownRight size={18}/></a><a className="btn secondary" href="#journey">View my journey</a></div></div><Blueprint/></section>
  <section className="section wrap" id="systems">
    <Heading index="01 / SELECTED SYSTEMS" title="Systems, not just screens." copy="Projects where I worked across business process, system design, and implementation."/>
    <article className="flagship">
      <div className="project-copy"><div className="meta"><span>Flagship system</span><span>Fisheries operations</span></div><h3>Perfish</h3><p className="role">System Analyst & Full-Stack Engineer · PT Perikanan Indonesia</p><p>An integrated fishery information system supporting procurement, cold-storage management, and goods-release workflows—from process analysis through system documentation and implementation.</p><div className="checks">{["Analysis","Design","Backend","Frontend"].map(x=><span key={x}><Check size={13}/>{x}</span>)}</div><a className="inline-link" href="#contact">Case study in progress <ArrowRight size={16}/></a></div>
      <div className="system-visual"><div className="visual-grid"/>{flowNodes.map(({ Icon, number, title, tone }, i)=><div className="flow-fragment" key={title}><div className={`flow-node ${tone}`}><Icon/><small>{number}</small><b>{title}</b></div>{i<2&&<ArrowRight className="flow-arrow"/>}</div>)}<div className="architecture"><span>Next.js interface</span><span>Spring Boot services</span><span>PostgreSQL</span></div></div>
    </article>
  </section>
  <section className="section wrap" id="persona">
    <Heading index="02 / PERSONA" title="I like understanding the whole system."/>
    <div className="persona"><div className="portrait"><div className="visual-grid"/><ScanSearch size={64}/><b>Portrait placeholder</b><small>Replace with approved professional portrait</small></div><div className="persona-copy"><p className="statement">My curiosity moves across the entire software-development lifecycle. I don&apos;t just want to build it; I want to know why it is built and how it affects the business.</p><p>From gathering requirements and mapping business processes to architecting the database and writing implementation code, I connect intention and execution.</p><div className="loop">{["Understand","Design","Deliver"].map((x,i)=><div className="loop-part" key={x}><div><small>0{i+1}</small><b>{x}</b></div>{i<2&&<ArrowRight/>}</div>)}</div></div></div>
    <div className="evidence">{["University of Indonesia","Information Systems","cGPA 3.61 / 4.00","Teaching & leadership","EPT 583 / 677"].map(x=><span key={x}>{x}</span>)}</div>
  </section>
  <section className="section wrap">
    <Heading index="03 / CAPABILITY MODEL" title="Working across the layers." copy="The goal is not to know one isolated layer. It is to understand how the layers affect one another."/>
    <div className="cap-stack">{caps.map(([n,t,d,Icon,c])=><article className={`cap-row ${c}`} key={t}><span>{n}</span><div className="cap-icon"><Icon/></div><div><h3>{t}</h3><p>{d}</p></div><ArrowRight/></article>)}</div>
  </section>
  <section className="section wrap" id="journey">
    <Heading index="04 / EXPERIENCE JOURNEY" title="A growing scope of responsibility." copy="From learning how software is built to translating operational processes into working solutions."/>
    <div className="journey"><div className="journey-line"/>{jobs.map(([date,stage,role,detail,tone],i)=><article className={`job ${tone}`} key={stage}><div className="job-title"><span>{date}</span><h3>{stage}</h3><p>{role}</p></div><i>{String(i+1).padStart(2,"0")}</i><div className="job-copy"><p>{detail}</p></div></article>)}</div>
  </section>
  <section className="section wrap">
    <Heading index="05 / PROJECT ARCHIVE" title="More systems I have helped shape." copy="Compact entries now, with room to grow into full case studies later."/>
    <div className="archive">{projects.map(([t,d,k,Icon],i)=><article className="archive-card" key={t}><div><span>{k}</span><Icon/></div><h3>{t}</h3><p>{d}</p><div className="bars"><i/><i/><i/><i className={i%3===0?"off":""}/></div></article>)}</div>
  </section>
  <section className="section intention wrap" id="intention">
    <div><p className="eyebrow">06 / STRONG INTENTION</p><h2>The kind of architect I intend to become.</h2><p>My goal is to become a Solution Architect who does more than draw technical diagrams. I want to understand the product, the people using it, the business process behind it, and the engineering decisions required to make it real.</p><p>I don&apos;t want architecture separated from reality. I want to design systems that teams can build, businesses can operate, and users can trust.</p></div>
    <div className="direction-map"><div className="map-line"/>{[["Now","System Analyst + Full-Stack Engineer","cyan"],["Growing through","Product understanding + Solution engineering + System design","neutral"],["Direction","Solution Architect","amber"]].map(([a,b,c])=><div className={`map-step ${c}`} key={a}><span>{a}</span><b>{b}</b></div>)}</div>
  </section>
  <section className="section contact wrap" id="contact"><FileText/><h2>Let&apos;s discuss the system behind the idea.</h2><p>Whether it starts with a business process, a product idea, or a technical challenge, I&apos;d be glad to understand the problem and explore what the right system could look like.</p><div className="actions"><a className="btn primary" href="mailto:sayyidthariq02@gmail.com"><Mail size={18}/>Email me</a><a className="btn secondary" href="https://www.linkedin.com/in/sayyid-thariq-gilang-mutaqien/" target="_blank" rel="noreferrer">LinkedIn <ExternalLink size={17}/></a></div></section>
 </main><SiteFooter/></div>;
}

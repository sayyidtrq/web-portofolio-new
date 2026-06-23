import { Download, Menu } from "lucide-react";

const links = [["Home", "#home"], ["Persona", "#persona"], ["Projects", "#systems"], ["Experience", "#journey"], ["Intention", "#intention"]] as const;

export function SiteHeader() {
  return (
    <header className="topbar">
      <a className="brand-mark" href="#home" aria-label="Back to home">STGM</a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
      </nav>
      <a className="nav-action" href="/cv-sayyid.docx" download><Download size={15} />Download CV</a>
      <details className="mobile-menu">
        <summary aria-label="Open navigation menu"><Menu size={21} /></summary>
        <nav aria-label="Mobile navigation">
          {links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
          <a href="/cv-sayyid.docx" download>Download CV</a>
        </nav>
      </details>
    </header>
  );
}

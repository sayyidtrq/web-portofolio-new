import { Download, Menu } from "lucide-react";
import Link from "next/link";

const links = [["Home", "/#home"], ["Persona", "/#persona"], ["Projects", "/#systems"], ["Experience", "/#journey"], ["Intention", "/#intention"]] as const;

export function SiteHeader() {
  return (
    <header className="topbar">
      <Link className="brand-mark" href="/#home" aria-label="Back to home">STGM</Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
      </nav>
      <a className="nav-action" href="/cv-sayyid.docx" download><Download size={15} />Download CV</a>
      <details className="mobile-menu">
        <summary aria-label="Open navigation menu"><Menu size={21} /></summary>
        <nav aria-label="Mobile navigation">
          {links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
          <a href="/cv-sayyid.docx" download>Download CV</a>
        </nav>
      </details>
    </header>
  );
}

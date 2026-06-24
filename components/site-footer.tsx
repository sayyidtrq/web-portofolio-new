import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer content-wrap">
      <Link className="brand-mark" href="/#home">STGM</Link>
      <p>Based in Indonesia · Building toward Solution Architecture</p>
      <div><a href="mailto:sayyidthariq02@gmail.com">Email</a><a href="https://www.linkedin.com/in/sayyid-thariq-gilang-mutaqien/" target="_blank" rel="noreferrer">LinkedIn</a></div>
    </footer>
  );
}

"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observed = new WeakSet<Element>();

    const revealNow = (target: Element) => target.classList.add("is-visible");

    const observer = reduceMotion
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                revealNow(entry.target);
                observer?.unobserve(entry.target);
              }
            });
          },
          { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
        );

    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((target) => {
        if (observed.has(target)) {
          return;
        }

        observed.add(target);

        if (reduceMotion) {
          revealNow(target);
          return;
        }

        const rect = target.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.88 && rect.bottom > 0) {
          revealNow(target);
        } else {
          observer?.observe(target);
        }
      });
    };

    const raf = window.requestAnimationFrame(scan);
    const mutationObserver = new MutationObserver(scan);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    const handlePointerMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(raf);
      observer?.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return null;
}

"use client";

import { useEffect, useRef, useState } from "react";

type ThreeModule = typeof import("three");

export function ThreeSystemOrb() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    let frameId = 0;
    let renderer: import("three").WebGLRenderer | null = null;
    let resizeObserver: ResizeObserver | null = null;
    const host = hostRef.current;

    if (!host) {
      return;
    }

    async function boot() {
      const THREE: ThreeModule = await import("three");
      if (!mounted || !host) {
        return;
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 0.2, 7.4);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      host.appendChild(renderer.domElement);

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const group = new THREE.Group();
      const nodeGroup = new THREE.Group();
      scene.add(group);
      group.add(nodeGroup);

      const coreMaterial = new THREE.MeshBasicMaterial({ color: 0x73e0e6, wireframe: true, transparent: true, opacity: 0.76 });
      const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.15, 1), coreMaterial);
      group.add(core);

      const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xf3b562, transparent: true, opacity: 0.28 });
      const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.0, 0.01, 8, 96), ringMaterial);
      const ringB = new THREE.Mesh(new THREE.TorusGeometry(2.55, 0.008, 8, 96), ringMaterial.clone());
      ringA.rotation.x = Math.PI / 2.5;
      ringB.rotation.y = Math.PI / 2.1;
      ringB.rotation.x = Math.PI / 8;
      group.add(ringA, ringB);

      const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x58d68d });
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0x73e0e6, transparent: true, opacity: 0.36 });
      const nodePositions = [
        new THREE.Vector3(-2.55, -0.65, 0.3),
        new THREE.Vector3(-1.25, 1.35, -0.1),
        new THREE.Vector3(1.45, 1.05, 0.2),
        new THREE.Vector3(2.55, -0.72, -0.1),
        new THREE.Vector3(0.05, -1.86, 0.25),
      ];

      nodePositions.forEach((position) => {
        const node = new THREE.Mesh(new THREE.SphereGeometry(0.105, 18, 18), nodeMaterial.clone());
        node.position.copy(position);
        nodeGroup.add(node);
      });

      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        nodePositions[0],
        nodePositions[1],
        nodePositions[2],
        nodePositions[3],
        nodePositions[4],
        nodePositions[0],
        nodePositions[2],
        nodePositions[4],
        nodePositions[1],
        nodePositions[3],
      ]);
      nodeGroup.add(new THREE.Line(lineGeometry, lineMaterial));

      const resize = () => {
        if (!renderer || !host) {
          return;
        }
        const { width, height } = host.getBoundingClientRect();
        const safeHeight = Math.max(height, 320);
        camera.aspect = width / safeHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(width, safeHeight, false);
      };

      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
      resize();

      let pointerX = 0;
      let pointerY = 0;
      const handlePointer = (event: PointerEvent) => {
        const bounds = host.getBoundingClientRect();
        pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.45;
        pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.35;
      };
      host.addEventListener("pointermove", handlePointer, { passive: true });

      const animate = () => {
        if (!renderer) {
          return;
        }
        if (!reduceMotion) {
          group.rotation.y += 0.004;
          ringA.rotation.z += 0.0028;
          ringB.rotation.x += 0.002;
        }
        group.rotation.x += (pointerY - group.rotation.x) * 0.035;
        group.rotation.z += (pointerX - group.rotation.z) * 0.035;
        renderer.render(scene, camera);
        frameId = window.requestAnimationFrame(animate);
      };

      setIsReady(true);
      animate();

      return () => {
        host.removeEventListener("pointermove", handlePointer);
        core.geometry.dispose();
        ringA.geometry.dispose();
        ringB.geometry.dispose();
        nodeGroup.children.forEach((child) => {
          const geometry = (child as { geometry?: { dispose?: () => void } }).geometry;
          geometry?.dispose?.();
        });
        coreMaterial.dispose();
        ringMaterial.dispose();
        lineMaterial.dispose();
        nodeMaterial.dispose();
      };
    }

    let disposeScene: (() => void) | undefined;
    boot().then((dispose) => {
      disposeScene = dispose;
    }).catch(() => {
      if (host) {
        host.dataset.fallback = "true";
      }
    });

    return () => {
      mounted = false;
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      resizeObserver?.disconnect();
      disposeScene?.();
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, []);

  return (
    <div className={`orb-shell ${isReady ? "is-ready" : ""}`} ref={hostRef} aria-label="Interactive 3D system architecture model">
      <div className="orb-fallback">
        <span>3D System Model</span>
        <b>Business and System Delivery</b>
      </div>
    </div>
  );
}


"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, PerspectiveCamera, RoundedBox } from "@react-three/drei";
import { animate, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowRight, Boxes, GitBranch, Layers3 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Group } from "three";

type Vec3 = [number, number, number];

type BlueprintNode = {
  label: string;
  initial: Vec3;
  analysis: Vec3;
  design: Vec3;
  delivery: Vec3;
  solution: Vec3;
  tone: "cyan" | "amber" | "slate";
};

const nodes: BlueprintNode[] = [
  {
    label: "Business",
    initial: [-2.7, 1.2, 0.45],
    analysis: [-2.3, 1.05, 0.2],
    design: [-1.15, 0.55, 0.05],
    delivery: [-1.7, 0.86, 0],
    solution: [1.55, 0.72, 0.05],
    tone: "amber",
  },
  {
    label: "Users",
    initial: [1.95, 1.45, -0.2],
    analysis: [-0.7, 1.5, 0.08],
    design: [-0.55, 0.7, 0],
    delivery: [-1.0, 0.42, 0.05],
    solution: [1.62, 0.36, 0],
    tone: "cyan",
  },
  {
    label: "Process",
    initial: [-1.35, -1.45, 0.65],
    analysis: [0.75, 1.18, 0.12],
    design: [-0.25, 0.1, 0],
    delivery: [-0.35, 0.08, 0.04],
    solution: [1.68, 0.0, 0],
    tone: "cyan",
  },
  {
    label: "Data",
    initial: [2.6, -0.7, 0.35],
    analysis: [2.15, 0.1, 0.18],
    design: [0.2, -0.12, 0],
    delivery: [0.28, -0.12, 0.02],
    solution: [1.64, -0.36, 0],
    tone: "slate",
  },
  {
    label: "Operations",
    initial: [0.1, 0.08, -1.05],
    analysis: [0.72, -1.2, 0.14],
    design: [0.55, -0.58, 0],
    delivery: [0.95, -0.48, 0.06],
    solution: [1.58, -0.72, 0.03],
    tone: "cyan",
  },
  {
    label: "Inventory",
    initial: [-2.55, -0.25, -0.35],
    analysis: [-1.45, -1.2, 0.12],
    design: [-0.05, -0.72, 0],
    delivery: [1.58, -0.86, 0.04],
    solution: [1.55, -1.08, 0.02],
    tone: "amber",
  },
];

const phases = [
  ["Fragmented concepts", "Business ideas, users, processes, data, operations, and inventory still move separately."],
  ["Process analysis", "Relationships start to appear: who needs what, which process depends on which data."],
  ["System design", "The fragmented model converges into modules, boundaries, data models, and workflows."],
  ["Technical delivery", "The blueprint becomes implementation-ready: APIs, interfaces, services, and release flow."],
  ["Working solution", "The system is now coherent enough to ship, operate, and keep improving."],
] as const;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const x = clamp((value - edge0) / (edge1 - edge0));
  return x * x * (3 - 2 * x);
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function mixVec(a: Vec3, b: Vec3, t: number): Vec3 {
  return [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t)];
}

function currentNodePosition(node: BlueprintNode, progress: number): Vec3 {
  if (progress < 0.28) {
    return mixVec(node.initial, node.analysis, smoothstep(0.02, 0.28, progress));
  }
  if (progress < 0.52) {
    return mixVec(node.analysis, node.design, smoothstep(0.28, 0.52, progress));
  }
  if (progress < 0.76) {
    return mixVec(node.design, node.delivery, smoothstep(0.52, 0.76, progress));
  }
  return mixVec(node.delivery, node.solution, smoothstep(0.76, 1, progress));
}


function toStagePoint(position: Vec3) {
  return {
    x: 50 + position[0] * 15.3,
    y: 50 - position[1] * 21.5,
  };
}

function domAnalysisOpacity(progress: number, index: number) {
  return smoothstep(0.12 + index * 0.035, 0.26 + index * 0.035, progress) * (1 - smoothstep(0.72, 0.92, progress) * 0.45);
}

const domProcessConnections = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]] as const;

function NodePoint({ node, position, progress }: { node: BlueprintNode; position: Vec3; progress: number }) {
  const scale = 1.08 + smoothstep(0.68, 0.95, progress) * 0.16;
  return (
    <group position={position} scale={scale}>
      <mesh>
        <sphereGeometry args={[0.105, 28, 28]} />
        <meshBasicMaterial color={node.tone === "amber" ? "#d9a15d" : node.tone === "cyan" ? "#8ed5dc" : "#a7b0be"} transparent opacity={0.9} />
      </mesh>
      <mesh scale={1.9}>
        <sphereGeometry args={[0.105, 28, 28]} />
        <meshBasicMaterial color={node.tone === "amber" ? "#d9a15d" : "#8ed5dc"} transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function BlueprintScene({ progress }: { progress: number }) {
  const groupRef = useRef<Group>(null);
  const positions = useMemo(() => nodes.map((node) => currentNodePosition(node, progress)), [progress]);
  const coreOpacity = smoothstep(0.34, 0.62, progress);
  const deliveryOpacity = smoothstep(0.58, 0.82, progress);
  const solutionOpacity = smoothstep(0.78, 0.98, progress);
  const analysisOpacity = smoothstep(0.08, 0.34, progress) * (1 - smoothstep(0.62, 0.82, progress) * 0.34);

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    const t = clock.getElapsedTime();
    group.rotation.y = Math.sin(t * 0.18) * 0.035;
    group.rotation.x = -0.05 + Math.sin(t * 0.12) * 0.018;
  });

  const processConnections = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 0],
  ] as const;

  const core: Vec3 = [0, 0, 0];
  const delivery: Vec3 = [1.05, -0.1, 0];
  const solution: Vec3 = [2.15, -0.1, 0];

  return (
    <>
      <ambientLight intensity={1.5} />
      <PerspectiveCamera makeDefault position={[0, 0.15, 6.4]} fov={41} />
      <group ref={groupRef}>
        <gridHelper args={[6.6, 22, "#27364f", "#172235"]} rotation={[0, 0, 0]} position={[0, -1.72, -0.24]} />

        {processConnections.map(([from, to], index) => (
          <Line
            key={`${from}-${to}`}
            points={[positions[from], positions[to]]}
            color="#8ed5dc"
            transparent
            opacity={analysisOpacity * smoothstep(0.12 + index * 0.035, 0.26 + index * 0.035, progress)}
            lineWidth={1.2}
          />
        ))}

        {positions.map((position, index) => (
          <Line
            key={`core-${nodes[index].label}`}
            points={[position, core]}
            color={index % 2 ? "#8ed5dc" : "#d9a15d"}
            transparent
            opacity={coreOpacity * 0.46}
            lineWidth={1}
          />
        ))}

        <Line points={[core, delivery, solution]} color="#d9a15d" transparent opacity={deliveryOpacity * 0.76} lineWidth={1.6} />

        {nodes.map((node, index) => (
          <NodePoint key={node.label} node={node} position={positions[index]} progress={progress} />
        ))}

        <group position={core} scale={0.82 + coreOpacity * 0.16}>
          <RoundedBox args={[0.82, 0.46, 0.12]} radius={0.025} smoothness={4}>
            <meshBasicMaterial color="#111927" transparent opacity={0.38 + coreOpacity * 0.5} />
          </RoundedBox>
        </group>

        <group position={delivery}>
          <RoundedBox args={[0.78, 0.4, 0.11]} radius={0.025} smoothness={4}>
            <meshBasicMaterial color="#111927" transparent opacity={deliveryOpacity * 0.86} />
          </RoundedBox>
        </group>

        <group position={solution}>
          <RoundedBox args={[0.98, 0.58, 0.18]} radius={0.035} smoothness={5}>
            <meshBasicMaterial color="#142338" transparent opacity={solutionOpacity * 0.94} />
          </RoundedBox>
        </group>
      </group>
    </>
  );
}

export function SystemBlueprintHero() {
  const shouldReduceMotion = useReducedMotion();
  const [activePhase, setActivePhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const phaseIndex = activePhase;
  const targetProgress = activePhase / (phases.length - 1);

  useEffect(() => {
    const controls = animate(progressRef.current, targetProgress, {
      duration: shouldReduceMotion ? 0 : 1.85,
      ease: [0.2, 0.72, 0.18, 1],
      onUpdate: (latest) => {
        progressRef.current = latest;
        setProgress(latest);
      },
    });

    return () => controls.stop();
  }, [activePhase, shouldReduceMotion, targetProgress]);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActivePhase((current) => (current + 1) % phases.length);
    }, 10000);

    return () => window.clearInterval(timer);
  }, [shouldReduceMotion]);

  const progressPercent = `${Math.round(clamp(progress) * 100)}%`;
  const domPositions = nodes.map((node) => toStagePoint(currentNodePosition(node, progress)));
  const corePoint = toStagePoint([0, 0, 0]);
  const deliveryPoint = toStagePoint([1.05, -0.1, 0]);
  const solutionPoint = toStagePoint([2.15, -0.1, 0]);


  return (
    <section className="system-blueprint-hero" id="home">
      <div className="blueprint-sticky wrap">
        <div className="blueprint-copy">
          <p className="system-title">The System Blueprint</p>
          <h1>From business fragments to systems that ship.</h1>
          <p className="lead">
            I connect business intent, users, processes, data, and operations into system design decisions that engineers can actually deliver.
          </p>
          <p className="career"><i />System Analyst & Full-Stack Engineer · Growing toward Solution Architecture</p>
          <div className="actions">
            <a className="btn primary" href="#systems">Explore selected systems <ArrowDownRight size={18} /></a>
            <a className="btn secondary" href="#intention">See architecture direction <ArrowRight size={17} /></a>
          </div>
        </div>

        <div className="blueprint-stage" aria-label="Interactive system blueprint visualization">
          <div className="stage-grid" />
          <div className="stage-canvas">
            <Canvas dpr={[1, 1.65]} gl={{ alpha: true, antialias: true }}>
              <BlueprintScene progress={progress} />
            </Canvas>
          </div>
          <div className="blueprint-dom-diagram" aria-hidden="true">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              {domProcessConnections.map(([from, to], index) => (
                <line key={`${from}-${to}`} x1={domPositions[from].x} y1={domPositions[from].y} x2={domPositions[to].x} y2={domPositions[to].y} stroke="currentColor" strokeOpacity={domAnalysisOpacity(progress, index)} />
              ))}
              {domPositions.map((point, index) => (
                <line key={`core-dom-${nodes[index].label}`} x1={point.x} y1={point.y} x2={corePoint.x} y2={corePoint.y} stroke="currentColor" strokeOpacity={smoothstep(0.34, 0.62, progress) * 0.38} />
              ))}
              <line x1={corePoint.x} y1={corePoint.y} x2={deliveryPoint.x} y2={deliveryPoint.y} stroke="currentColor" strokeOpacity={smoothstep(0.58, 0.82, progress) * 0.68} />
              <line x1={deliveryPoint.x} y1={deliveryPoint.y} x2={solutionPoint.x} y2={solutionPoint.y} stroke="currentColor" strokeOpacity={smoothstep(0.7, 0.96, progress) * 0.72} />
            </svg>
            {nodes.map((node, index) => (
              <span className={`dom-blueprint-node ${node.tone}`} key={node.label} style={{ left: `${domPositions[index].x}%`, top: `${domPositions[index].y}%`, opacity: 1 - smoothstep(0.62, 0.9, progress) * 0.58 }}>{node.label}</span>
            ))}
            <span className="dom-core-node" style={{ left: `${corePoint.x}%`, top: `${corePoint.y}%`, opacity: smoothstep(0.34, 0.62, progress) }}>System Design</span>
            <span className="dom-core-node amber" style={{ left: `${deliveryPoint.x}%`, top: `${deliveryPoint.y}%`, opacity: smoothstep(0.58, 0.82, progress) }}>Technical Delivery</span>
            <span className="dom-core-node solution" style={{ left: `${solutionPoint.x}%`, top: `${solutionPoint.y}%`, opacity: smoothstep(0.76, 1, progress) }}>Working Solution</span>
          </div>
          <div className="phase-card">
            <div className="phase-card-head">
              <span>{String(phaseIndex + 1).padStart(2, "0")}</span>
              <b>{progressPercent}</b>
            </div>
            <h2>{phases[phaseIndex][0]}</h2>
            <p>{phases[phaseIndex][1]}</p>
            <div className="phase-progress"><i style={{ width: progressPercent }} /></div>
          </div>
          <div className="phase-strip" aria-label="System blueprint phase controls">
            {phases.map(([label], index) => (
              <button
                type="button"
                className={index <= phaseIndex ? "active" : ""}
                aria-pressed={index === phaseIndex}
                onClick={() => setActivePhase(index)}
                key={label}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="stage-legend">
            <span><Boxes size={13} /> Business concepts</span>
            <span><GitBranch size={13} /> Process links</span>
            <span><Layers3 size={13} /> Deliverable system</span>
          </div>
        </div>
      </div>
    </section>
  );
}


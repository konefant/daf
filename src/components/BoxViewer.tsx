"use client";
import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls, RoundedBox, Text } from "@react-three/drei";
import { MathUtils, type Group } from "three";
import { FONT_OPTIONS, type FontKey } from "@/lib/products";

export type BoxViewerProps = {
  color: string; ribbon?: string; name: string; font?: FontKey; textColor?: string;
  open?: boolean; autoRotate?: boolean; zoom?: number;
};

// ---------- Dimensions : tout se règle ici ----------
const W = 2.4;        // largeur de la boîte
const D = 1.6;        // profondeur
const BODY_H = 0.4;   // hauteur du fond
const LID_H = 0.35;   // hauteur du couvercle
const OVER = 0.03;    // le couvercle dépasse un peu de chaque côté
const KNOT_X = 0.75;  // position du nœud sur la face avant (gauche/droite)
const KNOT_SCALE = 1.5; // taille du nœud

// ---------- Matières ----------
function Paper({ color }: { color: string }) {
  return <meshStandardMaterial color={color} roughness={0.7} metalness={0} />;
}
function Satin({ color }: { color: string }) {
  return <meshPhysicalMaterial color={color} roughness={0.35} sheen={1} sheenRoughness={0.3} sheenColor="#ffffff" />;
}

// ---------- Le nœud (posé sur la face avant) ----------
function Knot({ ribbon }: { ribbon: string }) {
  return (
    <group scale={KNOT_SCALE}>
      {/* boucles */}
      <mesh position={[-0.24, 0.1, 0]} rotation={[0, 0, 0.5]} scale={[1.15, 0.8, 0.35]}>
        <torusGeometry args={[0.2, 0.06, 16, 32]} /><Satin color={ribbon} />
      </mesh>
      <mesh position={[0.24, 0.12, 0]} rotation={[0, 0, -0.5]} scale={[1.15, 0.8, 0.35]}>
        <torusGeometry args={[0.2, 0.06, 16, 32]} /><Satin color={ribbon} />
      </mesh>
      {/* pans qui tombent */}
      <mesh position={[-0.2, -0.28, 0]} rotation={[0, 0, 0.35]}>
        <boxGeometry args={[0.13, 0.55, 0.015]} /><Satin color={ribbon} />
      </mesh>
      <mesh position={[0.25, -0.26, 0]} rotation={[0, 0, -0.7]}>
        <boxGeometry args={[0.13, 0.6, 0.015]} /><Satin color={ribbon} />
      </mesh>
      {/* centre du nœud */}
      <mesh position={[0, 0.08, 0.02]} scale={[1, 0.9, 0.8]}>
        <sphereGeometry args={[0.09, 20, 20]} /><Satin color={ribbon} />
      </mesh>
    </group>
  );
}

// ---------- La boîte ----------
function GiftBox({ color, ribbon = "#ffffff", name, font = "chic", textColor = "#7a1f43", open = false }: BoxViewerProps) {
  const lid = useRef<Group>(null);
  const f = FONT_OPTIONS.find((o) => o.key === font) ?? FONT_OPTIONS[0];
  const lidW = W + 2 * OVER;
  const lidD = D + 2 * OVER;

  // Animation d'ouverture du couvercle (rotation autour de la charnière arrière)
  useFrame(() => {
    if (lid.current) lid.current.rotation.x = MathUtils.lerp(lid.current.rotation.x, open ? -1.75 : 0, 0.1);
  });

  return (
    <group position={[0, -0.4, 0]}>
      {/* fond de la boîte */}
      <RoundedBox args={[W, BODY_H, D]} radius={0.03} smoothness={4} position={[0, BODY_H / 2, 0]}>
        <Paper color={color} />
      </RoundedBox>

      {/* papier de soie à l'intérieur */}
      <mesh position={[0, BODY_H - 0.01, 0]}>
        <boxGeometry args={[W - 0.2, 0.04, D - 0.2]} />
        <meshStandardMaterial color="#fff1e8" roughness={0.9} />
      </mesh>

      {/* couvercle articulé sur l'arête arrière */}
      <group ref={lid} position={[0, BODY_H, -(D / 2 + OVER)]}>
        <RoundedBox args={[lidW, LID_H, lidD]} radius={0.03} smoothness={4} position={[0, LID_H / 2, lidD / 2]}>
          <Paper color={color} />
        </RoundedBox>

        {/* petite attache plate derrière le nœud */}
        <mesh position={[KNOT_X, 0, lidD + 0.01]}>
          <boxGeometry args={[0.2, 0.5, 0.01]} /><Satin color={ribbon} />
        </mesh>

        {/* nœud sur la face avant */}
        {/* <group position={[KNOT_X, 0.05, lidD + 0.04]}>
          <Knot ribbon={ribbon} />  
        </group> */}

        {/* prénom sur le dessus du couvercle */}
        <Text
          position={[-0.4, LID_H + 0.004, lidD / 2]} rotation={[-Math.PI / 2, 0, 0]}
          font={f.file} fontSize={f.size} maxWidth={1.4} anchorX="center" anchorY="middle" color={textColor}
        >
          {name || "Ma box"}
        </Text>
      </group>
    </group>
  );
}

function Zoom({ zoom }: { zoom: number }) {
  const camera = useThree((s) => s.camera);
  useEffect(() => { camera.zoom = zoom; camera.updateProjectionMatrix(); }, [camera, zoom]);
  return null;
}

// ---------- La scène (caméra, lumières) ----------
export default function BoxViewer({ autoRotate = true, zoom = 1, ...props }: BoxViewerProps) {
  return (
    <Canvas camera={{ position: [4.6, 3, 5.2], fov: 30 }} dpr={[1, 2]}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 6, 5]} intensity={1} />
      <Environment preset="studio" environmentIntensity={0.35} />
      <GiftBox {...props} />
      <Zoom zoom={zoom} />
      <ContactShadows position={[0, -0.4, 0]} opacity={0.3} blur={2.4} scale={9} />
      <OrbitControls enablePan={false} enableZoom={false} autoRotate={autoRotate} autoRotateSpeed={1.4} maxPolarAngle={Math.PI / 2.05} />
    </Canvas>
  );
}

"use client";
import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, OrbitControls, Text } from "@react-three/drei";
import { MathUtils, type Group } from "three";
import { FONT_OPTIONS, type FontKey } from "@/lib/products";

export type BoxViewerProps = {
  color: string; ribbon?: string; name: string; font?: FontKey; textColor?: string;
  open?: boolean; autoRotate?: boolean; zoom?: number;
};

function GiftBox({ color, ribbon = "#ffffff", name, font = "chic", textColor = "#7a1f43", open = false }: BoxViewerProps) {
  const lid = useRef<Group>(null);
  const f = FONT_OPTIONS.find((o) => o.key === font) ?? FONT_OPTIONS[0];
  const mat = { roughness: 0.55, metalness: 0.02 };
  useFrame(() => {
    if (lid.current) lid.current.rotation.x = MathUtils.lerp(lid.current.rotation.x, open ? -1.75 : 0, 0.1);
  });
  return (
    <group position={[0, -0.5, 0]}>
      {/* corps */}
      <mesh position={[0, 0.45, 0]}><boxGeometry args={[2.4, 0.9, 1.6]} /><meshStandardMaterial color={color} {...mat} /></mesh>
      <mesh position={[0, 0.92, 0]}><boxGeometry args={[2.2, 0.04, 1.4]} /><meshStandardMaterial color="#fff1e8" roughness={0.9} /></mesh>
      <mesh position={[0.75, 0.45, 0]}><boxGeometry args={[0.26, 0.91, 1.62]} /><meshStandardMaterial color={ribbon} roughness={0.3} /></mesh>
      {/* couvercle articulé à l'arrière */}
      <group ref={lid} position={[0, 0.9, -0.83]}>
        <mesh position={[0, 0.17, 0.83]}><boxGeometry args={[2.46, 0.34, 1.66]} /><meshStandardMaterial color={color} {...mat} /></mesh>
        <mesh position={[0.75, 0.17, 0.83]}><boxGeometry args={[0.26, 0.37, 1.7]} /><meshStandardMaterial color={ribbon} roughness={0.3} /></mesh>
        <mesh position={[0.55, 0.45, 0.83]} rotation={[0, 0, 0.3]}><torusGeometry args={[0.26, 0.07, 14, 28]} /><meshStandardMaterial color={ribbon} roughness={0.3} /></mesh>
        <mesh position={[0.95, 0.45, 0.83]} rotation={[0, 0, -0.3]}><torusGeometry args={[0.26, 0.07, 14, 28]} /><meshStandardMaterial color={ribbon} roughness={0.3} /></mesh>
        <mesh position={[0.75, 0.4, 0.83]}><sphereGeometry args={[0.12, 20, 20]} /><meshStandardMaterial color={ribbon} roughness={0.3} /></mesh>
        <Text
          position={[-0.42, 0.347, 0.83]} rotation={[-Math.PI / 2, 0, 0]}
          font={f.file} fontSize={f.size} maxWidth={1.35} anchorX="center" anchorY="middle" color={textColor}
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

export default function BoxViewer({ autoRotate = true, zoom = 1, ...props }: BoxViewerProps) {
  return (
    <Canvas camera={{ position: [3.4, 2.9, 4.8], fov: 38 }} dpr={[1, 2]}>
      <ambientLight intensity={1} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} />
      <directionalLight position={[-4, 3, -3]} intensity={0.5} />
      <GiftBox {...props} />
      <Zoom zoom={zoom} />
      <ContactShadows position={[0, -0.5, 0]} opacity={0.3} blur={2.4} scale={9} />
      <OrbitControls enablePan={false} enableZoom={false} autoRotate={autoRotate} autoRotateSpeed={1.4} maxPolarAngle={Math.PI / 2.05} />
    </Canvas>
  );
}

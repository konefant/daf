"use client";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls, Text } from "@react-three/drei";

type Props = { color: string; ribbon: string; name: string };

function isLight(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const l = 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
  return l > 150;
}

function GiftBox({ color, ribbon, name }: Props) {
  const mat = { roughness: 0.45, metalness: 0.05 };
  return (
    <group position={[0, -0.6, 0]}>
      {/* corps et couvercle */}
      <mesh position={[0, 0.5, 0]}><boxGeometry args={[2, 1, 2]} /><meshStandardMaterial color={color} {...mat} /></mesh>
      <mesh position={[0, 1.18, 0]}><boxGeometry args={[2.16, 0.36, 2.16]} /><meshStandardMaterial color={color} {...mat} /></mesh>
      {/* ruban */}
      <mesh position={[0, 1.19, 0]}><boxGeometry args={[2.2, 0.38, 0.28]} /><meshStandardMaterial color={ribbon} {...mat} /></mesh>
      <mesh position={[0, 0.5, 0]}><boxGeometry args={[2.02, 1.02, 0.28]} /><meshStandardMaterial color={ribbon} {...mat} /></mesh>
      {/* noeud */}
      <mesh position={[-0.3, 1.55, 0]} rotation={[0, 0, 0.25]}><torusGeometry args={[0.28, 0.08, 14, 28]} /><meshStandardMaterial color={ribbon} {...mat} /></mesh>
      <mesh position={[0.3, 1.55, 0]} rotation={[0, 0, -0.25]}><torusGeometry args={[0.28, 0.08, 14, 28]} /><meshStandardMaterial color={ribbon} {...mat} /></mesh>
      <mesh position={[0, 1.5, 0]}><sphereGeometry args={[0.13, 20, 20]} /><meshStandardMaterial color={ribbon} {...mat} /></mesh>
      {/* prénom sur le couvercle */}
      <Text
        position={[0, 1.372, 0.62]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.3}
        maxWidth={1.9}
        anchorX="center"
        anchorY="middle"
        color={isLight(color) ? "#3a1426" : "#ffffff"}
      >
        {name || "Ma box"}
      </Text>
    </group>
  );
}

export default function BoxViewer(props: Props) {
  return (
    <Canvas camera={{ position: [3.4, 2.8, 4.6], fov: 38 }} dpr={[1, 2]}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} />
      <directionalLight position={[-4, 3, -3]} intensity={0.5} />
      <GiftBox {...props} />
      <ContactShadows position={[0, -0.6, 0]} opacity={0.35} blur={2.4} scale={8} />
      <OrbitControls enablePan={false} autoRotate autoRotateSpeed={1.2} minDistance={4} maxDistance={9} maxPolarAngle={Math.PI / 2.05} />
    </Canvas>
  );
}

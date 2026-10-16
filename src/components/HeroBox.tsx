"use client";
import dynamic from "next/dynamic";

const BoxViewer = dynamic(() => import("./BoxViewer"), { ssr: false, loading: () => <p style={{ textAlign: "center" }}>Chargement…</p> });

export default function HeroBox() {
  return <BoxViewer color="#f2a7bb" name="Sarah" font="chic" textColor="#7a1f43" />;
}

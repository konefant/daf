"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import Stepper from "@/components/Stepper";
import { useBox } from "@/lib/box-context";
import { BOX_COLORS, FONT_OPTIONS, TEXT_COLORS } from "@/lib/products";

const BoxViewer = dynamic(() => import("@/components/BoxViewer"), {
  ssr: false,
  loading: () => <p style={{ padding: 24 }}>Chargement de la 3D…</p>,
});

export default function CreerMaBox() {
  const { box, update } = useBox();
  const [auto, setAuto] = useState(true);
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const clamp = (z: number) => Math.min(1.8, Math.max(0.7, z));

  return (
    <div className="wrap">
      <Stepper current={1} />
      <div className="builder">
        <div className="stage">
          <h2>Aperçu interactif 3D</h2>
          <div className="canvas">
            <BoxViewer color={box.boxColor} name={box.name.trim()} font={box.font} textColor={box.textColor} open={open} autoRotate={auto} zoom={zoom} />
          </div>
          <div className="ctrls" role="group" aria-label="Contrôles de l'aperçu">
            <button aria-pressed={auto} onClick={() => setAuto(!auto)}>360° Rotation</button>
            <button onClick={() => setZoom(clamp(zoom - 0.15))} aria-label="Dézoomer">−</button>
            <button onClick={() => setZoom(clamp(zoom + 0.15))} aria-label="Zoomer">+</button>
            <button aria-pressed={open} onClick={() => setOpen(!open)}>{open ? "Vue fermée" : "Vue ouverte"}</button>
          </div>
        </div>

        <div className="panel">
          <h2>Configuration de la box</h2>

          <div className="field">
            <label htmlFor="nm">1. Le prénom sur le couvercle</label>
            <input id="nm" type="text" maxLength={14} value={box.name} onChange={(e) => update({ name: e.target.value })} placeholder="Ex : Sarah" />
          </div>
          <div className="chips" role="group" aria-label="Police">
            {FONT_OPTIONS.map((f) => (
              <button key={f.key} aria-pressed={box.font === f.key} onClick={() => update({ font: f.key })}>{f.label}</button>
            ))}
          </div>
          <div className="sw" role="group" aria-label="Couleur du texte">
            {TEXT_COLORS.map((c) => (
              <button key={c.hex} title={c.name} aria-label={c.name} aria-pressed={box.textColor === c.hex} style={{ background: c.hex }} onClick={() => update({ textColor: c.hex })} />
            ))}
          </div>

          <div className="field">
            <span className="lbl">2. Couleur de la boîte</span>
            <div className="sw" role="group" aria-label="Couleur de la boîte">
              {BOX_COLORS.map((c) => (
                <button key={c.hex} title={c.name} aria-label={c.name} aria-pressed={box.boxColor === c.hex} style={{ background: c.hex }} onClick={() => update({ boxColor: c.hex })} />
              ))}
            </div>
          </div>

          <div className="field">
            <label htmlFor="msg">3. Message secret à l&apos;intérieur (optionnel)</label>
            <textarea id="msg" rows={3} maxLength={160} value={box.message} onChange={(e) => update({ message: e.target.value })} placeholder="Un mot doux sous le couvercle" />
          </div>

          <Link className="btn wide" href="/catalogue">Choisir les produits →</Link>
        </div>
      </div>
    </div>
  );
}

"use client";
import { Canvas } from "@react-three/fiber";
import { Model } from "./Model";
import { AdaptiveDpr, OrbitControls, Preload } from "@react-three/drei";
import { Suspense } from "react";

const ChrismasCanvas = () => {
  return (
    <Canvas camera={{ position: [0, 0, -500] }}>
      <ambientLight intensity={3} />
      <OrbitControls autoRotate rotateSpeed={2} enableZoom={false} />
      <Suspense fallback={null}>
        <Model />
        <Preload all />
        <AdaptiveDpr pixelated />
      </Suspense>
    </Canvas>
  );
};

export default ChrismasCanvas;

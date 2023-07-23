import { Cylinder } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import cylinderFragmentShader from "~/shaders/cylinderFragmentShader";
import cylinderVertexShader from "~/shaders/cylinderVertexShader";

export default function CylinderWork() {
  const cylinderRef = useRef(null);
  const idTexture = useLoader(THREE.TextureLoader, "/b.jpeg");

  const uniforms = {
    u_alpha: { value: 0.5 },
    u_texture1: { value: idTexture },
    u_dispFactor: { value: 1 },
    u_effectFactor: { value: 1 },
    // u_mouse: { value: new THREE.Vector2(0, 0) },
    // u_mouseIntensity: { value: 0.01 },
    // u_mouseRange: { value: 20.0 },
    // u_mousePos: {
    //   value: new THREE.Vector2(window.innerWidth, window.innerHeight),
    // },
  };

  return (
    <Cylinder
      args={[30, 30, 35.4, 100, 1, true, Math.PI / 2, Math.PI]}
      renderOrder={1}
      ref={cylinderRef}
    >
      <shaderMaterial
        vertexShader={cylinderVertexShader}
        fragmentShader={cylinderFragmentShader}
        side={THREE.BackSide}
        transparent
        uniforms={uniforms}
        defines={{ PR: window.devicePixelRatio.toFixed(1) }}
      />
    </Cylinder>
  );
}

import { Cylinder } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import cylinderFragmentShader from "~/shaders/cylinderFragmentShader";
import cylinderVertexShader from "~/shaders/cylinderVertexShader";

export default function CylinderWork() {
  const cylinderRef = useRef(null);
  const shaderRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [key, setKey] = useState("");

  const idTexture = useLoader(THREE.TextureLoader, "/b.jpeg");

  const uniforms = {
    u_alpha: { value: 0.5 },
    u_texture1: { value: idTexture },
    u_dispFactor: { value: 1 },
    u_effectFactor: { value: 1 },
    u_mouse: { value: new THREE.Vector2(0, 0) },
    u_mouseIntensity: { value: 0.01 },
    u_mouseRange: { value: 20.0 },
    u_mousePos: {
      value: new THREE.Vector2(windowWidth, windowHeight),
    },
  };

  useEffect(() => {
    function updateWindow() {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
      uniforms.u_mousePos.value.x = window.innerWidth;
      uniforms.u_mousePos.value.y = window.innerHeight;
      setKey(`${uniforms.u_mousePos.value.x}${uniforms.u_mousePos.value.y}`);
    }

    updateWindow();
    window.addEventListener("resize", updateWindow);
    return () => {
      window.removeEventListener("resize", updateWindow);
    };
  }, []);

  useEffect(() => {
    function handlePointerMove(e: MouseEvent) {
      const x = ((e.clientX - windowWidth / 2) / windowWidth) * 2;
      const y = -((e.clientY - windowHeight / 2) / windowHeight) * 2;

      gsap.to(uniforms.u_mouse.value, 1.25, {
        x,
        y,
        ease: "power3",
      });
    }

    window.addEventListener("mousemove", handlePointerMove);
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, [cylinderRef, windowWidth, shaderRef, key]);

  return (
    <Cylinder
      args={[30, 30, 35.4, 100, 1, true, Math.PI / 2, Math.PI]}
      renderOrder={1}
      ref={cylinderRef}
    >
      <shaderMaterial
        key={key}
        ref={shaderRef}
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

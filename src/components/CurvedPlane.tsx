import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import CylinderWork from "./CylinderWork";

export default function CurvedPlane() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    function updateWindow() {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }
    updateWindow();
    window.addEventListener("resize", updateWindow);
    return () => {
      window.removeEventListener("resize", updateWindow);
    };
  }, []);

  const windowHalfX = windowWidth / 2;
  const windowHalfY = windowHeight / 2;

  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      setMouseX(event.clientX - windowHalfX);
      setMouseY(event.clientY - windowHalfY);
    };
    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [windowWidth, windowHeight]);

  useFrame(() => {
    const sphereMesh = sphereRef.current;

    const smooth = 2.5;
    const targetX = mouseX * -0.00025;
    const targetXInvert = -targetX;
    const targetY = mouseY * 0.00025;

    if (sphereMesh) {
      sphereMesh.rotation.y +=
        0.04 * (targetXInvert - sphereMesh.rotation.y * smooth * 0.6);
      sphereMesh.rotation.x +=
        0.04 * (targetY - sphereMesh.rotation.x * smooth * 0.6);
    }
  });

  return (
    <>
      <Sphere args={[35, 100, 100]} ref={sphereRef}>
        <meshBasicMaterial opacity={0.05} transparent attach="material" wireframe />
        <CylinderWork />
      </Sphere>
    </>
  );
}

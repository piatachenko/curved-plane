import { Canvas } from "@react-three/fiber";
import CurvedPlane from "~/components/CurvedPlane";

function Home() {
  return (
    <Canvas style={{ height: "100vh", width: "100vw" }} shadows>
      <CurvedPlane />
    </Canvas>
  );
}

export default Home;

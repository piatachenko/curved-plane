import ReactFullpage from "@fullpage/react-fullpage";
import { Canvas } from "@react-three/fiber";
import CurvedPlane from "~/components/CurvedPlane";


function Home() {
  return (
    <>
      <Canvas
        style={{ height: "100vh", width: "100vw", position: "fixed", inset: 0 }}
        className="-z-10"
        shadows
      >
        <CurvedPlane />
      </Canvas>

      <div className="text-center text-8xl text-white">
        <ReactFullpage
        credits={{ enabled: true, label: "" }}
          render={() => (
            <ReactFullpage.Wrapper>
              <div className="section">sketch</div>
              <div className="section">instrument</div>
              <div className="section">lobe.ai</div>
              <div className="section">oh.studio</div>
              <div className="section">backstage talks</div>
              <div className="section">ableton</div>
            </ReactFullpage.Wrapper>
          )}
        />
      </div>
    </>
  );
}

export default Home;

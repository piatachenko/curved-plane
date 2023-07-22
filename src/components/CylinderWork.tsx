import { Cylinder } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function CylinderWork() {
  const cylinderRef = useRef(null);

  const idTexture = useLoader(THREE.TextureLoader, "/b.jpeg");

  const uniforms = {
    u_alpha: { value: .5 },
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
        vertexShader={[
          "precision mediump float;",
          "varying vec2 vUv;",
          "void main() {",
          "    vUv=uv;",
          "    gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);",
          "}",
        ].join("\n")}
        fragmentShader={[
          "uniform sampler2D u_texture1;",
          "uniform sampler2D u_texture2;",
          "uniform sampler2D u_displacement;",
          "uniform float u_dispFactor;",
          "uniform float u_effectFactor;",
          "uniform float u_alpha;",
          "uniform float u_mouseIntensity;",
          "uniform float u_mouseRange;",
          "uniform vec2 u_mouse;",
          "uniform vec2 u_mousePos;",
          "varying vec2 vUv;",
          "float circle(in vec2 _st, in float _radius, in float blurriness){",
          "    vec2 dist = _st;",
          "    return 1.-smoothstep(_radius-(_radius*blurriness), _radius+(_radius*blurriness), dot(dist,dist)*3.0);",
          "}",
          "void main(){",
          "    vec2 uv=vUv;",
          "    vec2 ratio = u_mousePos * PR;",
          "    vec2 st = gl_FragCoord.xy / ratio.xy - vec2(0.5);",
          "    st.y *= u_mousePos.y / u_mousePos.x;",
          "    vec2 mouse = u_mouse * -0.5;",
          "    vec2 circlePos = st + mouse;",
          "    float finalCircle = circle(circlePos, u_mouseIntensity, u_mouseRange)*5.0;",
          "    vec4 disp=texture2D(u_displacement,uv.yx);",
          "    vec2 distortedPosition=vec2(uv.x,uv.y+u_dispFactor*(disp*u_effectFactor));",
          "    vec2 distortedPosition2=vec2(uv.x,uv.y-(1.-u_dispFactor)*(disp*u_effectFactor));",
          "    vec4 _texture=texture2D(u_texture1,distortedPosition);",
          "    vec4 _texture2=texture2D(u_texture2,distortedPosition2);",
          "    vec4 finalTexture=mix(_texture,_texture2,u_dispFactor) * finalCircle;",
          "    finalTexture.a = u_alpha;",
          "    gl_FragColor=finalTexture;",
          "}",
        ].join("\n")}
        side={THREE.BackSide}
        transparent
        uniforms={uniforms}
        defines={{ PR: window.devicePixelRatio.toFixed(1) }}
      />
    </Cylinder>
  );
}

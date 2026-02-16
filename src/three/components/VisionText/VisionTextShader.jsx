// ./VisionTextShader.jsx
import * as THREE from "three";

export default function createVisionTextShader({
  container,
  textCanvas,
  width,
  height
}) {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });

  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.setSize(width, height);
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.top = "0";
  renderer.domElement.style.left = "0";
  renderer.domElement.style.pointerEvents = "none";
  renderer.domElement.style.zIndex = "1";

  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(
    -width / 2,
    width / 2,
    height / 2,
    -height / 2,
    0,
    10
  );

  camera.position.z = 1;

  const texture = new THREE.CanvasTexture(textCanvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  const material = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      uTexture: { value: texture },
      uTime: { value: 0.0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uDissolve: { value: 0.0 },
      uOpacity: { value: 1.0 }
    },
    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform float uDissolve;
        uniform float uOpacity;
        
        varying vec2 vUv;
        
        float hash(vec2 p){
            return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123);
        }
        
        float noise(vec2 p){
            vec2 i = floor(p);
            vec2 f = fract(p);
        
            float a = hash(i);
            float b = hash(i + vec2(1.0,0.0));
            float c = hash(i + vec2(0.0,1.0));
            float d = hash(i + vec2(1.0,1.0));
        
            vec2 u = f*f*(3.0-2.0*f);
        
            return mix(a,b,u.x) +
                   (c-a)*u.y*(1.0-u.x) +
                   (d-b)*u.x*u.y;
        }
        
        void main(){
        
            vec2 uv = vUv;
        
            // --- Subtle water refraction distortion ---
            float distortion = noise(uv * 6.0 + uTime * 0.3);
            uv += (distortion - 0.5) * 0.015;
        
            vec4 tex = texture2D(uTexture, uv);
            if(tex.a < 0.01) discard;
        
            // --- Depth light attenuation (darker lower) ---
            float depthFactor = 1.0 - vUv.y;
            vec3 depthTint = vec3(0.0, 0.25, 0.45);
            vec3 color = mix(tex.rgb, depthTint, 0.45);
            color *= mix(0.6, 1.2, depthFactor);
        
            // --- Caustic shimmer ---
            vec2 causticUV = vUv * 12.0;
            float c1 = noise(causticUV + uTime * 0.8);
            float c2 = noise(causticUV * 1.7 - uTime * 0.6);
            float caustics = smoothstep(0.75, 1.0, c1 * c2);
        
            color += vec3(1.0, 1.0, 0.9) * caustics * 0.35;
        
            // --- Dissolve ---
            float alphaFade = 1.0 - uDissolve;
            
            // Optional: ease curve so it feels natural
            alphaFade = pow(alphaFade, 1.5);
            
            gl_FragColor = vec4(color, tex.a * alphaFade * uOpacity);
           
        }
    `
  });

  const geometry = new THREE.PlaneGeometry(width, height);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  let animationId;

  function animate(t) {
    material.uniforms.uTime.value = t * 0.001;
    renderer.render(scene, camera);
    animationId = requestAnimationFrame(animate);
  }

  animate(0);

  function updateTexture() {
    texture.needsUpdate = true;
  }

  function setOpacity(value) {
      material.uniforms.uOpacity.value = value;
    }

  function resize(newWidth, newHeight) {
    renderer.setSize(newWidth, newHeight);
    material.uniforms.uResolution.value.set(newWidth, newHeight);
  }

  function setDissolve(value) {
      material.uniforms.uDissolve.value = value;
    }

  function dispose() {
    cancelAnimationFrame(animationId);
    geometry.dispose();
    material.dispose();
    texture.dispose();
    renderer.dispose();
    container.removeChild(renderer.domElement);
  }

    return {
      updateTexture,
      resize,
      dispose,
      setDissolve,
      setOpacity
    };
}

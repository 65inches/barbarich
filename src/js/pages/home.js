import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initHomePage() {
  // Home video
  const homeVideoDiv = document.querySelector('.home-video');
  const homeVideo = document.querySelector('video');
  const homeVideoMuteBtn = homeVideoDiv?.querySelector('button');
  const homeVideoMuteBtnTxt = homeVideoMuteBtn?.querySelector('.btn-value');

  homeVideoMuteBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    homeVideo.muted = !homeVideo.muted;
    homeVideoMuteBtn.dataset.state = homeVideo.muted ? 'muted' : 'unmuted';
    homeVideoMuteBtnTxt.textContent = homeVideo.muted ? 'Unmute' : 'Mute';
  });

  homeVideo?.addEventListener('click', (e) => {
    e.preventDefault();
    homeVideo.paused ? homeVideo.play() : homeVideo.pause();
  });

  //Scrollers
  const section = document.querySelector('.members');

  const scrollers = section?.querySelectorAll('.scroller').forEach((el) => {
    const scrollerContent = Array.from(el.children);
    for (let i = 0; i < 2; i++) {
      scrollerContent.forEach((item) => {
        const dummy = item.cloneNode(true);
        dummy.setAttribute('aria-hidden', true);
        el.appendChild(dummy);
      });
    }
  });

  const membersTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.members',
      start: 'top bottom',
      end: '+200% top',
      scrub: true,
    },
    defaults: { ease: 'none' },
  });

  membersTimeline.fromTo(
    section.querySelector('.scroller'),
    { xPercent: 0 },
    { xPercent: -50 },
    0
  );
  membersTimeline.fromTo(
    section.querySelector('.scroller[data-scroll-direction]'),
    { xPercent: -50 },
    { xPercent: 0 },
    0
  );

  // initCanvas();
}

// function initCanvas() {
//   const scene = new THREE.Scene();
//   const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
//   const renderer = new THREE.WebGLRenderer({
//     canvas: document.getElementById('webglCanvas'),
//   });
//   renderer.setSize(window.innerWidth, window.innerHeight);

//   // Render targets
//   const res = { x: window.innerWidth, y: window.innerHeight };
//   const targets = [0, 1, 2].map(
//     () => new THREE.WebGLRenderTarget(res.x, res.y)
//   );

//   const uniforms = {
//     u_resolution: {
//       value: new THREE.Vector2(window.innerWidth, window.innerHeight),
//     },
//     u_mouse: { value: new THREE.Vector2(0.0, 0.0) },
//     u_time: { value: 0.0 },
//   };

//   // Shaders
//   const material = new THREE.ShaderMaterial({
//     uniforms: uniforms,
//     vertexShader: `
//         varying vec2 vUv;
//         void main() {
//             vUv = uv;
//             gl_Position = vec4(position, 1.0);
//         }
//     `,
//     fragmentShader: `
//         uniform vec2 u_resolution;
//         uniform vec2 u_mouse;
//         uniform float u_time;
//         varying vec2 vUv;

//         vec3 blur(vec2 uv, float radius, vec3 baseColor) {
//             vec3 color = vec3(0.0);
//             float totalWeight = 0.0;

//             // Fixed constant loop bounds
//             const int kernelSize = 5; // Number of steps in each direction

//             for (int x = -kernelSize; x <= kernelSize; x++) {
//                 for (int y = -kernelSize; y <= kernelSize; y++) {
//                     vec2 offset = vec2(float(x), float(y)) / u_resolution;
//                     float weight = exp(-(float(x * x + y * y)) / (2.0 * radius * radius));
//                     vec2 sampleUV = uv + offset;

//                     // Blend colors at sampleUV
//                     vec3 sampleColor = baseColor; // Use baseColor instead of generating a new color
//                     color += sampleColor * weight;
//                     totalWeight += weight;
//                 }
//             }

//             return color / totalWeight;
//         }

//        void main() {
//             vec2 st = gl_FragCoord.xy / u_resolution.xy;

//             // Base colors
//             vec3 baseColor = vec3(0.043, 0.043, 0.192);  // Background color
//             vec3 pinkShape = vec3(0.796, 0.533, 0.976);  // Pink shape
//             vec3 whiteShape = vec3(0.369, 0.365, 0.682); // White shape
//             vec3 cursorColor = vec3(0.796, 0.533, 0.97); // Cursor color

//             // Circular gradient calculations
//             float pinkCircle = smoothstep(0.700, 0.048 * sin(u_time), length(st - vec2(1.0, 0.170)));
//             float whiteCircle = smoothstep(0.660, 0.000 * sin(u_time), length(st - vec2(0.230, 0.980)));
//             vec2 cursorPos = u_mouse.xy / u_resolution.xy;

//             // Adjust for aspect ratio
//             vec2 aspectRatio = vec2(u_resolution.x / u_resolution.y, 1.0);
//             vec2 correctedSt = st * aspectRatio;

//             // Compute the distance for a circle
//             float cursorCircle = smoothstep(0.25, 0.0, length(correctedSt - cursorPos * aspectRatio));

//             // Combine the gradients
//             vec3 blendedGradient = mix(baseColor, pinkShape, pinkCircle);
//             blendedGradient = mix(blendedGradient, whiteShape, whiteCircle);
//             // Add cursor color with alpha blending
//             float cursorAlpha = 0.25;
//             blendedGradient = mix(blendedGradient, cursorColor, cursorAlpha * cursorCircle);

//             // Apply Gaussian blur to the blended gradient
//             vec3 blurredColor = blur(st, 5.0, blendedGradient);

//             gl_FragColor = vec4(blurredColor, 1.0);
//         }
//     `,
//   });

//   // Quad to display shader
//   const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
//   scene.add(quad);
//   // Render loop

//   // Mouse movement
//   window.addEventListener('mousemove', (event) => {
//     uniforms.u_mouse.value.set(
//       event.clientX,
//       window.innerHeight - event.clientY
//     );
//   });

//   // Animation loop
//   const clock = new THREE.Clock();

//   function animate() {
//     uniforms.u_time.value = clock.getElapsedTime();
//     renderer.render(scene, camera);
//     requestAnimationFrame(animate);
//   }

//   // Start animation
//   animate();
// }

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import {
  LuX,
  LuSparkles,
  LuCompass,
} from "react-icons/lu";

export default function AI3DPovModal({ isOpen, onClose, locationName, imageUrl }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1100);
    camera.position.set(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. 3D Inverted Sphere Geometry
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // Flip geometry inside out

    // 3. Load Panorama Texture
    const textureSrc = imageUrl || "/images/3d-pov/sample_360.png";
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(textureSrc);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 4. Smooth Camera Pan States (Lon/Lat with Damping)
    let isUserInteracting = false;
    let onPointerDownPointerX = 0;
    let onPointerDownPointerY = 0;
    let lon = 0;
    let targetLon = 0;
    let onPointerDownLon = 0;
    let lat = 0;
    let targetLat = 0;
    let onPointerDownLat = 0;
    let phi = 0;
    let theta = 0;

    const onPointerDown = (event) => {
      isUserInteracting = true;
      const clientX = event.clientX || (event.touches && event.touches[0].clientX);
      const clientY = event.clientY || (event.touches && event.touches[0].clientY);
      onPointerDownPointerX = clientX;
      onPointerDownPointerY = clientY;
      onPointerDownLon = lon;
      onPointerDownLat = lat;
    };

    const onPointerMove = (event) => {
      if (!isUserInteracting) return;
      const clientX = event.clientX || (event.touches && event.touches[0].clientX);
      const clientY = event.clientY || (event.touches && event.touches[0].clientY);
      targetLon = (onPointerDownPointerX - clientX) * 0.15 + onPointerDownLon;
      targetLat = (clientY - onPointerDownPointerY) * 0.15 + onPointerDownLat;
    };

    const onPointerUp = () => {
      isUserInteracting = false;
    };

    const onWheel = (event) => {
      camera.fov = Math.max(30, Math.min(90, camera.fov + event.deltaY * 0.05));
      camera.updateProjectionMatrix();
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    domElement.addEventListener("wheel", onWheel);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 5. Smooth Animation Render Loop with Inertia / Damping
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto gentle rotate if user is idle
      if (!isUserInteracting) {
        targetLon += 0.05;
      }

      // Smooth lerp for camera rotation
      lon += (targetLon - lon) * 0.1;
      lat += (targetLat - lat) * 0.1;

      targetLat = Math.max(-85, Math.min(85, targetLat));
      lat = Math.max(-85, Math.min(85, lat));

      phi = THREE.MathUtils.degToRad(90 - lat);
      theta = THREE.MathUtils.degToRad(lon);

      const targetX = 500 * Math.sin(phi) * Math.cos(theta);
      const targetY = 500 * Math.cos(phi);
      const targetZ = 500 * Math.sin(phi) * Math.sin(theta);

      camera.lookAt(targetX, targetY, targetZ);
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      if (domElement) {
        domElement.removeEventListener("pointerdown", onPointerDown);
        domElement.removeEventListener("wheel", onWheel);
        if (container.contains(domElement)) {
          container.removeChild(domElement);
        }
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [isOpen, imageUrl]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col w-screen h-screen overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full h-full flex flex-col relative"
      >
        {/* Header Bar */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent px-4 sm:px-6 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold shrink-0 shadow-sm">
              <LuSparkles className="size-3.5 text-emerald-400" />
              <span>AI 3D POV</span>
            </div>
            <h3 className="text-white text-xs sm:text-sm font-bold truncate max-w-[200px] sm:max-w-md">
              {locationName || "Area Rampa & Pintu Aksesibel"}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-9 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 flex items-center justify-center transition-colors cursor-pointer backdrop-blur-md"
          >
            <LuX className="size-5" />
          </button>
        </div>

        {/* 3D WebGL Canvas Container (Full Screen) */}
        <div className="relative w-full h-full bg-black cursor-grab active:cursor-grabbing">
          <div ref={mountRef} className="w-full h-full" />

          {/* Controls Bar Overlay (ONLY Geser 360°) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md border border-white/15 rounded-full px-5 py-2.5 flex items-center gap-2 text-white text-xs z-20 shadow-lg">
            <LuCompass className="size-4 text-emerald-400" />
            <span className="font-medium text-gray-200">Geser 360°</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

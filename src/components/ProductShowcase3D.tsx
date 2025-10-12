import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import * as THREE from 'three';

const Watch3D = () => {
  // Create a simple luxury watch using Three.js primitives
  return (
    <group>
      {/* Watch case */}
      <mesh castShadow>
        <cylinderGeometry args={[1.2, 1.2, 0.3, 64]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
      
      {/* Watch bezel - gold ring */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <torusGeometry args={[1.2, 0.1, 16, 64]} />
        <meshStandardMaterial 
          color="#d4af37" 
          metalness={1} 
          roughness={0.2}
          emissive="#d4af37"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Watch face */}
      <mesh position={[0, 0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.1, 64]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          metalness={0.8} 
          roughness={0.3}
        />
      </mesh>
      
      {/* Hour markers (gold) */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * Math.PI) / 6;
        const radius = 0.9;
        return (
          <mesh
            key={i}
            position={[
              Math.sin(angle) * radius,
              0.17,
              Math.cos(angle) * radius,
            ]}
          >
            <boxGeometry args={[0.05, 0.01, 0.15]} />
            <meshStandardMaterial 
              color="#d4af37" 
              metalness={1} 
              roughness={0.1}
              emissive="#d4af37"
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}
      
      {/* Hour hand */}
      <mesh position={[0, 0.18, -0.3]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.08, 0.02, 0.5]} />
        <meshStandardMaterial 
          color="#d4af37" 
          metalness={1} 
          roughness={0.1}
        />
      </mesh>
      
      {/* Minute hand */}
      <mesh position={[0, 0.19, -0.5]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.06, 0.02, 0.7]} />
        <meshStandardMaterial 
          color="#d4af37" 
          metalness={1} 
          roughness={0.1}
        />
      </mesh>
      
      {/* Center crown */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 32]} />
        <meshStandardMaterial 
          color="#d4af37" 
          metalness={1} 
          roughness={0.1}
        />
      </mesh>
    </group>
  );
};

export const ProductShowcase3D = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 bg-luxury-noir relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-serif text-luxury-white mb-6">
            Experience <span className="luxury-text-gradient">Perfection</span>
          </h2>
          <p className="text-xl text-luxury-cream max-w-2xl mx-auto">
            Interact with our masterpiece. Rotate, zoom, and explore every exquisite detail of craftsmanship.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-luxury-charcoal rounded-2xl p-8 shadow-[var(--shadow-luxury)]">
            <div className="h-[600px] rounded-xl overflow-hidden bg-gradient-to-br from-luxury-noir to-luxury-charcoal">
              <Canvas 
                shadows
                onCreated={({ gl }) => {
                  gl.domElement.addEventListener('webglcontextlost', (event) => {
                    event.preventDefault();
                    console.warn('WebGL context lost, attempting to restore...');
                  });
                  gl.domElement.addEventListener('webglcontextrestored', () => {
                    console.log('WebGL context restored');
                  });
                }}
              >
                <PerspectiveCamera makeDefault position={[0, 2, 5]} />
                <OrbitControls 
                  enablePan={false} 
                  minDistance={3} 
                  maxDistance={8}
                  autoRotate
                  autoRotateSpeed={0.5}
                  enableDamping={true}
                  dampingFactor={0.05}
                />
                
                {/* Lighting */}
                <ambientLight intensity={0.3} />
                <spotLight
                  position={[5, 5, 5]}
                  angle={0.3}
                  penumbra={1}
                  intensity={2}
                  castShadow
                  shadow-mapSize-width={2048}
                  shadow-mapSize-height={2048}
                />
                <spotLight
                  position={[-5, 5, -5]}
                  angle={0.3}
                  penumbra={1}
                  intensity={1}
                  castShadow
                />
                <pointLight position={[0, 3, 0]} intensity={0.5} color="#d4af37" />
                
                {/* 3D Watch */}
                <Watch3D />
                
                {/* Environment for reflections */}
                <Environment preset="studio" />
              </Canvas>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-luxury-cream text-sm">
                <span className="text-luxury-gold font-semibold">Tip:</span> Drag to rotate • Scroll to zoom
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

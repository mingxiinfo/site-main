// Cook-Hire 3D - Hero Scene Component
// M→X→M字母液体变化 + 多形状粒子系统

'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  Float,
  MeshDistortMaterial,
  Text,
} from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// ============================================
// M→X→M 字母液体变化动画
// ============================================
const MorphingLetter: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const textRef = useRef<THREE.Mesh>(null);
  const [currentLetter, setCurrentLetter] = useState('M');

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // 旋转整个组
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
    }

    // 计算当前应该显示的字母 (M -> X -> M 循环)
    const cycle = t % 6; // 6秒一个完整循环
    let letter = 'M';
    if (cycle >= 2 && cycle < 4) {
      letter = 'X';
    }

    // 更新字母
    if (letter !== currentLetter) {
      setCurrentLetter(letter);
    }

    // 在变化时添加缩放和波动动画
    if (textRef.current) {
      if ((cycle > 1.8 && cycle < 2.2) || (cycle > 3.8 && cycle < 4.2)) {
        const progress = ((cycle % 2) - 1.8) / 0.4; // 0到1的进度
        const scale = 1 + Math.sin(progress * Math.PI) * 0.3;
        textRef.current.scale.set(scale, scale, scale);
      } else {
        textRef.current.scale.set(1, 1, 1);
      }

      // 持续的液体波动
      textRef.current.rotation.z = Math.sin(t * 1.5) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
        <Text
          ref={textRef}
          fontSize={2.5}
          maxWidth={200}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
        >
          {currentLetter}
          <MeshDistortMaterial
            color="#8b5cf6"
            distort={0.5}
            speed={2.5}
            roughness={0.1}
            metalness={0.9}
            emissive="#7c3aed"
            emissiveIntensity={0.7}
          />
        </Text>
      </Float>

      {/* 外围光环 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#06b6d4"
          transparent
          opacity={0.5}
          emissive="#06b6d4"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* 中环 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.2, 0.06, 16, 100]} />
        <meshStandardMaterial
          color="#8b5cf6"
          transparent
          opacity={0.4}
          emissive="#8b5cf6"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* 内环 - 快速旋转 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.04, 16, 100]} />
        <meshStandardMaterial
          color="#fde047"
          transparent
          opacity={0.3}
          emissive="#fde047"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
};

// ============================================
// 多形状粒子 - 球体、锥体、正方体、金字塔
// ============================================
const MultiShapeParticle: React.FC<{
  position: [number, number, number];
  shape: 'sphere' | 'cone' | 'box' | 'tetrahedron';
  color: string;
  delay: number;
}> = ({ position, shape, color, delay }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime() + delay;
      meshRef.current.rotation.x = t * 0.5;
      meshRef.current.rotation.y = t * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.3;
    }
  });

  const renderShape = () => {
    const material = (
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.7}
        metalness={0.7}
        roughness={0.3}
        emissive={color}
        emissiveIntensity={0.2}
      />
    );

    switch (shape) {
      case 'sphere':
        return (
          <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[0.15, 16, 16]} />
            {material}
          </mesh>
        );
      case 'cone':
        return (
          <mesh ref={meshRef} position={position}>
            <coneGeometry args={[0.15, 0.3, 8]} />
            {material}
          </mesh>
        );
      case 'box':
        return (
          <mesh ref={meshRef} position={position}>
            <boxGeometry args={[0.25, 0.25, 0.25]} />
            {material}
          </mesh>
        );
      case 'tetrahedron':
        return (
          <mesh ref={meshRef} position={position}>
            <tetrahedronGeometry args={[0.2]} />
            {material}
          </mesh>
        );
    }
  };

  return <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>{renderShape()}</Float>;
};

// ============================================
// 多形状粒子场 - 使用实际的3D几何体
// ============================================
const MultiShapeParticleField: React.FC<{ count: number; layer: number }> = ({ count, layer }) => {
  const particles = useMemo(() => {
    const shapes: ('sphere' | 'cone' | 'box' | 'tetrahedron')[] = ['sphere', 'cone', 'box', 'tetrahedron'];
    const colors = ['#8b5cf6', '#06b6d4', '#fde047', '#a78bfa'];
    const radius = 12 + layer * 4;

    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * radius,
        (Math.random() - 0.5) * radius,
        (Math.random() - 0.5) * radius,
      ] as [number, number, number],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * Math.PI * 2,
    }));
  }, [count, layer]);

  return (
    <group>
      {particles.map((particle, i) => (
        <MultiShapeParticle
          key={`${layer}-${i}`}
          position={particle.position}
          shape={particle.shape}
          color={particle.color}
          delay={particle.delay}
        />
      ))}
    </group>
  );
};

// ============================================
// 场景组装
// ============================================
const Scene: React.FC = () => {
  return (
    <>
      {/* 环境光 */}
      <ambientLight intensity={0.4} />

      {/* 主光源 */}
      <pointLight position={[10, 10, 10]} intensity={2} color="#8b5cf6" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#06b6d4" />
      <pointLight position={[0, -10, 5]} intensity={1} color="#fde047" />
      <spotLight position={[0, 15, 0]} intensity={0.8} angle={0.4} penumbra={1} color="#a78bfa" />

      {/* M→X→M 字母液体变化 */}
      <MorphingLetter />

      {/* 多形状粒子系统 - 3层 */}
      <MultiShapeParticleField count={30} layer={0} />
      <MultiShapeParticleField count={25} layer={1} />
      <MultiShapeParticleField count={20} layer={2} />
    </>
  );
};

// ============================================
// 主组件
// ============================================
const HeroScene: React.FC = () => {
  return (
    <div className="w-full h-[600px] md:h-[800px]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
        <Scene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
        <EffectComposer>
          <Bloom
            intensity={0.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default HeroScene;

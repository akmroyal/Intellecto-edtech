import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useFBX } from "@react-three/drei";
import * as THREE from "three";

interface AvatarModelProps {
  talking: boolean;
}

const AvatarModel: React.FC<AvatarModelProps> = ({ talking }) => {
  const group = useRef<THREE.Group>(null);

  const { scene } = useGLTF("/models/teacher.glb") as { scene: THREE.Group };
  const idleAnim = useFBX("/animations/Standing_Idle.fbx");
  const talkingAnim = useFBX("/animations/Talking.fbx");

  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const idleAction = useRef<THREE.AnimationAction | null>(null);
  const talkingAction = useRef<THREE.AnimationAction | null>(null);

  // Initialize animations
  useEffect(() => {
    if (scene && idleAnim && talkingAnim) {
      mixer.current = new THREE.AnimationMixer(scene);
      idleAction.current = mixer.current.clipAction(idleAnim.animations[0], scene);
      talkingAction.current = mixer.current.clipAction(talkingAnim.animations[0], scene);
      idleAction.current.play();
    }
  }, [scene, idleAnim, talkingAnim]);

  // Switch idle/talking
  useEffect(() => {
    if (!mixer.current) return;
    if (talking) {
      idleAction.current?.fadeOut(0.3);
      talkingAction.current?.reset().fadeIn(0.3).play();
    } else {
      talkingAction.current?.fadeOut(0.3);
      idleAction.current?.reset().fadeIn(0.3).play();
    }
  }, [talking]);

  // Update mixer each frame
  useFrame((_, delta) => mixer.current?.update(delta));

  // Fallback: show simple box if model/animations fail
  if (!scene || !idleAnim || !talkingAnim) {
    return (
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial color={talking ? "red" : "gray"} />
      </mesh>
    );
  }

  return <primitive ref={group} object={scene} scale={1.5} position={[0, -1.5, 0]} />;
};

const AvatarScene: React.FC = () => {
  const [talking, setTalking] = useState<boolean>(false);

  const handleSpeak = () => {
    if (!talking) {
      const utter = new SpeechSynthesisUtterance(
        "Hello students, today we will learn about Artificial Intelligence."
      );
      utter.lang = "en-IN";
      utter.onstart = () => setTalking(true);
      utter.onend = () => setTalking(false);
      speechSynthesis.speak(utter);
    } else {
      speechSynthesis.cancel();
      setTalking(false);
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas camera={{ position: [0, 1.0, 3], fov: 40 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[2, 2, 5]} intensity={3} />
        <OrbitControls enableZoom={false} />
        <AvatarModel talking={talking} />
      </Canvas>

      <button
        onClick={handleSpeak}
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          padding: "12px 24px",
          fontSize: "18px",
          borderRadius: "8px",
          background: talking ? "red" : "green",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {talking ? "Stop" : "Speak"}
      </button>
    </div>
  );
};

export default AvatarScene;

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useFBX } from "@react-three/drei";
import * as THREE from "three";

interface AvatarModelProps {
  talking: boolean;
}

const AvatarModel: React.FC<AvatarModelProps> = ({ talking }) => {
  const group = useRef<THREE.Group>(null);

  // Main avatar model (GLB)
  const { scene } = useGLTF(
    "https://models.readyplayer.me/68cea2f5665bc541b1398552.glb"
  ) as { scene: THREE.Group };

  // Animations (FBX)
  const idleAnim = useFBX("/Standing_Idle.fbx");
  const talkingAnim = useFBX("/Talking.fbx");

  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const idleAction = useRef<THREE.AnimationAction | null>(null);
  const talkingAction = useRef<THREE.AnimationAction | null>(null);

  // Initialize animations when FBX loads
  useEffect(() => {
    if (scene && idleAnim.animations.length && talkingAnim.animations.length) {
      mixer.current = new THREE.AnimationMixer(scene);

      idleAction.current = mixer.current.clipAction(idleAnim.animations[0], scene);
      talkingAction.current = mixer.current.clipAction(talkingAnim.animations[0], scene);

      idleAction.current.play();
    }
  }, [scene, idleAnim, talkingAnim]);

  // Switch between idle/talking
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

  // Keep model oriented correctly



  useEffect(() => {
    if (group.current) { group.current.rotation.set(1.5, Math.PI, 3); 
     group.current.position.y = -1.9;
      group.current.position.z = 0.1; 
      group.current.position.x = 0.1; }

   
  }, [scene]);

  return <primitive ref={group} object={scene} scale={2} />;
};

const AvatarScene: React.FC = () => {
  const [talking, setTalking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Load voices
  useEffect(() => {
    const handleVoicesChanged = () => {
      const voices = window.speechSynthesis.getVoices();
      console.log("Voices found:", voices.map(v => v.name));

      // Prefer male English voices
      const maleVoiceNames = ["google uk english male", "microsoft david", "alex"];
      let voiceToSelect = voices.find(v =>
        maleVoiceNames.some(name => v.name.toLowerCase().includes(name))
      );
      if (!voiceToSelect) {
        voiceToSelect = voices.find(v => v.lang.includes("en-"));
      }
      setSelectedVoice(voiceToSelect || voices[0] || null);
    };

    speechSynthesis.onvoiceschanged = handleVoicesChanged;
    handleVoicesChanged();
  }, []);

  // Speech synthesis handler
  const handleSpeak = () => {
    if (!talking) {
      if (!selectedVoice) return;

      const text =
        "Hello students, today we will learn about Artificial Intelligence. 21st century skills like critical thinking, creativity, and collaboration are essential for success. Let's explore how AI is shaping our future.";

      const utter = new SpeechSynthesisUtterance(text);
      utter.voice = selectedVoice;
      utter.lang = selectedVoice.lang;

      utter.onstart = () => setTalking(true);
      utter.onend = () => setTalking(false);
      utter.onerror = () => setTalking(false);

      speechSynthesis.speak(utter);
    } else {
      speechSynthesis.cancel();
      setTalking(false);
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* Speak button */}
      <button
        onClick={handleSpeak}
        style={{
          position: "absolute",
          top: 20,
          left: "80%",
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

      {/* Avatar panel */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 5,
          width: "500px",
          height: "800px",
          overflow: "hidden",
          border: "1px solid transparent",
        }}
      >
        <Canvas
          style={{ width: "100%", height: "100%" }}
          camera={{ position: [0, 1.5, 4], fov: 50 }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[2, 4, 5]} intensity={1.2} />
          <AvatarModel talking={talking} />
        </Canvas>
      </div>
    </div>
  );
};

export default AvatarScene;

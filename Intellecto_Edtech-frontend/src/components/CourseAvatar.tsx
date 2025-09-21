// import React, { useRef, useEffect, useState } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { useGLTF, useFBX } from "@react-three/drei";
// import * as THREE from "three";
// import { Button } from "@/components/ui/button";
// import { Volume2, VolumeX, Play, Pause } from "lucide-react";

// interface AvatarModelProps {
//   talking: boolean;
// }

// const AvatarModel: React.FC<AvatarModelProps> = ({ talking }) => {
//   const group = useRef<THREE.Group>(null);

//   // Main avatar model (GLB)
//   const { scene } = useGLTF(
//     "https://models.readyplayer.me/68cea2f5665bc541b1398552.glb"
//   ) as { scene: THREE.Group };

//   // Animations (FBX)
//   const idleAnim = useFBX("/Standing_Idle.fbx");
//   const talkingAnim = useFBX("/Talking.fbx");

//   const mixer = useRef<THREE.AnimationMixer | null>(null);
//   const idleAction = useRef<THREE.AnimationAction | null>(null);
//   const talkingAction = useRef<THREE.AnimationAction | null>(null);

//   // Initialize animations when FBX loads
//   useEffect(() => {
//     if (scene && idleAnim.animations.length && talkingAnim.animations.length) {
//       mixer.current = new THREE.AnimationMixer(scene);

//       idleAction.current = mixer.current.clipAction(idleAnim.animations[0], scene);
//       talkingAction.current = mixer.current.clipAction(talkingAnim.animations[0], scene);

//       idleAction.current.play();
//     }
//   }, [scene, idleAnim, talkingAnim]);

//   // Switch between idle/talking
//   useEffect(() => {
//     if (!mixer.current) return;

//     if (talking) {
//       idleAction.current?.fadeOut(0.3);
//       talkingAction.current?.reset().fadeIn(0.3).play();
//     } else {
//       talkingAction.current?.fadeOut(0.3);
//       idleAction.current?.reset().fadeIn(0.3).play();
//     }
//   }, [talking]);

//   // Update mixer each frame
//   useFrame((_, delta) => mixer.current?.update(delta));

//   // Keep model oriented correctly - exactly same as Model.tsx
//   useEffect(() => {
//     if (group.current) { 
//       group.current.rotation.set(1.5, Math.PI, 3); 
//       group.current.position.y = -1.9;
//       group.current.position.z = 0.1; 
//       group.current.position.x = 0.1; 
//     }
//   }, [scene]);

//   return <primitive ref={group} object={scene} scale={2} />;
// };

// interface CourseAvatarProps {
//   className?: string;
// }

// const CourseAvatar: React.FC<CourseAvatarProps> = ({ className = "" }) => {
//   const [talking, setTalking] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

//   // Load available voices
//   useEffect(() => {
//     const handleVoicesChanged = () => {
//       const voices = window.speechSynthesis.getVoices();
//       console.log("Voices found:", voices.map(v => v.name));

//       // Prefer male English voices
//       const maleVoiceNames = ["google uk english male", "microsoft david", "alex"];
//       let voiceToSelect = voices.find(v =>
//         maleVoiceNames.some(name => v.name.toLowerCase().includes(name))
//       );
//       if (!voiceToSelect) {
//         voiceToSelect = voices.find(v => v.lang.includes("en-"));
//       }
//       setSelectedVoice(voiceToSelect || voices[0] || null);
//     };

//     speechSynthesis.onvoiceschanged = handleVoicesChanged;
//     handleVoicesChanged();
//   }, []);

//   // Speech synthesis handler
//   const handleSpeak = () => {
//     if (!talking && !isMuted) {
//       if (!selectedVoice) {
//         console.warn("No voice available for speech synthesis");
//         return;
//       }

//       const text = "Hello students, today we will learn about Artificial Intelligence. 21st century skills like critical thinking, creativity, and collaboration are essential for success. Let's explore how AI is shaping our future.";

//       const utterance = new SpeechSynthesisUtterance(text);
      
//       utterance.voice = selectedVoice;
//       utterance.lang = selectedVoice.lang;
//       utterance.rate = 0.9; // Slightly slower for educational content
//       utterance.pitch = 1.0;

//       utterance.onstart = () => setTalking(true);
//       utterance.onend = () => setTalking(false);
//       utterance.onerror = () => setTalking(false);

//       speechSynthesis.speak(utterance);
//     } else if (talking) {
//       speechSynthesis.cancel();
//       setTalking(false);
//     }
//   };

//   const toggleMute = () => {
//     if (talking) {
//       speechSynthesis.cancel();
//       setTalking(false);
//     }
//     setIsMuted(!isMuted);
//   };

//   return (
//     <div className={`relative h-full w-full ${className}`}>
//       {/* 3D Avatar Canvas */}
//       <div className="absolute inset-0">
//         <Canvas
//           camera={{ position: [0, 1.5, 4], fov: 50 }}
//           style={{ background: "transparent" }}
//         >
//           <ambientLight intensity={0.8} />
//           <directionalLight position={[2, 4, 5]} intensity={1.2} />
//           <directionalLight position={[-2, 2, 2]} intensity={0.6} />
//           <AvatarModel talking={talking} />
//         </Canvas>
//       </div>

//       {/* Speech Controls Overlay */}
//       <div className="absolute top-4 right-4 flex gap-2 z-10">
//         <Button
//           variant="secondary"
//           size="sm"
//           onClick={toggleMute}
//           className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
//         >
//           {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
//         </Button>
        
//         <Button
//           variant={talking ? "destructive" : "default"}
//           size="sm"
//           onClick={handleSpeak}
//           disabled={isMuted}
//           className={`${
//             talking 
//               ? "bg-red-500 hover:bg-red-600" 
//               : "bg-blue-600 hover:bg-blue-700"
//           } text-white backdrop-blur-sm`}
//         >
//           {talking ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
//         </Button>
//       </div>

//       {/* Avatar Status Indicator */}
//       <div className="absolute bottom-4 left-4 z-10">
//         <div className="bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
//           <div className={`w-3 h-3 rounded-full ${talking ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
//           <span className="text-sm font-medium">
//             {talking ? "Speaking..." : "AI Instructor Ready"}
//           </span>
//         </div>
//       </div>

//       {/* Loading Fallback */}
//       {!selectedVoice && (
//         <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 backdrop-blur-sm z-20">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
//             <p className="text-sm text-gray-600">Loading AI Instructor...</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CourseAvatar;


import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useFBX } from "@react-three/drei";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

interface AvatarModelProps {
  talking: boolean;
}

const AvatarModel: React.FC<AvatarModelProps> = ({ talking }) => {
  const group = useRef<THREE.Group>(null);

  // Main avatar model (GLB) - preload for faster loading
  const { scene } = useGLTF(
    "https://models.readyplayer.me/68cea2f5665bc541b1398552.glb",
    true // Enable Draco compression for faster loading
  ) as { scene: THREE.Group };

  // Animations (FBX) - preload
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

  // Keep model oriented correctly - exactly same as Model.tsx
  useEffect(() => {
    if (group.current) { 
      group.current.rotation.set(1.5, Math.PI, 3); 
      group.current.position.y = -1.9;
      group.current.position.z = 0.1; 
      group.current.position.x = 0.1; 
    }
  }, [scene]);

  return <primitive ref={group} object={scene} scale={2} />;
};

interface CourseAvatarProps {
  className?: string;
  aiResponse?: string; // New prop for AI responses
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
}

const CourseAvatar: React.FC<CourseAvatarProps> = ({ 
  className = "", 
  aiResponse,
  onSpeechStart,
  onSpeechEnd 
}) => {
  const [talking, setTalking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [hasSpokenInitial, setHasSpokenInitial] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load available voices
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
      setIsLoading(false);
    };

    speechSynthesis.onvoiceschanged = handleVoicesChanged;
    handleVoicesChanged();
  }, []);

  // Auto-speak AI responses
  useEffect(() => {
    if (aiResponse && !isMuted && selectedVoice && !talking) {
      speakText(aiResponse);
    }
  }, [aiResponse, isMuted, selectedVoice]);

  // Speak initial text only once when component mounts
  useEffect(() => {
    if (selectedVoice && !hasSpokenInitial && !isMuted) {
      const initialText = "Hello students, today we will learn about Artificial Intelligence. 21st century skills like critical thinking, creativity, and collaboration are essential for success. Let's explore how AI is shaping our future.";
      speakText(initialText);
      setHasSpokenInitial(true);
    }
  }, [selectedVoice, hasSpokenInitial, isMuted]);

  // Text to speech function
  const speakText = (text: string) => {
    if (!selectedVoice || isMuted || talking) return;

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice.lang;
    utterance.rate = 0.9; // Slightly slower for educational content
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setTalking(true);
      onSpeechStart?.();
    };
    
    utterance.onend = () => {
      setTalking(false);
      onSpeechEnd?.();
    };
    
    utterance.onerror = () => {
      setTalking(false);
      onSpeechEnd?.();
    };

    speechSynthesis.speak(utterance);
  };

  // Manual speech control (for emergency stop)
  const handleManualSpeak = () => {
    if (talking) {
      speechSynthesis.cancel();
      setTalking(false);
    } else {
      const manualText = "How can I help you with your learning today?";
      speakText(manualText);
    }
  };

  const toggleMute = () => {
    if (talking) {
      speechSynthesis.cancel();
      setTalking(false);
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className={`relative h-full w-full ${className}`}>
      {/* 3D Avatar Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 1.5, 4], fov: 50 }}
          style={{ background: "transparent" }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]} // Optimize performance
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[2, 4, 5]} intensity={1.2} />
          <directionalLight position={[-2, 2, 2]} intensity={0.6} />
          <AvatarModel talking={talking} />
        </Canvas>
      </div>

      {/* Speech Controls Overlay */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <Button
          variant="secondary"
          size="sm"
          onClick={toggleMute}
          className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
          title={isMuted ? "Unmute Avatar" : "Mute Avatar"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>
        
        <Button
          variant={talking ? "destructive" : "default"}
          size="sm"
          onClick={handleManualSpeak}
          disabled={isMuted}
          className={`${
            talking 
              ? "bg-red-500 hover:bg-red-600" 
              : "bg-blue-600 hover:bg-blue-700"
          } text-white backdrop-blur-sm`}
          title={talking ? "Stop Speaking" : "Manual Speak"}
        >
          {talking ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
      </div>

      {/* Avatar Status Indicator */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            talking ? 'bg-red-500 animate-pulse' : 
            isLoading ? 'bg-yellow-500 animate-pulse' : 
            'bg-green-500'
          }`} />
          <span className="text-sm font-medium">
            {isLoading ? "Loading..." : 
             talking ? "Speaking..." : 
             "AI Instructor Ready"}
          </span>
        </div>
      </div>

      {/* AI Response Indicator */}
      {aiResponse && (
        <div className="absolute bottom-16 left-4 z-10">
          <div className="bg-blue-500/80 backdrop-blur-sm rounded-lg px-3 py-2 max-w-xs">
            <p className="text-xs text-white">
              🎙️ Auto-speaking AI response...
            </p>
          </div>
        </div>
      )}

      {/* Loading Fallback - Minimal for fast loading */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/30 backdrop-blur-sm z-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-xs text-gray-600">Initializing...</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Preload the model for faster initial loading
useGLTF.preload("https://models.readyplayer.me/68cea2f5665bc541b1398552.glb");

export default CourseAvatar;
// import { useState, useEffect } from "react";
// import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";

// interface VoiceControlsProps {
//   isListening: boolean;
//   onToggleListening: () => void;
//   onToggleMute: () => void;
//   isMuted: boolean;
// }

// export const VoiceControls = ({ 
//   isListening, 
//   onToggleListening, 
//   onToggleMute, 
//   isMuted 
// }: VoiceControlsProps) => {
//   const { toast } = useToast();
//   const [audioLevel, setAudioLevel] = useState(0);

//   useEffect(() => {
//     if (isListening) {
//       // Simulate audio level for visual feedback
//       const interval = setInterval(() => {
//         setAudioLevel(Math.random() * 100);
//       }, 100);
//       return () => clearInterval(interval);
//     } else {
//       setAudioLevel(0);
//     }
//   }, [isListening]);

//   const handleMicToggle = () => {
//     onToggleListening();
//     toast({
//       title: isListening ? "Microphone Off" : "Microphone On",
//       description: isListening ? "You've stopped the voice recording" : "Start speaking to the AI interviewer",
//     });
//   };

//   return (
//     <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-card to-muted rounded-xl animate-fade-in">
//       {/* Main Voice Button */}
//       <div className="relative">
//         <Button
//           onClick={handleMicToggle}
//           className={`voice-button w-16 h-16 rounded-full ${isListening ? 'active' : ''}`}
//           size="lg"
//         >
//           {isListening ? (
//             <MicOff className="h-6 w-6" />
//           ) : (
//             <Mic className="h-6 w-6" />
//           )}
//         </Button>
        
//         {/* Audio Level Indicator */}
//         {isListening && (
//           <div className="absolute -inset-2 rounded-full border-2 border-primary/30">
//             <div 
//               className="absolute inset-0 rounded-full border-2 border-primary"
//               style={{
//                 transform: `scale(${1 + audioLevel / 200})`,
//                 opacity: audioLevel / 100,
//                 transition: 'all 0.1s ease-out'
//               }}
//             />
//           </div>
//         )}
//       </div>

//       {/* Status Display */}
//       <div className="flex-1">
//         <div className="text-lg font-semibold text-foreground">
//           {isListening ? "I'm Listening..." : "Ready to Start"}
//         </div>
//         <div className="text-sm text-muted-foreground">
//           {isListening 
//             ? "Speak clearly and the AI will respond" 
//             : "Click the microphone to begin your interview"
//           }
//         </div>
        
//         {/* Audio Visualizer */}
//         {isListening && (
//           <div className="flex gap-1 mt-2">
//             {[...Array(8)].map((_, i) => (
//               <div
//                 key={i}
//                 className="w-1 bg-primary rounded-full animate-pulse"
//                 style={{
//                   height: `${8 + (audioLevel / 10) * Math.sin(i + audioLevel / 20)}px`,
//                   animationDelay: `${i * 0.1}s`
//                 }}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Mute Controls */}
//       <Button
//         onClick={onToggleMute}
//         variant="outline"
//         size="lg"
//         className="h-12 w-12 rounded-full"
//       >
//         {isMuted ? (
//           <VolumeX className="h-5 w-5" />
//         ) : (
//           <Volume2 className="h-5 w-5" />
//         )}
//       </Button>
//     </div>
//   );
// };


import { useState, useEffect } from "react";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface VoiceControlsProps {
  isListening: boolean;
  onToggleListening: () => void;
  onToggleMute: () => void;
  isMuted: boolean;
}

export const VoiceControls = ({ 
  isListening, 
  onToggleListening, 
  onToggleMute, 
  isMuted 
}: VoiceControlsProps) => {
  const { toast } = useToast();
  const [audioLevel, setAudioLevel] = useState(0);

  useEffect(() => {
    if (isListening) {
      // Simulate audio level for visual feedback
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setAudioLevel(0);
    }
  }, [isListening]);

  const handleMicToggle = () => {
    onToggleListening();
    toast({
      title: isListening ? "Microphone Off" : "Microphone On",
      description: isListening ? "You've stopped the voice recording" : "Start speaking to the AI interviewer",
    });
  };

  return (
    <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-card to-muted rounded-xl animate-fade-in">
      {/* Main Voice Button */}
      <div className="relative">
        <Button
          onClick={handleMicToggle}
          className={`voice-button w-16 h-16 rounded-full ${isListening ? 'bg-primary text-white' : 'bg-secondary'}`}
          size="lg"
        >
          {isListening ? (
            <MicOff className="h-6 w-6" />
          ) : (
            <Mic className="h-6 w-6" />
          )}
        </Button>
        
        {/* Audio Level Indicator */}
        {isListening && (
          <div className="absolute -inset-2 rounded-full border-2 border-primary/30">
            <div 
              className="absolute inset-0 rounded-full border-2 border-primary"
              style={{
                transform: `scale(${1 + audioLevel / 200})`,
                opacity: audioLevel / 100,
                transition: 'all 0.1s ease-out'
              }}
            />
          </div>
        )}
      </div>

      {/* Status Display */}
      <div className="flex-1">
        <div className="text-lg font-semibold text-foreground">
          {isListening ? "I'm Listening..." : "Ready to Start"}
        </div>
        <div className="text-sm text-muted-foreground">
          {isListening 
            ? "Speak clearly and the AI will respond" 
            : "Click the microphone to begin your interview"
          }
        </div>
        
        {/* Audio Visualizer */}
        {isListening && (
          <div className="flex gap-1 mt-2">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-primary rounded-full animate-pulse"
                style={{
                  height: `${8 + (audioLevel / 10) * Math.sin(i + audioLevel / 20)}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Mute Controls */}
      <Button
        onClick={onToggleMute}
        variant={isMuted ? "destructive" : "outline"}
        size="lg"
        className="h-12 w-12 rounded-full"
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <Volume2 className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};
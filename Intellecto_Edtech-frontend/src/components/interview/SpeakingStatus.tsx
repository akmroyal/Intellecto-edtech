// import { Mic, Bot } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";

// interface SpeakingStatusProps {
//   isAISpeaking: boolean;
//   isUserSpeaking: boolean;
// }

// export const SpeakingStatus = ({ isAISpeaking, isUserSpeaking }: SpeakingStatusProps) => {
//   return (
//     <Card className="interview-card animate-fade-in">
//       <CardContent className="p-4">
//         <div className="flex items-center justify-between">
//           {/* AI Speaking Status */}
//           <div className="flex items-center gap-3">
//             <div className={`p-2 rounded-full transition-all duration-300 ${
//               isAISpeaking ? 'bg-primary/20 scale-110' : 'bg-muted/50'
//             }`}>
//               <Bot className={`h-5 w-5 transition-colors duration-300 ${
//                 isAISpeaking ? 'text-primary' : 'text-muted-foreground'
//               }`} />
//             </div>
//             <div>
//               <div className="text-sm font-medium text-foreground">AI Interviewer</div>
//               <div className={`text-xs transition-colors duration-300 ${
//                 isAISpeaking ? 'text-primary' : 'text-muted-foreground'
//               }`}>
//                 {isAISpeaking ? 'Speaking...' : 'Listening'}
//               </div>
//             </div>
//             {isAISpeaking && (
//               <div className="flex gap-1 ml-2">
//                 {[...Array(3)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="w-1 h-4 bg-primary rounded-full animate-pulse"
//                     style={{ animationDelay: `${i * 0.2}s` }}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Divider */}
//           <div className="h-8 w-px bg-border" />

//           {/* User Speaking Status */}
//           <div className="flex items-center gap-3">
//             <div className={`p-2 rounded-full transition-all duration-300 ${
//               isUserSpeaking ? 'bg-accent/20 scale-110' : 'bg-muted/50'
//             }`}>
//               <Mic className={`h-5 w-5 transition-colors duration-300 ${
//                 isUserSpeaking ? 'text-accent' : 'text-muted-foreground'
//               }`} />
//             </div>
//             <div>
//               <div className="text-sm font-medium text-foreground">You</div>
//               <div className={`text-xs transition-colors duration-300 ${
//                 isUserSpeaking ? 'text-accent' : 'text-muted-foreground'
//               }`}>
//                 {isUserSpeaking ? 'Speaking...' : 'Silent'}
//               </div>
//             </div>
//             {isUserSpeaking && (
//               <div className="flex gap-1 ml-2">
//                 {[...Array(3)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="w-1 h-4 bg-accent rounded-full animate-pulse"
//                     style={{ animationDelay: `${i * 0.2}s` }}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };






import { Mic, Bot } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SpeakingStatusProps {
  isAISpeaking: boolean;
  isUserSpeaking: boolean;
}

export const SpeakingStatus = ({ isAISpeaking, isUserSpeaking }: SpeakingStatusProps) => {
  return (
    <Card className="interview-card animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          {/* AI Speaking Status */}
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full transition-all duration-300 ${
              isAISpeaking ? 'bg-primary/20 scale-110' : 'bg-muted/50'
            }`}>
              <Bot className={`h-5 w-5 transition-colors duration-300 ${
                isAISpeaking ? 'text-primary' : 'text-muted-foreground'
              }`} />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">AI Interviewer</div>
              <div className={`text-xs transition-colors duration-300 ${
                isAISpeaking ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {isAISpeaking ? 'Speaking...' : 'Listening'}
              </div>
            </div>
            {isAISpeaking && (
              <div className="flex gap-1 ml-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-4 bg-primary rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-border mx-6" />

          {/* User Speaking Status */}
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full transition-all duration-300 ${
              isUserSpeaking ? 'bg-accent/20 scale-110' : 'bg-muted/50'
            }`}>
              <Mic className={`h-5 w-5 transition-colors duration-300 ${
                isUserSpeaking ? 'text-accent' : 'text-muted-foreground'
              }`} />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">You</div>
              <div className={`text-xs transition-colors duration-300 ${
                isUserSpeaking ? 'text-accent' : 'text-muted-foreground'
              }`}>
                {isUserSpeaking ? 'Speaking...' : 'Silent'}
              </div>
            </div>
            {isUserSpeaking && (
              <div className="flex gap-1 ml-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-4 bg-accent rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

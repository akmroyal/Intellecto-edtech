import React from "react";

interface ScoreCardProps {
  score: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score }) => {
  let bgClass =
    score >= 75
      ? "bg-green-500/20 text-green-400"
      : score >= 50
      ? "bg-yellow-500/20 text-yellow-400"
      : "bg-red-500/20 text-red-400";

  return (
    <div className="glass-dashboard rounded-xl shadow-elegant p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Your ATS Score</h2>
      <div
        className={`text-5xl font-extrabold py-6 rounded-lg ${bgClass}`}
      >
        {score}%
      </div>
      <p className="mt-4 text-muted-foreground">
        {score >= 75
          ? "✅ Great! Your resume is highly ATS-friendly."
          : score >= 50
          ? "⚠️ Decent, but there’s room for improvement."
          : "❌ Low score. Consider restructuring your resume."}
      </p>
    </div>
  );
};

export default ScoreCard;

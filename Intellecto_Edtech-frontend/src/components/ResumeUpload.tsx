import React, { useState } from "react";

interface UploadResumeProps {
  onScoreCalculated: (score: number) => void;
}

const UploadResume: React.FC<UploadResumeProps> = ({ onScoreCalculated }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) return alert("Please upload a file!");

    // TODO: call backend API with file
    // For now, mock a score
    const mockScore = Math.floor(Math.random() * 100);
    onScoreCalculated(mockScore);
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileChange}
        className="block w-full text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary-hover"
      />
      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-2 rounded-lg bg-gradient-primary text-white font-semibold hover-glow hover-scale transition"
      >
        Analyze Resume
      </button>
    </div>
  );
};

export default UploadResume;

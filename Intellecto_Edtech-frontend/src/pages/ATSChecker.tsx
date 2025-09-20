import React, { useState } from "react";

const ATSChecker: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleCheck = () => {
    if (!file) return;
    // For now, mock score. Later you’ll call backend / OpenAI API
    setScore(Math.floor(Math.random() * 40) + 60); // Score between 60–100
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent flex items-center justify-center px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        
        {/* LEFT SIDE - Info Section */}
        <div className="glass rounded-xl p-8 animate-fade-up flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            What is ATS Score? 📊
          </h1>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Applicant Tracking Systems (ATS) are software tools used by companies
            to filter and rank resumes before they reach hiring managers. 
            <br /><br />
            Your <span className="text-primary font-semibold">ATS score </span> 
            measures how well your resume matches the job description and whether
            it can pass through automated filters. 
          </p>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Why is it important? ✅
          </h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Ensures your resume gets seen by recruiters.</li>
            <li>Higher scores increase chances of interview shortlisting.</li>
            <li>Helps optimize resume keywords & formatting.</li>
            <li>Improves visibility in competitive job markets.</li>
          </ul>
        </div>

        {/* RIGHT SIDE - Upload + Check */}
        <div className="glass rounded-xl p-8 animate-fade-up flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Upload Your Resume 📂
          </h2>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="mb-4 block w-full text-sm text-muted-foreground 
                      file:mr-4 file:py-2 file:px-4 
                      file:rounded-lg file:border-2 file:border-transparent
                      file:text-sm file:font-semibold 
                      file:bg-primary file:text-white file:cursor-pointer
                      file:transition-all file:duration-300
                      hover:file:bg-black hover:file:border-primary"
          />

          <button
            onClick={handleCheck}
            className="w-full px-6 py-3 rounded-lg font-semibold
                        bg-primary text-white border-2 border-transparent 
                        cursor-pointer transition-all duration-300
                        hover:bg-black hover:text-white hover:border-primary"
          >
            Analyze Resume
          </button>

          {score !== null && (
            <div className="mt-6 p-4 rounded-lg glass animate-fade-up">
              <h3 className="text-xl font-bold text-primary mb-2">Your ATS Score:</h3>
              <p className="text-3xl font-extrabold text-foreground">{score}%</p>
              <p className="text-sm text-muted-foreground mt-2">
                A score above <span className="font-semibold text-primary">75%</span> 
                is generally considered good for most job applications.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ATSChecker;

/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState(null);

  const handleUpload = (e) => {
    const pdf = e.target.files[0];
    if (!pdf) return;

    setFileName(pdf.name);

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;

      chrome.storage.local.set({
        resumeFile: base64,
      });
    };

    reader.readAsDataURL(pdf);
  };

  useEffect(() => {

    chrome.storage.local.get(["aiResult"], (data) => {
      if (data.aiResult) {
        setResult(data.aiResult)
      }
    })

  }, []);

  const handleResume=()=>{
    chrome.storage.local.remove("resumeFile");
    setFileName("");
    setResult(null);
  }

  const handleJD=()=>{
    chrome.storage.local.remove("aiResult");
    setResult(null);
  }

  return (
    <div className="container">
      <h1 className="title">🚀 Resume ATS Analyzer</h1>

      {/* Upload Section */}
      <div className="uploadBox">
        <label className="uploadBtn">
          📄 Upload Resume
          <input
            type="file"
            accept="application/pdf"
            onChange={handleUpload}
          />
        </label>

        {fileName && <p className="fileName">✅ {fileName} Uploaded</p>}
      </div>

      {result && (
        <div className="resultContainer">
          {/* SCORE */}
          <div className="scoreCard">
            <h2>ATS Score</h2>
            <div className="score">{result?.score}</div>
          </div>

          {/* MATCHED KEYWORDS */}
          <div className="keywordBox">
            <h3 className="greenTitle">✅ Matched Keywords</h3>
            <div className="tags">
              {result?.matched_keywords?.map((k, i) => (
                <span key={i} className="tag green">
                  {k}
                </span>
              ))}
            </div>
          </div>

          {/* MISSING KEYWORDS */}
          <div className="keywordBox">
            <h3 className="redTitle">❌ Missing Keywords</h3>
            <div className="tags">
              {result?.missing_keywords?.map((k, i) => (
                <span key={i} className="tag red">
                  {k}
                </span>
              ))}
            </div>
          </div>

          {/* IMPROVEMENTS */}
          <div className="improvementSection">
            <h3>💡 Improvements</h3>
            <ul>
              {result?.improvements?.map((item, i) => (
                <li key={i} className="improveCard">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <button className="removeBtn" onClick={handleJD}>Remove JD</button>
          <button className="removeBtn" onClick={handleResume}>Remove Resume</button>
        </div>
      )}
    </div>
  );
}

export default App;
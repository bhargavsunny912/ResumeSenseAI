/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const dotenv=require("dotenv");
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
const { GoogleGenAI }=require("@google/genai");

const app = express();

dotenv.config({quiet:true});

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.post("/file", async (req, res) => {
  try {
    const { file, jd } = req.body;

    if (!file || !jd) {
      return res.status(400).json({ error: "Missing file or jd" });
    }

    // Remove base64 prefix
    const base64Data = file.split(",")[1];

    // Convert to buffer
    const pdfBuffer = Buffer.from(base64Data, "base64");
    const uint8Array = new Uint8Array(pdfBuffer);

    async function extractTextFromPDF(buffer) {
        const loadingTask = pdfjsLib.getDocument({ data: buffer });
        const pdf = await loadingTask.promise;

        let fullText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const strings = content.items.map(item => item.str);
            fullText += strings.join(" ") + "\n";
        }

        return fullText;
        }

    const resumeText = await extractTextFromPDF(uint8Array); 
    console.log("resume length",resumeText.length);
      
    const API_KEY=process.env.GEMINI_API;
    
    const ai = new GoogleGenAI({
        apiKey:API_KEY,
      });

      async function getResumeScore(resume, jobDescription) {
        const prompt = `
      You are an ATS system.

      Compare the resume with the job description.

      Return response in STRICT JSON format:

      {
        "score": number (0-100),
        "missing_keywords": [],
        "matched_keywords": [],
        "improvements": []
      }

      Resume:
      ${resume}

      Job Description:
      ${jobDescription}
      `;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",   // ✅ USE THIS
          contents: prompt,
        });

        let text = response.text;
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();
        const data = JSON.parse(text);
        return data;
      }
    
    const result=await getResumeScore(resumeText,jd);

    res.json({score:result.score,missing_keywords:result.missing_keywords,matched_keywords:result.matched_keywords,improvements:result.improvements});
  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
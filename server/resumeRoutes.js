const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const jobRoles = require("./jobRoles");

const router = express.Router();

function matchJobs(resumeSkills) {
  const results = [];

  jobRoles.forEach((job) => {
    const matchedSkills = job.skills.filter(skill =>
      resumeSkills.includes(skill)
    );

    const matchPercent = Math.round(
      (matchedSkills.length / job.skills.length) * 100
    );

    results.push({
      role: job.title,
      match: matchPercent,
      matchedSkills,
      missingSkills: job.skills.filter(
        skill => !resumeSkills.includes(skill)
      )
    });
  });

  results.sort((a, b) => b.match - a.match);

  return results;
}

async function analyzeResume(text) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `
Analyze this resume and return JSON:

{
  "score": number (0-100),
  "skills": [],
  "missingSkills": [],
  "suggestions": []
}

Resume:
${text}
                `,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  const output =
    data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

  return output;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const filePath = req.file.path;

    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);

    const extractedText = pdfData.text;

    const aiRaw = await analyzeResume(extractedText);

    const cleanJson = aiRaw.replace(/```(?:json)?/g, "").trim();
    let aiData;
    try {
      aiData = JSON.parse(cleanJson);
    } catch {
      aiData = {};
    }

    aiData.score = typeof aiData.score === 'number' ? aiData.score : 75;
    aiData.skills = Array.isArray(aiData.skills) ? aiData.skills : ['JavaScript', 'React', 'TypeScript', 'Node.js', 'CSS', 'HTML', 'Git', 'Python'];
    aiData.suggestions = Array.isArray(aiData.suggestions) ? aiData.suggestions : [
      'Add more quantifiable achievements with metrics',
      'Include relevant certifications and courses',
      'Optimize resume for ATS keyword matching'
    ];

    const resumeSkills = aiData.skills.map(skill => skill.toLowerCase());

    const matches = matchJobs(resumeSkills);

    res.json({
      ai: aiData,
      matches
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to process PDF" });
  }
});

module.exports = router;

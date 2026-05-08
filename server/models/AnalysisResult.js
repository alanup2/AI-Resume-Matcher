const mongoose = require('mongoose');

const analysisResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', required: true },
  score: { type: Number, default: 0 },
  skills: [String],
  suggestions: [String],
  matches: [{
    role: String,
    match: Number,
    matchedSkills: [String],
    missingSkills: [String],
  }],
  atsScore: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AnalysisResult', analysisResultSchema);

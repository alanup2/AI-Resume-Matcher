import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      const res = await axios.post("/api/resume/upload", formData);
      setData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getMatchClass = (match) => {
    if (match >= 60) return "high";
    if (match >= 30) return "medium";
    return "low";
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            const bars = entry.target.querySelectorAll(".progress-fill-anim");
            bars.forEach((bar) => {
              bar.style.width = bar.getAttribute("data-target");
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal-on-scroll, .reveal-clip, .cinematic-entry").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [data]);

  const gaugeCircumference = 691;
  const gaugeOffset = data ? gaugeCircumference - (data.ai.score / 100) * gaugeCircumference : gaugeCircumference;

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="topbar-left">
            <span className="brand">Precision AI</span>
            <nav className="topbar-nav">
              <a href="#" className="nav-link active">Upload</a>
              <a href="#" className="nav-link">Dashboard</a>
              <a href="#" className="nav-link">Analysis</a>
              <a href="#" className="nav-link">Gap Analysis</a>
            </nav>
          </div>
          <div className="topbar-right">
            <span className="material-symbols-outlined">notifications</span>
            <span className="material-symbols-outlined">settings</span>
            <div className="avatar" />
          </div>
        </div>
      </header>

      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-icon">
            <span className="material-symbols-outlined filled">memory</span>
          </div>
          <div>
            <h3 className="sidebar-title">Precision Engine</h3>
            <p className="sidebar-status">AI ACTIVE</p>
          </div>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="sidebar-link"><span className="material-symbols-outlined">memory</span> Engine</a>
          <a href="#" className="sidebar-link active"><span className="material-symbols-outlined filled">analytics</span> Score</a>
          <a href="#" className="sidebar-link"><span className="material-symbols-outlined">compare_arrows</span> Alignment</a>
          <a href="#" className="sidebar-link"><span className="material-symbols-outlined">rule</span> Competency</a>
        </nav>
        <button className="sidebar-btn">
          <span className="material-symbols-outlined">add</span> New Analysis
        </button>
      </aside>

      <main className="main-content">
        <div className="main-container">
          <section className="hero-section">
            <div className="hero-text cinematic-entry">
              <span className="hero-badge">SYSTEM_READY // UPLOAD_RESUME</span>
              <h1 className="hero-title reveal-clip">
                Analyze Your Resume with <span className="hero-accent">AI Precision</span>
              </h1>
              <p className="hero-desc">
                Upload your resume to get instant AI-powered analysis, skill matching, and job recommendations.
              </p>
            </div>

            <div className="upload-zone-wrapper">
              <div className="corner top-left" />
              <div className="corner top-right" />
              <div className="corner bottom-left" />
              <div className="corner bottom-right" />
              <div
                className="upload-zone reveal-on-scroll"
                onClick={() => document.getElementById("file-input").click()}
              >
                <input
                  id="file-input"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
                <div className="upload-icon-wrap">
                  <span className="material-symbols-outlined filled upload-icon">upload_file</span>
                </div>
                <h2 className="upload-title">Drop your resume here to begin analysis</h2>
                <p className="upload-hint">Support for PDF format</p>
                <div className="upload-actions">
                  <button className="btn-primary" onClick={(e) => { e.stopPropagation(); document.getElementById("file-input").click(); }}>
                    Browse Files
                  </button>
                  <button className="btn-secondary" onClick={(e) => { e.stopPropagation(); handleUpload(); }} disabled={!file || loading}>
                    {loading ? "Analyzing..." : "Analyze Resume"}
                  </button>
                </div>
                {file && <p className="file-name">{file.name}</p>}
              </div>
            </div>
          </section>

          {!data && !loading && (
            <section className="engine-section">
              <div className="section-divider">
                <div className="divider-line" />
                <span className="divider-label">Precision Engine Architecture</span>
                <div className="divider-line" />
              </div>
              <div className="engine-grid">
                <div className="engine-card reveal-on-scroll stagger-1">
                  <div className="engine-card-bg">
                    <span className="material-symbols-outlined">description</span>
                  </div>
                  <div className="engine-step">01 // EXTRACT</div>
                  <h4 className="engine-title">PDF Extraction</h4>
                  <p className="engine-desc">Parse and extract text from uploaded resume documents using advanced PDF processing.</p>
                  <div className="engine-progress">
                    <span>PROCESSING_VECTORS</span>
                    <span className="text-accent">ACTIVE</span>
                  </div>
                  <div className="engine-bar">
                    <div className="engine-bar-fill" />
                  </div>
                </div>
                <div className="engine-card reveal-on-scroll stagger-2">
                  <div className="engine-card-bg">
                    <span className="material-symbols-outlined">psychology</span>
                  </div>
                  <div className="engine-step step-cyan">02 // ANALYZE</div>
                  <h4 className="engine-title">Gemini AI Core</h4>
                  <p className="engine-desc">Deep semantic analysis identifies skills, experience, and career trajectory using Google Gemini 2.0.</p>
                  <div className="engine-tags">
                    <span className="tag-cyan">NLP_CONTEXT</span>
                    <span className="tag-cyan">SEMANTIC_MAP</span>
                  </div>
                </div>
                <div className="engine-card reveal-on-scroll stagger-3">
                  <div className="engine-card-bg">
                    <span className="material-symbols-outlined">check_circle</span>
                  </div>
                  <div className="engine-step step-purple">03 // ALIGN</div>
                  <h4 className="engine-title">Skill Matching</h4>
                  <p className="engine-desc">Match extracted skills against job roles with automated gap analysis and scoring.</p>
                  <div className="engine-match">
                    <span className="match-big">AI</span>
                    <div className="match-label">POWERED<br />SCORING</div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {loading && (
            <div className="loading-section">
              <div className="loading-spinner-wrap">
                <div className="loading-ring" />
              </div>
              <p className="loading-text">Analyzing your resume with AI...</p>
            </div>
          )}

          {data && (
              <section className="results-section">
                <div className="bento-grid">
                  <div className="bento-gauge reveal-on-scroll">
                    <div className="gauge-header">
                      <span className="gauge-label">OVERALL ALIGNMENT INDEX</span>
                    </div>
                    <div className="gauge-wrap">
                      <svg className="gauge-svg" viewBox="0 0 256 256">
                        <circle className="gauge-track" cx="128" cy="128" r="110" fill="transparent" stroke="currentColor" strokeWidth="4" />
                        <circle
                          className="gauge-fill"
                          cx="128" cy="128" r="110" fill="transparent" stroke="currentColor"
                          strokeWidth="12" strokeDasharray={gaugeCircumference}
                          strokeDashoffset={gaugeOffset}
                          transform="rotate(-90 128 128)"
                        />
                      </svg>
                      <div className="gauge-value">
                        <span className="gauge-number">{data.ai.score}</span>
                        <span className="gauge-unit">CONFIDENCE %</span>
                      </div>
                    </div>
                    <div className="gauge-footer">
                      <h2 className="candidate-name">Resume Analysis</h2>
                      <p className="candidate-desc">AI-powered evaluation of your professional profile</p>
                    </div>
                  </div>

                  <div className="bento-suggestions reveal-on-scroll">
                    <div className="suggestions-header">
                      <span className="material-symbols-outlined">auto_awesome</span>
                      <h3>AI Improvement Engine</h3>
                    </div>
                    <div className="suggestions-list">
                      {(data.ai.suggestions || []).slice(0, 3).map((s, i) => (
                        <div key={i} className="suggestion-item">
                          <div className="suggestion-label">SUGGESTION {i + 1}</div>
                          <p>{s}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="skills-section">
                  <div className="skills-matrix reveal-on-scroll">
                    <div className="skills-header">
                      <h3>Extracted Skills Matrix</h3>
                      <span className="skills-count">{(data.ai.skills || []).length} KEYWORDS IDENTIFIED</span>
                    </div>
                    <div className="skills-cloud">
                      {(data.ai.skills || []).slice(0, 20).map((skill, i) => (
                        <span key={i} className="skill-chip">{skill.toUpperCase()}</span>
                      ))}
                    </div>
                    <div className="heatmap-section">
                      <div className="heatmap-label">COMPETENCY HEATMAP</div>
                      <div className="heatmap-list">
                        {data.matches.map((job, i) => (
                          <div key={i} className="heatmap-row">
                            <span className="heatmap-name">{job.role}</span>
                            <div className="heatmap-bar-bg">
                              <div
                                className="heatmap-bar-fill"
                                style={{ width: `${job.match}%` }}
                              />
                            </div>
                            <span className="heatmap-value">{job.match}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="skills-sidebar">
                    <div className="missing-card reveal-on-scroll">
                      <div className="missing-header">
                        <span className="material-symbols-outlined">warning</span>
                        <h3>Missing Criteria</h3>
                      </div>
                      <ul className="missing-list">
                        {data.matches.flatMap((job) =>
                          job.missingSkills.slice(0, 2).map((skill, i) => (
                            <li key={`${job.role}-${i}`} className="missing-item">
                              <span className="material-symbols-outlined close-icon">close</span>
                              <div>
                                <div className="missing-skill">{skill}</div>
                                <div className="missing-context">Missing for {job.role}</div>
                              </div>
                            </li>
                          ))
                        ).slice(0, 4)}
                      </ul>
                    </div>
                    <div className="benchmark-card reveal-on-scroll">
                      <div className="benchmark-header">
                        <span className="benchmark-label">MARKET BENCHMARK</span>
                        <span className="benchmark-change">+{data.ai.score > 50 ? data.ai.score - 30 : 12}%</span>
                      </div>
                      <div className="benchmark-rank">
                        Top {data.ai.score > 70 ? "10" : data.ai.score > 50 ? "25" : "50"}%
                      </div>
                      <p className="benchmark-desc">
                        Candidate performs higher than {data.ai.score}% of applicants in overall skill alignment.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="table-section reveal-on-scroll">
                  <div className="table-header">
                    <h3>Segmented Analysis</h3>
                    <div className="table-toggle">
                      <button className="toggle-btn active">INSIGHTS</button>
                    </div>
                  </div>
                  <table className="analysis-table">
                    <thead>
                      <tr>
                        <th>ROLE</th>
                        <th>MATCH SCORE</th>
                        <th>STATUS</th>
                        <th className="text-right">DETAILS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.matches.map((job, i) => (
                        <tr key={i} className="table-row">
                          <td className="role-cell">{job.role}</td>
                          <td>
                            <div className="table-score">
                              <div className="table-bar-bg">
                                <div
                                  className={`table-bar-fill ${getMatchClass(job.match)}`}
                                  style={{ width: `${job.match}%` }}
                                />
                              </div>
                              <span className="score-num">{job.match}%</span>
                            </div>
                          </td>
                          <td>
                            <span className={`status-badge ${getMatchClass(job.match)}`}>
                              {job.match >= 60 ? "STRONG MATCH" : job.match >= 30 ? "MODERATE" : "GAP"}
                            </span>
                          </td>
                          <td className="text-right">
                            <div className="skills-preview">
                              <span className="match-count">{job.matchedSkills.length} matched</span>
                              <span className="miss-count">{job.missingSkills.length} missing</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <footer className="results-footer">
                  <p className="footer-label">Precision Intelligence Engine v2.0 Stable</p>
                  <div className="footer-dots">
                    <div className="dot dot-orange" />
                    <div className="dot dot-cyan" />
                    <div className="dot dot-purple" />
                  </div>
                </footer>
              </section>
            )}
        </div>
      </main>
    </div>
  );
}

export default App;

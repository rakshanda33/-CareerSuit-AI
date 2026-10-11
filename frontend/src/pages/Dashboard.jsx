import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  uploadResume,
  saveResume,
  getUserResumes,
  deleteResume,
} from "../services/api";

function Dashboard() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [resume, setResume] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [savedResumes, setSavedResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingResumes, setLoadingResumes] = useState(true);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [analyzedAt, setAnalyzedAt] = useState(null);
  const [analyzedFileName, setAnalyzedFileName] = useState("");

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  // ============================================
  // LOAD SAVED RESUMES
  // ============================================

  const loadResumes = async () => {
    if (!userId) {
      setLoadingResumes(false);
      return;
    }

    try {
      setLoadingResumes(true);

      const response = await getUserResumes(userId);

      setSavedResumes(response.data || []);
    } catch (error) {
      console.error("Failed to load resumes:", error);
    } finally {
      setLoadingResumes(false);
    }
  };

  useEffect(() => {
    loadResumes();
  }, []);

  // ============================================
  // LOGOUT
  // ============================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    navigate("/login");
  };

  // ============================================
  // FILE SELECTION
  // ============================================

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      alert("Please select a PDF file.");
      event.target.value = "";
      return;
    }

    setResume(selectedFile);

    // New file means new analysis state
    setAnalysis(null);
    setAnalyzedAt(null);
    setAnalyzedFileName("");
  };

  // ============================================
  // OPEN FILE PICKER
  // ============================================

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  // ============================================
  // SAVE + ANALYZE RESUME
  // ============================================

  const handleUpload = async () => {
    if (!resume) {
      alert("Please select a resume first.");
      return;
    }

    if (!userId) {
      alert("User session not found. Please login again.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      // ------------------------------------------
      // STEP 1: SAVE RESUME
      // ------------------------------------------

      const storageFormData = new FormData();

      storageFormData.append("file", resume);
      storageFormData.append("userId", userId);

      await saveResume(storageFormData);

      // ------------------------------------------
      // STEP 2: ANALYZE RESUME
      // ------------------------------------------

      const analysisFormData = new FormData();

      analysisFormData.append("file", resume);

      const response = await uploadResume(analysisFormData);

      setAnalysis(response.data);
      setAnalyzedAt(new Date());
      setAnalyzedFileName(resume.name);
      setShowAllSkills(false);

      // ------------------------------------------
      // STEP 3: REFRESH HISTORY
      // ------------------------------------------

      await loadResumes();

      // Scroll to score
      setTimeout(() => {
        document
          .getElementById("resume-overview")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);

    } catch (error) {
      console.error("Resume Upload Error:", error);

      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);

        const errorMessage =
          typeof error.response.data === "string"
            ? error.response.data
            : JSON.stringify(error.response.data);

        alert(errorMessage);
      } else {
        alert(error.message || "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // RE-ANALYZE SAVED RESUME
  // ============================================

  const handleReanalyze = () => {
    alert(
      "Please select the saved PDF again to re-analyze it. " +
        "Your existing resume history is preserved."
    );

    openFilePicker();

    setTimeout(() => {
      document
        .getElementById("resume-analyzer")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // ============================================
  // VIEW CURRENT ANALYSIS
  // ============================================

  const handleViewAnalysis = () => {
    if (!analysis) {
      alert("Analyze a resume first to view its analysis.");
      return;
    }

    document
      .getElementById("ai-analysis")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ============================================
  // DELETE RESUME
  // ============================================

  const handleDeleteResume = async (resumeId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteResume(resumeId);

      setSavedResumes((prev) =>
        prev.filter((item) => item.id !== resumeId)
      );

      alert("Resume deleted successfully.");
    } catch (error) {
      console.error("Delete Resume Error:", error);

      alert(
        error.response?.data ||
          "Failed to delete resume."
      );
    }
  };

  // ============================================
  // SCORE
  // ============================================

  const score = Number(analysis?.score ?? 0);
  const safeScore = Math.min(Math.max(score, 0), 100);

  const getScoreLabel = () => {
    if (safeScore >= 85) return "Excellent";
    if (safeScore >= 70) return "Strong";
    if (safeScore >= 50) return "Needs Improvement";
    if (safeScore > 0) return "Needs Work";
    return "Not analyzed";
  };

  // ============================================
  // SKILLS
  // ============================================

  const skills = analysis?.skills_found || [];

  const visibleSkills = showAllSkills
    ? skills
    : skills.slice(0, 6);

  const remainingSkills = Math.max(skills.length - 6, 0);

  // ============================================
  // TIME
  // ============================================

  const formattedAnalyzedTime = analyzedAt
    ? analyzedAt.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  // ============================================
  // UI
  // ============================================

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ========================================
          HEADER
      ======================================== */}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-blue-600 md:text-3xl">
              CareerSuit AI
            </h1>

            <p className="mt-1 hidden text-sm text-slate-500 sm:block">
              Welcome back{userName ? `, ${userName}` : ""}. Your AI-powered
              career workspace.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
          >
            Logout
          </button>

        </div>

      </header>

      {/* ========================================
          MAIN
      ======================================== */}

      <main className="mx-auto max-w-7xl px-6 py-8 md:px-10">

        {/* ======================================
            RESUME ANALYZER
        ====================================== */}

        <section id="resume-analyzer">

          <div className="overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8 shadow-sm md:p-10">

            <div className="max-w-2xl">

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl font-bold text-blue-600 shadow-sm">
                CV
              </div>

              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                Resume Analyzer
              </h2>

              <p className="mt-2 leading-7 text-slate-500">
                Upload your resume and let AI analyze your strengths,
                weaknesses, ATS issues, missing sections, and improvement
                opportunities.
              </p>

            </div>

            {/* Upload Area */}

            <div className="mt-7 rounded-2xl border-2 border-dashed border-blue-200 bg-white/80 p-6">

              <label
                htmlFor="resume-upload"
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl py-7 text-center transition hover:bg-blue-50"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">
                  PDF
                </div>

                <p className="mt-4 font-semibold text-slate-700">
                  Choose your resume
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  PDF files only
                </p>

                <input
                  ref={fileInputRef}
                  id="resume-upload"
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />

              </label>

              {resume && (
                <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-green-100 bg-green-50 px-4 py-3">

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
                      Selected Resume
                    </p>

                    <p className="mt-1 truncate text-sm font-semibold text-green-800">
                      {resume.name}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={openFilePicker}
                    className="shrink-0 text-sm font-semibold text-green-700 hover:underline"
                  >
                    Change
                  </button>

                </div>
              )}

            </div>

            {/* Analyze Button */}

            <button
              onClick={handleUpload}
              disabled={loading}
              className="mt-5 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Analyzing your resume...
                </span>
              ) : (
                "Analyze Resume →"
              )}
            </button>

            {loading && (
              <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50/70 p-4">

                <p className="text-sm font-semibold text-blue-700">
                  AI is reviewing your resume
                </p>

                <div className="mt-3 grid gap-2 text-xs text-blue-600 sm:grid-cols-3">
                  <span>✓ Extracting content</span>
                  <span>✓ Checking skills</span>
                  <span>✓ Evaluating ATS</span>
                </div>

              </div>
            )}

          </div>

        </section>

        {/* ======================================
            MY RESUMES
        ====================================== */}

        <section className="mt-10">

          <div className="mb-5 flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                My Resumes
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your uploaded resume history.
              </p>
            </div>

            <button
              onClick={loadResumes}
              disabled={loadingResumes}
              className="rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 disabled:opacity-50"
            >
              {loadingResumes ? "Refreshing..." : "Refresh"}
            </button>

          </div>

          {loadingResumes ? (

            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
              <p className="mt-3 text-sm text-slate-500">
                Loading your resumes...
              </p>
            </div>

          ) : savedResumes.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-500">
                PDF
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-700">
                No resumes yet
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Upload your first resume using the analyzer above.
              </p>

            </div>

          ) : (

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

              {savedResumes.map((item) => (

                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >

                  <div className="flex items-start justify-between">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xs font-bold text-blue-600">
                      PDF
                    </div>

                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                      {item.resumeType || "ORIGINAL"}
                    </span>

                  </div>

                  <h3 className="mt-4 truncate font-bold text-slate-800">
                    {item.originalFileName || "Resume"}
                  </h3>

                  <p className="mt-2 text-xs text-slate-400">
                    Uploaded{" "}
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString("en-IN")
                      : "Recently"}
                  </p>

                  {item.jobTitle && (
                    <p className="mt-2 text-sm text-slate-500">
                      Job: {item.jobTitle}
                    </p>
                  )}

                  {/* Resume Actions */}

                  <div className="mt-5 grid grid-cols-2 gap-2">

                    <button
                      onClick={handleViewAnalysis}
                      className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                    >
                      View
                    </button>

                    <button
                      onClick={handleReanalyze}
                      className="rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Analyze
                    </button>

                  </div>

                  <button
                    onClick={() => handleDeleteResume(item.id)}
                    className="mt-2 w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                  >
                    Delete Resume
                  </button>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* ======================================
            RESUME OVERVIEW
        ====================================== */}

        <section
          id="resume-overview"
          className="mt-10 grid scroll-mt-24 gap-6 md:grid-cols-3"
        >

          {/* Resume Score */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <h2 className="font-semibold text-slate-700">
                Resume Score
              </h2>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-xs font-bold text-blue-600">
                ATS
              </div>

            </div>

            <div className="mt-5 flex items-center gap-5">

              <div
                className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(#2563eb ${safeScore * 3.6}deg, #e2e8f0 0deg)`,
                }}
              >

                <div className="flex h-[76px] w-[76px] flex-col items-center justify-center rounded-full bg-white">

                  <span className="text-2xl font-extrabold text-slate-900">
                    {analysis ? safeScore : "--"}
                  </span>

                  {analysis && (
                    <span className="text-[10px] font-semibold text-slate-400">
                      /100
                    </span>
                  )}

                </div>

              </div>

              <div>

                <p className="text-lg font-bold text-blue-600">
                  {getScoreLabel()}
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Overall resume strength
                </p>

                {analyzedAt && (
                  <p className="mt-2 text-xs text-slate-400">
                    Analyzed {formattedAnalyzedTime}
                  </p>
                )}

              </div>

            </div>

          </div>

          {/* Verdict */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <h2 className="font-semibold text-slate-700">
                Verdict
              </h2>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-sm font-bold text-green-600">
                AI
              </div>

            </div>

            <p className="mt-6 text-2xl font-extrabold text-green-600">
              {analysis?.verdict || "--"}
            </p>

            <p className="mt-2 text-sm text-slate-400">
              AI assessment of your resume
            </p>

            {analyzedFileName && (
              <p className="mt-4 truncate text-xs font-medium text-slate-500">
                {analyzedFileName}
              </p>
            )}

          </div>

          {/* Skills */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <h2 className="font-semibold text-slate-700">
                Skills
              </h2>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-sm font-bold text-purple-600">
                AI
              </div>

            </div>

            {skills.length ? (

              <>
                <div className="mt-5 flex flex-wrap gap-2">

                  {visibleSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700"
                    >
                      {skill}
                    </span>
                  ))}

                </div>

                {remainingSkills > 0 && (
                  <button
                    onClick={() => setShowAllSkills(!showAllSkills)}
                    className="mt-3 text-sm font-semibold text-blue-600 hover:underline"
                  >
                    {showAllSkills
                      ? "Show less"
                      : `+ ${remainingSkills} more`}
                  </button>
                )}
              </>

            ) : (

              <p className="mt-6 text-2xl font-bold text-slate-400">
                --
              </p>

            )}

            <p className="mt-3 text-sm text-slate-400">
              Skills identified by AI
            </p>

          </div>

        </section>

        {/* ======================================
            QUICK ACTIONS
        ====================================== */}

        {analysis && (
          <section className="mt-8 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white shadow-lg md:p-8">

            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

              <div>
                <p className="text-sm font-semibold text-blue-100">
                  NEXT STEP
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Ready to improve your resume?
                </h2>

                <p className="mt-1 text-sm text-blue-100">
                  Use AI to fix weaknesses and tailor your resume for real
                  job opportunities.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">

                <button
                  onClick={() => navigate("/resume-tailor")}
                  className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-600 shadow-sm transition hover:bg-blue-50"
                >
                  Tailor Resume
                </button>

                <button
                  onClick={() => navigate("/bullet-rewriter")}
                  className="rounded-xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
                >
                  Rewrite Bullets
                </button>

              </div>

            </div>

          </section>
        )}

        {/* ======================================
            AI CAREER TOOLS
        ====================================== */}

        <section className="mt-10">

          <div className="mb-5">

            <h2 className="text-2xl font-bold text-slate-900">
              AI Career Tools
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Powerful AI tools to improve, tailor, and optimize your career
              profile.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {/* Job Match */}

            <button
              onClick={() => navigate("/job-match")}
              className="group rounded-2xl border border-slate-200 bg-white p-7 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600">
                JD
              </div>

              <h3 className="text-xl font-bold text-blue-600">
                Job Description Match
              </h3>

              <p className="mt-3 leading-7 text-slate-500">
                Compare your resume with a job description and find your ATS
                match score, matched skills, and missing keywords.
              </p>

              <span className="mt-6 inline-block font-semibold text-blue-600">
                Check Job Match →
              </span>

            </button>

            {/* Resume Tailor */}

            <button
              onClick={() => navigate("/resume-tailor")}
              className="group rounded-2xl border border-slate-200 bg-white p-7 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-sm font-bold text-purple-600">
                AI
              </div>

              <h3 className="text-xl font-bold text-purple-600">
                Resume Tailor
              </h3>

              <p className="mt-3 leading-7 text-slate-500">
                Tailor your resume to a specific job description using AI.
              </p>

              <span className="mt-6 inline-block font-semibold text-purple-600">
                Tailor Resume →
              </span>

            </button>

            {/* Bullet Rewriter */}

            <button
              onClick={() => navigate("/bullet-rewriter")}
              className="group rounded-2xl border border-slate-200 bg-white p-7 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-600">
                TXT
              </div>

              <h3 className="text-xl font-bold text-indigo-600">
                Bullet Point Rewriter
              </h3>

              <p className="mt-3 leading-7 text-slate-500">
                Transform weak resume bullet points into stronger,
                achievement-focused statements.
              </p>

              <span className="mt-6 inline-block font-semibold text-indigo-600">
                Rewrite Bullet →
              </span>

            </button>

            {/* Interview Prep */}

            <div className="relative rounded-2xl border border-slate-200 bg-white p-7">

              <span className="absolute right-5 top-5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
                Coming Soon
              </span>

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-sm font-bold text-amber-600">
                AI
              </div>

              <h3 className="text-xl font-bold text-slate-700">
                Interview Prep
              </h3>

              <p className="mt-3 leading-7 text-slate-500">
                Practice AI-powered interview questions and receive
                personalized feedback.
              </p>

              <span className="mt-6 inline-block font-semibold text-amber-600">
                Coming Soon →
              </span>

            </div>

          </div>

        </section>

        {/* ======================================
            AI ANALYSIS
        ====================================== */}

        {analysis && (

          <section
            id="ai-analysis"
            className="mt-10 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
          >

            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">

              <div>

                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  AI-Powered Insights
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  Resume Analysis
                </h2>

                <p className="mt-2 text-slate-500">
                  Here&apos;s what AI found in your resume.
                </p>

              </div>

              {analyzedFileName && (
                <div className="rounded-lg bg-slate-50 px-4 py-2 text-sm text-slate-500">
                  <span className="font-semibold text-slate-700">
                    Analyzed:
                  </span>{" "}
                  {analyzedFileName}
                </div>
              )}

            </div>

            {/* Summary */}

            <div className="rounded-xl bg-slate-50 p-6">

              <h3 className="font-bold text-slate-900">
                Summary
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {analysis.summary || "No summary available."}
              </p>

            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">

              {/* Strengths */}

              <div className="rounded-xl border border-green-100 bg-green-50/50 p-6">

                <h3 className="text-lg font-bold text-green-700">
                  Strengths
                </h3>

                {analysis.strengths?.length ? (

                  <ul className="mt-4 space-y-3">

                    {analysis.strengths.map((item, index) => (
                      <li
                        key={index}
                        className="flex gap-2 text-sm leading-6 text-slate-600"
                      >
                        <span className="font-bold text-green-600">
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}

                  </ul>

                ) : (

                  <p className="mt-4 text-sm text-slate-500">
                    No strengths available.
                  </p>

                )}

              </div>

              {/* Weaknesses */}

              <div className="rounded-xl border border-red-100 bg-red-50/50 p-6">

                <h3 className="text-lg font-bold text-red-600">
                  Weaknesses
                </h3>

                {analysis.weaknesses?.length ? (

                  <ul className="mt-4 space-y-3">

                    {analysis.weaknesses.map((item, index) => (
                      <li
                        key={index}
                        className="flex gap-2 text-sm leading-6 text-slate-600"
                      >
                        <span className="font-bold text-red-500">
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}

                  </ul>

                ) : (

                  <p className="mt-4 text-sm text-slate-500">
                    No weaknesses available.
                  </p>

                )}

              </div>

              {/* Improvements */}

              <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-6">

                <h3 className="text-lg font-bold text-blue-700">
                  Improvements
                </h3>

                {analysis.improvements?.length ? (

                  <ul className="mt-4 space-y-3">

                    {analysis.improvements.map((item, index) => (
                      <li
                        key={index}
                        className="flex gap-2 text-sm leading-6 text-slate-600"
                      >
                        <span className="font-bold text-blue-500">
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}

                  </ul>

                ) : (

                  <p className="mt-4 text-sm text-slate-500">
                    No improvements available.
                  </p>

                )}

              </div>

              {/* Missing Sections */}

              <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-6">

                <h3 className="text-lg font-bold text-purple-700">
                  Missing Sections
                </h3>

                {analysis.missing_sections?.length ? (

                  <ul className="mt-4 space-y-3">

                    {analysis.missing_sections.map((item, index) => (
                      <li
                        key={index}
                        className="flex gap-2 text-sm leading-6 text-slate-600"
                      >
                        <span className="font-bold text-purple-500">
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}

                  </ul>

                ) : (

                  <p className="mt-4 text-sm text-slate-500">
                    No missing sections detected.
                  </p>

                )}

              </div>

            </div>

            {/* ATS Issues */}

            <div className="mt-6 rounded-xl border border-orange-100 bg-orange-50/50 p-6">

              <h3 className="text-lg font-bold text-orange-700">
                ATS Issues
              </h3>

              {analysis.ats_issues?.length ? (

                <ul className="mt-4 grid gap-3 md:grid-cols-2">

                  {analysis.ats_issues.map((item, index) => (
                    <li
                      key={index}
                      className="flex gap-2 text-sm leading-6 text-slate-600"
                    >
                      <span className="font-bold text-orange-500">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}

                </ul>

              ) : (

                <p className="mt-4 text-sm text-slate-500">
                  No major ATS issues detected.
                </p>

              )}

            </div>

            {/* Analysis CTA */}

            <div className="mt-8 flex flex-col justify-between gap-4 rounded-xl border border-blue-100 bg-blue-50 p-5 md:flex-row md:items-center">

              <div>
                <h3 className="font-bold text-slate-900">
                  Improve your resume
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Turn these insights into a stronger, job-ready resume.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">

                <button
                  onClick={() => navigate("/resume-tailor")}
                  className="rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700"
                >
                  Tailor Resume
                </button>

                <button
                  onClick={() => navigate("/bullet-rewriter")}
                  className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  Rewrite Bullets
                </button>

              </div>

            </div>

          </section>

        )}

      </main>

    </div>
  );
}

export default Dashboard;
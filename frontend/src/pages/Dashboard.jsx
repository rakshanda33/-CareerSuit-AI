import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadResume } from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleUpload = async () => {
    if (!resume) {
      alert("Please select a resume first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", resume);

    try {
      setLoading(true);

      const response = await uploadResume(formData);

      setAnalysis(response.data);

      alert("Resume analyzed successfully!");
    } catch (error) {
      console.error("Upload Error:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
        alert(JSON.stringify(error.response.data));
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">

          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-blue-600 md:text-4xl">
              Career Dashboard 👋
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Your AI-powered career workspace
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

      <main className="mx-auto max-w-7xl px-6 py-8 md:px-10">

        {/* Resume Analyzer */}
        <section
          id="resume-analyzer"
          className="mt-2"
        >

          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8 shadow-sm">

            <div className="max-w-2xl">

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                📄
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                Resume Analyzer
              </h2>

              <p className="mt-2 leading-7 text-slate-500">
                Upload your resume and let AI analyze your strengths,
                weaknesses, ATS issues, missing sections, and improvement
                opportunities.
              </p>

            </div>

            {/* Upload Area */}
            <div className="mt-7 rounded-xl border-2 border-dashed border-blue-200 bg-white/80 p-6">

              <label
                htmlFor="resume-upload"
                className="flex cursor-pointer flex-col items-center justify-center rounded-lg py-6 text-center transition hover:bg-blue-50"
              >

                <div className="text-3xl">
                  📤
                </div>

                <p className="mt-3 font-semibold text-slate-700">
                  Choose your resume
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  PDF files only
                </p>

                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="hidden"
                />

              </label>

              {resume && (
                <div className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                  ✓ Selected: {resume.name}
                </div>
              )}

            </div>

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={loading}
              className="mt-5 rounded-lg bg-blue-600 px-7 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {loading ? "Analyzing Resume..." : "Analyze Resume →"}
            </button>

          </div>

        </section>

        {/* Top Stats / Resume Overview */}
        <section className="mt-10 grid gap-6 md:grid-cols-3">

          {/* Resume Score */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <div className="flex items-center justify-between">

              <h2 className="font-semibold text-slate-700">
                Resume Score
              </h2>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-xl">
                📄
              </div>

            </div>

            <p className="mt-5 text-4xl font-extrabold text-blue-600">
              {analysis ? `${analysis.score}%` : "--"}
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Overall resume strength
            </p>

          </div>

          {/* Verdict */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <div className="flex items-center justify-between">

              <h2 className="font-semibold text-slate-700">
                Verdict
              </h2>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-xl">
                ✓
              </div>

            </div>

            <p className="mt-5 text-2xl font-extrabold text-green-600">
              {analysis ? analysis.verdict : "--"}
            </p>

            <p className="mt-2 text-sm text-slate-400">
              AI assessment of your resume
            </p>

          </div>

          {/* Skills */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <div className="flex items-center justify-between">

              <h2 className="font-semibold text-slate-700">
                Skills
              </h2>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-xl">
                ✨
              </div>

            </div>

            <div className="mt-5 flex max-h-20 flex-wrap gap-2 overflow-hidden">

              {analysis?.skills_found?.length ? (
                analysis.skills_found.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-2xl font-bold text-slate-400">
                  --
                </p>
              )}

            </div>

            <p className="mt-3 text-sm text-slate-400">
              Skills identified by AI
            </p>

          </div>

        </section>

        {/* AI Career Tools */}
        <section className="mt-10">

          <div className="mb-5">

            <h2 className="text-2xl font-bold text-slate-900">
              AI Career Tools
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Powerful AI tools to improve, tailor, and optimize your career profile.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {/* Job Description Match */}
            <button
              onClick={() => navigate("/job-match")}
              className="group rounded-2xl border border-slate-200 bg-white p-7 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl transition group-hover:scale-110 group-hover:bg-blue-600">
                🎯
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
              className="group rounded-2xl border border-slate-200 bg-white p-7 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg"
            >

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-2xl transition group-hover:scale-110 group-hover:bg-purple-600">
                ✨
              </div>

              <h3 className="text-xl font-bold text-purple-600">
                Resume Tailor
              </h3>

              <p className="mt-3 leading-7 text-slate-500">
                Tailor your resume to a specific job description with
                AI-powered keywords, skills, summaries, and bullet points.
              </p>

              <span className="mt-6 inline-block font-semibold text-purple-600">
                Tailor Resume →
              </span>

            </button>

            {/* Bullet Point Rewriter */}
            <button
              onClick={() => navigate("/bullet-rewriter")}
              className="group rounded-2xl border border-slate-200 bg-white p-7 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
            >

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl transition group-hover:scale-110 group-hover:bg-indigo-600">
                ✍️
              </div>

              <h3 className="text-xl font-bold text-indigo-600">
                Bullet Point Rewriter
              </h3>

              <p className="mt-3 leading-7 text-slate-500">
                Transform weak resume bullet points into stronger,
                achievement-focused statements using AI.
              </p>

              <span className="mt-6 inline-block font-semibold text-indigo-600">
                Rewrite Bullet →
              </span>

            </button>

            {/* Interview Prep - Coming Soon */}
            <div className="group relative rounded-2xl border border-slate-200 bg-white p-7 text-left shadow-sm">

              <span className="absolute right-5 top-5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
                Coming Soon
              </span>

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-2xl">
                🎤
              </div>

              <h3 className="text-xl font-bold text-slate-700">
                Interview Prep
              </h3>

              <p className="mt-3 leading-7 text-slate-500">
                Practice AI-powered interview questions, get personalized
                feedback, and prepare with role-specific interview simulations.
              </p>

              <span className="mt-6 inline-block font-semibold text-amber-600">
                Coming Soon →
              </span>

            </div>

          </div>

        </section>

        {/* AI Analysis */}
        {analysis && (
          <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

            <div className="mb-8">

              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                AI-Powered Insights
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Resume Analysis
              </h2>

              <p className="mt-2 text-slate-500">
                Here’s what AI found in your resume.
              </p>

            </div>

            {/* Summary */}
            <div className="rounded-xl bg-slate-50 p-6">

              <h3 className="font-bold text-slate-900">
                Summary
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {analysis.summary}
              </p>

            </div>

            {/* Analysis Grid */}
            <div className="mt-6 grid gap-6 md:grid-cols-2">

              {/* Strengths */}
              <div className="rounded-xl border border-green-100 bg-green-50/50 p-6">

                <h3 className="text-lg font-bold text-green-700">
                  ✓ Strengths
                </h3>

                <ul className="mt-4 space-y-3">

                  {analysis.strengths?.map((item, index) => (
                    <li
                      key={index}
                      className="flex gap-2 text-sm leading-6 text-slate-600"
                    >
                      <span className="font-bold text-green-600">
                        •
                      </span>

                      {item}
                    </li>
                  ))}

                </ul>

              </div>

              {/* Weaknesses */}
              <div className="rounded-xl border border-red-100 bg-red-50/50 p-6">

                <h3 className="text-lg font-bold text-red-600">
                  ⚠ Weaknesses
                </h3>

                <ul className="mt-4 space-y-3">

                  {analysis.weaknesses?.map((item, index) => (
                    <li
                      key={index}
                      className="flex gap-2 text-sm leading-6 text-slate-600"
                    >
                      <span className="font-bold text-red-500">
                        •
                      </span>

                      {item}
                    </li>
                  ))}

                </ul>

              </div>

              {/* Improvements */}
              <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-6">

                <h3 className="text-lg font-bold text-blue-700">
                  💡 Improvements
                </h3>

                <ul className="mt-4 space-y-3">

                  {analysis.improvements?.map((item, index) => (
                    <li
                      key={index}
                      className="flex gap-2 text-sm leading-6 text-slate-600"
                    >
                      <span className="font-bold text-blue-500">
                        •
                      </span>

                      {item}
                    </li>
                  ))}

                </ul>

              </div>

              {/* Missing Sections */}
              <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-6">

                <h3 className="text-lg font-bold text-purple-700">
                  📌 Missing Sections
                </h3>

                <ul className="mt-4 space-y-3">

                  {analysis.missing_sections?.map((item, index) => (
                    <li
                      key={index}
                      className="flex gap-2 text-sm leading-6 text-slate-600"
                    >
                      <span className="font-bold text-purple-500">
                        •
                      </span>

                      {item}
                    </li>
                  ))}

                </ul>

              </div>

            </div>

            {/* ATS Issues */}
            <div className="mt-6 rounded-xl border border-orange-100 bg-orange-50/50 p-6">

              <h3 className="text-lg font-bold text-orange-700">
                🔍 ATS Issues
              </h3>

              <ul className="mt-4 grid gap-3 md:grid-cols-2">

                {analysis.ats_issues?.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-2 text-sm leading-6 text-slate-600"
                  >
                    <span className="font-bold text-orange-500">
                      •
                    </span>

                    {item}
                  </li>
                ))}

              </ul>

            </div>

          </section>
        )}

      </main>
    </div>
  );
}

export default Dashboard;
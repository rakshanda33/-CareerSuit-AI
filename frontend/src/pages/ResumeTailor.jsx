import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  tailorResume,
  downloadTailoredResume,
} from "../services/api";

function ResumeTailor() {
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!resume || !jobDescription.trim()) {
      setError(
        "Please upload your resume and enter the job description."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const formData = new FormData();

      formData.append("file", resume);
      formData.append("job_description", jobDescription);

      const response = await tailorResume(formData);

      setResult(response.data);
    } catch (err) {
      console.error("Resume Tailor Error:", err);

      setError(
        err.response?.data?.detail ||
          "Something went wrong while tailoring your resume."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!result) return;

    try {
      setDownloading(true);
      setError("");

      const response = await downloadTailoredResume(result);

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "CareerSuit-AI-Tailored-Resume.docx";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("DOCX Download Error:", err);

      setError(
        err.response?.data?.detail ||
          "Unable to generate the Word document. Please try again."
      );
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5 md:px-10">

          <button
            onClick={() => navigate("/dashboard")}
            className="mb-5 text-sm font-semibold text-slate-500 transition hover:text-purple-600"
          >
            ← Back to Dashboard
          </button>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <div>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-2xl">
                ✨
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                Resume Tailor
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
                Tailor your resume to a specific job description and improve
                your ATS alignment using AI.
              </p>
            </div>

            <div className="hidden rounded-xl border border-purple-100 bg-purple-50 px-5 py-4 md:block">
              <p className="text-xs font-semibold uppercase tracking-wider text-purple-600">
                AI Career Tool
              </p>

              <p className="mt-1 text-sm font-medium text-slate-700">
                Resume Optimization
              </p>
            </div>

          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 md:px-10">

        {/* Input Section */}
        <section>

          <div className="mb-5">
            <h2 className="text-2xl font-bold text-slate-900">
              Tailor Your Resume
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Upload your resume and provide the job description you're
              targeting.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">

            {/* Resume Upload */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
                  📄
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Your Resume
                  </h3>

                  <p className="text-sm text-slate-500">
                    Upload the resume you want to tailor.
                  </p>
                </div>

              </div>

              <label
                htmlFor="tailor-resume-upload"
                className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/40 px-6 py-10 text-center transition hover:border-blue-400 hover:bg-blue-50"
              >

                <div className="text-3xl">
                  📤
                </div>

                <p className="mt-3 font-semibold text-slate-700">
                  {resume
                    ? "Resume selected"
                    : "Choose your resume"}
                </p>

                <p className="mt-1 max-w-full truncate px-4 text-sm text-slate-400">
                  {resume
                    ? resume.name
                    : "PDF files only"}
                </p>

                <input
                  id="tailor-resume-upload"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0];

                    setResume(selectedFile || null);
                    setError("");
                  }}
                />

              </label>

              {resume && (
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                    ✓
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium text-green-600">
                      Ready to tailor
                    </p>

                    <p className="truncate text-sm font-semibold text-green-800">
                      {resume.name}
                    </p>
                  </div>

                </div>
              )}

            </div>

            {/* Job Description */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-xl">
                  💼
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Target Job
                  </h3>

                  <p className="text-sm text-slate-500">
                    Paste the job description you're applying for.
                  </p>
                </div>

              </div>

              <textarea
                value={jobDescription}
                onChange={(e) => {
                  setJobDescription(e.target.value);
                  setError("");
                }}
                placeholder="Paste the complete job description here..."
                className="mt-6 h-48 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-100"
              />

              <div className="mt-2 flex justify-end">
                <span className="text-xs text-slate-400">
                  {jobDescription.length} characters
                </span>
              </div>

            </div>

          </div>

          {/* Error */}
          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
              ⚠ {error}
            </div>
          )}

          {/* Tailor Button */}
          <div className="mt-7 flex justify-center">

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-3.5 font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-slate-400 disabled:bg-none"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Tailoring Resume...
                </span>
              ) : (
                "✨ Tailor My Resume →"
              )}
            </button>

          </div>

        </section>

        {/* Results */}
        {result && (
          <section className="mt-12">

            {/* Result Header */}
            <div className="mb-5">
              <p className="text-sm font-semibold uppercase tracking-wider text-purple-600">
                AI-Powered Improvements
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Your Tailored Resume
              </h2>

              <p className="mt-2 text-slate-500">
                AI-generated improvements based on your target job.
              </p>
            </div>

            {/* Download Card */}
            <div className="rounded-2xl border border-purple-100 bg-gradient-to-br from-blue-50 via-white to-purple-50 p-7 shadow-sm">

              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                    ✨
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Your resume has been tailored
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Review the AI-generated improvements below or download
                      an editable Word document.
                    </p>
                  </div>

                </div>

                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="shrink-0 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-green-700 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {downloading
                    ? "⏳ Creating Word File..."
                    : "📥 Download Word Resume"}
                </button>

              </div>

            </div>

            {/* Professional Summary */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  📝
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  Professional Summary
                </h3>

              </div>

              <p className="mt-5 leading-7 text-slate-600">
                {result.professional_summary}
              </p>

            </div>

            {/* Key Skills */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  🧠
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Key Skills
                  </h3>

                  <p className="text-sm text-slate-400">
                    Skills prioritized for this role
                  </p>
                </div>

              </div>

              <div className="mt-5 flex flex-wrap gap-2">

                {result.key_skills?.length ? (
                  result.key_skills.map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">
                    No key skills returned.
                  </p>
                )}

              </div>

            </div>

            {/* Tailored Experience */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
                  ✍️
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Tailored Experience
                  </h3>

                  <p className="text-sm text-slate-400">
                    See how your bullet points were improved
                  </p>
                </div>

              </div>

              <div className="mt-6 space-y-5">

                {result.tailored_bullets?.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-200 bg-slate-50/50 p-5"
                  >

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Original
                      </p>

                      <p className="mt-2 leading-7 text-slate-600">
                        {item.original}
                      </p>
                    </div>

                    <div className="my-5 border-t border-slate-200" />

                    <div>

                      <p className="text-xs font-bold uppercase tracking-wider text-purple-600">
                        ✨ AI Improved
                      </p>

                      <p className="mt-2 font-medium leading-7 text-slate-800">
                        {item.improved}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

            </div>

            {/* Keywords */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
                  🔑
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Keywords to Add
                  </h3>

                  <p className="text-sm text-slate-400">
                    Keywords that can improve your job alignment
                  </p>
                </div>

              </div>

              <div className="mt-5 flex flex-wrap gap-2">

                {result.keywords_to_add?.length ? (
                  result.keywords_to_add.map((keyword, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700"
                    >
                      {keyword}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">
                    No additional keywords identified.
                  </p>
                )}

              </div>

            </div>

            {/* Recommendations */}
            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 p-7">

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                  💡
                </div>

                <div className="w-full">

                  <h3 className="text-xl font-bold text-blue-800">
                    AI Recommendations
                  </h3>

                  <div className="mt-4 space-y-3">

                    {result.recommendations?.map(
                      (item, index) => (
                        <div
                          key={index}
                          className="flex gap-3 text-sm leading-6 text-blue-700"
                        >
                          <span className="font-bold">
                            ✓
                          </span>

                          <p>{item}</p>
                        </div>
                      )
                    )}

                  </div>

                </div>

              </div>

            </div>

            {/* Bottom Actions */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">

              <button
                onClick={() => navigate("/dashboard")}
                className="rounded-xl border border-slate-300 bg-white px-7 py-3 font-semibold text-slate-700 transition hover:border-purple-300 hover:text-purple-600 hover:shadow-sm"
              >
                ← Back to Dashboard
              </button>

              <button
                onClick={handleDownload}
                disabled={downloading}
                className="rounded-xl bg-green-600 px-7 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {downloading
                  ? "Creating File..."
                  : "📥 Download Editable Resume"}
              </button>

            </div>

          </section>
        )}

      </main>
    </div>
  );
}

export default ResumeTailor;
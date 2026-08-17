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

  // ─────────────────────────────────────────────
  // Tailor Resume
  // ─────────────────────────────────────────────

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

  // ─────────────────────────────────────────────
  // Download Editable Word Document
  // ─────────────────────────────────────────────

  const handleDownload = async () => {
    if (!result) return;

    try {
      setDownloading(true);
      setError("");

      const response = await downloadTailoredResume(result);

      const blob = new Blob(
        [response.data],
        {
          type:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        }
      );

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
    <div className="min-h-screen bg-slate-100 px-6 py-10 md:px-12">
      <div className="mx-auto max-w-7xl">

        {/* ───────────────────────────────────────── */}
        {/* Back */}
        {/* ───────────────────────────────────────── */}

        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 text-sm font-medium text-slate-500 transition hover:text-blue-600"
        >
          ← Back to Dashboard
        </button>

        {/* ───────────────────────────────────────── */}
        {/* Header */}
        {/* ───────────────────────────────────────── */}

        <div className="mb-8">
          <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
            ✨ AI Career Tool
          </span>

          <h1 className="mt-4 text-4xl font-extrabold text-slate-900">
            Resume Tailor
          </h1>

          <p className="mt-2 max-w-2xl text-slate-600">
            Tailor your resume to a specific job description and improve
            your ATS alignment using AI.
          </p>
        </div>

        {/* ───────────────────────────────────────── */}
        {/* Input Section */}
        {/* ───────────────────────────────────────── */}

        <div className="grid gap-6 lg:grid-cols-2">

          {/* Resume Upload */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800">
              📄 Upload Resume
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Upload your resume in PDF format.
            </p>

            <label className="mt-6 flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/50 transition hover:border-blue-400 hover:bg-blue-50">
              <span className="text-4xl">
                📄
              </span>

              <span className="mt-3 max-w-full truncate px-4 text-center font-semibold text-blue-600">
                {resume
                  ? resume.name
                  : "Choose your resume"}
              </span>

              <span className="mt-1 text-sm text-slate-500">
                PDF files only
              </span>

              <input
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
          </div>

          {/* Job Description */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800">
              💼 Job Description
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Paste the job description you're applying for.
            </p>

            <textarea
              value={jobDescription}
              onChange={(e) => {
                setJobDescription(e.target.value);
                setError("");
              }}
              placeholder="Paste the complete job description here..."
              className="mt-6 min-h-48 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* ───────────────────────────────────────── */}
        {/* Error */}
        {/* ───────────────────────────────────────── */}

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* ───────────────────────────────────────── */}
        {/* Tailor Button */}
        {/* ───────────────────────────────────────── */}

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3.5 font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "✨ Tailoring Resume..."
              : "✨ Tailor My Resume"}
          </button>
        </div>

        {/* ───────────────────────────────────────── */}
        {/* Results */}
        {/* ───────────────────────────────────────── */}

        {result && (
          <div className="mt-12 space-y-6">

            {/* Result Header */}

            <div className="flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-6 md:flex-row md:items-center">

              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  ✨ Tailored Resume
                </h2>

                <p className="mt-1 text-slate-500">
                  AI-generated improvements based on your target job.
                </p>
              </div>

              <button
                onClick={handleDownload}
                disabled={downloading}
                className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition hover:scale-[1.02] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {downloading
                  ? "⏳ Creating Word File..."
                  : "📥 Download Editable Word Resume"}
              </button>

            </div>

            {/* Professional Summary */}

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800">
                Professional Summary
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {result.professional_summary}
              </p>
            </div>

            {/* Key Skills */}

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800">
                Key Skills
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {result.key_skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tailored Experience */}

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800">
                Tailored Experience
              </h3>

              <div className="mt-6 space-y-6">
                {result.tailored_bullets?.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-slate-200 p-5"
                    >
                      <p className="text-sm font-semibold text-slate-500">
                        Original
                      </p>

                      <p className="mt-2 text-slate-600">
                        {item.original}
                      </p>

                      <div className="my-4 border-t border-slate-200" />

                      <p className="text-sm font-semibold text-purple-600">
                        ✨ Improved
                      </p>

                      <p className="mt-2 font-medium leading-7 text-slate-800">
                        {item.improved}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Keywords */}

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800">
                Keywords to Add
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {result.keywords_to_add?.map(
                  (keyword, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700"
                    >
                      {keyword}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Recommendations */}

            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-6">
              <h3 className="text-xl font-bold text-slate-800">
                Recommendations
              </h3>

              <div className="mt-4 space-y-3">
                {result.recommendations?.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex gap-3 text-slate-700"
                    >
                      <span className="font-bold text-blue-600">
                        ✓
                      </span>

                      <p>{item}</p>
                    </div>
                  )
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeTailor;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jobMatch } from "../services/api";

function JobMatch() {
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {
    if (!resume) {
      alert("Please select your resume first.");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please enter the job description.");
      return;
    }

    const formData = new FormData();
    formData.append("file", resume);
    formData.append("job_description", jobDescription);

    try {
      setLoading(true);
      setResult(null);

      const response = await jobMatch(formData);

      console.log("Job Match Result:", response.data);
      setResult(response.data);
    } catch (error) {
      console.error("Job Match Error:", error);

      if (error.response) {
        alert(
          error.response.data?.detail ||
            "Unable to analyze the job match."
        );
      } else {
        alert("Unable to connect to the AI service.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5 md:px-10">

          <button
            onClick={() => navigate("/dashboard")}
            className="mb-5 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
          >
            ← Back to Dashboard
          </button>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <div>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                🎯
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                Job Description Match
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
                Compare your resume with a job description and discover how
                well your profile matches the role.
              </p>
            </div>

            <div className="hidden rounded-xl border border-blue-100 bg-blue-50 px-5 py-4 md:block">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                AI Career Tool
              </p>

              <p className="mt-1 text-sm font-medium text-slate-700">
                ATS Match Analysis
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
              Compare Your Profile
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
                    Upload the resume you want to analyze.
                  </p>
                </div>

              </div>

              <label
                htmlFor="job-resume-upload"
                className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/40 px-6 py-10 text-center transition hover:border-blue-400 hover:bg-blue-50"
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
                  id="job-resume-upload"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="hidden"
                />

              </label>

              {resume && (
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                    📄
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium text-green-600">
                      Resume selected
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
                    Job Description
                  </h3>

                  <p className="text-sm text-slate-500">
                    Paste the job description for your target role.
                  </p>
                </div>

              </div>

              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="mt-6 h-48 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              <div className="mt-2 flex justify-end">
                <span className="text-xs text-slate-400">
                  {jobDescription.length} characters
                </span>
              </div>

            </div>

          </div>

          {/* Analyze Button */}
          <div className="mt-7 flex justify-center">

            <button
              onClick={handleMatch}
              disabled={loading}
              className="rounded-xl bg-blue-600 px-10 py-3.5 font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Analyzing Match...
                </span>
              ) : (
                "Check Job Match →"
              )}
            </button>

          </div>

        </section>

        {/* Results */}
        {result && (
          <section className="mt-12">

            <div className="mb-5">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                AI-Powered Insights
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Your Job Match Results
              </h2>

              <p className="mt-2 text-slate-500">
                Here's how well your resume aligns with this opportunity.
              </p>
            </div>

            {/* ATS Score */}
            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8 shadow-sm">

              <div className="flex flex-col items-center text-center">

                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                  🎯
                </div>

                <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  ATS Match Score
                </p>

                <p className="mt-2 text-6xl font-extrabold text-blue-600">
                  {result.ats_score}%
                </p>

                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                  Your resume's estimated compatibility with the job
                  requirements based on skills and keywords.
                </p>

              </div>

            </div>

            {/* Match Summary */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  📊
                </div>

                <h2 className="text-xl font-bold text-slate-900">
                  Match Summary
                </h2>

              </div>

              <p className="mt-4 leading-7 text-slate-600">
                {result.match_summary}
              </p>

            </div>

            {/* Keywords */}
            <div className="mt-6 grid gap-6 md:grid-cols-2">

              {/* Matched */}
              <div className="rounded-2xl border border-green-100 bg-white p-7 shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-lg">
                    ✓
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-green-700">
                      Matched Skills
                    </h2>

                    <p className="text-sm text-slate-400">
                      Skills and keywords found in your resume
                    </p>
                  </div>

                </div>

                <div className="mt-6 flex flex-wrap gap-2">

                  {result.matched_keywords?.length ? (
                    result.matched_keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700"
                      >
                        {keyword}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">
                      No matched keywords found.
                    </p>
                  )}

                </div>

              </div>

              {/* Missing */}
              <div className="rounded-2xl border border-red-100 bg-white p-7 shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-lg">
                    !
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-red-600">
                      Missing Skills
                    </h2>

                    <p className="text-sm text-slate-400">
                      Keywords you may want to add or strengthen
                    </p>
                  </div>

                </div>

                <div className="mt-6 flex flex-wrap gap-2">

                  {result.missing_keywords?.length ? (
                    result.missing_keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700"
                      >
                        {keyword}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">
                      No missing keywords identified.
                    </p>
                  )}

                </div>

              </div>

            </div>

            {/* Recommendation */}
            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 p-7">

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                  💡
                </div>

                <div>
                  <h2 className="text-xl font-bold text-blue-800">
                    AI Recommendation
                  </h2>

                  <p className="mt-3 leading-7 text-blue-700">
                    {result.recommendation}
                  </p>
                </div>

              </div>

            </div>

            {/* Bottom Action */}
            <div className="mt-8 flex justify-center">

              <button
                onClick={() => navigate("/dashboard")}
                className="rounded-xl border border-slate-300 bg-white px-7 py-3 font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600 hover:shadow-sm"
              >
                ← Back to Dashboard
              </button>

            </div>

          </section>
        )}

      </main>
    </div>
  );
}

export default JobMatch;
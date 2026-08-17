import { useState } from "react";
import { jobMatch } from "../services/api";

function JobMatch() {
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
    <div className="min-h-screen bg-slate-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            Job Description Match
          </h1>

          <p className="text-gray-600 mt-2">
            Compare your resume with a job description and discover how well
            your profile matches the role.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              Upload Resume
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              Upload the resume you want to compare with this job.
            </p>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setResume(e.target.files[0])}
              className="w-full border border-gray-300 rounded-lg p-3 bg-white"
            />

            {resume && (
              <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-700 font-medium">
                  ✓ {resume.name}
                </p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              Job Description
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              Paste the job description for the role you're targeting.
            </p>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="w-full h-40 border border-gray-300 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleMatch}
            disabled={loading}
            className="bg-blue-600 text-white px-10 py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? "Analyzing Match..." : "Check Job Match"}
          </button>
        </div>

        {result && (
          <div className="mt-10">

            <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
              <p className="text-gray-500 font-medium">
                ATS Match Score
              </p>

              <p className="text-6xl font-bold text-blue-600 mt-2">
                {result.ats_score}%
              </p>

              <p className="text-gray-600 mt-3">
                Based on the skills and requirements found in your resume.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-8 mt-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                Match Summary
              </h2>

              <p className="text-gray-600 leading-relaxed">
                {result.match_summary}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-green-700 mb-4">
                  ✓ Matched Skills
                </h2>

                <div className="flex flex-wrap gap-2">
                  {result.matched_keywords?.map((keyword, index) => (
                    <span
                      key={index}
                      className="bg-green-50 text-green-700 border border-green-200 px-3 py-2 rounded-full text-sm font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-red-700 mb-4">
                  ✕ Missing Skills
                </h2>

                <div className="flex flex-wrap gap-2">
                  {result.missing_keywords?.map((keyword, index) => (
                    <span
                      key={index}
                      className="bg-red-50 text-red-700 border border-red-200 px-3 py-2 rounded-full text-sm font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mt-6">
              <h2 className="text-xl font-bold text-blue-800 mb-2">
                💡 Recommendation
              </h2>

              <p className="text-blue-700">
                {result.recommendation}
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default JobMatch;
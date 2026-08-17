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
    <div className="min-h-screen bg-slate-100 p-10">
      <h1 className="text-4xl font-bold text-blue-600">
        Career Dashboard 👋
      </h1>

      {/* Top Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">Resume Score</h2>
          <p className="text-4xl text-blue-600 mt-3">
            {analysis ? `${analysis.score}%` : "--"}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">Verdict</h2>
          <p className="text-2xl text-green-600 mt-3">
            {analysis ? analysis.verdict : "--"}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">Skills</h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {analysis ? (
              analysis.skills_found.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p>--</p>
            )}
          </div>
        </div>

      </div>

      {/* Upload Section */}
      <div className="mt-10 flex flex-col gap-4 max-w-md">

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResume(e.target.files[0])}
          className="border p-3 rounded-lg bg-white"
        />

        {resume && (
          <p className="text-green-600 font-medium">
            Selected File: {resume.name}
          </p>
        )}

        <div className="flex gap-4">

          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Analyzing..." : "Upload Resume"}
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-8 py-3 rounded-xl hover:bg-red-700"
          >
            Logout
          </button>

        </div>

      </div>

      {/* AI Analysis */}
      {analysis && (
        <div className="mt-10 bg-white rounded-xl shadow p-8">

          <h2 className="text-3xl font-bold mb-4">
            AI Resume Analysis
          </h2>

          <p className="mb-6">
            <strong>Summary:</strong> {analysis.summary}
          </p>

          <h3 className="text-xl font-bold mb-2">Strengths</h3>
          <ul className="list-disc ml-6 mb-6">
            {analysis.strengths.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3 className="text-xl font-bold mb-2">Weaknesses</h3>
          <ul className="list-disc ml-6 mb-6">
            {analysis.weaknesses.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3 className="text-xl font-bold mb-2">Improvements</h3>
          <ul className="list-disc ml-6 mb-6">
            {analysis.improvements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3 className="text-xl font-bold mb-2">Missing Sections</h3>
          <ul className="list-disc ml-6 mb-6">
            {analysis.missing_sections.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3 className="text-xl font-bold mb-2">ATS Issues</h3>
          <ul className="list-disc ml-6">
            {analysis.ats_issues.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

        </div>
      )}
    </div>
  );
}

export default Dashboard;
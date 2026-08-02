import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <h1 className="text-4xl font-bold text-blue-600">
        Career Dashboard 👋
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">Resume Score</h2>
          <p className="text-4xl text-blue-600 mt-3">87%</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">ATS Match</h2>
          <p className="text-4xl text-green-600 mt-3">92%</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">Skills</h2>
          <p className="mt-3">AI • React • Python</p>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4 max-w-md">

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files[0])}
          className="border p-3 rounded-lg bg-white"
        />

        {resume && (
          <p className="text-green-600 font-medium">
            Selected File: {resume.name}
          </p>
        )}

        <div className="flex gap-4">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700">
            Upload Resume
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-8 py-3 rounded-xl hover:bg-red-700"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
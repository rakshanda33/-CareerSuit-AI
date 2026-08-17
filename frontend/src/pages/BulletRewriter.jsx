import { useState } from "react";
import { rewriteBullet } from "../services/api";

function BulletRewriter() {
  const [bullet, setBullet] = useState("");
  const [rewrites, setRewrites] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRewrite = async () => {
    if (!bullet.trim()) {
      alert("Please enter a resume bullet point.");
      return;
    }

    try {
      setLoading(true);
      setRewrites([]);

      const response = await rewriteBullet(bullet);

      console.log("Bullet Rewrite Result:", response.data);

      setRewrites(response.data.rewrites || []);
    } catch (error) {
      console.error("Bullet Rewrite Error:", error);

      if (error.response) {
        alert(
          error.response.data?.detail ||
            "Unable to rewrite the bullet point."
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
      <div className="max-w-4xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            Bullet Point Rewriter
          </h1>

          <p className="text-gray-600 mt-2">
            Turn weak resume bullet points into stronger,
            achievement-focused statements using AI.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            Enter Your Bullet Point
          </h2>

          <p className="text-sm text-gray-500 mb-4">
            Example: "Worked on a website"
          </p>

          <textarea
            value={bullet}
            onChange={(e) => setBullet(e.target.value)}
            placeholder="Enter a resume bullet point..."
            maxLength={300}
            className="w-full h-36 border border-gray-300 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-400">
              {bullet.length}/300
            </span>

            <button
              onClick={handleRewrite}
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading ? "Rewriting..." : "Rewrite with AI"}
            </button>
          </div>
        </div>

        {rewrites.length > 0 && (
          <div className="mt-8">

            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              AI Rewritten Versions
            </h2>

            <div className="space-y-4">
              {rewrites.map((rewrite, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-blue-600"
                >
                  <p className="text-sm font-semibold text-blue-600 mb-2">
                    Version {index + 1}
                  </p>

                  <p className="text-slate-700 leading-relaxed">
                    {rewrite}
                  </p>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default BulletRewriter;
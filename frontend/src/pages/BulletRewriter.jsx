import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { rewriteBullet } from "../services/api";

function BulletRewriter() {
  const navigate = useNavigate();

  const [bullet, setBullet] = useState("");
  const [rewrites, setRewrites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRewrite = async () => {
    if (!bullet.trim()) {
      setError("Please enter a resume bullet point.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setRewrites([]);

      const response = await rewriteBullet(bullet);

      console.log("Bullet Rewrite Result:", response.data);

      setRewrites(response.data.rewrites || []);
    } catch (error) {
      console.error("Bullet Rewrite Error:", error);

      if (error.response) {
        setError(
          error.response.data?.detail ||
            "Unable to rewrite the bullet point."
        );
      } else {
        setError("Unable to connect to the AI service.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10 md:px-12">
      <div className="mx-auto max-w-6xl">

        {/* Back to Dashboard */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 text-sm font-medium text-slate-500 transition hover:text-blue-600"
        >
          ← Back to Dashboard
        </button>

        {/* Header */}
        <div className="mb-8">
          <span className="inline-flex rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700">
            ✍️ AI Career Tool
          </span>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Bullet Point Rewriter
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            Transform weak resume bullet points into stronger,
            achievement-focused statements that highlight your impact.
          </p>
        </div>

        {/* Main Input Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-2xl">
              ✍️
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Improve Your Bullet Point
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Enter a bullet point from your resume and let AI create
                stronger versions for you.
              </p>
            </div>
          </div>

          {/* Example */}
          <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Example
            </p>

            <p className="mt-2 text-sm text-slate-600">
              "Worked on a website"
            </p>

            <p className="mt-2 text-xs text-slate-400">
              Try using a real bullet from your resume.
            </p>
          </div>

          {/* Textarea */}
          <div className="mt-6">
            <textarea
              value={bullet}
              onChange={(e) => {
                setBullet(e.target.value);
                setError("");
              }}
              placeholder="Enter your resume bullet point here..."
              maxLength={300}
              className="min-h-40 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />

            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Make your bullet specific and achievement-focused.
              </span>

              <span className="text-sm font-medium text-slate-400">
                {bullet.length}/300
              </span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleRewrite}
              disabled={loading}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 font-semibold text-white shadow-md transition hover:scale-[1.02] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "✨ Rewriting..."
                : "✨ Rewrite with AI"}
            </button>
          </div>
        </div>

        {/* Results */}
        {rewrites.length > 0 && (
          <section className="mt-10">

            {/* Result Header */}
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                AI-Powered Improvements
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                AI Rewritten Versions
              </h2>

              <p className="mt-2 text-slate-500">
                Choose the version that best represents your experience and
                impact.
              </p>
            </div>

            {/* Original Bullet */}
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                  📝
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Original
                  </p>

                  <p className="mt-1 font-medium text-slate-700">
                    {bullet}
                  </p>
                </div>
              </div>
            </div>

            {/* Rewrites */}
            <div className="grid gap-5">
              {rewrites.map((rewrite, index) => (
                <div
                  key={index}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-lg transition group-hover:bg-indigo-600">
                        ✨
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                          AI Version
                        </p>

                        <h3 className="text-lg font-bold text-slate-900">
                          Version {index + 1}
                        </h3>
                      </div>
                    </div>

                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      Improved
                    </span>
                  </div>

                  <div className="mt-5 rounded-xl bg-slate-50 p-5">
                    <div className="flex gap-3">
                      <span className="mt-1 font-bold text-indigo-600">
                        •
                      </span>

                      <p className="leading-7 text-slate-700">
                        {rewrite}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tip */}
            <div className="mt-6 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
              <h3 className="text-lg font-bold text-slate-900">
                💡 Resume Tip
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Choose the version that most accurately reflects your real
                experience. Strong bullet points should focus on what you
                accomplished, the tools you used, and the measurable impact
                whenever possible.
              </p>
            </div>

          </section>
        )}

      </div>
    </div>
  );
}

export default BulletRewriter;
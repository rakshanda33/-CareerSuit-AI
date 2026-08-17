import heroImage from "../assets/hero.png";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 px-8 py-20 md:px-16 lg:px-24">

      {/* Background Decorations */}
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-14 md:flex-row">

        {/* Hero Content */}
        <div className="max-w-2xl">

          <div className="mb-6 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
            AI-Powered Career Platform
          </div>

          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl">
            Build Your Career
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Smarter With AI.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 md:text-xl">
            Analyze your resume, match with relevant jobs, tailor your
            applications, improve your resume, and prepare for your next
            career opportunity — all in one intelligent platform.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">

            <Button onClick={() => navigate("/login")}>
              Get Started →
            </Button>

            <button
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:border-blue-400 hover:text-blue-600"
            >
              Explore Features
            </button>

          </div>

          {/* Highlights */}
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500">
            <span>✓ AI-powered analysis</span>
            <span>✓ ATS optimization</span>
            <span>✓ Personalized career tools</span>
          </div>

        </div>

        {/* Hero Image */}
        <div className="relative">

          <div className="absolute inset-0 rounded-3xl bg-blue-200/40 blur-3xl" />

          <img
            src={heroImage}
            alt="CareerSuit AI"
            className="relative w-full max-w-lg scale-110 drop-shadow-2xl"
          />

        </div>

      </div>
    </section>
  );
}

export default Hero;
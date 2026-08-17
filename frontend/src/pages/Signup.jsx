import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { registerUser } from "../services/authService";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    try {
      const response = await registerUser(name, email, password);
      const data = response.data;

      setMessage(data.message);

      if (
        data.message.toLowerCase().includes("success") ||
        data.success === "true"
      ) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">

      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl">

        {/* Branding Panel */}
        <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-blue-600 p-12 text-white md:flex md:flex-col md:justify-between">

          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />

          <div className="relative">
            <button
              onClick={() => navigate("/")}
              className="text-2xl font-extrabold tracking-tight text-white"
            >
              CareerSuit AI
            </button>
          </div>

          <div className="relative">

            <div className="mb-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              🚀 Start your career journey
            </div>

            <h1 className="text-4xl font-extrabold leading-tight">
              Your next opportunity
              <span className="block text-purple-100">
                starts here.
              </span>
            </h1>

            <p className="mt-5 max-w-md leading-7 text-blue-100">
              Create your CareerSuit AI account and unlock intelligent tools
              designed to help you build a stronger career.
            </p>

            <div className="mt-8 space-y-4 text-sm text-blue-50">
              <div>✓ Analyze and improve your resume</div>
              <div>✓ Find jobs that match your skills</div>
              <div>✓ Prepare confidently for interviews</div>
            </div>

          </div>

          <p className="relative text-sm text-blue-100">
            © 2026 CareerSuit AI
          </p>

        </div>

        {/* Signup Panel */}
        <div className="flex w-full items-center justify-center p-8 md:w-1/2 md:p-12">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <button
              onClick={() => navigate("/")}
              className="mb-8 text-xl font-extrabold text-blue-600 md:hidden"
            >
              CareerSuit <span className="text-purple-600">AI</span>
            </button>

            <div className="mb-7">
              <p className="text-sm font-semibold uppercase tracking-wider text-purple-600">
                Get started
              </p>

              <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900">
                Create your account
              </h2>

              <p className="mt-3 text-slate-500">
                Start building your career smarter with AI.
              </p>
            </div>

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Email */}
            <div className="mt-4">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Password */}
            <div className="mt-4">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-20 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent px-2 py-1 text-sm font-medium text-slate-500 hover:bg-transparent hover:text-blue-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Signup */}
            <Button
              className="mt-7 w-full py-3.5"
              onClick={handleSignup}
            >
              Create Account →
            </Button>

            {/* Message */}
            {message && (
              <div
                className={`mt-4 rounded-lg px-4 py-3 text-center text-sm font-medium ${
                  message.toLowerCase().includes("success")
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {message}
              </div>
            )}

            {/* Login */}
            <p className="mt-7 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="bg-transparent p-0 font-semibold text-blue-600 hover:bg-transparent hover:text-blue-700"
              >
                Login
              </button>
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-5 w-full bg-transparent text-center text-sm text-slate-400 hover:bg-transparent hover:text-slate-600"
            >
              ← Back to Home
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Signup;
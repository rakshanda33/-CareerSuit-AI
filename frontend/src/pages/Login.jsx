import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setMessage("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await loginUser(email, password);
      const data = response.data;

      // Only store login information when login is successful
      if (data.success === true || data.success === "true") {
        // JWT token
        localStorage.setItem("token", data.token);

        // User information
        if (data.userId) {
          localStorage.setItem("userId", String(data.userId));
        }

        if (data.name) {
          localStorage.setItem("userName", data.name);
        }

        if (data.email) {
          localStorage.setItem("userEmail", data.email);
        }

        setMessage(data.message || "Login Successful");

        // Preserve redirect flow
        const redirectTo =
          location.state?.redirectTo || "/dashboard";

        navigate(redirectTo);
      } else {
        setMessage(data.message || "Invalid Credentials");

        // Make sure old auth data is not left behind
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
      }
    } catch (error) {
      console.error("Login Error:", error);

      setMessage(
        error.response?.data?.message ||
          "Server Error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">

      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl">

        {/* Left Branding Panel */}
        <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-600 to-purple-600 p-12 text-white md:flex md:flex-col md:justify-between">

          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-purple-300/20 blur-3xl" />

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
              ✨ AI-Powered Career Platform
            </div>

            <h1 className="text-4xl font-extrabold leading-tight">
              Build your career
              <span className="block text-blue-100">
                smarter with AI.
              </span>
            </h1>

            <p className="mt-5 max-w-md leading-7 text-blue-100">
              Analyze your resume, optimize for ATS, discover relevant jobs,
              and prepare for interviews — all from one platform.
            </p>

            <div className="mt-8 space-y-4 text-sm text-blue-50">
              <div>✓ AI-powered resume analysis</div>
              <div>✓ ATS optimization & job matching</div>
              <div>✓ Smart career preparation tools</div>
            </div>

          </div>

          <p className="relative text-sm text-blue-100">
            © 2026 CareerSuit AI
          </p>

        </div>

        {/* Login Panel */}
        <div className="flex w-full items-center justify-center p-8 md:w-1/2 md:p-12">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <button
              onClick={() => navigate("/")}
              className="mb-10 text-xl font-extrabold text-blue-600 md:hidden"
            >
              CareerSuit{" "}
              <span className="text-purple-600">
                AI
              </span>
            </button>

            <div className="mb-8">

              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Welcome back
              </p>

              <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900">
                Login to your account
              </h2>

              <p className="mt-3 text-slate-500">
                Continue building your career with AI.
              </p>

            </div>

            {/* Email */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setMessage("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

            </div>

            {/* Password */}
            <div className="mt-5">

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setMessage("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleLogin();
                    }
                  }}
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

            {/* Login */}
            <Button
              className="mt-7 w-full py-3.5"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login →"}
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

            {/* Signup */}
            <p className="mt-7 text-center text-sm text-slate-500">

              Don't have an account?{" "}

              <button
                onClick={() => navigate("/signup")}
                className="bg-transparent p-0 font-semibold text-blue-600 hover:bg-transparent hover:text-blue-700"
              >
                Create one
              </button>

            </p>

            {/* Back */}
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

export default Login;
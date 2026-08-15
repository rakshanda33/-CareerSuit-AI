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

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      const data = response.data;

      // Save JWT token
      localStorage.setItem("token", data.token);

      setMessage(data.message);

      if (data.success === "true") {
        // If user came from a feature, go to that feature.
        // Otherwise, go to Dashboard.
        const redirectTo = location.state?.redirectTo || "/dashboard";

        navigate(redirectTo);
      }
    } catch (error) {
      console.error(error);
      setMessage("Server Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow w-96">

        <h1 className="text-3xl font-bold text-center">
          Login
        </h1>

        <input
          className="w-full mt-6 p-3 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mt-4 p-3 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button className="w-full mt-6" onClick={handleLogin}>
          Login
        </Button>

        <p className="text-center mt-4 text-red-600">
          {message}
        </p>

      </div>
    </div>
  );
}

export default Login;
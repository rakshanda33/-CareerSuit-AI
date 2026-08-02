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

  const handleSignup = async () => {
    try {
      const response = await registerUser(name, email, password);
      const data = response.data;

      setMessage(data.message);

      // Redirect to login after successful signup
      if (
        data.message.toLowerCase().includes("success") ||
        data.success === "true"
      ) {
        navigate("/login");
      }
    } catch (error) {
      setMessage("Server Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow w-96">

        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <input
          className="w-full mt-6 p-3 border rounded"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full mt-4 p-3 border rounded"
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

        <Button className="w-full mt-6" onClick={handleSignup}>
          Create Account
        </Button>

        <p className="text-center mt-4 text-red-600">
          {message}
        </p>

      </div>
    </div>
  );
}

export default Signup;
import heroImage from "../assets/hero.png";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20 bg-slate-100">

      <div className="max-w-xl">
        <h1 className="text-5xl font-bold text-blue-600">
          Build Your Career With AI 🚀
        </h1>

        <p className="mt-5 text-xl text-gray-600">
          CareerSuit AI helps you analyze resumes, improve skills,
          match jobs, and prepare for interviews.
        </p>

        <Button
          className="mt-8"
          onClick={() => navigate("/login")}
        >
          Get Started
        </Button>
      </div>

      <img
        src={heroImage}
        alt="Career AI"
        className="w-96 mt-10 md:mt-0"
      />

    </section>
  );
}

export default Hero;
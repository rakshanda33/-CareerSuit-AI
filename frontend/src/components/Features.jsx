import { useNavigate } from "react-router-dom";

function Features() {
  const navigate = useNavigate();

  const features = [
    {
      icon: "🎯",
      name: "Job Description Match",
      description:
        "Compare your resume with a job description and discover your ATS match score, matched skills, and missing keywords.",
      path: "/job-match",
      color: "blue",
      comingSoon: false,
    },
    {
      icon: "✨",
      name: "Resume Tailor",
      description:
        "Tailor your resume to a specific job with AI-powered keywords, skills, summaries, and stronger bullet points.",
      path: "/resume-tailor",
      color: "purple",
      comingSoon: false,
    },
    {
      icon: "✍️",
      name: "Bullet Point Rewriter",
      description:
        "Transform weak resume bullet points into stronger, achievement-focused statements using AI.",
      path: "/bullet-rewriter",
      color: "indigo",
      comingSoon: false,
    },
    {
      icon: "🎤",
      name: "Interview Prep",
      description:
        "Practice AI-powered interview questions, receive personalized feedback, and prepare for your next opportunity.",
      path: null,
      color: "amber",
      comingSoon: true,
    },
  ];

  const handleFeatureClick = (item) => {
    if (item.comingSoon) return;

    navigate("/login", {
      state: {
        redirectTo: item.path,
      },
    });
  };

  return (
    <section
      id="features"
      className="bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 px-8 py-20 md:px-16"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mx-auto max-w-2xl text-center">

          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Everything You Need
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            AI Career Tools
          </h2>

          <p className="mt-4 text-lg text-slate-500">
            Powerful AI tools designed to help you improve your resume,
            match opportunities, and prepare for your career.
          </p>

        </div>

        {/* Feature Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {features.map((item) => (
            <div
              key={item.name}
              onClick={() => handleFeatureClick(item)}
              className={`group relative rounded-2xl border border-white/80 bg-white/90 p-7 text-left shadow-sm backdrop-blur-sm transition duration-300 ${
                item.comingSoon
                  ? "cursor-default"
                  : "cursor-pointer hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
              }`}
            >

              {/* Coming Soon Badge */}
              {item.comingSoon && (
                <span className="absolute right-5 top-5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
                  Coming Soon
                </span>
              )}

              {/* Icon */}
              <div
                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl text-2xl transition duration-300 ${
                  item.comingSoon
                    ? "bg-amber-50"
                    : item.color === "purple"
                    ? "bg-purple-50 group-hover:scale-110 group-hover:bg-purple-600"
                    : item.color === "indigo"
                    ? "bg-indigo-50 group-hover:scale-110 group-hover:bg-indigo-600"
                    : "bg-blue-50 group-hover:scale-110 group-hover:bg-blue-600"
                }`}
              >
                {item.icon}
              </div>

              {/* Title */}
              <h3
                className={`text-xl font-bold ${
                  item.comingSoon
                    ? "text-slate-700"
                    : item.color === "purple"
                    ? "text-purple-600"
                    : item.color === "indigo"
                    ? "text-indigo-600"
                    : "text-blue-600"
                }`}
              >
                {item.name}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-6 text-slate-500">
                {item.description}
              </p>

              {/* Action */}
              <div
                className={`mt-6 font-semibold ${
                  item.comingSoon
                    ? "text-amber-600"
                    : item.color === "purple"
                    ? "text-purple-600"
                    : item.color === "indigo"
                    ? "text-indigo-600"
                    : "text-blue-600"
                }`}
              >
                {item.comingSoon
                  ? "Coming Soon →"
                  : item.name === "Job Description Match"
                  ? "Check Job Match →"
                  : item.name === "Resume Tailor"
                  ? "Tailor Resume →"
                  : "Rewrite Bullet →"}
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;  
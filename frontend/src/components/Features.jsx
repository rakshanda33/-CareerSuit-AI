import { useNavigate } from "react-router-dom";

function Features() {
  const navigate = useNavigate();

  const features = [
    {
      icon: "📄",
      name: "AI Resume Analysis",
      description: "Get intelligent insights and improve your resume.",
      path: "/dashboard",
    },
    {
      icon: "🎯",
      name: "ATS Score Checking",
      description: "See how well your resume matches a job description.",
      path: "/dashboard",
    },
    {
      icon: "💼",
      name: "Job Matching",
      description: "Discover opportunities that match your skills.",
      path: "/job-match",
    },
    {
      icon: "🎤",
      name: "Interview Preparation",
      description: "Prepare smarter for your next technical interview.",
      path: "/dashboard",
    },
  ];

  const handleFeatureClick = (path) => {
    navigate("/login", {
      state: {
        redirectTo: path,
      },
    });
  };

  return (
    <section
     id="features"
     className="bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 px-8 py-20 md:px-16"
    >

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Everything You Need
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            AI Career Tools
          </h2>

          <p className="mt-4 text-lg text-slate-500">
            Powerful tools designed to help you move from application to
            opportunity.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => (
            <div
              key={item.name}
              onClick={() => handleFeatureClick(item.path)}
              className="group cursor-pointer rounded-2xl border border-white/80 bg-white/90 p-7 shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-2xl transition duration-300 group-hover:scale-110 group-hover:bg-blue-600">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                {item.name}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {item.description}
              </p>

              <div className="mt-6 font-medium text-blue-600">
                Explore →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;

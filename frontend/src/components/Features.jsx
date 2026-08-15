import { useNavigate } from "react-router-dom";

function Features() {
  const navigate = useNavigate();

  const features = [
    {
      name: "AI Resume Analysis",
      path: "/dashboard",
    },
    {
      name: "ATS Score Checking",
      path: "/dashboard",
    },
    {
      name: "Job Matching",
      path: "/job-match",
    },
    {
      name: "Interview Preparation",
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
    <section className="py-16 px-10">
      <h2 className="text-4xl font-bold text-center">
        AI Career Features
      </h2>

      <div className="grid md:grid-cols-4 gap-6 mt-10">
        {features.map((item) => (
          <div
            key={item.name}
            onClick={() => handleFeatureClick(item.path)}
            className="p-6 bg-white shadow rounded-xl text-center cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          >
            {item.name}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
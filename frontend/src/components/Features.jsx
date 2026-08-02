function Features() {
  const features = [
    "AI Resume Analysis",
    "ATS Score Checking",
    "Job Matching",
    "Interview Preparation"
  ];

  return (
    <section className="py-16 px-10">
      <h2 className="text-4xl font-bold text-center">
        AI Career Features
      </h2>

      <div className="grid md:grid-cols-4 gap-6 mt-10">
        {features.map((item) => (
          <div
            key={item}
            className="p-6 bg-white shadow rounded-xl text-center"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
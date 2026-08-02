function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-white shadow">
      <h2 className="text-2xl font-bold text-blue-600">
        CareerSuit AI 🚀
      </h2>

      <div className="flex gap-6">
        <a href="/">Home</a>
        <a href="/login">Login</a>
        <a href="/signup">Sign Up</a>
      </div>
    </nav>
  );
}

export default Navbar;
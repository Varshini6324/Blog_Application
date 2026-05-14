import React from 'react'

function Home() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 drop-shadow-sm">
          Welcome to BLOG
        </h1>
        <p className="mt-4 text-slate-700 text-lg">
          Get started by reading author posts or create your own account to publish articles.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <a
            href="/register"
            className="bg-[#09637E] text-white px-5 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="bg-white border border-[#7AB2B2] text-[#09637E] px-5 py-3 rounded-lg font-semibold hover:bg-[#F1FAFB] transition"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home
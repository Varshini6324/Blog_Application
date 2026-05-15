import { NavLink, Outlet } from "react-router";

function AuthorProfile() {
  return (
    <div className="min-h-screen bg-[#09637E] text-[#EBF4F6]">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Author Navigation */}
        <div className="flex gap-6 mb-6">
          <NavLink
            to="articles"
            className={({ isActive }) =>
              isActive
                ? "text-[0.8rem] text-[#088395] bg-white px-3 py-1.5 rounded-full font-semibold transition"
                : "text-[0.8rem] text-white/70 hover:text-white transition-colors font-normal"
            }
          >
            Articles
          </NavLink>

          <NavLink
            to="addarticle"
            className={({ isActive }) =>
              isActive
                ? "text-[0.8rem] text-[#088395] bg-white px-3 py-1.5 rounded-full font-semibold transition"
                : "text-[0.8rem] text-white/70 hover:text-white transition-colors font-normal"
            }
          >
            Write Article
          </NavLink>
        </div>

        <div className="border-t border-white/10 my-10"></div>

        {/* Nested route content */}
        <Outlet />
      </div>
    </div>
  );
}

export default AuthorProfile;
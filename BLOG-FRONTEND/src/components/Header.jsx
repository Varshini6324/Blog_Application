import { NavLink } from "react-router"
import { useAuth } from "../store/authStore.js"

function Header() { 
  const currentUser = useAuth((state) => state.currentUser)
  const logout = useAuth((state) => state.logout)

  return (
    <header className="bg-[#09637E]/90 border-b border-[#7AB2B2]/20 sticky top-0 z-50 backdrop-blur">
      <div className="max-w-5xl mx-auto px-6 h-[64px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-[#EBF4F6] text-xl font-semibold tracking-tight">BLOG</div>
        </div>


        <nav className="flex items-center gap-6">
          <NavLink
            to=""
            className={({ isActive }) =>
              isActive
                ? "text-black bg-white px-4 py-2 rounded-lg text-sm font-medium border border-white/20"
                : "text-white/70 hover:text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/5 transition"
            }
          >
            Home
          </NavLink>

          {currentUser ? (
            <button
              type="button"
              onClick={logout}
              className="text-white/70 hover:text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/5 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="register"
                className={({ isActive }) =>
                  isActive
                    ? "text-black bg-white px-4 py-2 rounded-lg text-sm font-medium border border-white/20"
                    : "text-white/70 hover:text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/5 transition"
                }
              >
                Register
              </NavLink>

              <NavLink
                to="login"
                className={({ isActive }) =>
                  isActive
                    ? "text-black bg-white px-4 py-2 rounded-lg text-sm font-medium border border-white/20"
                    : "text-white/70 hover:text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/5 transition"
                }
              >
                Login
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header


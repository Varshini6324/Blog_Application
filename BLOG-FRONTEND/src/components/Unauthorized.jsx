import { useEffect } from "react";
import { useNavigate } from "react-router";

const Unauthorized = ({ redirectTo = "/login", delay = 2000 }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(redirectTo, { replace: true });
    }, delay);

    return () => clearTimeout(timer);
  }, [navigate, redirectTo, delay]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black">
      <h1 className="text-4xl font-bold text-white mb-4">403 - Unauthorized</h1>
      <p className="text-lg text-white/80 mb-2">You don’t have permission to access this page.</p>
      <p className="text-sm text-white/60">Redirecting...</p>
    </div>
  );
};

export default Unauthorized;
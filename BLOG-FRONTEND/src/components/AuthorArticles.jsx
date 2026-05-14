import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../store/authStore";

import {
  articleCardClass,
  articleTitle,
  articleExcerpt,
  articleMeta,
  ghostBtn,
  loadingClass,
  errorClass,
  emptyStateClass,
  articleStatusActive,
  articleStatusDeleted,
} from "../styles/common";

function AuthorArticles() {
  const navigate = useNavigate();
  const user = useAuth((state) => state.currentUser);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authorId = user?.userId;

    if (!authorId) return;

    const getAuthorArticles = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          `http://localhost:4000/author-api/articles/${authorId}`,
          {
            withCredentials: true,
          }
        );

        setArticles(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    getAuthorArticles();
  }, [user]);

  const openArticle = (article) => {
    navigate(`/article/${article._id}`, {
      state: article,
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
    });
  };

  if (loading) return <p className={loadingClass}>Loading articles...</p>;
  if (error) return <p className={errorClass}>{error}</p>;

  if (articles.length === 0) {
    return (
      <div className={emptyStateClass}>
        You haven't published any articles yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {articles.map((article) => (
        <div
          key={article._id}
          className="relative flex flex-col bg-[#088395] border border-[#088395]/30 rounded-2xl p-6 hover:bg-[#088395]/90 transition-colors duration-200 cursor-pointer"
        >
          {/* Status Badge */}
          <span
            className={`absolute top-3 right-3 text-[10px] font-semibold px-2 py-1 rounded-full border ${
              article.isArticleActive
                ? "bg-white/10 text-white border-white/20"
                : "bg-red-500/20 text-red-200 border-red-400/30"
            }`}
          >
            {article.isArticleActive ? "ACTIVE" : "DELETED"}
          </span>

          <div className="flex flex-col gap-2">
            <p className="text-xs text-white/60 uppercase tracking-widest font-semibold">
              {article.category}
            </p>

            <p className="text-base font-semibold text-white leading-snug tracking-tight">
              {article.title}
            </p>

            <p className="text-sm text-white/80 leading-relaxed">
              {article.content?.slice(0, 60) ?? ""}...
            </p>
          </div>

          <button
            className="text-white/70 font-medium hover:text-white transition-colors cursor-pointer text-sm mt-auto pt-4 text-left"
            onClick={() => openArticle(article)}
          >
            Read Article →
          </button>
        </div>
      ))}
    </div>
  );
}

export default AuthorArticles;
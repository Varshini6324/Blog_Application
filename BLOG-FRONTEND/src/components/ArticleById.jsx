import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/authStore.js";
import { toast } from "react-hot-toast";
import {
  articlePageWrapper,
  articleHeader,
  articleCategory,
  articleMainTitle,
  articleAuthorRow,
  authorInfo,
  articleContent,
  articleFooter,
  articleActions,
  editBtn,
  deleteBtn,
  loadingClass,
  errorClass,
  emptyStateClass,
} from "../styles/common.js";
import CommentBox from "./CommentBox.jsx";

function ArticleById() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAuth((state) => state.currentUser);

  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (article) return;

    const getArticle = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/user-api/articles/${id}`, 
          {
            withCredentials: true,
          }
        );

        setArticle(res.data?.payload || null);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            err?.response?.data?.error ||
            err?.message ||
            "Failed to load article"
        );
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [id, article]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const toggleArticleStatus = async () => {
    const newStatus = !article.isArticleActive;

    const confirmMsg = newStatus
      ? "Restore this article?"
      : "Delete this article?";

    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/author-api/articles/${id}/status`,
        { isArticleActive: newStatus },
        { withCredentials: true }
      );

      setArticle(res.data.payload);
      toast.success(res.data.message);
    } catch (err) {
      const msg = err?.response?.data?.message;

      if (err?.response?.status === 400) {
        toast.error(msg);
      } else {
        setError(msg || "Operation failed");
      }
    }
  };

  const editArticle = (articleObj) => {
    navigate(`/edit-article/${articleObj._id}`);
  };

  if (loading)
    return (
      <p className={loadingClass}>
        Loading article...
      </p>
    );

  if (error)
    return (
      <p className={errorClass}>
        {error}
      </p>
    );

  if (!article)
    return (
      <p className={emptyStateClass}>
        No article found.
      </p>
    );

  return (
    <div
      className={`${articlePageWrapper} bg-[#088395] border border-[#088395]/30 rounded-2xl p-8 max-w-5xl mx-auto mt-10`}
    >
      <div className={articleHeader}>
        <span className={articleCategory}>
          {article.category}
        </span>

        <h1 className={`${articleMainTitle} uppercase mt-3`}>
          {article.title}
        </h1>

        <div className={`${articleAuthorRow} mt-4`}>
          <div className={authorInfo}>
            ✍️ {article.author?.firstName || "Author"}
          </div>

          <div>{formatDate(article.createdAt)}</div>
        </div>
      </div>

      <div className={articleContent}>
        {article.content}
      </div>

      {user?.role === "AUTHOR" && (
        <div className={articleActions}>
          <button className={editBtn} onClick={() => editArticle(article)}>
            Edit
          </button>

          <button className={deleteBtn} onClick={toggleArticleStatus}>
            {article.isArticleActive ? "Delete" : "Restore"}
          </button>
        </div>
      )}

      {user?.role === "USER" && (
        <div className={`${articleActions} mt-10 flex flex-col gap-3`}>
          <h2 className="text-xl font-bold text-[#7ab2b2]">Add a comment</h2>

          <CommentBox
            articleId={id}
            onCommentAdded={(nextArticle) => setArticle(nextArticle)}
          />
        </div>
      )}

      {article.comments?.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-6">
            Comments
          </h2>

          {article.comments.map((comment) => (
            
            <div
              className="bg-white/5 border border-white/10 p-6 rounded-2xl mt-4"
              key={comment?._id || comment?.comment}
            >
              <p className="uppercase text-white font-bold mb-3">
  {comment.user?.firstName?.trim() ||
    comment.user?.email?.split("@")[0] ||
    "Anonymous"}
</p>

              <p className="text-white/80">{comment.comment}</p>
            </div>
          ))}

        </div>
      )}

      <div className={articleFooter}>
        Last updated: {formatDate(article.updatedAt)}
      </div>
    </div>
  );
}

export default ArticleById;
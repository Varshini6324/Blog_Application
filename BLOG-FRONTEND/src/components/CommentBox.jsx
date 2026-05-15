import { useState } from "react";
import axios from "axios";
import { useAuth } from "../store/authStore.js";
import { toast } from "react-hot-toast";

function CommentBox({ articleId, onCommentAdded }) {
  const user = useAuth((state) => state.currentUser);
  const loading = useAuth((state) => state.loading);

  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submitComment = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!user?._id) {
      toast.error("Please login to comment");
      return;
    }

    const trimmed = comment.trim();
    if (!trimmed) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      setSubmitting(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user-api/articles/${articleId}`,
        { comment: trimmed, user: user._id },
        { withCredentials: true }
      );
      console.log("comment:", comment);
      toast.success(res.data?.message || "Comment added");

      const nextArticle = res.data?.payload || res.data?.article || null;
      if (nextArticle && typeof onCommentAdded === "function") {
        onCommentAdded(nextArticle);
      }

      setComment("");
    } catch (err) {
  console.log(err.response);
  console.log(err.response.data);

  const msg =
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    err?.message;

  toast.error(msg || "Failed to add comment");
}finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submitComment} className="w-full">
      <label className="block text-xs font-medium text-white/70 mb-2">
        Write your comment
      </label>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        className="w-full bg-[#09637e]/30 border border-[#7ab2b2]/40 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-[#7ab2b2]/70 focus:ring-2 focus:ring-[#7ab2b2]/20 transition"
        placeholder="Type something..."
      />

      <button
        type="submit"
        disabled={submitting || loading}
        className="mt-3 w-full bg-[#ebf4f6] text-[#09637e] font-semibold py-2.5 rounded-full hover:bg-[#ebf4f6]/80 transition-colors cursor-pointer text-sm tracking-tight disabled:opacity-60"
      >
        {submitting ? "Posting..." : "Post comment"}
      </button>
    </form>
  );
}

export default CommentBox;
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../store/authStore.js";

import {
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  articlePageWrapper,
} from "../styles/common";

function EditArticle() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useAuth((state) => state.currentUser);

  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!user || user.role !== "AUTHOR") {
      toast.error("Access denied. Authors only.");
      navigate("/");
      return;
    }

    const loadArticle = async () => {
      if (!id) {
        toast.error("No article ID");
        navigate("/");
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user-api/articles/${id}`, { withCredentials: true });
        const articleData = res.data.payload;
        setArticle(articleData);
        setValue("title", articleData.title);
        setValue("category", articleData.category);
        setValue("content", articleData.content);
      } catch (err) {
        toast.error(err.response?.data?.error || "Failed to load article");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    if (location.state?.title) {
      setArticle(location.state);
      setValue("title", location.state.title);
      setValue("category", location.state.category);
      setValue("content", location.state.content);
    } else {
      loadArticle();
    }
  }, [id, location.state, user, navigate, setValue]);

  const updateArticle = async (data) => {
    if (loading || !article) return;

    try {
      toast.loading("Updating article...");
      data.articleId = id;
      const res = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/author-api/articles`, data, { withCredentials: true });
      toast.success("Article updated successfully!");
      navigate(`/article/${id}`, { state: res.data.payload });
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err.response?.data?.message || "Failed to update article");
    }
  };

  if (loading) {
    return (
      <div className="text-white/60 text-sm animate-pulse text-center py-10 mt-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#088395] border border-[#088395]/30 rounded-2xl p-10 max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-white tracking-tight text-center mb-7">
        Edit Article
      </h2>

      <form onSubmit={handleSubmit(updateArticle)}>
        {/* Title */}
        <div className="mb-4">
          <label className="text-xs font-medium text-white/70 mb-1.5 block">Title</label>
          <input
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition"
            {...register("title", { required: "Title required" })}
          />
          {errors.title && (
            <p className="bg-white/5 text-white border border-white/20 rounded-xl px-4 py-3 text-sm mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="text-xs font-medium text-white/70 mb-1.5 block">Category</label>
          <select
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition"
            {...register("category", { required: "Category required" })}
          >
            <option value="" className="bg-[#088395]">Select category</option>
            <option value="technology" className="bg-[#088395]">Technology</option>
            <option value="programming" className="bg-[#088395]">Programming</option>
            <option value="ai" className="bg-[#088395]">AI</option>
            <option value="web-development" className="bg-[#088395]">Web Development</option>
          </select>
          {errors.category && (
            <p className="bg-white/5 text-white border border-white/20 rounded-xl px-4 py-3 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="mb-4">
          <label className="text-xs font-medium text-white/70 mb-1.5 block">Content</label>
          <textarea
            rows="14"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition"
            {...register("content", { required: "Content required" })}
          />
          {errors.content && (
            <p className="bg-white/5 text-white border border-white/20 rounded-xl px-4 py-3 text-sm mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-[#088395] font-semibold py-2.5 rounded-full hover:bg-white/90 transition-colors cursor-pointer mt-2 text-sm tracking-tight disabled:opacity-50"
        >
          Update Article
        </button>
      </form>
    </div>
  );
}

export default EditArticle;
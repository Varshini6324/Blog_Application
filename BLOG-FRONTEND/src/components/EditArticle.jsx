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

  // Auth guard + fetch article if needed
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
        const res = await axios.get(`http://localhost:4000/user-api/articles/${id}`, { withCredentials: true });
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
      // Use state if available (back compat)
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
      const res = await axios.put("http://localhost:4000/author-api/articles", data, { withCredentials: true });
      toast.success("Article updated successfully!");
      navigate(`/article/${id}`, { state: res.data.payload });
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err.response?.data?.message || "Failed to update article");
    }
  };

  if (loading) {
    return <div className={`${articlePageWrapper} mt-10`}>Loading...</div>;
  }

  return (
    <div className={`${formCard} mt-10`}>
      <h2 className={formTitle}>Edit Article</h2>

      <form onSubmit={handleSubmit(updateArticle)}>
        {/* Title */}
        <div className={formGroup}>
          <label className={labelClass}>Title</label>
          <input className={inputClass} {...register("title", { required: "Title required" })} />
          {errors.title && <p className={errorClass}>{errors.title.message}</p>}
        </div>

        {/* Category */}
        <div className={formGroup}>
          <label className={labelClass}>Category</label>
          <select className={inputClass} {...register("category", { required: "Category required" })}>
            <option value="">Select category</option>
            <option value="technology">Technology</option>
            <option value="programming">Programming</option>
            <option value="ai">AI</option>
            <option value="web-development">Web Development</option>
          </select>
          {errors.category && <p className={errorClass}>{errors.category.message}</p>}
        </div>

        {/* Content */}
        <div className={formGroup}>
          <label className={labelClass}>Content</label>
          <textarea rows="14" className={inputClass} {...register("content", { required: "Content required" })} />
          {errors.content && <p className={errorClass}>{errors.content.message}</p>}
        </div>

        <button type="submit" className={submitBtn} disabled={loading}>
          Update Article
        </button>
      </form>
    </div>
  );
}

export default EditArticle;

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
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
  loadingClass,
} from "../styles/common";

function AddArticle() {
  const navigate = useNavigate();
  const user = useAuth((state) => state.currentUser);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    if (!user || user.role !== "AUTHOR") {
      toast.error("Authors only");
      return;
    }

    try {
      toast.loading("Publishing...");
      const res = await axios.post("http://localhost:4000/author-api/articles", {
        ...data,
        author: user._id,
      }, { withCredentials: true });

      toast.success("Article published!");
      navigate("/articles");
    } catch (err) {
      toast.error(err.response?.data?.message || "Publish failed");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className={formCard}>
        <h2 className={formTitle}>Add Article</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className={formGroup}>
            <label className={labelClass}>Title</label>
            <input className={inputClass} {...register("title", { required: "Title required" })} />
            {errors.title && <p className={errorClass}>{errors.title.message}</p>}
          </div>

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

          <div className={formGroup}>
            <label className={labelClass}>Content</label>
            <textarea 
              rows="14" 
              className={inputClass} 
              {...register("content", { required: "Content required" })} 
            />
            {errors.content && <p className={errorClass}>{errors.content.message}</p>}
          </div>

          <button className={submitBtn} type="submit">
            Publish Article
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddArticle;

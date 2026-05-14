// src/styles/common.js
// Theme: Black/White (and neutral grays)

// ─── Layout ───────────────────────────────────────────
export const pageBackground = "bg-[#09637E] text-[#EBF4F6] min-h-screen";


export const pageWrapper = "max-w-5xl mx-auto px-6 py-16";
export const section = "mb-14";

// ─── Cards ────────────────────────────────────────────
export const cardClass =
  "bg-[#088395]/10 border border-[#7AB2B2]/30 rounded-2xl p-7 hover:bg-[#088395]/15 transition-colors duration-200 cursor-pointer";


// ─── Typography ───────────────────────────────────────
export const pageTitleClass = "text-5xl font-bold text-white tracking-tight leading-none mb-2";
export const headingClass = "text-2xl font-bold text-white tracking-tight";
export const subHeadingClass = "text-lg font-semibold text-white tracking-tight";
export const bodyText = "text-white/80 leading-relaxed";
export const mutedText = "text-sm text-white/60";
export const linkClass = "text-[#EBF4F6] hover:text-[#7AB2B2] transition-colors";


// ─── Buttons ──────────────────────────────────────────
export const primaryBtn =
  "bg-[#7AB2B2] text-[#09637E] font-semibold px-5 py-2 rounded-full hover:bg-[#7AB2B2]/90 transition-colors cursor-pointer text-sm tracking-tight";

export const secondaryBtn =
  "border border-[#7AB2B2]/40 text-[#EBF4F6] font-medium px-5 py-2 rounded-full hover:bg-[#088395]/15 transition-colors cursor-pointer text-sm";

export const ghostBtn = "text-[#EBF4F6] font-medium hover:text-[#7AB2B2] transition-colors cursor-pointer text-sm";


// ─── Forms ────────────────────────────────────────────
export const formCard = "bg-white/5 border border-white/10 rounded-2xl p-10 max-w-4xl mx-auto";
export const formTitle = "text-2xl font-bold text-white tracking-tight text-center mb-7";
export const labelClass = "text-xs font-medium text-white/70 mb-1.5 block";
export const inputClass =
  "w-full bg-[#088395]/20 border border-[#7AB2B2]/30 rounded-xl px-4 py-2.5 text-[#EBF4F6] text-sm placeholder:text-[#EBF4F6]/40 focus:outline-none focus:border-[#7AB2B2]/70 focus:ring-2 focus:ring-[#7AB2B2]/20 transition";

export const formGroup = "mb-4";
export const submitBtn =
  "w-full bg-[#7AB2B2] text-[#09637E] font-semibold py-2.5 rounded-full hover:bg-[#088395]/20 transition-colors cursor-pointer mt-2 text-sm tracking-tight";


// ─── Navbar ───────────────────────────────────────────
export const navbarClass =
  "bg-[#09637E]/95 backdrop-blur-xl border-b border-[#7AB2B2]/30 px-8 h-[52px] flex items-center sticky top-0 z-50";

export const navContainerClass = "max-w-5xl mx-auto w-full flex items-center justify-between";
export const navBrandClass = "text-base font-semibold text-white tracking-tight";
export const navLinksClass = "flex items-center gap-7";
export const navLinkClass = "text-[0.8rem] text-white/70 hover:text-white transition-colors font-normal";
export const navLinkActiveClass = "text-[0.8rem] text-black bg-white px-2 py-1 rounded transition";

// ─── Article / Blog ───────────────────────────────────
export const articleGrid = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6";
export const articleCardClass =
  "bg-white/5 border border-white/10 p-7 hover:bg-white/10 transition-colors duration-200 flex flex-col gap-2.5 cursor-pointer";
export const articleTitle = "text-base font-semibold text-white leading-snug tracking-tight";
export const articleExcerpt = "text-sm text-white/80 leading-relaxed";
export const articleMeta = "text-xs text-white/60";
export const articleBody = "text-white/80 leading-[1.85] text-[0.95rem] max-w-2xl";
export const timestampClass = "text-xs text-white/60 flex items-center gap-1.5";
export const tagClass = "text-[0.65rem] font-semibold text-white uppercase tracking-widest w-fit";

// ─── Article Page ─────────────────────────────────────
export const articlePageWrapper = "max-w-3xl mx-auto px-6 py-14";

export const articleHeader = "mb-10 flex flex-col gap-4";

export const articleCategory = "text-[0.7rem] font-semibold uppercase tracking-widest text-white";

export const articleMainTitle = "text-4xl font-bold text-white leading-tight tracking-tight";

export const articleAuthorRow =
  "flex items-center justify-between border-t border-b border-white/10 py-4 text-sm text-white/70";

export const authorInfo = "flex items-center gap-2 font-medium text-white";

export const articleContent = "text-white leading-[1.9] text-[1rem] whitespace-pre-line mt-8";

export const articleFooter = "border-t border-white/10 mt-12 pt-6 text-sm text-white/60";

// ─── Article Actions ─────────────────────────────
export const articleActions = "flex gap-3 mt-6";

export const editBtn =
  "bg-white text-black text-sm px-4 py-2 rounded-full hover:bg-white/80 transition";
export const deleteBtn =
  "bg-white/10 border border-white/20 text-white text-sm px-4 py-2 rounded-full hover:bg-white/20 transition";

// ─── Article Status Badge ─────────────────────────
export const articleStatusActive =
  "absolute top-3 right-3 text-[10px] font-semibold px-2 py-1 rounded-full bg-white/10 text-white border border-white/10";

export const articleStatusDeleted =
  "absolute top-3 right-3 text-[10px] font-semibold px-2 py-1 rounded-full bg-white/10 text-white border border-white/10";

// ─── Feedback ─────────────────────────────────────────
export const errorClass =
  "bg-white/5 text-white border border-white/20 rounded-xl px-4 py-3 text-sm";
export const successClass =
  "bg-white/5 text-white border border-white/20 rounded-xl px-4 py-3 text-sm";
export const loadingClass = "text-white/60 text-sm animate-pulse text-center py-10";
export const emptyStateClass = "text-center text-white/60 py-16 text-sm";

// ─── Divider ──────────────────────────────────────────
export const divider = "border-t border-white/10 my-10";

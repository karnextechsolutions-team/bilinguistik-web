"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileEdit,
  Newspaper,
  LogOut,
  Save,
  PlusCircle,
  Trash2,
  CheckCircle,
  ExternalLink,
  Upload,
  Sparkles,
  Layers,
  FileText,
  AlertCircle,
  HelpCircle,
  Award,
  ListOrdered,
  Briefcase,
  ShieldCheck,
  PanelBottom
} from "lucide-react";
import { getAllBlogs, addBlog, deleteBlog, BlogPost } from "@/lib/blogs";
import { HomepageCMSContent, DEFAULT_HOMEPAGE_CMS, fetchHomepageCMS, saveHomepageCMS } from "@/lib/cms";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<"content" | "blogs">("content");

  // CMS Content State
  const [cmsContent, setCmsContent] = useState<HomepageCMSContent>(DEFAULT_HOMEPAGE_CMS);
  const [isLoadingCms, setIsLoadingCms] = useState(true);
  const [isSavingCms, setIsSavingCms] = useState(false);
  const [cmsSaveSuccess, setCmsSaveSuccess] = useState<string | null>(null);
  const [cmsSaveError, setCmsSaveError] = useState<string | null>(null);

  // Blogs State
  const [blogsList, setBlogsList] = useState<BlogPost[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Document Guide");
  const [newContent, setNewContent] = useState("");
  const [newCoverImage, setNewCoverImage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [blogPublishedNotice, setBlogPublishedNotice] = useState(false);

  useEffect(() => {
    // Protected route authentication check
    const auth = localStorage.getItem("bilinguistik_admin_auth");
    if (auth !== "true") {
      router.push("/admin");
      return;
    }
    setIsAuthenticated(true);

    // Fetch CMS Content from Supabase
    async function loadCmsData() {
      setIsLoadingCms(true);
      const data = await fetchHomepageCMS();
      setCmsContent(data);
      setIsLoadingCms(false);
    }

    loadCmsData();

    // Load blogs list
    setBlogsList(getAllBlogs());
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("bilinguistik_admin_auth");
    router.push("/admin");
  };

  const handleSaveCms = async (e: FormEvent) => {
    e.preventDefault();
    setIsSavingCms(true);
    setCmsSaveSuccess(null);
    setCmsSaveError(null);

    const result = await saveHomepageCMS(cmsContent);
    setIsSavingCms(false);

    if (result.success) {
      setCmsSaveSuccess("All homepage & footer content updated successfully in Supabase! Changes are live.");
      setTimeout(() => setCmsSaveSuccess(null), 5000);
    } else {
      setCmsSaveError(`Failed to save to Supabase: ${result.error || "Unknown error"}`);
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setNewCoverImage(result);
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublishBlog = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const cover = newCoverImage.trim() || "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop";
    const slug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    addBlog({
      title: newTitle,
      slug: slug || "blog-post-" + Date.now(),
      excerpt: newContent.slice(0, 140) + "...",
      content: newContent,
      coverImage: cover,
      category: newCategory,
      author: "Admin Editor",
      readTime: Math.ceil(newContent.split(" ").length / 200) + " min read"
    });

    setBlogsList(getAllBlogs());
    setNewTitle("");
    setNewCategory("Document Guide");
    setNewContent("");
    setNewCoverImage("");
    setImagePreview(null);
    setBlogPublishedNotice(true);
    setTimeout(() => setBlogPublishedNotice(false), 4000);
  };

  const handleDeleteBlog = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      deleteBlog(id);
      setBlogsList(getAllBlogs());
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#0B1B3D] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#C59B27] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1B3D] text-slate-100 font-sans selection:bg-[#C59B27] selection:text-slate-950 flex flex-col">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-[#070C1B]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md">
              <Image src="/logo.png" alt="Logo" width={40} height={40} className="object-contain" />
            </div>
            <div>
              <h1 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                <span>Bilinguistik</span>
                <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-[#C59B27]/20 text-[#C59B27] border border-[#C59B27]/30">
                  Full CMS
                </span>
              </h1>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-[#C59B27] px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 transition-colors"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-xl bg-red-500/10 text-red-300 hover:bg-red-500/20 border border-red-500/30 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {/* Dashboard Title & Tabs Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Homepage & Footer Content Management
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-light">
              Edit all homepage sections, 3-box feature highlights, and footer details backed by Supabase (<code className="text-[#C59B27]">site_content</code>).
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center bg-slate-900/80 p-1.5 rounded-2xl border border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab("content")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === "content"
                  ? "bg-gradient-to-r from-[#C59B27] via-[#E2B746] to-[#A37B1B] text-slate-950 shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FileEdit className="w-4 h-4" />
              <span>Edit Site Content</span>
            </button>

            <button
              onClick={() => setActiveTab("blogs")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === "blogs"
                  ? "bg-gradient-to-r from-[#C59B27] via-[#E2B746] to-[#A37B1B] text-slate-950 shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Manage Blogs</span>
            </button>
          </div>
        </div>

        {/* TAB 1: EDIT SITE CONTENT (FULL HOMEPAGE & FOOTER CMS) */}
        {activeTab === "content" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Feedback Alerts */}
            {cmsSaveSuccess && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3 shadow-lg">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{cmsSaveSuccess}</span>
              </div>
            )}

            {cmsSaveError && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center gap-3 shadow-lg">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                <span>{cmsSaveError}</span>
              </div>
            )}

            {isLoadingCms ? (
              <div className="p-12 text-center bg-white/[0.03] rounded-3xl border border-white/10">
                <div className="w-8 h-8 border-4 border-[#C59B27] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-slate-400 text-sm">Loading current content from Supabase...</p>
              </div>
            ) : (
              <form onSubmit={handleSaveCms} className="space-y-8">
                {/* 1. HERO SECTION */}
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10 text-[#C59B27]">
                    <Sparkles className="w-5 h-5" />
                    <h3 className="text-lg font-bold text-white">1. Hero Section</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Hero Main Title
                      </label>
                      <input
                        type="text"
                        value={cmsContent.heroTitle}
                        onChange={(e) => setCmsContent({ ...cmsContent, heroTitle: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C59B27]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Hero Subtitle / Description
                      </label>
                      <textarea
                        rows={2}
                        value={cmsContent.heroSubtitle}
                        onChange={(e) => setCmsContent({ ...cmsContent, heroSubtitle: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C59B27]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. 3-BOX FEATURE HIGHLIGHTS (TRUST CARDS) */}
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10 text-[#C59B27]">
                    <ShieldCheck className="w-5 h-5" />
                    <h3 className="text-lg font-bold text-white">2. 3-Box Feature Section (Trust Cards)</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Box 1 */}
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/10 space-y-3">
                      <span className="text-xs font-bold text-[#C59B27]">Box 1</span>
                      <input
                        type="text"
                        placeholder="Title"
                        value={cmsContent.trust1Title}
                        onChange={(e) => setCmsContent({ ...cmsContent, trust1Title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:border-[#C59B27]"
                      />
                      <textarea
                        rows={3}
                        placeholder="Description"
                        value={cmsContent.trust1Desc}
                        onChange={(e) => setCmsContent({ ...cmsContent, trust1Desc: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:border-[#C59B27]"
                      />
                    </div>

                    {/* Box 2 */}
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/10 space-y-3">
                      <span className="text-xs font-bold text-[#C59B27]">Box 2</span>
                      <input
                        type="text"
                        placeholder="Title"
                        value={cmsContent.trust2Title}
                        onChange={(e) => setCmsContent({ ...cmsContent, trust2Title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:border-[#C59B27]"
                      />
                      <textarea
                        rows={3}
                        placeholder="Description"
                        value={cmsContent.trust2Desc}
                        onChange={(e) => setCmsContent({ ...cmsContent, trust2Desc: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:border-[#C59B27]"
                      />
                    </div>

                    {/* Box 3 */}
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/10 space-y-3">
                      <span className="text-xs font-bold text-[#C59B27]">Box 3</span>
                      <input
                        type="text"
                        placeholder="Title"
                        value={cmsContent.trust3Title}
                        onChange={(e) => setCmsContent({ ...cmsContent, trust3Title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:border-[#C59B27]"
                      />
                      <textarea
                        rows={3}
                        placeholder="Description"
                        value={cmsContent.trust3Desc}
                        onChange={(e) => setCmsContent({ ...cmsContent, trust3Desc: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:border-[#C59B27]"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. SERVICES SECTION */}
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10 text-[#C59B27]">
                    <Briefcase className="w-5 h-5" />
                    <h3 className="text-lg font-bold text-white">3. Translation Services (4 Cards)</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Service 1 */}
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/10 space-y-3">
                      <span className="text-xs font-bold text-[#C59B27]">Service 1</span>
                      <input
                        type="text"
                        placeholder="Title"
                        value={cmsContent.service1Title}
                        onChange={(e) => setCmsContent({ ...cmsContent, service1Title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:border-[#C59B27]"
                      />
                      <textarea
                        rows={2}
                        placeholder="Description"
                        value={cmsContent.service1Desc}
                        onChange={(e) => setCmsContent({ ...cmsContent, service1Desc: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:border-[#C59B27]"
                      />
                    </div>

                    {/* Service 2 */}
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/10 space-y-3">
                      <span className="text-xs font-bold text-[#C59B27]">Service 2</span>
                      <input
                        type="text"
                        placeholder="Title"
                        value={cmsContent.service2Title}
                        onChange={(e) => setCmsContent({ ...cmsContent, service2Title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:border-[#C59B27]"
                      />
                      <textarea
                        rows={2}
                        placeholder="Description"
                        value={cmsContent.service2Desc}
                        onChange={(e) => setCmsContent({ ...cmsContent, service2Desc: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:border-[#C59B27]"
                      />
                    </div>

                    {/* Service 3 */}
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/10 space-y-3">
                      <span className="text-xs font-bold text-[#C59B27]">Service 3</span>
                      <input
                        type="text"
                        placeholder="Title"
                        value={cmsContent.service3Title}
                        onChange={(e) => setCmsContent({ ...cmsContent, service3Title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:border-[#C59B27]"
                      />
                      <textarea
                        rows={2}
                        placeholder="Description"
                        value={cmsContent.service3Desc}
                        onChange={(e) => setCmsContent({ ...cmsContent, service3Desc: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:border-[#C59B27]"
                      />
                    </div>

                    {/* Service 4 */}
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/10 space-y-3">
                      <span className="text-xs font-bold text-[#C59B27]">Service 4</span>
                      <input
                        type="text"
                        placeholder="Title"
                        value={cmsContent.service4Title}
                        onChange={(e) => setCmsContent({ ...cmsContent, service4Title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:border-[#C59B27]"
                      />
                      <textarea
                        rows={2}
                        placeholder="Description"
                        value={cmsContent.service4Desc}
                        onChange={(e) => setCmsContent({ ...cmsContent, service4Desc: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:border-[#C59B27]"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. HOW IT WORKS SECTION */}
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10 text-[#C59B27]">
                    <ListOrdered className="w-5 h-5" />
                    <h3 className="text-lg font-bold text-white">4. How It Works (4 Process Steps)</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Step 1 */}
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/10 space-y-3">
                      <span className="text-xs font-bold text-[#C59B27]">Step 01</span>
                      <input
                        type="text"
                        value={cmsContent.step1Title}
                        onChange={(e) => setCmsContent({ ...cmsContent, step1Title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:border-[#C59B27]"
                      />
                      <textarea
                        rows={2}
                        value={cmsContent.step1Desc}
                        onChange={(e) => setCmsContent({ ...cmsContent, step1Desc: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:border-[#C59B27]"
                      />
                    </div>

                    {/* Step 2 */}
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/10 space-y-3">
                      <span className="text-xs font-bold text-[#C59B27]">Step 02</span>
                      <input
                        type="text"
                        value={cmsContent.step2Title}
                        onChange={(e) => setCmsContent({ ...cmsContent, step2Title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:border-[#C59B27]"
                      />
                      <textarea
                        rows={2}
                        value={cmsContent.step2Desc}
                        onChange={(e) => setCmsContent({ ...cmsContent, step2Desc: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:border-[#C59B27]"
                      />
                    </div>

                    {/* Step 3 */}
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/10 space-y-3">
                      <span className="text-xs font-bold text-[#C59B27]">Step 03</span>
                      <input
                        type="text"
                        value={cmsContent.step3Title}
                        onChange={(e) => setCmsContent({ ...cmsContent, step3Title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:border-[#C59B27]"
                      />
                      <textarea
                        rows={2}
                        value={cmsContent.step3Desc}
                        onChange={(e) => setCmsContent({ ...cmsContent, step3Desc: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:border-[#C59B27]"
                      />
                    </div>

                    {/* Step 4 */}
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/10 space-y-3">
                      <span className="text-xs font-bold text-[#C59B27]">Step 04</span>
                      <input
                        type="text"
                        value={cmsContent.step4Title}
                        onChange={(e) => setCmsContent({ ...cmsContent, step4Title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:border-[#C59B27]"
                      />
                      <textarea
                        rows={2}
                        value={cmsContent.step4Desc}
                        onChange={(e) => setCmsContent({ ...cmsContent, step4Desc: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:border-[#C59B27]"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. WHY CHOOSE US SECTION */}
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10 text-[#C59B27]">
                    <Award className="w-5 h-5" />
                    <h3 className="text-lg font-bold text-white">5. Why Choose Us (5 Features)</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Why 1 */}
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/10 space-y-3">
                      <span className="text-xs font-bold text-[#C59B27]">Feature 1</span>
                      <input
                        type="text"
                        value={cmsContent.why1Title}
                        onChange={(e) => setCmsContent({ ...cmsContent, why1Title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:border-[#C59B27]"
                      />
                      <textarea
                        rows={2}
                        value={cmsContent.why1Desc}
                        onChange={(e) => setCmsContent({ ...cmsContent, why1Desc: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:border-[#C59B27]"
                      />
                    </div>

                    {/* Why 2 */}
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/10 space-y-3">
                      <span className="text-xs font-bold text-[#C59B27]">Feature 2</span>
                      <input
                        type="text"
                        value={cmsContent.why2Title}
                        onChange={(e) => setCmsContent({ ...cmsContent, why2Title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:border-[#C59B27]"
                      />
                      <textarea
                        rows={2}
                        value={cmsContent.why2Desc}
                        onChange={(e) => setCmsContent({ ...cmsContent, why2Desc: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:border-[#C59B27]"
                      />
                    </div>

                    {/* Why 3 */}
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/10 space-y-3">
                      <span className="text-xs font-bold text-[#C59B27]">Feature 3</span>
                      <input
                        type="text"
                        value={cmsContent.why3Title}
                        onChange={(e) => setCmsContent({ ...cmsContent, why3Title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:border-[#C59B27]"
                      />
                      <textarea
                        rows={2}
                        value={cmsContent.why3Desc}
                        onChange={(e) => setCmsContent({ ...cmsContent, why3Desc: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:border-[#C59B27]"
                      />
                    </div>

                    {/* Why 4 */}
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/10 space-y-3">
                      <span className="text-xs font-bold text-[#C59B27]">Feature 4</span>
                      <input
                        type="text"
                        value={cmsContent.why4Title}
                        onChange={(e) => setCmsContent({ ...cmsContent, why4Title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:border-[#C59B27]"
                      />
                      <textarea
                        rows={2}
                        value={cmsContent.why4Desc}
                        onChange={(e) => setCmsContent({ ...cmsContent, why4Desc: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:border-[#C59B27]"
                      />
                    </div>

                    {/* Why 5 */}
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/10 space-y-3">
                      <span className="text-xs font-bold text-[#C59B27]">Feature 5</span>
                      <input
                        type="text"
                        value={cmsContent.why5Title}
                        onChange={(e) => setCmsContent({ ...cmsContent, why5Title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:border-[#C59B27]"
                      />
                      <textarea
                        rows={2}
                        value={cmsContent.why5Desc}
                        onChange={(e) => setCmsContent({ ...cmsContent, why5Desc: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:border-[#C59B27]"
                      />
                    </div>
                  </div>
                </div>

                {/* 6. ABOUT SECTION */}
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10 text-[#C59B27]">
                    <Layers className="w-5 h-5" />
                    <h3 className="text-lg font-bold text-white">6. About Bilinguistik Section</h3>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      About Paragraph Text
                    </label>
                    <textarea
                      rows={4}
                      value={cmsContent.aboutText}
                      onChange={(e) => setCmsContent({ ...cmsContent, aboutText: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C59B27]"
                    />
                  </div>
                </div>

                {/* 7. FAQ SECTION */}
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10 text-[#C59B27]">
                    <HelpCircle className="w-5 h-5" />
                    <h3 className="text-lg font-bold text-white">7. FAQ Section (6 Accordion Items)</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* FAQ 1 */}
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/10 space-y-3">
                      <span className="text-xs font-bold text-[#C59B27]">FAQ Item 1</span>
                      <input
                        type="text"
                        placeholder="Question"
                        value={cmsContent.faq1Question}
                        onChange={(e) => setCmsContent({ ...cmsContent, faq1Question: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:border-[#C59B27]"
                      />
                      <textarea
                        rows={2}
                        placeholder="Answer"
                        value={cmsContent.faq1Answer}
                        onChange={(e) => setCmsContent({ ...cmsContent, faq1Answer: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:border-[#C59B27]"
                      />
                    </div>

                    {/* FAQ 2 */}
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/10 space-y-3">
                      <span className="text-xs font-bold text-[#C59B27]">FAQ Item 2</span>
                      <input
                        type="text"
                        placeholder="Question"
                        value={cmsContent.faq2Question}
                        onChange={(e) => setCmsContent({ ...cmsContent, faq2Question: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:border-[#C59B27]"
                      />
                      <textarea
                        rows={2}
                        placeholder="Answer"
                        value={cmsContent.faq2Answer}
                        onChange={(e) => setCmsContent({ ...cmsContent, faq2Answer: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:border-[#C59B27]"
                      />
                    </div>

                    {/* FAQ 3 */}
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/10 space-y-3">
                      <span className="text-xs font-bold text-[#C59B27]">FAQ Item 3</span>
                      <input
                        type="text"
                        placeholder="Question"
                        value={cmsContent.faq3Question}
                        onChange={(e) => setCmsContent({ ...cmsContent, faq3Question: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:border-[#C59B27]"
                      />
                      <textarea
                        rows={2}
                        placeholder="Answer"
                        value={cmsContent.faq3Answer}
                        onChange={(e) => setCmsContent({ ...cmsContent, faq3Answer: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:border-[#C59B27]"
                      />
                    </div>

                    {/* FAQ 4 */}
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/10 space-y-3">
                      <span className="text-xs font-bold text-[#C59B27]">FAQ Item 4</span>
                      <input
                        type="text"
                        placeholder="Question"
                        value={cmsContent.faq4Question}
                        onChange={(e) => setCmsContent({ ...cmsContent, faq4Question: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:border-[#C59B27]"
                      />
                      <textarea
                        rows={2}
                        placeholder="Answer"
                        value={cmsContent.faq4Answer}
                        onChange={(e) => setCmsContent({ ...cmsContent, faq4Answer: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:border-[#C59B27]"
                      />
                    </div>

                    {/* FAQ 5 */}
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/10 space-y-3">
                      <span className="text-xs font-bold text-[#C59B27]">FAQ Item 5</span>
                      <input
                        type="text"
                        placeholder="Question"
                        value={cmsContent.faq5Question}
                        onChange={(e) => setCmsContent({ ...cmsContent, faq5Question: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:border-[#C59B27]"
                      />
                      <textarea
                        rows={2}
                        placeholder="Answer"
                        value={cmsContent.faq5Answer}
                        onChange={(e) => setCmsContent({ ...cmsContent, faq5Answer: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:border-[#C59B27]"
                      />
                    </div>

                    {/* FAQ 6 */}
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/10 space-y-3">
                      <span className="text-xs font-bold text-[#C59B27]">FAQ Item 6</span>
                      <input
                        type="text"
                        placeholder="Question"
                        value={cmsContent.faq6Question}
                        onChange={(e) => setCmsContent({ ...cmsContent, faq6Question: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:border-[#C59B27]"
                      />
                      <textarea
                        rows={2}
                        placeholder="Answer"
                        value={cmsContent.faq6Answer}
                        onChange={(e) => setCmsContent({ ...cmsContent, faq6Answer: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:border-[#C59B27]"
                      />
                    </div>
                  </div>
                </div>

                {/* 8. FOOTER SECTION */}
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10 text-[#C59B27]">
                    <PanelBottom className="w-5 h-5" />
                    <h3 className="text-lg font-bold text-white">8. Footer Section</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Footer Description */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Footer Description Text
                      </label>
                      <textarea
                        rows={2}
                        value={cmsContent.footerDesc}
                        onChange={(e) => setCmsContent({ ...cmsContent, footerDesc: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C59B27]"
                      />
                    </div>

                    {/* WhatsApp Number */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        WhatsApp Contact Number
                      </label>
                      <input
                        type="text"
                        value={cmsContent.footerWhatsApp}
                        onChange={(e) => setCmsContent({ ...cmsContent, footerWhatsApp: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C59B27]"
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Official Contact Email
                      </label>
                      <input
                        type="email"
                        value={cmsContent.footerEmail}
                        onChange={(e) => setCmsContent({ ...cmsContent, footerEmail: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C59B27]"
                      />
                    </div>

                    {/* Website URL */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Website Domain / Link
                      </label>
                      <input
                        type="text"
                        value={cmsContent.footerWebsite}
                        onChange={(e) => setCmsContent({ ...cmsContent, footerWebsite: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C59B27]"
                      />
                    </div>

                    {/* Copyright Text */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Copyright Notice Text
                      </label>
                      <input
                        type="text"
                        value={cmsContent.footerCopyright}
                        onChange={(e) => setCmsContent({ ...cmsContent, footerCopyright: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C59B27]"
                      />
                    </div>
                  </div>
                </div>

                {/* GLOBAL SAVE BUTTON */}
                <div className="sticky bottom-6 z-30 p-4 bg-[#070C1B]/95 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl flex items-center justify-between gap-4">
                  <span className="text-xs text-slate-300 font-light hidden sm:inline">
                    Changes will be saved to Supabase (<code className="text-[#C59B27]">homepage_content</code> row).
                  </span>
                  <button
                    type="submit"
                    disabled={isSavingCms}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C59B27] via-[#E2B746] to-[#A37B1B] text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(197,155,39,0.3)] hover:shadow-[0_0_35px_rgba(197,155,39,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSavingCms ? (
                      <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Save className="w-4 h-4 text-slate-950" />
                        <span>Save All CMS Changes to Database</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}

        {/* TAB 2: MANAGE BLOGS */}
        {activeTab === "blogs" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-10"
          >
            {blogPublishedNotice && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>New blog post published successfully! It is now visible in the Public Blog section.</span>
              </div>
            )}

            {/* Create New Blog Form */}
            <form onSubmit={handlePublishBlog} className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <PlusCircle className="w-6 h-6 text-[#C59B27]" />
                  <h3 className="text-lg font-bold text-white">Create & Publish New Blog Post</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., How to Legalize Documents for German Embassy Verification"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C59B27] transition-all"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C59B27] transition-all"
                  >
                    <option value="Document Guide">Document Guide</option>
                    <option value="Education">Education</option>
                    <option value="Legal & Business">Legal & Business</option>
                    <option value="Embassy & Visas">Embassy & Visas</option>
                    <option value="General News">General News</option>
                  </select>
                </div>
              </div>

              {/* Cover Image Upload */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Cover Image Upload (File Input or Image URL)
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* File Input */}
                  <div className="relative border-2 border-dashed border-white/20 hover:border-[#C59B27]/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center bg-slate-900/40 cursor-pointer transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Upload className="w-8 h-8 text-[#C59B27] mb-2" />
                    <span className="text-xs font-semibold text-slate-200">
                      Click to upload cover image file
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1">PNG, JPG, WEBP supported</span>
                  </div>

                  {/* Image URL fallback */}
                  <div className="flex flex-col justify-center space-y-2">
                    <span className="text-xs text-slate-400 font-light">Or paste an Image URL directly:</span>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={newCoverImage.startsWith("data:") ? "" : newCoverImage}
                      onChange={(e) => {
                        setNewCoverImage(e.target.value);
                        setImagePreview(e.target.value);
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C59B27] transition-all"
                    />
                  </div>
                </div>

                {/* Preview Box */}
                {imagePreview && (
                  <div className="mt-3 relative w-full h-44 rounded-2xl overflow-hidden border border-[#C59B27]/40 shadow-lg">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 right-2 bg-slate-950/80 text-[#C59B27] text-[10px] font-bold px-2.5 py-1 rounded-md border border-[#C59B27]/30">
                      Image Preview
                    </span>
                  </div>
                )}
              </div>

              {/* Blog Content */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Blog Content (Markdown or Plain Text) *
                </label>
                <textarea
                  required
                  rows={8}
                  placeholder="Write the full content of your blog post here..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C59B27] transition-all font-sans leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C59B27] via-[#E2B746] to-[#A37B1B] text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(197,155,39,0.3)] hover:shadow-[0_0_35px_rgba(197,155,39,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Publish Blog Article</span>
                </button>
              </div>
            </form>

            {/* Published Blogs List */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-[#C59B27]" />
                  <h3 className="text-lg font-bold text-white">Currently Published Blogs ({blogsList.length})</h3>
                </div>

                <Link
                  href="/blog"
                  target="_blank"
                  className="text-xs text-[#C59B27] hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>View Public Blog Grid</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {blogsList.map((blog) => (
                  <div
                    key={blog.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-[#C59B27]/40 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
                        <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#C59B27]">
                          {blog.category} • {blog.publishedAt}
                        </span>
                        <h4 className="text-sm font-bold text-white line-clamp-1">{blog.title}</h4>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{blog.excerpt}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                      <Link
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3 h-3 text-[#C59B27]" />
                      </Link>

                      <button
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs font-semibold text-red-300 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

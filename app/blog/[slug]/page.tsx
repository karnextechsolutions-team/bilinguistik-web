"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, User, MessageSquare, BookOpen, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import { getBlogBySlug, BlogPost } from "@/lib/blogs";
import { HomepageCMSContent, DEFAULT_HOMEPAGE_CMS, fetchHomepageCMS } from "@/lib/cms";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);
  const [cms, setCms] = useState<HomepageCMSContent>(DEFAULT_HOMEPAGE_CMS);

  useEffect(() => {
    const found = getBlogBySlug(slug);
    setPost(found || null);

    async function loadCms() {
      const data = await fetchHomepageCMS();
      if (data) setCms(data);
    }
    loadCms();
  }, [slug]);

  const waLink = cms.footerWhatsApp
    ? `https://wa.me/${cms.footerWhatsApp.replace(/[^0-9]/g, "")}`
    : "https://wa.me/94752947862";

  if (post === undefined) {
    return (
      <div className="min-h-screen bg-[#0B1B3D] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#C59B27] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (post === null) {
    return (
      <div className="min-h-screen bg-[#0B1B3D] text-slate-100 flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
          <BookOpen className="w-16 h-16 text-[#C59B27] mb-4 opacity-50" />
          <h1 className="text-3xl font-extrabold text-white mb-2">Article Not Found</h1>
          <p className="text-slate-400 max-w-md mb-8">
            The requested blog post could not be found or may have been moved.
          </p>
          <Link
            href="/blog"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#C59B27] to-[#E2B746] text-slate-950 font-bold text-sm shadow-lg flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog Articles</span>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1B3D] text-slate-100 font-sans selection:bg-[#C59B27] selection:text-slate-950 flex flex-col relative overflow-x-hidden">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-[#C59B27] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C59B27]" />
            <span>Back to Blog Insights</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-6 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C59B27]/10 border border-[#C59B27]/30 text-[#C59B27] text-xs font-bold uppercase tracking-widest">
            {post.category}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-400 border-y border-white/10 py-4 font-light">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#C59B27]" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C59B27]" />
              <span>{post.publishedAt}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C59B27]" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        {/* Hero Cover Image */}
        <div className="relative w-full h-[280px] sm:h-[420px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-12">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Body Content */}
        <article className="prose prose-invert prose-amber max-w-none space-y-6 text-slate-200 text-base sm:text-lg leading-relaxed font-light">
          {post.content.split("\n\n").map((paragraph, index) => {
            if (paragraph.startsWith("### ")) {
              return (
                <h3 key={index} className="text-xl sm:text-2xl font-extrabold text-white mt-8 mb-4 border-b border-white/10 pb-2">
                  {paragraph.replace("### ", "")}
                </h3>
              );
            }
            if (paragraph.startsWith("- ")) {
              const items = paragraph.split("\n");
              return (
                <ul key={index} className="space-y-2 my-4 list-disc list-inside text-slate-300">
                  {items.map((item, i) => (
                    <li key={i} className="pl-1">
                      <span className="text-slate-200">{item.replace(/^- /, "")}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={index} className="text-slate-300 font-light leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </article>

        {/* Quote Callout Banner */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0B1B3D] via-[#162C5B] to-[#0B1B3D] border border-[#C59B27]/40 shadow-2xl text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h4 className="text-xl sm:text-2xl font-bold text-white">Have Documents Needing Sworn Translation?</h4>
            <p className="text-xs sm:text-sm text-slate-300 font-light max-w-lg">
              Send us a clear photograph or digital scan via WhatsApp for an immediate price estimate and turnaround time.
            </p>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#C59B27] via-[#E2B746] to-[#A37B1B] text-slate-950 font-bold text-sm shadow-lg hover:scale-105 transition-transform flex items-center gap-2 shrink-0"
          >
            <MessageSquare className="w-4 h-4 text-slate-950" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-20 bg-[#070C1B] text-white pt-16 pb-10 px-4 sm:px-6 lg:px-8 border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            <div className="space-y-3.5 md:col-span-1">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md">
                  <Image
                    src="/logo.png"
                    alt="Bilinguistik Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl font-black tracking-wider uppercase text-white">
                  Bilinguistik<span className="text-[#C59B27]">.</span>
                </span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                {cms.footerDesc || DEFAULT_HOMEPAGE_CMS.footerDesc}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Navigation</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400 font-light">
                <li><Link href="/#services" className="hover:text-[#C59B27] transition-colors">Services</Link></li>
                <li><Link href="/#how-it-works" className="hover:text-[#C59B27] transition-colors">How It Works</Link></li>
                <li><Link href="/blog" className="hover:text-[#C59B27] transition-colors">Blog Insights</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Coverage</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                Certified hard copies delivered islandwide across Sri Lanka.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Contact</h4>
              <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:underline font-bold"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>WhatsApp: {cms.footerWhatsApp || DEFAULT_HOMEPAGE_CMS.footerWhatsApp}</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 text-xs text-slate-500 text-center sm:text-left">
            <p>{cms.footerCopyright || DEFAULT_HOMEPAGE_CMS.footerCopyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

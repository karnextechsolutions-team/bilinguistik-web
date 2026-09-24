"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, BookOpen, MessageSquare, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import { fetchBlogs, BlogPost } from "@/lib/blogs";
import { HomepageCMSContent, DEFAULT_HOMEPAGE_CMS, fetchHomepageCMS } from "@/lib/cms";

export default function BlogIndexPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [cms, setCms] = useState<HomepageCMSContent>(DEFAULT_HOMEPAGE_CMS);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const [blogsData, cmsData] = await Promise.all([
        fetchBlogs(),
        fetchHomepageCMS(),
      ]);
      setBlogs(blogsData);
      if (cmsData) setCms(cmsData);
      setIsLoading(false);
    }
    loadData();
  }, []);

  const waLink = cms.footerWhatsApp
    ? `https://wa.me/${cms.footerWhatsApp.replace(/[^0-9]/g, "")}`
    : "https://wa.me/94752947862";

  return (
    <div className="min-h-screen bg-[#0B1B3D] text-slate-100 font-sans selection:bg-[#C59B27] selection:text-slate-950 flex flex-col relative overflow-x-hidden">
      {/* Navigation Header */}
      <Navbar />

      {/* Hero Header Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0B1B3D] via-[#10224A] to-[#0B1B3D] text-center border-b border-white/10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C59B27]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C59B27]/10 border border-[#C59B27]/30 text-[#C59B27] text-xs font-bold uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Bilinguistik Insights</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Translation & Document <br />
            <span className="bg-gradient-to-r from-[#C59B27] via-[#E2B746] to-[#A37B1B] bg-clip-text text-transparent drop-shadow-md">
              Certification Guides
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Expert insights, step-by-step legalization guides, and official sworn translation standards for embassies, universities, and government bodies.
          </p>
        </div>
      </section>

      {/* Blog Cards Grid Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        {isLoading ? (
          <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/10">
            <div className="w-8 h-8 border-4 border-[#C59B27] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-slate-400 text-sm">Loading blog articles from Supabase...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/10">
            <p className="text-slate-400">No blog articles found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {blogs.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white/[0.04] backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-[#C59B27]/60 hover:bg-white/[0.07] shadow-xl hover:shadow-[0_0_35px_rgba(197,155,39,0.15)] transition-all duration-300 flex flex-col group"
              >
                {/* Cover Image Container */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-lg bg-[#0B1B3D]/80 backdrop-blur-md text-[#C59B27] border border-[#C59B27]/40 text-xs font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-slate-400 text-xs font-light">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#C59B27]" />
                        {post.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#C59B27]" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-white group-hover:text-[#C59B27] transition-colors line-clamp-2 leading-snug">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-slate-300 text-sm font-light leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Read More Link */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#C59B27] hover:text-[#E2B746] transition-colors"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </main>

      {/* CTA Bottom Banner */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-[#0B1B3D]">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0B1B3D] via-[#162C5B] to-[#0B1B3D] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_50px_rgba(197,155,39,0.2)] border border-[#C59B27]/30">
            <div className="space-y-1.5 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Need a Certified Sworn Translation?
              </h3>
              <p className="text-sm text-slate-300 font-light">
                Get a fast, confidential quote directly from our authorized translators.
              </p>
            </div>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C59B27] via-[#E2B746] to-[#A37B1B] text-slate-950 font-bold text-sm shadow-lg shadow-[#C59B27]/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <MessageSquare className="w-4 h-4 text-slate-950" />
              <span>Request a Quote on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-20 bg-[#070C1B] text-white pt-16 pb-10 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            <div className="space-y-3.5 md:col-span-1">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md shrink-0">
                  <Image
                    src="/logo.png"
                    alt="Bilinguistik Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <Image
                  src="/bilinguistik-text.png"
                  alt="Bilinguistik"
                  width={160}
                  height={45}
                  className="object-contain"
                />
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
                <li><Link href="/#why-us" className="hover:text-[#C59B27] transition-colors">Why Bilinguistik</Link></li>
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
                <a
                  href={`mailto:${cms.footerEmail || DEFAULT_HOMEPAGE_CMS.footerEmail}`}
                  className="flex items-center gap-2 hover:text-[#C59B27] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#C59B27] shrink-0" />
                  <span>{cms.footerEmail || DEFAULT_HOMEPAGE_CMS.footerEmail}</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>{cms.footerCopyright || DEFAULT_HOMEPAGE_CMS.footerCopyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

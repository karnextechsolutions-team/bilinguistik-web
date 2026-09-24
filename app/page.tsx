"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  Award,
  FileText,
  CheckCircle2,
  Lock,
  Sparkles,
  Truck,
  Mail,
  Building2,
  Scale,
  GraduationCap,
  ScrollText,
  Send,
  FileCheck,
  CreditCard,
  Menu,
  X,
  MessageSquare,
  ChevronRight,
  UserCheck,
  Check,
  Star,
  HelpCircle,
  Info
} from "lucide-react";
import { HomepageCMSContent, DEFAULT_HOMEPAGE_CMS, fetchHomepageCMS } from "@/lib/cms";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Dynamic CMS State with Fallbacks
  const [cms, setCms] = useState<HomepageCMSContent>(DEFAULT_HOMEPAGE_CMS);

  useEffect(() => {
    async function loadCmsData() {
      const data = await fetchHomepageCMS();
      if (data) {
        setCms(data);
      }
    }
    loadCmsData();
  }, []);

  const waLink = cms.footerWhatsApp
    ? `https://wa.me/${cms.footerWhatsApp.replace(/[^0-9]/g, "")}`
    : "https://wa.me/94752947862";

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax Transform Layers
  const heroScale = useTransform(smoothProgress, [0, 0.25], [1, 0.95]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0.4]);

  const toggleFaq = (index: number) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  const faqs = [
    {
      question: cms.faq1Question || DEFAULT_HOMEPAGE_CMS.faq1Question,
      answer: cms.faq1Answer || DEFAULT_HOMEPAGE_CMS.faq1Answer
    },
    {
      question: cms.faq2Question || DEFAULT_HOMEPAGE_CMS.faq2Question,
      answer: cms.faq2Answer || DEFAULT_HOMEPAGE_CMS.faq2Answer
    },
    {
      question: cms.faq3Question || DEFAULT_HOMEPAGE_CMS.faq3Question,
      answer: cms.faq3Answer || DEFAULT_HOMEPAGE_CMS.faq3Answer
    },
    {
      question: cms.faq4Question || DEFAULT_HOMEPAGE_CMS.faq4Question,
      answer: cms.faq4Answer || DEFAULT_HOMEPAGE_CMS.faq4Answer
    },
    {
      question: cms.faq5Question || DEFAULT_HOMEPAGE_CMS.faq5Question,
      answer: cms.faq5Answer || DEFAULT_HOMEPAGE_CMS.faq5Answer
    },
    {
      question: cms.faq6Question || DEFAULT_HOMEPAGE_CMS.faq6Question,
      answer: cms.faq6Answer || DEFAULT_HOMEPAGE_CMS.faq6Answer
    }
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen text-slate-100 font-sans selection:bg-[#C59B27] selection:text-slate-950 relative overflow-x-hidden w-full bg-[#0B1B3D]"
    >
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-[#0B1B3D]/80 backdrop-blur-xl border-b border-white/10 shadow-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 sm:gap-4 group">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(197,155,39,0.35)] group-hover:scale-105 transition-all duration-300 shrink-0">
              <Image
                src="/logo.png"
                alt="Bilinguistik Logo"
                width={56}
                height={56}
                className="object-contain w-full h-full rounded-xl"
              />
            </div>
            <div className="flex flex-col justify-center gap-0">
              <Image
                src="/bilinguistik-text.png"
                alt="Bilinguistik"
                width={180}
                height={50}
                className="object-contain -ml-1"
              />
              <span className="whitespace-nowrap text-[8px] sm:text-[10px] font-bold text-amber-200/80 tracking-widest uppercase font-sans">
                Sworn Translation & Language Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <Link href="#services" className="hover:text-[#C59B27] transition-colors">
              Services
            </Link>
            <Link href="#how-it-works" className="hover:text-[#C59B27] transition-colors">
              How It Works
            </Link>
            <Link href="#why-us" className="hover:text-[#C59B27] transition-colors">
              Why Bilinguistik
            </Link>
            <Link href="#about" className="hover:text-[#C59B27] transition-colors">
              About
            </Link>
            <Link href="#faq" className="hover:text-[#C59B27] transition-colors">
              FAQ
            </Link>
            <Link href="/blog" className="hover:text-[#C59B27] transition-colors">
              Blog
            </Link>
            <Link
              href="/admin"
              className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 hover:border-[#C59B27]/50 text-slate-300 hover:text-[#C59B27] flex items-center gap-1.5 transition-colors"
            >
              <Lock className="w-3 h-3 text-[#C59B27]" />
              <span>Admin</span>
            </Link>
          </nav>

          {/* Desktop Chat on WhatsApp Button */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#C59B27] via-[#E2B746] to-[#A37B1B] text-slate-950 shadow-[0_0_25px_rgba(197,155,39,0.3)] hover:shadow-[0_0_35px_rgba(197,155,39,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <MessageSquare className="w-4 h-4 text-slate-950" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden px-3.5 py-2 rounded-xl font-bold text-xs bg-gradient-to-r from-[#C59B27] to-[#E2B746] text-slate-950 shadow-md items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="lg:hidden bg-[#0B1B3D]/95 backdrop-blur-2xl border-b border-white/10 px-5 py-5 space-y-4 shadow-2xl absolute w-full"
          >
            <nav className="flex flex-col space-y-2 font-semibold text-slate-200">
              <Link
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 border-b border-white/5 flex items-center justify-between hover:text-[#C59B27]"
              >
                <span>Services</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>
              <Link
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 border-b border-white/5 flex items-center justify-between hover:text-[#C59B27]"
              >
                <span>How It Works</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>
              <Link
                href="#why-us"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 border-b border-white/5 flex items-center justify-between hover:text-[#C59B27]"
              >
                <span>Why Bilinguistik</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>
              <Link
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 border-b border-white/5 flex items-center justify-between hover:text-[#C59B27]"
              >
                <span>About</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>
              <Link
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 border-b border-white/5 flex items-center justify-between hover:text-[#C59B27]"
              >
                <span>FAQ</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 border-b border-white/5 flex items-center justify-between hover:text-[#C59B27]"
              >
                <span>Blog</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 border-b border-white/5 flex items-center justify-between text-amber-200/80 hover:text-[#C59B27]"
              >
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#C59B27]" />
                  Admin Panel
                </span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>
            </nav>

            <div className="pt-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold bg-gradient-to-r from-[#C59B27] via-[#E2B746] to-[#A37B1B] text-slate-950 shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden min-h-[85vh] flex flex-col justify-center items-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center">
        {/* Background Video: z-0 */}
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/bg-video.mp4"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Dark Overlay: z-10 */}
        <div className="absolute inset-0 bg-[#0B1B3D]/80 z-10" />

        {/* Content Container: z-20 */}
        <div className="relative z-20 w-full">
          <motion.div
            style={{ scale: heroScale, opacity: heroOpacity }}
            className="space-y-6 sm:space-y-8 max-w-4xl mx-auto"
          >
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15]"
            >
              {cms.heroTitle.includes("\n") ? (
                <>
                  {cms.heroTitle.split("\n")[0]}
                  <br />
                  <span className="bg-gradient-to-r from-[#C59B27] via-[#E2B746] to-[#A37B1B] bg-clip-text text-transparent drop-shadow-[0_10px_35px_rgba(197,155,39,0.3)]">
                    {cms.heroTitle.split("\n").slice(1).join(" ")}
                  </span>
                </>
              ) : (
                <span className="bg-gradient-to-r from-white via-amber-100 to-[#C59B27] bg-clip-text text-transparent">
                  {cms.heroTitle || DEFAULT_HOMEPAGE_CMS.heroTitle}
                </span>
              )}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed whitespace-pre-line"
            >
              {cms.heroSubtitle || DEFAULT_HOMEPAGE_CMS.heroSubtitle}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-4"
            >
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#C59B27] via-[#E2B746] to-[#A37B1B] text-slate-950 font-bold text-base shadow-[0_0_30px_rgba(197,155,39,0.35)] hover:shadow-[0_0_45px_rgba(197,155,39,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5"
              >
                <FileText className="w-5 h-5 text-slate-950" />
                <span>Request a Translation Quote</span>
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/[0.05] backdrop-blur-xl border border-white/20 text-white font-bold text-base hover:bg-white/10 hover:border-[#C59B27]/50 shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5 text-white" />
                <span>Chat on WhatsApp</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. 3-BOX FEATURE HIGHLIGHTS GRID (DYNAMIC) */}
      <section className="relative overflow-hidden py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#070C1B]">
        <div className="relative z-20 max-w-7xl mx-auto space-y-12">
          {/* 3 Trust Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Box 1 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#C59B27]/50 hover:bg-white/[0.06] shadow-xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#C59B27]/10 text-[#C59B27] border border-[#C59B27]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {cms.trust1Title || DEFAULT_HOMEPAGE_CMS.trust1Title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                {cms.trust1Desc || DEFAULT_HOMEPAGE_CMS.trust1Desc}
              </p>
            </motion.div>

            {/* Box 2 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#C59B27]/50 hover:bg-white/[0.06] shadow-xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#C59B27]/10 text-[#C59B27] border border-[#C59B27]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {cms.trust2Title || DEFAULT_HOMEPAGE_CMS.trust2Title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                {cms.trust2Desc || DEFAULT_HOMEPAGE_CMS.trust2Desc}
              </p>
            </motion.div>

            {/* Box 3 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#C59B27]/50 hover:bg-white/[0.06] shadow-xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#C59B27]/10 text-[#C59B27] border border-[#C59B27]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {cms.trust3Title || DEFAULT_HOMEPAGE_CMS.trust3Title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                {cms.trust3Desc || DEFAULT_HOMEPAGE_CMS.trust3Desc}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section id="services" className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        {/* Background Video: z-0 */}
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/bg-services.mp4"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Dark Overlay: z-10 */}
        <div className="absolute inset-0 bg-[#0B1B3D]/80 z-10" />

        {/* Content Container: z-20 */}
        <div className="relative z-20 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Translation Services
            </h2>
          </div>

          {/* 4 Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Card 1: Personal & Civil Documents */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-[#C59B27]/60 hover:bg-white/[0.07] shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#C59B27]/10 text-[#C59B27] border border-[#C59B27]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-3 mb-3">
                  {cms.service1Title || DEFAULT_HOMEPAGE_CMS.service1Title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-light mb-5">
                  {cms.service1Desc || DEFAULT_HOMEPAGE_CMS.service1Desc}
                </p>
              </div>
            </motion.div>

            {/* Card 2: Educational Documents */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-[#C59B27]/60 hover:bg-white/[0.07] shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#C59B27]/10 text-[#C59B27] border border-[#C59B27]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-3 mb-3">
                  {cms.service2Title || DEFAULT_HOMEPAGE_CMS.service2Title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-light mb-5">
                  {cms.service2Desc || DEFAULT_HOMEPAGE_CMS.service2Desc}
                </p>
              </div>
            </motion.div>

            {/* Card 3: Legal & Official Documents */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-[#C59B27]/60 hover:bg-white/[0.07] shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#C59B27]/10 text-[#C59B27] border border-[#C59B27]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-3 mb-3">
                  {cms.service3Title || DEFAULT_HOMEPAGE_CMS.service3Title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-light mb-5">
                  {cms.service3Desc || DEFAULT_HOMEPAGE_CMS.service3Desc}
                </p>
              </div>
            </motion.div>

            {/* Card 4: Business & Corporate Documents */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-[#C59B27]/60 hover:bg-white/[0.07] shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#C59B27]/10 text-[#C59B27] border border-[#C59B27]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-3 mb-3">
                  {cms.service4Title || DEFAULT_HOMEPAGE_CMS.service4Title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-light mb-5">
                  {cms.service4Desc || DEFAULT_HOMEPAGE_CMS.service4Desc}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-white/10">
        {/* Background Video: z-0 */}
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/bg-process.mp4"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Dark Overlay: z-10 */}
        <div className="absolute inset-0 bg-[#0B1B3D]/80 z-10" />

        {/* Content Container: z-20 */}
        <div className="relative z-20 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2">
              How It Works
            </h2>
          </div>

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-[#C59B27]/60 shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C59B27] to-[#A37B1B] text-slate-950 flex items-center justify-center font-extrabold text-base shadow-md">
                  01
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {cms.step1Title || DEFAULT_HOMEPAGE_CMS.step1Title}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                {cms.step1Desc || DEFAULT_HOMEPAGE_CMS.step1Desc}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-[#C59B27]/60 shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C59B27] to-[#A37B1B] text-slate-950 flex items-center justify-center font-extrabold text-base shadow-md">
                  02
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {cms.step2Title || DEFAULT_HOMEPAGE_CMS.step2Title}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                {cms.step2Desc || DEFAULT_HOMEPAGE_CMS.step2Desc}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-[#C59B27]/60 shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C59B27] to-[#A37B1B] text-slate-950 flex items-center justify-center font-extrabold text-base shadow-md">
                  03
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {cms.step3Title || DEFAULT_HOMEPAGE_CMS.step3Title}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                {cms.step3Desc || DEFAULT_HOMEPAGE_CMS.step3Desc}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-[#C59B27]/60 shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C59B27] to-[#A37B1B] text-slate-950 flex items-center justify-center font-extrabold text-base shadow-md">
                  04
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {cms.step4Title || DEFAULT_HOMEPAGE_CMS.step4Title}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                {cms.step4Desc || DEFAULT_HOMEPAGE_CMS.step4Desc}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. WHY US SECTION */}
      <section id="why-us" className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#070C1B]">
        <div className="relative z-20 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2 leading-tight">
              Why Choose Bilinguistik?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-center">
            <div className="flex flex-col p-6 rounded-xl bg-white/[0.04] border border-white/10 shadow-lg">
              <h4 className="font-bold text-white text-lg mb-2 text-[#C59B27]">
                {cms.why1Title || DEFAULT_HOMEPAGE_CMS.why1Title}
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                {cms.why1Desc || DEFAULT_HOMEPAGE_CMS.why1Desc}
              </p>
            </div>

            <div className="flex flex-col p-6 rounded-xl bg-white/[0.04] border border-white/10 shadow-lg">
              <h4 className="font-bold text-white text-lg mb-2 text-[#C59B27]">
                {cms.why2Title || DEFAULT_HOMEPAGE_CMS.why2Title}
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                {cms.why2Desc || DEFAULT_HOMEPAGE_CMS.why2Desc}
              </p>
            </div>

            <div className="flex flex-col p-6 rounded-xl bg-white/[0.04] border border-white/10 shadow-lg">
              <h4 className="font-bold text-white text-lg mb-2 text-[#C59B27]">
                {cms.why3Title || DEFAULT_HOMEPAGE_CMS.why3Title}
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                {cms.why3Desc || DEFAULT_HOMEPAGE_CMS.why3Desc}
              </p>
            </div>

            <div className="flex flex-col p-6 rounded-xl bg-white/[0.04] border border-white/10 shadow-lg md:col-start-1 lg:col-start-2">
              <h4 className="font-bold text-white text-lg mb-2 text-[#C59B27]">
                {cms.why4Title || DEFAULT_HOMEPAGE_CMS.why4Title}
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                {cms.why4Desc || DEFAULT_HOMEPAGE_CMS.why4Desc}
              </p>
            </div>

            <div className="flex flex-col p-6 rounded-xl bg-white/[0.04] border border-white/10 shadow-lg">
              <h4 className="font-bold text-white text-lg mb-2 text-[#C59B27]">
                {cms.why5Title || DEFAULT_HOMEPAGE_CMS.why5Title}
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                {cms.why5Desc || DEFAULT_HOMEPAGE_CMS.why5Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ABOUT BILINGUISTIK */}
      <section id="about" className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        {/* Background Video: z-0 */}
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/bg-trust.mp4"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Dark Overlay: z-10 */}
        <div className="absolute inset-0 bg-[#0B1B3D]/90 z-10" />

        <div className="relative z-20 max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">About Bilinguistik</h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
            {cms.aboutText || DEFAULT_HOMEPAGE_CMS.aboutText}
          </p>
        </div>
      </section>

      {/* 7. WHAT IS A SWORN TRANSLATION? (Disclaimer) */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-[#0B1B3D]">
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-amber-900/20 border border-[#C59B27]/30 shadow-lg flex flex-col md:flex-row gap-6 items-start">
          <Info className="w-8 h-8 text-[#C59B27] shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-bold text-white mb-3">What Is a Sworn Translation?</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-light mb-4">
              A sworn translation is an official translation carried out by a translator who has been appointed and authorized by the government or judicial authority. It includes the translator's signature, seal, and a statement confirming that the translation is a true and accurate representation of the original document.
            </p>
            <p className="text-slate-400 text-xs italic">
              Acceptance requirements vary by the receiving authority. Clients are advised to confirm specific certification, attestation or legalization requirements with the relevant authority.
            </p>
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section id="faq" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#070C1B] border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-white/10 rounded-xl bg-white/[0.02] overflow-hidden transition-all duration-300">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                >
                  <span className="font-semibold text-white text-sm sm:text-base">{faq.question}</span>
                  <ChevronRight className={`w-5 h-5 text-[#C59B27] transition-transform duration-300 ${openFaq === index ? 'rotate-90' : ''}`} />
                </button>
                <div
                  className={`px-5 transition-all duration-300 ease-in-out overflow-hidden ${openFaq === index ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-slate-300 text-sm font-light leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-[#0B1B3D]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#0B1B3D] via-[#162C5B] to-[#0B1B3D] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_50px_rgba(197,155,39,0.2)] border border-[#C59B27]/30"
          >
            <div className="space-y-1.5 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Ready to Translate Your Documents?
              </h3>
            </div>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C59B27] via-[#E2B746] to-[#A37B1B] text-slate-950 font-bold text-sm whitespace-nowrap shadow-lg shadow-[#C59B27]/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 shrink-0"
            >
              <MessageSquare className="w-4 h-4 text-slate-950" />
              <span>Request a Translation Quote</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER (DYNAMIC CMS) */}
      <footer id="contact" className="relative z-20 bg-[#070C1B] text-white pt-16 pb-10 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            {/* Brand Col */}
            <div className="space-y-3.5 md:col-span-1">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md shrink-0">
                  <Image
                    src="/logo.png"
                    alt="Bilinguistik Logo"
                    width={40}
                    height={40}
                    className="object-contain w-full h-full rounded-xl"
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

            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Services</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400 font-light">
                <li><Link href="#services" className="hover:text-[#C59B27] transition-colors">{cms.service1Title || DEFAULT_HOMEPAGE_CMS.service1Title}</Link></li>
                <li><Link href="#services" className="hover:text-[#C59B27] transition-colors">{cms.service2Title || DEFAULT_HOMEPAGE_CMS.service2Title}</Link></li>
                <li><Link href="#services" className="hover:text-[#C59B27] transition-colors">{cms.service3Title || DEFAULT_HOMEPAGE_CMS.service3Title}</Link></li>
                <li><Link href="#services" className="hover:text-[#C59B27] transition-colors">{cms.service4Title || DEFAULT_HOMEPAGE_CMS.service4Title}</Link></li>
              </ul>
            </div>

            {/* Coverage */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Delivery</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                We deliver certified physical hard copies islandwide in Sri Lanka.
              </p>
            </div>

            {/* Contact Desk */}
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
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-[#C59B27] font-bold">WWW</span>
                  <span>{cms.footerWebsite || DEFAULT_HOMEPAGE_CMS.footerWebsite}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>{cms.footerCopyright || DEFAULT_HOMEPAGE_CMS.footerCopyright}</p>
            <div className="flex items-center gap-6">
              <a href="#services" className="hover:text-[#C59B27] transition-colors">Services</a>
              <a href="#how-it-works" className="hover:text-[#C59B27] transition-colors">How It Works</a>
              <a href="#faq" className="hover:text-[#C59B27] transition-colors">FAQ</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

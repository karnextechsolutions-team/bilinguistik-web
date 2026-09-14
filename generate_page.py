import re

with open("app/page.tsx", "r") as f:
    content = f.read()

# We will just write a full new React component, copying the styles from the original.
# It's safer and cleaner to just author the whole file as a string.

new_content = """\
"use client";

import { useState, useRef } from "react";
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

const WA_LINK = "https://wa.me/94752947862";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
      question: "What languages do you translate?",
      answer: "We specialize exclusively in Sinhala ↔ English translations."
    },
    {
      question: "Do I need a sworn translation?",
      answer: "Sworn translations are typically required for official documents submitted to government bodies, courts, embassies, and foreign universities. If you are unsure, please check with the receiving authority."
    },
    {
      question: "Can I send my document online?",
      answer: "Yes, you can easily send a clear scan or photograph of your document via WhatsApp or email."
    },
    {
      question: "Can I receive a soft/hard copy?",
      answer: "Yes, we provide both. You will receive an electronic soft copy, and we can arrange delivery of the hard copy to your address."
    },
    {
      question: "How long does it take?",
      answer: "Turnaround times depend on the document's complexity and length. We will provide an estimated completion time along with your quote."
    },
    {
      question: "Do you offer urgent translations?",
      answer: "Yes, we can accommodate urgent requests. Please mention your deadline when requesting a quote."
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
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(197,155,39,0.35)] group-hover:scale-105 transition-all duration-300">
              <Image
                src="/logo.png"
                alt="Bilinguistik Logo"
                width={40}
                height={40}
                className="object-contain w-full h-full rounded-xl"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase leading-none">
                Bilinguistik<span className="text-[#C59B27]">.</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-amber-200/80 tracking-widest uppercase mt-0.5">
                Sworn Translation & Language Services
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
          </nav>

          {/* Desktop Chat on WhatsApp Button */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={WA_LINK}
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
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl font-bold text-xs bg-gradient-to-r from-[#C59B27] to-[#E2B746] text-slate-950 sm:hidden shadow-md flex items-center gap-1.5"
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
            </nav>

            <div className="pt-2">
              <a
                href={WA_LINK}
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
              Sinhala ↔ English<br/>
              <span className="bg-gradient-to-r from-[#C59B27] via-[#E2B746] to-[#A37B1B] bg-clip-text text-transparent drop-shadow-[0_10px_35px_rgba(197,155,39,0.3)]">
                Sworn Translations
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed"
            >
              Professional sworn translations of personal, educational, legal, and official documents. Accurate • Confidential • Professionally Certified.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-4"
            >
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#C59B27] via-[#E2B746] to-[#A37B1B] text-slate-950 font-bold text-base shadow-[0_0_30px_rgba(197,155,39,0.35)] hover:shadow-[0_0_45px_rgba(197,155,39,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5"
              >
                <FileText className="w-5 h-5 text-slate-950" />
                <span>Request a Translation Quote</span>
              </a>
              <a
                href={WA_LINK}
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

      {/* Feature Highlights Grid */}
      <section className="relative overflow-hidden py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#070C1B]">
        <div className="relative z-20 max-w-7xl mx-auto space-y-12">
          {/* 3 Trust Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
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
              <h3 className="text-xl font-bold text-white mb-2">Government Sworn Translators</h3>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                Officially authorized translations accepted by foreign embassies, courts, and government bodies.
              </p>
            </motion.div>

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
              <h3 className="text-xl font-bold text-white mb-2">Clear & Timely Communication</h3>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                Receive your initial quote quickly and stay updated throughout the translation process.
              </p>
            </motion.div>

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
              <h3 className="text-xl font-bold text-white mb-2">Absolute Confidentiality</h3>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                Your legal, financial, and personal certificates remain completely safe and strictly protected.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
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
                  Personal & Civil Documents
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-light mb-5">
                  Birth, marriage, divorce, death certificates, NICs, Passports, Police clearance.
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
                  Educational Documents
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-light mb-5">
                  School certificates, G.C.E. O/L and A/L, Academic transcripts, Diplomas, Degrees.
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
                  Legal & Official Documents
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-light mb-5">
                  Affidavits, Declarations, Powers of Attorney, Court-related documents.
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
                  Business & Corporate Documents
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-light mb-5">
                  Agreements, Contracts, Company documents, Board resolutions.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
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
              <h3 className="text-lg font-bold text-white mb-2">Send Your Document</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                Send a clear scan or photograph via WhatsApp or email.
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
              <h3 className="text-lg font-bold text-white mb-2">Receive a Quote</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                We review the document and confirm the translation fee and estimated completion time.
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
              <h3 className="text-lg font-bold text-white mb-2">Confirm the Translation</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                Once you approve the quotation, the translation process begins.
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
              <h3 className="text-lg font-bold text-white mb-2">Receive Your Translation</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                Receive the completed certified translation electronically and/or arrange delivery of the hard copy.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. WHY US SECTION */}
      <section id="why-us" className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#070C1B]">
        <div className="relative z-20 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2 leading-tight">
              Why Choose Bilinguistik?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-center">
            <div className="flex flex-col p-6 rounded-xl bg-white/[0.04] border border-white/10 shadow-lg">
              <h4 className="font-bold text-white text-lg mb-2 text-[#C59B27]">Accuracy</h4>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                Careful translation of names, dates, numbers, terminology and official information.
              </p>
            </div>

            <div className="flex flex-col p-6 rounded-xl bg-white/[0.04] border border-white/10 shadow-lg">
              <h4 className="font-bold text-white text-lg mb-2 text-[#C59B27]">Professional Certification</h4>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                Translations are prepared and certified by an authorized Sworn Translator, where applicable.
              </p>
            </div>

            <div className="flex flex-col p-6 rounded-xl bg-white/[0.04] border border-white/10 shadow-lg">
              <h4 className="font-bold text-white text-lg mb-2 text-[#C59B27]">Confidentiality</h4>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                Your personal, legal, educational and business documents are handled with care and confidentiality.
              </p>
            </div>

            <div className="flex flex-col p-6 rounded-xl bg-white/[0.04] border border-white/10 shadow-lg md:col-start-1 lg:col-start-2">
              <h4 className="font-bold text-white text-lg mb-2 text-[#C59B27]">Personal Attention</h4>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                Each document is reviewed individually according to its content and intended use.
              </p>
            </div>

            <div className="flex flex-col p-6 rounded-xl bg-white/[0.04] border border-white/10 shadow-lg">
              <h4 className="font-bold text-white text-lg mb-2 text-[#C59B27]">Convenient Service</h4>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                Submit your document remotely and receive your completed translation without unnecessary travel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ABOUT BILINGUISTIK */}
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
            Bilinguistik provides professional Sinhala ↔ English translation services. We emphasize accuracy and professional responsibility in handling your personal, educational, legal, and business documents. Every translation is managed with care to ensure the final document faithfully represents the original.
          </p>
        </div>
      </section>

      {/* 6. WHAT IS A SWORN TRANSLATION? (Disclaimer) */}
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

      {/* 7. FAQ SECTION */}
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
              href={WA_LINK}
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

      {/* FOOTER */}
      <footer id="contact" className="relative z-20 bg-[#070C1B] text-white pt-16 pb-10 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            {/* Brand Col */}
            <div className="space-y-3.5 md:col-span-1">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md">
                  <Image
                    src="/logo.png"
                    alt="Bilinguistik Logo"
                    width={40}
                    height={40}
                    className="object-contain w-full h-full rounded-xl"
                  />
                </div>
                <span className="text-2xl font-black tracking-wider uppercase text-white">
                  Bilinguistik<span className="text-[#C59B27]">.</span>
                </span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                Professional sworn translations of personal, educational, legal, and official documents. Accurate • Confidential • Professionally Certified.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Services</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400 font-light">
                <li><Link href="#services" className="hover:text-[#C59B27] transition-colors">Personal & Civil Documents</Link></li>
                <li><Link href="#services" className="hover:text-[#C59B27] transition-colors">Educational Documents</Link></li>
                <li><Link href="#services" className="hover:text-[#C59B27] transition-colors">Legal & Official Documents</Link></li>
                <li><Link href="#services" className="hover:text-[#C59B27] transition-colors">Business & Corporate Documents</Link></li>
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
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:underline font-bold"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>WhatsApp: +94 75 294 7862</span>
                </a>
                <a
                  href="mailto:info@bilinguisti.lk"
                  className="flex items-center gap-2 hover:text-[#C59B27] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#C59B27] shrink-0" />
                  <span>info@bilinguisti.lk</span>
                </a>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-[#C59B27] font-bold">WWW</span>
                  <span>www.bilinguisti.lk</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© 2026 Bilinguistik. All rights reserved. Sworn Translation & Language Services.</p>
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
"""

with open("app/page.tsx", "w") as f:
    f.write(new_content)

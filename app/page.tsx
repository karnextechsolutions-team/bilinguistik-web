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
} from "lucide-react";

const WA_LINK =
  "https://wa.me/94752947862?text=Hi%20Bilinguistik,%20I%20would%20like%20to%20get%20a%20document%20translated.";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax Transform Layers
  const heroScale = useTransform(smoothProgress, [0, 0.25], [1, 0.95]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0.4]);

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
                Sworn & Certified Platform
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
            <Link href="#contact" className="hover:text-[#C59B27] transition-colors">
              Contact Us
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
            className="lg:hidden bg-[#0B1B3D]/95 backdrop-blur-2xl border-b border-white/10 px-5 py-5 space-y-4 shadow-2xl"
          >
            <nav className="flex flex-col space-y-2 font-semibold text-slate-200">
              <Link
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 border-b border-white/5 flex items-center justify-between hover:text-[#C59B27]"
              >
                <span>Our Services</span>
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
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 border-b border-white/5 flex items-center justify-between hover:text-[#C59B27]"
              >
                <span>Contact Us</span>
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
            {/* Sworn Platform Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] backdrop-blur-xl border border-[#C59B27]/40 shadow-[0_0_25px_rgba(197,155,39,0.2)] cursor-default"
            >
              <Star className="w-3.5 h-3.5 text-[#C59B27] fill-[#C59B27]" />
              <span className="text-[11px] sm:text-xs font-bold tracking-widest text-amber-200 uppercase">
                OFFICIAL SWORN & CERTIFIED TRANSLATION PLATFORM
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15]"
            >
              Get Officially{" "}
              <span className="bg-gradient-to-r from-[#C59B27] via-[#E2B746] to-[#A37B1B] bg-clip-text text-transparent drop-shadow-[0_10px_35px_rgba(197,155,39,0.3)]">
                Accepted Translations
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed"
            >
              Fast, Accurate & Confidential. Trusted for legal, educational, and official documents across Sri Lanka by embassies, courts, and government ministries.
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
                <MessageSquare className="w-5 h-5 text-slate-950" />
                <span>Send Document via WhatsApp</span>
              </a>
              <a
                href="#services"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/[0.05] backdrop-blur-xl border border-white/20 text-white font-bold text-base hover:bg-white/10 hover:border-[#C59B27]/50 shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 text-[#C59B27]" />
              </a>
            </motion.div>

            {/* Islandwide Courier Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pt-4 inline-flex items-center gap-3.5 bg-white/[0.04] backdrop-blur-xl border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-[#C59B27]/40 transition-all rounded-full px-6 py-3 text-left max-w-full"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C59B27] to-[#A37B1B] text-slate-950 flex items-center justify-center shrink-0 shadow-md">
                <Truck className="w-5 h-5" />
              </div>
              <div className="text-left overflow-hidden">
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                  <span>Islandwide Courier + Soft Copy</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block shrink-0" />
                </div>
                <div className="text-[11px] sm:text-xs text-slate-300 font-normal truncate sm:whitespace-normal">
                  Certified PDF via email + Stamped hard copies delivered islandwide
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights Grid & Institutional Strip */}
      <section className="relative overflow-hidden py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
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
                Officially authorized translators whose stamps & seals are accepted by foreign embassies, courts, and Sri Lankan government bodies.
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
              <h3 className="text-xl font-bold text-white mb-2">Fast & Transparent Turnaround</h3>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                Receive your initial quote in minutes with real-time status tracking throughout the translation and certification process.
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
              <h3 className="text-xl font-bold text-white mb-2">100% Confidentiality & Security</h3>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                Strict non-disclosure compliance ensures your legal, financial, and personal certificates remain completely safe and protected.
              </p>
            </motion.div>
          </div>

          {/* Institutional Acceptance Strip */}
          <div className="pt-6 border-t border-white/10">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-amber-200/80 mb-6">
              Trusted & Accepted For Official Submissions To
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center gap-2.5">
                <Building2 className="w-4 h-4 text-[#C59B27]" />
                <span className="text-xs font-bold text-slate-200">Embassies & Consulates</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center gap-2.5">
                <Scale className="w-4 h-4 text-[#C59B27]" />
                <span className="text-xs font-bold text-slate-200">Courts & Registrars</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center gap-2.5">
                <FileCheck className="w-4 h-4 text-[#C59B27]" />
                <span className="text-xs font-bold text-slate-200">Ministry of Foreign Affairs</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center gap-2.5">
                <GraduationCap className="w-4 h-4 text-[#C59B27]" />
                <span className="text-xs font-bold text-slate-200">Foreign Universities & WES</span>
              </div>
            </div>
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-[#C59B27]/30 text-[#C59B27] text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5 fill-[#C59B27]" />
              <span>Comprehensive Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Official Translation Services
            </h2>
            <p className="mt-3 text-slate-300 text-base sm:text-lg font-light">
              Every document is translated by certified sworn professionals to meet strict legal, embassy, and institutional standards.
            </p>
          </div>

          {/* 6 Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1: Personal Certificates */}
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
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#C59B27]/15 text-[#E2B746] border border-[#C59B27]/30 uppercase tracking-wider">
                  High Demand
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-3 mb-3">
                  Personal Certificates
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-light mb-5">
                  Birth, Marriage, Death certificates, National Identity Cards (NIC), Passports, and Driving Licenses for visa, migration, and official use.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-slate-200 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C59B27] shrink-0" />
                    <span>Sinhala ↔ English ↔ Tamil</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C59B27] shrink-0" />
                    <span>Embassy & MFA Attestation Ready</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C59B27] shrink-0" />
                    <span>Fast 24-Hour turnaround available</span>
                  </li>
                </ul>
              </div>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase text-[#C59B27] group-hover:text-amber-200 transition-colors pt-4 border-t border-white/10"
              >
                <span>Get Quote For Certificate</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
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
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#C59B27]/10 text-amber-200 border border-[#C59B27]/30 uppercase tracking-wider">
                  Academic & WES
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-3 mb-3">
                  Educational Documents
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-light mb-5">
                  School Leaving Certificates, GCE O/L & A/L Transcripts, University Diplomas, Degree Certificates, and Academic Syllabi for foreign universities.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-slate-200 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C59B27] shrink-0" />
                    <span>WES & Educational Board Compliant</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C59B27] shrink-0" />
                    <span>Certified Grade Sheet Format</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C59B27] shrink-0" />
                    <span>Direct Soft Copy PDF Delivery</span>
                  </li>
                </ul>
              </div>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase text-[#C59B27] group-hover:text-amber-200 transition-colors pt-4 border-t border-white/10"
              >
                <span>Submit Academic Transcript</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            {/* Card 3: Business & Corporate Docs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-[#C59B27]/60 hover:bg-white/[0.07] shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#C59B27]/10 text-[#C59B27] border border-[#C59B27]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#C59B27]/10 text-slate-300 border border-[#C59B27]/30 uppercase tracking-wider">
                  Corporate & Trade
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-3 mb-3">
                  Business & Corporate Docs
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-light mb-5">
                  Commercial Contracts, MOUs, Financial Audits, Business Registrations (Form 1 / Form 20), Board Resolutions, and Export Documents.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-slate-200 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C59B27] shrink-0" />
                    <span>Commercial & Financial Terminology</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C59B27] shrink-0" />
                    <span>Corporate NDA & Privacy Guarantee</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C59B27] shrink-0" />
                    <span>Bank & Audit accepted certified seal</span>
                  </li>
                </ul>
              </div>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase text-[#C59B27] group-hover:text-amber-200 transition-colors pt-4 border-t border-white/10"
              >
                <span>Upload Business Docs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            {/* Card 4: Deeds & Land Papers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-[#C59B27]/60 hover:bg-white/[0.07] shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#C59B27]/10 text-[#C59B27] border border-[#C59B27]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                  <ScrollText className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#C59B27]/10 text-[#E2B746] border border-[#C59B27]/30 uppercase tracking-wider">
                  Property & Land
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-3 mb-3">
                  Deeds & Land Papers
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-light mb-5">
                  Title Deeds, Mortgages, Wills, Powers of Attorney, Survey Plans, Partition Deeds, and Land Registry extract documents.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-slate-200 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C59B27] shrink-0" />
                    <span>Precise Legal & Conveyancing Terms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C59B27] shrink-0" />
                    <span>Registrar General & Bank Approved</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C59B27] shrink-0" />
                    <span>Detailed Bound Hard Copy Copies</span>
                  </li>
                </ul>
              </div>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase text-[#C59B27] group-hover:text-amber-200 transition-colors pt-4 border-t border-white/10"
              >
                <span>Submit Land Deed</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            {/* Card 5: Legal & Court Documents */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-[#C59B27]/60 hover:bg-white/[0.07] shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#C59B27]/10 text-[#C59B27] border border-[#C59B27]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                  <Scale className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#C59B27]/10 text-emerald-300 border border-[#C59B27]/30 uppercase tracking-wider">
                  Court & Affidavits
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-3 mb-3">
                  Legal & Court Documents
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-light mb-5">
                  Sworn Affidavits, High Court & District Court Cases, Police Clearance Certificates, Judicial Rulings, and Attorney Notices.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-slate-200 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C59B27] shrink-0" />
                    <span>Sworn Translator Official Stamp</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C59B27] shrink-0" />
                    <span>Court & Judicial Registry Accepted</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C59B27] shrink-0" />
                    <span>Urgent Legal Filing Support</span>
                  </li>
                </ul>
              </div>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase text-[#C59B27] group-hover:text-amber-200 transition-colors pt-4 border-t border-white/10"
              >
                <span>Upload Court Docs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            {/* Card 6: Confidential Service */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-[#C59B27]/60 hover:bg-white/[0.07] shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#C59B27]/10 text-[#C59B27] border border-[#C59B27]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                  <Lock className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#C59B27]/10 text-amber-200 border border-[#C59B27]/30 uppercase tracking-wider">
                  100% Secure
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-3 mb-3">
                  Confidential & Secure Service
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-light mb-5">
                  100% Confidential handling of sensitive personal identity documents, financial statements, and private legal records.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-slate-200 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C59B27] shrink-0" />
                    <span>Encrypted Messaging & Storage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C59B27] shrink-0" />
                    <span>Zero Unintended Third-Party Sharing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C59B27] shrink-0" />
                    <span>Strict Data Deletion Protocols</span>
                  </li>
                </ul>
              </div>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase text-[#C59B27] group-hover:text-amber-200 transition-colors pt-4 border-t border-white/10"
              >
                <span>Learn About Privacy</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
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
            <span className="text-xs font-bold uppercase tracking-widest text-[#C59B27]">
              Simple & Transparent Process
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2">
              How It Works in 4 Steps
            </h2>
            <p className="text-slate-300 text-base sm:text-lg font-light mt-3">
              Get your sworn certified translations without leaving your home or office.
            </p>
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
                <Send className="w-5 h-5 text-[#C59B27]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Send Your Document</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                Send your document scan or photo directly via WhatsApp (075 294 7862) or Email.
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
                <FileText className="w-5 h-5 text-[#C59B27]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Get Quote & Timeframe</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                Receive an immediate transparent price estimate and estimated completion time from our sworn desk.
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
                <CreditCard className="w-5 h-5 text-[#C59B27]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Confirm & Pay</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                Approve your quote and complete secure payment online via bank transfer or card.
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
                <Truck className="w-5 h-5 text-[#C59B27]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Receive Email & Courier</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                Get your certified digital PDF soft copy by email + stamped hard copies delivered islandwide by courier.
              </p>
            </motion.div>
          </div>

          {/* CTA Callout Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 sm:mt-16 p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#0B1B3D] via-[#162C5B] to-[#0B1B3D] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_50px_rgba(197,155,39,0.2)] border border-[#C59B27]/30"
          >
            <div className="space-y-1.5 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Ready to Translate Your Documents?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm font-light">
                Get a free quote within minutes from our official sworn translation team on WhatsApp.
              </p>
            </div>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C59B27] via-[#E2B746] to-[#A37B1B] text-slate-950 font-bold text-sm whitespace-nowrap shadow-lg shadow-[#C59B27]/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 shrink-0"
            >
              <MessageSquare className="w-4 h-4 text-slate-950" />
              <span>Send Document via WhatsApp</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* 4. WHY US SECTION */}
      <section id="why-us" className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
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
        <div className="absolute inset-0 bg-[#0B1B3D]/80 z-10" />

        {/* Content Container: z-20 */}
        <div className="relative z-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C59B27]">
                Uncompromised Quality & Trust
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2 leading-tight">
                Why Sri Lankans & Businesses Trust Bilinguistik
              </h2>
              <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed font-light">
                We eliminate the stress of document legalizations and translations. Whether you are applying for a foreign visa, higher education abroad, court proceedings, or international business contracts, we ensure 100% official compliance.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-lg">
                  <div className="w-10 h-10 rounded-lg bg-[#C59B27]/10 text-[#C59B27] flex items-center justify-center shrink-0 font-bold border border-[#C59B27]/30 shadow-md">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base">Official Sworn Seal Guarantee</h4>
                    <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed font-light">
                      Every completed translation carries the seal, signature, and credential registration of an authorized Sworn Translator.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-lg">
                  <div className="w-10 h-10 rounded-lg bg-[#C59B27]/10 text-[#C59B27] flex items-center justify-center shrink-0 font-bold border border-[#C59B27]/30 shadow-md">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base">Islandwide Doorstep Delivery</h4>
                    <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed font-light">
                      No need to travel to Colombo. We ship certified physical hard copies straight to your home or office anywhere in Sri Lanka.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-lg">
                  <div className="w-10 h-10 rounded-lg bg-[#C59B27]/10 text-[#C59B27] flex items-center justify-center shrink-0 font-bold border border-[#C59B27]/30 shadow-md">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base">100% Embassy Acceptance Rate</h4>
                    <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed font-light">
                      Recognized by European, UK, US, Australian, Canadian, Middle Eastern, and Asian embassies and consulates.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* High-Trust Box */}
            <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-[#C59B27]/30 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 space-y-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C59B27] to-[#A37B1B] text-slate-950 flex items-center justify-center font-black text-xl shadow-lg">
                    ★
                  </div>
                  <div>
                    <div className="text-xs font-bold text-amber-300 uppercase tracking-widest">Certified Standard</div>
                    <div className="text-xl sm:text-2xl font-black text-white">Sworn Translation Desk</div>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-slate-300 font-light">Supported Languages</span>
                    <span className="font-bold text-white">English, Sinhala, Tamil, German, etc.</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-slate-300 font-light">Turnaround Time</span>
                    <span className="font-extrabold text-emerald-400">24 to 48 Hours</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-slate-300 font-light">Delivery Options</span>
                    <span className="font-bold text-white">PDF Soft Copy + Courier Hard Copy</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-300 font-light">WhatsApp Hotline</span>
                    <span className="font-extrabold text-[#C59B27]">075 294 7862</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold bg-white/10 hover:bg-white/20 text-white transition-all shadow-lg border border-white/10 text-sm"
                  >
                    <MessageSquare className="w-4 h-4 text-[#C59B27]" />
                    <span>Chat on WhatsApp Directly</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
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
                Sri Lanka&apos;s premier platform for official sworn & certified document translations for legal, academic, and embassy submissions.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-amber-200 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>Sworn & Certified Desk</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Services</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400 font-light">
                <li><Link href="#services" className="hover:text-[#C59B27] transition-colors">Birth & Marriage Certificates</Link></li>
                <li><Link href="#services" className="hover:text-[#C59B27] transition-colors">Educational Transcripts & Degrees</Link></li>
                <li><Link href="#services" className="hover:text-[#C59B27] transition-colors">Title Deeds & Land Records</Link></li>
                <li><Link href="#services" className="hover:text-[#C59B27] transition-colors">Affidavits & Court Documents</Link></li>
                <li><Link href="#services" className="hover:text-[#C59B27] transition-colors">Corporate Business Documents</Link></li>
              </ul>
            </div>

            {/* Coverage */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Islandwide Delivery</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                We deliver certified physical hard copies to Colombo, Kandy, Galle, Jaffna, Gampaha, Kurunegala, Matara, Negombo, and all 25 districts of Sri Lanka.
              </p>
              <div className="pt-1">
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Courier Express Tracking Available
                </span>
              </div>
            </div>

            {/* Contact Desk */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Official Contact Desk</h4>
              <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:underline font-bold"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>WhatsApp: 075 294 7862</span>
                </a>
                <a
                  href="mailto:info@bilinguistik.uk"
                  className="flex items-center gap-2 hover:text-[#C59B27] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#C59B27] shrink-0" />
                  <span>info@bilinguistik.uk</span>
                </a>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-[#C59B27] font-bold">WWW</span>
                  <span>www.bilinguistik.uk</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© 2026 Bilinguistik. All rights reserved. Sworn Translation & Language Solutions Sri Lanka.</p>
            <div className="flex items-center gap-6">
              <a href="#services" className="hover:text-[#C59B27] transition-colors">Services</a>
              <a href="#how-it-works" className="hover:text-[#C59B27] transition-colors">How It Works</a>
              <a href="#contact" className="hover:text-[#C59B27] transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
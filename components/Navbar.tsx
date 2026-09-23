"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, MessageSquare, ChevronRight, Lock } from "lucide-react";

const WA_LINK = "https://wa.me/94752947862";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  const getHref = (anchor: string) => {
    return isHome ? `#${anchor}` : `/#${anchor}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B1B3D]/85 backdrop-blur-xl border-b border-white/10 shadow-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 sm:gap-4 group">
          <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(197,155,39,0.35)] group-hover:scale-105 transition-all duration-300 shrink-0">
            <Image
              src="/logo.png"
              alt="Bilinguistik Logo"
              width={52}
              height={52}
              className="object-contain w-full h-full rounded-xl"
            />
          </div>
          <div className="flex flex-col justify-center gap-0">
            <Image
              src="/bilinguistik-text.png"
              alt="Bilinguistik"
              width={160}
              height={44}
              className="object-contain -ml-1"
            />
            <span className="whitespace-nowrap text-[8px] sm:text-[9.5px] font-bold text-amber-200/80 tracking-widest uppercase font-sans">
              Sworn Translation & Language Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-300">
          <Link href={getHref("services")} className="hover:text-[#C59B27] transition-colors">
            Services
          </Link>
          <Link href={getHref("how-it-works")} className="hover:text-[#C59B27] transition-colors">
            How It Works
          </Link>
          <Link href={getHref("why-us")} className="hover:text-[#C59B27] transition-colors">
            Why Bilinguistik
          </Link>
          <Link href={getHref("about")} className="hover:text-[#C59B27] transition-colors">
            About
          </Link>
          <Link href={getHref("faq")} className="hover:text-[#C59B27] transition-colors">
            FAQ
          </Link>
          <Link
            href="/blog"
            className={`transition-colors flex items-center gap-1.5 ${
              pathname.startsWith("/blog")
                ? "text-[#C59B27] font-bold"
                : "hover:text-[#C59B27]"
            }`}
          >
            Blog
          </Link>
          <Link
            href="/admin"
            className={`transition-colors text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 hover:border-[#C59B27]/50 flex items-center gap-1.5 ${
              pathname.startsWith("/admin")
                ? "text-[#C59B27] border-[#C59B27]/50 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Lock className="w-3 h-3 text-[#C59B27]" />
            <span>Admin</span>
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
          className="lg:hidden bg-[#0B1B3D]/95 backdrop-blur-2xl border-b border-white/10 px-5 py-5 space-y-4 shadow-2xl absolute w-full left-0 top-20"
        >
          <nav className="flex flex-col space-y-2 font-semibold text-slate-200">
            <Link
              href={getHref("services")}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 border-b border-white/5 flex items-center justify-between hover:text-[#C59B27]"
            >
              <span>Services</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </Link>
            <Link
              href={getHref("how-it-works")}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 border-b border-white/5 flex items-center justify-between hover:text-[#C59B27]"
            >
              <span>How It Works</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </Link>
            <Link
              href={getHref("why-us")}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 border-b border-white/5 flex items-center justify-between hover:text-[#C59B27]"
            >
              <span>Why Bilinguistik</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </Link>
            <Link
              href={getHref("about")}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 border-b border-white/5 flex items-center justify-between hover:text-[#C59B27]"
            >
              <span>About</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </Link>
            <Link
              href={getHref("faq")}
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
              <span className={pathname.startsWith("/blog") ? "text-[#C59B27] font-bold" : ""}>
                Blog
              </span>
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
  );
}

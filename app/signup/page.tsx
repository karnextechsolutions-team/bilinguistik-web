"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck, AlertCircle } from "lucide-react";
import { useState } from "react";
import { signup } from "./actions";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const res = await signup(formData);
    
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#070C1B] relative overflow-hidden px-4 font-sans text-slate-100">
      {/* Ambient Radial Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(197,155,39,0.15),transparent_70%)] pointer-events-none blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(11,27,61,0.5),transparent_70%)] pointer-events-none blur-3xl" />

      {/* Back to Home Navigation */}
      <div className="absolute top-8 left-6 md:left-12">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-[#C59B27] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </div>

      <div className="w-full max-w-md relative z-10 my-12">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#C59B27] to-[#8C6B18] flex items-center justify-center shadow-[0_0_30px_rgba(197,155,39,0.3)] mb-5">
            <ShieldCheck className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">
            Create an Account
          </h2>
          <p className="text-slate-400 text-sm font-light">
            Join the portal to manage your translations and track status
          </p>
        </div>

        {/* Glassmorphic Signup Card */}
        <div className="backdrop-blur-2xl bg-white/[0.03] border border-white/10 p-8 rounded-3xl shadow-2xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-200 leading-relaxed">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Full Name
              </label>
              <input
                name="fullName"
                type="text"
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#C59B27]/50 focus:border-[#C59B27]/50 transition-all text-sm"
                placeholder="John Doe"
              />
            </div>

            {/* Phone Number Field */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Phone Number
              </label>
              <input
                name="phone"
                type="tel"
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#C59B27]/50 focus:border-[#C59B27]/50 transition-all text-sm"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#C59B27]/50 focus:border-[#C59B27]/50 transition-all text-sm"
                placeholder="hello@example.com"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                minLength={6}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#C59B27]/50 focus:border-[#C59B27]/50 transition-all text-sm"
                placeholder="••••••••"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col gap-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C59B27] to-[#A37B1B] text-black font-bold text-sm shadow-[0_5px_20px_rgba(197,155,39,0.3)] hover:shadow-[0_10px_30px_rgba(197,155,39,0.5)] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-sm text-slate-400 hover:text-[#C59B27] transition-colors"
            >
              Already have an account? <span className="font-semibold text-white">Sign in</span>
            </Link>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-slate-500 text-xs mt-8 flex items-center justify-center gap-2 mb-12">
          <ShieldCheck className="w-3.5 h-3.5" />
          End-to-end encrypted official portal
        </p>
      </div>
    </div>
  );
}

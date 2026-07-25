"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface Job {
  id: string;
  created_at: string;
  customer_id: string;
  title: string;
  status: string;
  price: number;
  deadline: string;
  document_url: string;
  translated_doc_url?: string;
}

interface Profile {
  id: string;
  full_name: string;
  phone: string;
  role: string;
}

interface DashboardClientProps {
  user: any;
  profile: Profile | null;
  initialJobs: Job[];
}

// Countdown Timer component for active jobs
function CountdownTimer({ deadlineString }: { deadlineString: string }) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isOver: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: false });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(deadlineString) - +new Date();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isOver: false,
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [deadlineString]);

  if (timeLeft.isOver) {
    return (
      <span className="inline-flex items-center text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded">
        Awaiting Delivery
      </span>
    );
  }

  return (
    <div className="flex gap-1.5 font-mono text-xs font-semibold text-navy bg-slate-100 p-1.5 rounded border border-slate-200">
      <span className="flex flex-col items-center">
        <span>{timeLeft.days}d</span>
      </span>
      <span>:</span>
      <span className="flex flex-col items-center">
        <span>{String(timeLeft.hours).padStart(2, "0")}h</span>
      </span>
      <span>:</span>
      <span className="flex flex-col items-center">
        <span>{String(timeLeft.minutes).padStart(2, "0")}m</span>
      </span>
      <span>:</span>
      <span className="flex flex-col items-center">
        <span>{String(timeLeft.seconds).padStart(2, "0")}s</span>
      </span>
    </div>
  );
}

export default function DashboardClient({
  user,
  profile,
  initialJobs,
}: DashboardClientProps) {
  const supabase = createClient();
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [daysNeeded, setDaysNeeded] = useState(3);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const activeJobs = jobs.filter((j) => j.status !== "completed" && j.status !== "delivered");
  const completedJobs = jobs.filter((j) => j.status === "completed" || j.status === "delivered");
  const totalInvestment = jobs.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setUploading(true);

    try {
      if (!title.trim()) throw new Error("Please enter a job title/description.");
      if (!file) throw new Error("Please select a document to upload.");

      let documentUrl = "";
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      try {
        // Try uploading to Supabase Storage bucket 'documents'
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("documents")
          .upload(fileName, file);

        if (uploadError) {
          throw uploadError;
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from("documents")
          .getPublicUrl(fileName);
        
        documentUrl = publicUrlData?.publicUrl || "";
      } catch (storageErr: any) {
        console.warn("Storage upload failed or bucket doesn't exist, using fallback filename string:", storageErr.message);
        // Fallback for demonstration / local testing when storage is not initialized
        documentUrl = `https://mock.storage.bilinguistik.com/documents/${fileName}`;
      }

      // Calculate automatic pricing: baseline $25 + some variance or set price
      const calculatedPrice = 25.0 + Math.floor(Math.random() * 30);
      
      // Calculate deadline date
      const deadlineDate = new Date();
      deadlineDate.setDate(deadlineDate.getDate() + Number(daysNeeded));

      // Insert job row into Supabase
      const { data: newJob, error: insertError } = await supabase
        .from("jobs")
        .insert({
          customer_id: user.id,
          title: title,
          status: "pending",
          price: calculatedPrice,
          deadline: deadlineDate.toISOString(),
          document_url: documentUrl,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      if (newJob) {
        setJobs([newJob, ...jobs]);
        setTitle("");
        setFile(null);
        setSuccessMsg("Translation job submitted successfully!");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit job.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-navy via-navy-light to-navy-dark rounded-2xl p-8 text-white mb-10 shadow-lg border border-navy-light/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Welcome Back, {profile?.full_name || user.email}
          </h1>
          <p className="text-white/80 max-w-xl">
            Track your ongoing sworn translations, upload new files for certification, and download your finished certified documents.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Active Tasks</p>
            <h3 className="text-3xl font-extrabold text-navy mt-2">{activeJobs.length}</h3>
          </div>
          <div className="p-3 bg-amber-50 rounded-lg text-gold">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Completed Jobs</p>
            <h3 className="text-3xl font-extrabold text-navy mt-2">{completedJobs.length}</h3>
          </div>
          <div className="p-3 bg-emerald-50 rounded-lg text-emerald-500">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Value</p>
            <h3 className="text-3xl font-extrabold text-navy mt-2">${totalInvestment.toFixed(2)}</h3>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg text-blue-500">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Submission Form */}
        <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm self-start">
          <h2 className="text-xl font-bold text-navy mb-4">Request Sworn Translation</h2>
          <div className="h-0.5 w-10 bg-gold mb-6"></div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-6">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleCreateJob} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                Document Description
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Birth Certificate translation (German to English)"
                className="appearance-none block w-full px-3 py-2 border border-slate-200 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold sm:text-sm text-slate-900 bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                Attach Document File (PDF, Image)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg hover:border-gold transition-colors duration-200">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-slate-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V20L28 8z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M28 8v12h12M16 32h16M16 26h16"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-slate-600 justify-center">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-gold hover:text-gold-hover focus-within:outline-none">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        className="sr-only"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setFile(e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-slate-400">PDF, PNG, JPG up to 10MB</p>
                  {file && (
                    <p className="text-xs font-semibold text-emerald-600 mt-2">
                      Selected: {file.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                Timeframe Priority
              </label>
              <select
                value={daysNeeded}
                onChange={(e) => setDaysNeeded(Number(e.target.value))}
                className="block w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold sm:text-sm bg-white"
              >
                <option value={7}>Standard Processing (7 Days)</option>
                <option value={3}>Express Translation (3 Days)</option>
                <option value={1}>Urgent Delivery (24 Hours)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-gold hover:bg-gold-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold transition-colors duration-200 disabled:bg-gold/50"
            >
              {uploading ? "Uploading & Submitting..." : "Submit Job"}
            </button>
          </form>
        </div>

        {/* Right Column: Jobs List */}
        <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm lg:col-span-2">
          <h2 className="text-xl font-bold text-navy mb-4">Your Translation Documents</h2>
          <div className="h-0.5 w-10 bg-gold mb-6"></div>

          {jobs.length === 0 ? (
            <div className="text-center py-16">
              <svg
                className="mx-auto h-12 w-12 text-slate-300 mb-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-sm font-semibold text-slate-900 mb-1">No translation jobs</h3>
              <p className="text-xs text-slate-500">Submit a document in the form on the left to start.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {jobs.map((job) => {
                const isActive = job.status !== "completed" && job.status !== "delivered";

                return (
                  <div
                    key={job.id}
                    className="border border-slate-100 rounded-xl p-5 hover:shadow-sm transition-shadow duration-200 bg-slate-50/50"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="font-bold text-navy text-base">{job.title}</h3>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider ${
                              job.status === "completed" || job.status === "delivered"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : job.status === "translating"
                                ? "bg-blue-50 text-blue-700 border border-blue-200"
                                : "bg-amber-50 text-amber-700 border border-amber-200"
                            }`}
                          >
                            {job.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mb-4">
                          Submitted on {new Date(job.created_at).toLocaleDateString()}
                        </p>

                        <div className="flex items-center gap-4 text-xs font-medium">
                          <span className="text-slate-600">
                            Price: <strong className="text-navy">${Number(job.price).toFixed(2)}</strong>
                          </span>
                          <span className="text-slate-300">|</span>
                          <span className="text-slate-600">
                            Deadline:{" "}
                            <strong className="text-navy">
                              {new Date(job.deadline).toLocaleDateString()}
                            </strong>
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between self-stretch gap-4">
                        {/* Countdown component for active items */}
                        {isActive && (
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                              Time Remaining
                            </span>
                            <CountdownTimer deadlineString={job.deadline} />
                          </div>
                        )}

                        <div className="flex gap-2.5 mt-auto flex-wrap">
                          <a
                            href={job.document_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs font-bold text-navy hover:text-gold transition-colors duration-150"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Source Doc
                          </a>

                          {job.translated_doc_url && (
                            <>
                              <span className="text-slate-200">|</span>
                              <a
                                href={job.translated_doc_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors duration-150"
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                Translated Sworn Doc
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

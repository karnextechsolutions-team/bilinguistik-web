"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { NewRequestModal } from "@/components/NewRequestModal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileText, Plus } from "lucide-react";

type Job = {
  id: string;
  title: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  price: number | null;
  deadline: string | null;
  created_at: string;
  document_url?: string;
  file_url?: string;
};

export default function DashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const supabase = createClient();

  async function fetchJobs() {
    try {
      setLoading(true);
      setError("");

      // 1. Get current authenticated user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setError("Please sign in to view your dashboard.");
        setLoading(false);
        return;
      }

      // 2. Fetch jobs for the user (handles customer_id or user_id gracefully)
      const { data, error: jobsError } = await supabase
        .from("jobs")
        .select("*")
        .or(`customer_id.eq.${user.id},user_id.eq.${user.id}`)
        .order("created_at", { ascending: false });

      if (jobsError) {
        // If `.or(...)` fails due to schema key, fallback to standard select
        console.warn("Falling back to select * on jobs:", jobsError);
        const { data: fallbackData, error: fallbackError } = await supabase
          .from("jobs")
          .select("*")
          .order("created_at", { ascending: false });

        if (fallbackError) {
          console.warn("Jobs fetch fallback notice:", fallbackError);
          setJobs([]);
        } else {
          setJobs(fallbackData || []);
        }
      } else {
        setJobs(data || []);
      }
    } catch (err: any) {
      console.warn("Error loading jobs:", err);
      // Handle empty data gracefully without throwing raw error UI
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  const getStatusBadge = (status: Job["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-[#C59B27]/15 text-[#E2B746] border border-[#C59B27]/30">Pending Quote</Badge>;
      case "in_progress":
        return <Badge variant="default" className="bg-blue-500/20 text-blue-300 border border-blue-500/30">In Progress</Badge>;
      case "completed":
        return <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatPrice = (price: number | null) => {
    if (price === null) return "Pending";
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "LKR" }).format(price);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "TBD";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 space-y-8 max-w-6xl mx-auto min-h-screen text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Client Dashboard</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Manage your document translation requests and track progress in real-time.
          </p>
        </div>
        <NewRequestModal onSuccess={fetchJobs} />
      </div>

      {/* Main Jobs Card */}
      <Card className="bg-[#0D1527] border-white/10 shadow-2xl text-white">
        <CardHeader className="border-b border-white/5 pb-4">
          <CardTitle className="text-xl text-white font-bold">My Translation Requests</CardTitle>
          <CardDescription className="text-slate-400 text-xs">
            A list of your submitted documents and current status.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="w-8 h-8 text-[#C59B27] animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-12 text-rose-400">
              <p className="text-sm">{error}</p>
            </div>
          ) : jobs.length === 0 ? (
            /* Graceful Empty State Message */
            <div className="text-center py-16 border-2 border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
              <FileText className="w-12 h-12 text-[#C59B27] mx-auto mb-3 opacity-80" />
              <h3 className="text-lg font-bold text-white mb-1.5">No translation requests yet</h3>
              <p className="text-slate-400 text-xs sm:text-sm mb-6 max-w-sm mx-auto leading-relaxed">
                Click + New Request to get started with your document translation.
              </p>
              <NewRequestModal onSuccess={fetchJobs} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-slate-400 text-xs uppercase font-bold">Document Title</TableHead>
                    <TableHead className="text-slate-400 text-xs uppercase font-bold">Status</TableHead>
                    <TableHead className="text-slate-400 text-xs uppercase font-bold text-right">Quoted Price</TableHead>
                    <TableHead className="text-slate-400 text-xs uppercase font-bold text-right">Submitted Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id} className="border-white/5 hover:bg-white/[0.03] transition-colors">
                      <TableCell className="font-semibold text-white">{job.title}</TableCell>
                      <TableCell>{getStatusBadge(job.status)}</TableCell>
                      <TableCell className="text-right text-amber-200 font-mono text-sm">
                        {formatPrice(job.price)}
                      </TableCell>
                      <TableCell className="text-right text-slate-400 text-xs">
                        {formatDate(job.created_at)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

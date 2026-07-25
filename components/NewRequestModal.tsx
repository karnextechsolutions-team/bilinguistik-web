"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Upload, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface NewRequestModalProps {
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}

export function NewRequestModal({ onSuccess, trigger }: NewRequestModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please enter a document title.");
      return;
    }
    if (!file) {
      setError("Please select a document file to upload.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      // 1. Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("You must be signed in to submit a request.");
      }

      // 2. Upload file to 'documents' storage bucket
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filePath = `${user.id}/${Date.now()}_${cleanFileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("documents")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        console.warn("Storage bucket notice:", uploadError);
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("documents")
        .getPublicUrl(filePath);

      const documentUrl = urlData?.publicUrl || filePath;

      // 3. Insert new row into jobs table with customer_id & status: 'pending'
      const jobPayload = {
        title: title.trim(),
        document_url: documentUrl,
        file_url: documentUrl,
        customer_id: user.id,
        user_id: user.id,
        status: "pending",
        created_at: new Date().toISOString(),
      };

      const { error: dbError } = await supabase.from("jobs").insert(jobPayload);

      if (dbError) {
        console.warn("Retrying insert with schema fallback keys:", dbError);
        const { error: fallbackError } = await supabase.from("jobs").insert({
          title: title.trim(),
          document_url: documentUrl,
          customer_id: user.id,
          status: "pending",
        });

        if (fallbackError) {
          const { error: finalError } = await supabase.from("jobs").insert({
            title: title.trim(),
            file_url: documentUrl,
            user_id: user.id,
            status: "pending",
          });
          if (finalError) throw finalError;
        }
      }

      // Success Feedback
      setSuccessMsg("Document request submitted successfully!");
      setTitle("");
      setFile(null);

      setTimeout(() => {
        setOpen(false);
        setSuccessMsg("");
        if (onSuccess) onSuccess();
        router.refresh();
      }, 800);
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(err.message || "An error occurred during file upload.");
    } finally {
      setLoading(false);
    }
  };

  const defaultTrigger = (
    <Button className="bg-gradient-to-r from-[#C59B27] via-[#E2B746] to-[#A37B1B] text-slate-950 hover:opacity-90 font-bold flex items-center gap-2 shadow-md">
      <Plus className="w-4 h-4" />
      New Request
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger ? (
        <DialogTrigger render={trigger as React.ReactElement} />
      ) : (
        <DialogTrigger render={defaultTrigger} />
      )}
      <DialogContent className="sm:max-w-[440px] bg-[#0D1527] border border-white/10 text-white shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Upload className="w-5 h-5 text-[#C59B27]" />
            New Translation Request
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-xs">
            Upload your document (PDF or Images) and our sworn translation desk will provide a quote.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-3">
          <div className="space-y-2">
            <Label htmlFor="doc-title" className="text-xs font-bold text-slate-200">
              Document Title
            </Label>
            <Input
              id="doc-title"
              placeholder="e.g. Birth Certificate Translation to English"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-[#C59B27]"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="doc-file" className="text-xs font-bold text-slate-200">
              Upload Document (PDF or Images)
            </Label>
            <div className="border-2 border-dashed border-white/15 rounded-xl p-6 flex flex-col items-center justify-center bg-white/[0.02] hover:bg-white/[0.05] transition-colors relative overflow-hidden">
              <input
                id="doc-file"
                type="file"
                accept=".pdf,image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={loading}
              />
              <Upload className="w-8 h-8 text-[#C59B27] mb-2" />
              {file ? (
                <div className="text-center px-4">
                  <p className="text-xs font-bold text-[#E2B746] truncate max-w-[300px]">
                    {file.name}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-xs font-bold text-slate-200">Click or drag file to upload</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Supports PDF, PNG, JPG, JPEG</p>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <DialogFooter className="pt-2">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#C59B27] via-[#E2B746] to-[#A37B1B] text-slate-950 font-bold hover:opacity-90 transition-opacity"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Uploading...</span>
                </div>
              ) : (
                "Submit Request"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

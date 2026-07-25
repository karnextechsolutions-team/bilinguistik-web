"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;
  const phone = formData.get("phone") as string;

  const supabase = await createClient();

  // Supabase Auth eken user wa hadanawa.
  // API kalin DB eke dapu Trigger eka nisa, profile table eka auto update wenawa.
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone: phone,
      },
    },
  });

  if (error) {
    // Error eka awoth eka UI ekata pass karanawa (error message eka pennanna)
    return { error: error.message };
  }

  // Okkoma hari nam kelinma dashboard ekata redirect karanawa
  redirect("/dashboard");
}
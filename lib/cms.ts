import { supabase } from "./supabaseClient";

export interface HomepageCMSContent {
  // Hero
  heroTitle: string;
  heroSubtitle: string;

  // 3-Box Feature Highlights (Trust Cards)
  trust1Title: string;
  trust1Desc: string;
  trust2Title: string;
  trust2Desc: string;
  trust3Title: string;
  trust3Desc: string;

  // Services (4 x Titles, 4 x Descriptions)
  service1Title: string;
  service1Desc: string;
  service2Title: string;
  service2Desc: string;
  service3Title: string;
  service3Desc: string;
  service4Title: string;
  service4Desc: string;

  // How It Works (4 x Step Titles, 4 x Step Descriptions)
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;

  // Why Choose Us (5 x Titles, 5 x Descriptions)
  why1Title: string;
  why1Desc: string;
  why2Title: string;
  why2Desc: string;
  why3Title: string;
  why3Desc: string;
  why4Title: string;
  why4Desc: string;
  why5Title: string;
  why5Desc: string;

  // About
  aboutText: string;

  // FAQ (6 x Questions, 6 x Answers)
  faq1Question: string;
  faq1Answer: string;
  faq2Question: string;
  faq2Answer: string;
  faq3Question: string;
  faq3Answer: string;
  faq4Question: string;
  faq4Answer: string;
  faq5Question: string;
  faq5Answer: string;
  faq6Question: string;
  faq6Answer: string;

  // Footer Section
  footerDesc: string;
  footerWhatsApp: string;
  footerEmail: string;
  footerWebsite: string;
  footerCopyright: string;
}

export const DEFAULT_HOMEPAGE_CMS: HomepageCMSContent = {
  // Hero
  heroTitle: "Sinhala ↔ English Sworn Translations",
  heroSubtitle: "Professional sworn translations of personal, educational, legal, and official documents. Accurate • Confidential • Professionally Certified.",

  // 3-Box Feature Highlights
  trust1Title: "Government Sworn Translators",
  trust1Desc: "Officially authorized translations accepted by foreign embassies, courts, and government bodies.",
  trust2Title: "Clear & Timely Communication",
  trust2Desc: "Receive your initial quote quickly and stay updated throughout the translation process.",
  trust3Title: "Absolute Confidentiality",
  trust3Desc: "Your legal, financial, and personal certificates remain completely safe and strictly protected.",

  // Services
  service1Title: "Personal & Civil Documents",
  service1Desc: "Birth, marriage, divorce, death certificates, NICs, Passports, Police clearance.",
  service2Title: "Educational Documents",
  service2Desc: "School certificates, G.C.E. O/L and A/L, Academic transcripts, Diplomas, Degrees.",
  service3Title: "Legal & Official Documents",
  service3Desc: "Affidavits, Declarations, Powers of Attorney, Court-related documents.",
  service4Title: "Business & Corporate Documents",
  service4Desc: "Agreements, Contracts, Company documents, Board resolutions.",

  // How It Works
  step1Title: "Send Your Document",
  step1Desc: "Send a clear scan or photograph via WhatsApp or email.",
  step2Title: "Receive a Quote",
  step2Desc: "We review the document and confirm the translation fee and estimated completion time.",
  step3Title: "Confirm the Translation",
  step3Desc: "Once you approve the quotation, the translation process begins.",
  step4Title: "Receive Your Translation",
  step4Desc: "Receive the completed certified translation electronically and/or arrange delivery of the hard copy.",

  // Why Choose Us
  why1Title: "Accuracy",
  why1Desc: "Careful translation of names, dates, numbers, terminology and official information.",
  why2Title: "Professional Certification",
  why2Desc: "Translations are prepared and certified by an authorized Sworn Translator, where applicable.",
  why3Title: "Confidentiality",
  why3Desc: "Your personal, legal, educational and business documents are handled with care and confidentiality.",
  why4Title: "Personal Attention",
  why4Desc: "Each document is reviewed individually according to its content and intended use.",
  why5Title: "Convenient Service",
  why5Desc: "Submit your document remotely and receive your completed translation without unnecessary travel.",

  // About
  aboutText: "Bilinguistik provides professional Sinhala ↔ English translation services. We emphasize accuracy and professional responsibility in handling your personal, educational, legal, and business documents. Every translation is managed with care to ensure the final document faithfully represents the original.",

  // FAQ
  faq1Question: "What languages do you translate?",
  faq1Answer: "We specialize exclusively in Sinhala ↔ English translations.",
  faq2Question: "Do I need a sworn translation?",
  faq2Answer: "Sworn translations are typically required for official documents submitted to government bodies, courts, embassies, and foreign universities. If you are unsure, please check with the receiving authority.",
  faq3Question: "Can I send my document online?",
  faq3Answer: "Yes, you can easily send a clear scan or photograph of your document via WhatsApp or email.",
  faq4Question: "Can I receive a soft/hard copy?",
  faq4Answer: "Yes, we provide both. You will receive an electronic soft copy, and we can arrange delivery of the hard copy to your address.",
  faq5Question: "How long does it take?",
  faq5Answer: "Turnaround times depend on the document's complexity and length. We will provide an estimated completion time along with your quote.",
  faq6Question: "Do you offer urgent translations?",
  faq6Answer: "Yes, we can accommodate urgent requests. Please mention your deadline when requesting a quote.",

  // Footer
  footerDesc: "Professional sworn translations of personal, educational, legal, and official documents. Accurate • Confidential • Professionally Certified.",
  footerWhatsApp: "+94 75 294 7862",
  footerEmail: "info@bilinguisti.lk",
  footerWebsite: "www.bilinguisti.lk",
  footerCopyright: "© 2026 Bilinguistik. All rights reserved. Sworn Translation & Language Solutions."
};

export async function fetchHomepageCMS(): Promise<HomepageCMSContent> {
  try {
    const { data, error } = await supabase
      .from("site_content")
      .select("content_data")
      .eq("id", "homepage_content")
      .maybeSingle();

    if (error) {
      console.warn("Error fetching site_content from Supabase, using defaults:", error.message);
      return DEFAULT_HOMEPAGE_CMS;
    }

    if (!data || !data.content_data) {
      return DEFAULT_HOMEPAGE_CMS;
    }

    return {
      ...DEFAULT_HOMEPAGE_CMS,
      ...data.content_data
    };
  } catch (err) {
    console.warn("Exception fetching site_content, using defaults:", err);
    return DEFAULT_HOMEPAGE_CMS;
  }
}

export async function saveHomepageCMS(contentData: HomepageCMSContent): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("site_content")
      .upsert({
        id: "homepage_content",
        content_data: contentData
      });

    if (error) {
      console.error("Error upserting site_content in Supabase:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Exception saving site_content to Supabase:", err);
    return { success: false, error: err?.message || "Unknown error occurred" };
  }
}

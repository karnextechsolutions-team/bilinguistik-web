export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  readTime: string;
  category: string;
}

export const DUMMY_BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    slug: "complete-guide-sworn-translation-sri-lanka",
    title: "Complete Guide to Official Sworn Translation in Sri Lanka",
    excerpt: "Everything you need to know about certifying birth, marriage, and academic certificates for foreign embassy submissions.",
    content: `When applying for foreign visas, higher education abroad, or immigration programs, official authorities require certified sworn translations of your documents.

### What is a Sworn Translation?
A sworn translation is a legal translation performed by an officially appointed and authorized Sworn Translator. It bears the translator's official seal, signature, and a formal certification statement attesting that the translation is a true and faithful representation of the original source document.

### Common Documents Requiring Sworn Translation
- **Civil Certificates**: Birth certificates, marriage certificates, death certificates, and police clearance certificates.
- **Educational Qualifications**: G.C.E. O/L & A/L certificates, university degree certificates, and academic transcripts.
- **Legal Documents**: Affidavits, court decrees, powers of attorney, and deeds.
- **Financial & Corporate Documents**: Bank statements, audit reports, business registration certificates, and contracts.

### Key Requirements for Acceptance
1. **Accuracy of Personal Information**: Names, dates, registration numbers, and locations must match across all supporting documents.
2. **Proper Formatting**: The structure of the translated document should mirror the original document layout to facilitate review by foreign officials.
3. **Official Seal and Signature**: The sworn translator's seal and signature are mandatory for official recognition.

At **Bilinguistik**, we ensure every sworn translation strictly meets international standards with absolute accuracy and confidentiality.`,
    coverImage: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop",
    author: "Bilinguistik Editorial Team",
    publishedAt: "September 18, 2026",
    readTime: "4 min read",
    category: "Document Guide"
  },
  {
    id: "blog-2",
    slug: "translating-educational-credentials-university-applications",
    title: "Translating Educational Credentials for Foreign University Applications",
    excerpt: "How to ensure your G.C.E. A/L, O/L, degree transcripts, and diplomas meet strict international verification standards.",
    content: `Submitting academic records to international universities is a critical step in your higher education journey. Transcripts and certificates issued in local languages must be accurately translated into English to ensure seamless credential evaluation.

### Why Academic Translation Precision Matters
Admissions boards and evaluation agencies (such as WES, ECE, or UK ENIC) require precise translation of academic terminology, grading scales, and subject titles. Even minor errors in subject translation can lead to processing delays or miscalculated equivalencies.

### Best Practices for Translating Academic Records
- **Include All Pages**: Translate front and back pages, including official stamps, marginal notes, and registrar signatures.
- **Preserve Grading Keys**: Ensure grading legends (e.g., Distinction, Credit, Pass) are translated accurately without altering the original grading scale.
- **Certified Translator Verification**: Ensure your translation is stamped and signed by an authorized Sworn Translator recognized by educational and embassy authorities.

Contact our expert team at Bilinguistik for prompt, certified academic translations tailored for university admissions.`,
    coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
    author: "Bilinguistik Academic Services",
    publishedAt: "September 10, 2026",
    readTime: "5 min read",
    category: "Education"
  },
  {
    id: "blog-3",
    slug: "legal-affidavits-corporate-translations-avoid-mistakes",
    title: "Legal Affidavits and Corporate Translations: Avoid Common Mistakes",
    excerpt: "Crucial tips for translating legal agreements, court orders, and power of attorney documents with 100% accuracy.",
    content: `Legal and corporate documents require an exceptional level of precision. A single mistranslated legal term or ambiguous clause can fundamentally alter the meaning of an agreement or delay judicial proceedings.

### Common Pitfalls in Legal Translations
1. **Literal Translation of Legal Terms**: Legal systems differ across jurisdictions. Direct word-for-word translation without understanding legal terminology can create ambiguity.
2. **Inconsistent Terminology**: Standard terms defined in contract definitions must remain consistent throughout the entire document.
3. **Omitting Footnotes and Legal Stamps**: Seal impressions, tax stamps, and official notations carry legal weight and must be fully documented in the translation.

### Why Professional Sworn Translators Are Essential
Sworn translators possess both linguistic mastery and legal vocabulary familiarity, guaranteeing that translated affidavits, power of attorney documents, and corporate contracts remain legal binding and fully compliant with embassy and court specifications.`,
    coverImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop",
    author: "Bilinguistik Legal Team",
    publishedAt: "August 28, 2026",
    readTime: "6 min read",
    category: "Legal & Business"
  }
];

const LOCAL_STORAGE_KEY = "bilinguistik_published_blogs";

export function getStoredBlogs(): BlogPost[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as BlogPost[];
  } catch (err) {
    console.error("Error reading stored blogs:", err);
    return [];
  }
}

export function getAllBlogs(): BlogPost[] {
  const stored = getStoredBlogs();
  const storedSlugs = new Set(stored.map((b) => b.slug));
  const filteredDummy = DUMMY_BLOGS.filter((b) => !storedSlugs.has(b.slug));
  return [...stored, ...filteredDummy];
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  const all = getAllBlogs();
  return all.find((b) => b.slug === slug);
}

export function addBlog(newBlog: Omit<BlogPost, "id" | "publishedAt"> & { publishedAt?: string }): BlogPost {
  const stored = getStoredBlogs();
  const post: BlogPost = {
    ...newBlog,
    id: "blog-" + Date.now(),
    publishedAt: newBlog.publishedAt || new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  };
  const updated = [post, ...stored];
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  }
  return post;
}

export function deleteBlog(id: string): void {
  if (typeof window === "undefined") return;
  const stored = getStoredBlogs();
  const updated = stored.filter((b) => b.id !== id);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
}

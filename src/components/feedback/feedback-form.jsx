"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

const copy = {
  tr: {
    type: "Geri bildirim türü", page: "İlgili sayfanın adresi", message: "Mesaj",
    correction: "Önerilen düzeltme", source: "Kaynak adresi", name: "Ad (isteğe bağlı)", email: "E-posta (isteğe bağlı)",
    consent: "Geri bildirimin otomatik yayımlanmayacağını ve incelenebileceğini anlıyorum.", submit: "Geri bildirim gönder",
    detail: "Lütfen biraz daha ayrıntı verin", consentError: "Devam etmek için onay vermelisiniz.",
    failed: "Geri bildirim şu anda gönderilemedi. Lütfen daha sonra tekrar deneyin.", thanks: "Teşekkürler. Takip kodunuz:",
    types: [["Incorrect information", "Yanlış bilgi"], ["Outdated information", "Güncelliğini yitirmiş bilgi"], ["Missing information", "Eksik bilgi"], ["Translation issue", "Çeviri sorunu"], ["Broken link", "Çalışmayan bağlantı"], ["Feature suggestion", "Özellik önerisi"], ["General feedback", "Genel geri bildirim"], ["Other", "Diğer"]],
  },
  en: {
    type: "Feedback type", page: "Related page URL", message: "Message", correction: "Suggested correction",
    source: "Source URL", name: "Name (optional)", email: "Email (optional)",
    consent: "I understand that feedback is not published automatically and may be reviewed.", submit: "Submit feedback",
    detail: "Please provide a bit more detail", consentError: "Consent is required.",
    failed: "Feedback could not be sent right now. Please try again later.", thanks: "Thank you. Your reference code is",
    types: [["Incorrect information", "Incorrect information"], ["Outdated information", "Outdated information"], ["Missing information", "Missing information"], ["Translation issue", "Translation issue"], ["Broken link", "Broken link"], ["Feature suggestion", "Feature suggestion"], ["General feedback", "General feedback"], ["Other", "Other"]],
  },
};

const fieldClass = "w-full rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-950";

export function FeedbackForm({ locale }) {
  const text = copy[locale] || copy.tr;
  const [submitted, setSubmitted] = useState(null);
  const [error, setError] = useState(null);
  const schema = z.object({
    type: z.string().min(1), pageUrl: z.string().url().optional().or(z.literal("")),
    message: z.string().min(10, text.detail), suggestedCorrection: z.string().optional(),
    sourceUrl: z.string().url().optional().or(z.literal("")), name: z.string().optional(),
    email: z.string().email().optional().or(z.literal("")), language: z.string().min(1),
    consent: z.boolean().refine(Boolean, text.consentError), website: z.string().optional(),
  });
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema), defaultValues: { language: locale, consent: false, type: "Incorrect information" },
  });

  const onSubmit = async (values) => {
    setError(null);
    if (values.website) return;
    try {
      const response = await fetch("/api/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const result = await response.json();
      if (!response.ok) return setError(text.failed);
      setSubmitted(result.referenceCode);
    } catch {
      setError(text.failed);
    }
  };

  return <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <div className="hidden" aria-hidden="true"><label htmlFor="website">Leave this empty</label><input id="website" tabIndex={-1} autoComplete="off" {...register("website")} /></div>
    <div className="grid gap-4 md:grid-cols-2">
      <label className="space-y-2 text-sm"><span>{text.type}</span><select {...register("type")} className={fieldClass}>{text.types.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
      <label className="space-y-2 text-sm"><span>{text.page}</span><input {...register("pageUrl")} className={fieldClass} />{errors.pageUrl && <p className="text-sm text-red-500">{errors.pageUrl.message}</p>}</label>
    </div>
    <label className="block space-y-2 text-sm"><span>{text.message}</span><textarea {...register("message")} rows={5} className={fieldClass} />{errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}</label>
    <label className="block space-y-2 text-sm"><span>{text.correction}</span><textarea {...register("suggestedCorrection")} rows={3} className={fieldClass} /></label>
    <label className="block space-y-2 text-sm"><span>{text.source}</span><input {...register("sourceUrl")} className={fieldClass} /></label>
    <div className="grid gap-4 md:grid-cols-2">
      <label className="space-y-2 text-sm"><span>{text.name}</span><input {...register("name")} className={fieldClass} /></label>
      <label className="space-y-2 text-sm"><span>{text.email}</span><input {...register("email")} className={fieldClass} /></label>
    </div>
    <input type="hidden" {...register("language")} />
    <label className="flex items-start gap-3 text-sm"><input type="checkbox" {...register("consent")} className="mt-1" /><span>{text.consent}</span></label>
    {errors.consent && <p className="text-sm text-red-500">{errors.consent.message}</p>}
    {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
    {submitted && <p className="text-sm text-emerald-600">{text.thanks} {submitted}</p>}
    <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white disabled:opacity-70 dark:bg-slate-100 dark:text-slate-900">{isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}{text.submit}</button>
  </form>;
}

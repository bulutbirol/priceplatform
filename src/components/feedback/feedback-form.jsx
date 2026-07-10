"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
const feedbackSchema = z.object({
    type: z.string().min(1),
    pageUrl: z.string().url().optional().or(z.literal("")),
    message: z.string().min(10, "Please provide a bit more detail"),
    suggestedCorrection: z.string().optional(),
    sourceUrl: z.string().url().optional().or(z.literal("")),
    name: z.string().optional(),
    email: z.string().email().optional().or(z.literal("")),
    language: z.string().min(1),
    consent: z.boolean().refine((value) => value, "Consent is required"),
    website: z.string().optional(),
});
export function FeedbackForm({ locale }) {
    const [submitted, setSubmitted] = useState(null);
    const [error, setError] = useState(null);
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm({ resolver: zodResolver(feedbackSchema), defaultValues: { language: locale, consent: false } });
    const onSubmit = async (values) => {
        setError(null);
        if (values.website) {
            return;
        }
        const response = await fetch("/api/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });
        const result = await response.json();
        if (!response.ok) {
            setError(result.error ?? "Unable to submit feedback right now.");
            return;
        }
        setSubmitted(result.referenceCode);
    };
    return (<form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")}/>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span>Feedback type</span>
          <select {...register("type")} className="w-full rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-950">
            <option value="Incorrect information">Incorrect information</option>
            <option value="Outdated information">Outdated information</option>
            <option value="Missing information">Missing information</option>
            <option value="Translation issue">Translation issue</option>
            <option value="Broken link">Broken link</option>
            <option value="Feature suggestion">Feature suggestion</option>
            <option value="General feedback">General feedback</option>
            <option value="Other">Other</option>
          </select>
          {errors.type ? <p className="text-sm text-red-500">{errors.type.message}</p> : null}
        </label>
        <label className="space-y-2 text-sm">
          <span>Related page URL</span>
          <input {...register("pageUrl")} className="w-full rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-950"/>
          {errors.pageUrl ? <p className="text-sm text-red-500">{errors.pageUrl.message}</p> : null}
        </label>
      </div>
      <label className="block space-y-2 text-sm">
        <span>Message</span>
        <textarea {...register("message")} rows={5} className="w-full rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-950"/>
        {errors.message ? <p className="text-sm text-red-500">{errors.message.message}</p> : null}
      </label>
      <label className="block space-y-2 text-sm">
        <span>Suggested correction</span>
        <textarea {...register("suggestedCorrection")} rows={3} className="w-full rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-950"/>
      </label>
      <label className="block space-y-2 text-sm">
        <span>Source URL</span>
        <input {...register("sourceUrl")} className="w-full rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-950"/>
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span>Name (optional)</span>
          <input {...register("name")} className="w-full rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-950"/>
        </label>
        <label className="space-y-2 text-sm">
          <span>Email (optional)</span>
          <input {...register("email")} className="w-full rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-950"/>
        </label>
      </div>
      <input type="hidden" {...register("language")}/>
      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" {...register("consent")} className="mt-1"/>
        <span>I understand that feedback is not published automatically and may be reviewed.</span>
      </label>
      {errors.consent ? <p className="text-sm text-red-500">{errors.consent.message}</p> : null}
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
      {submitted ? <p className="text-sm text-emerald-600">Thank you. Your reference code is {submitted}</p> : null}
      <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white disabled:opacity-70 dark:bg-slate-100 dark:text-slate-900">
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin"/> : null}
        Submit feedback
      </button>
    </form>);
}

"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50/50 transition-colors">
        <span className="font-semibold text-foreground pr-4">{q}</span>
        <svg className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">{a}</div>}
    </div>
  );
}

export default function FAQ() {
  const { t } = useLanguage();

  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-1.5 mb-4">
            <span className="text-sm font-medium text-accent">{t.faq.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{t.faq.title}</h2>
          <p className="mt-4 text-lg text-gray-600">{t.faq.subtitle}</p>
        </div>
        <div className="space-y-3">
          {t.faq.items.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

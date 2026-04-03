"use client";

import { useLanguage } from "@/i18n/LanguageContext";

const icons = [
  <svg key="0" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>,
  <svg key="1" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>,
  <svg key="2" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
  <svg key="3" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>,
];

const colors = ["primary", "accent", "success", "warning"];
const colorMap: Record<string, { bg: string; text: string; tag: string }> = {
  primary: { bg: "bg-primary/10", text: "text-primary", tag: "bg-primary/10 text-primary" },
  accent: { bg: "bg-accent/10", text: "text-accent", tag: "bg-accent/10 text-accent" },
  success: { bg: "bg-success/10", text: "text-success", tag: "bg-success/10 text-success" },
  warning: { bg: "bg-warning/10", text: "text-warning", tag: "bg-warning/10 text-warning" },
};

export default function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20 lg:py-28 bg-section-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
            <span className="text-sm font-medium text-primary">{t.services.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{t.services.title}</h2>
          <p className="mt-4 text-lg text-gray-600">{t.services.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.services.items.map((s, i) => {
            const c = colorMap[colors[i]];
            return (
              <div key={i} className="group bg-white rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
                <div className={`w-14 h-14 rounded-xl ${c.bg} ${c.text} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  {icons[i]}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.highlights.map((h) => (
                    <span key={h} className={`text-xs font-medium px-2.5 py-1 rounded-full ${c.tag}`}>{h}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useLanguage } from "@/i18n/LanguageContext";

export default function Doctors() {
  const { t } = useLanguage();

  return (
    <section id="doctors" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-1.5 mb-4">
            <span className="text-sm font-medium text-accent">{t.doctors.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{t.doctors.title}</h2>
          <p className="mt-4 text-lg text-gray-600">{t.doctors.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.doctors.items.map((doc, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 group text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <svg className="w-10 h-10 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <h3 className="font-bold text-foreground">{doc.name}</h3>
              <p className="text-sm text-primary font-medium mt-1">{doc.title}</p>
              <p className="text-xs text-gray-500 mt-1">{doc.exp}</p>
              <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                {doc.langs.map((lang) => (
                  <span key={lang} className="text-[10px] font-medium bg-accent/10 text-accent px-2 py-0.5 rounded-full">{lang}</span>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                {doc.specialties.map((s) => (
                  <span key={s} className="text-[10px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full">{s}</span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-success">
                <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse-soft" />
                {t.doctors.available}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n";

const languages: { code: Lang; label: string }[] = [
  { code: "zh", label: "中文" },
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const navItems = [
    { label: t.nav.home, href: "#hero" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.howItWorks, href: "#how-it-works" },
    { label: t.nav.departments, href: "#departments" },
    { label: t.nav.doctors, href: "#doctors" },
    { label: t.nav.pricing, href: "#pricing" },
    { label: t.nav.faq, href: "#faq" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold gradient-text">Japan Doctor</span>
              <span className="hidden sm:block text-xs text-gray-500">{t.nav.subtitle}</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary rounded-lg hover:bg-primary-light transition-colors">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
              className="hidden sm:block text-sm border border-border rounded-lg px-2 py-1.5 bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>

            <a href="#booking" className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              {t.nav.bookNow}
            </a>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Toggle menu">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="lg:hidden pb-4 border-t border-border pt-4">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary-light rounded-lg transition-colors">
                {item.label}
              </a>
            ))}
            <div className="mt-4 px-4 flex items-center gap-3">
              <select value={lang} onChange={(e) => setLang(e.target.value as Lang)} className="text-sm border border-border rounded-lg px-2 py-1.5 bg-white">
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>{l.label}</option>
                ))}
              </select>
              <a href="#booking" className="flex-1 text-center bg-gradient-to-r from-primary to-accent text-white px-5 py-2.5 rounded-full text-sm font-semibold">
                {t.nav.bookNow}
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

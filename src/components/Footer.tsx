"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

const serviceHrefs = ["#services", "#services", "#departments", "#pricing"];
const supportHrefs = ["#faq", "#how-it-works", "#booking", "#"];
const legalHrefs = ["#", "#", "#", "#"];

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;

  const sections = [
    { title: f.services, links: f.serviceLinks, hrefs: serviceHrefs },
    { title: f.support, links: f.supportLinks, hrefs: supportHrefs },
    { title: f.legal, links: f.legalLinks, hrefs: legalHrefs },
  ];

  return (
    <footer className="bg-[#0f172a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                </svg>
              </div>
              <span className="text-xl font-bold">Japan Doctor</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-sm">{f.desc}</p>
            <div className="mt-6 flex items-center gap-3 text-sm text-gray-400">
              <span>🇯🇵</span>
              <span>{f.certified}</span>
            </div>
          </div>

          {sections.map((sec) => (
            <div key={sec.title}>
              <h4 className="font-semibold text-sm mb-4">{sec.title}</h4>
              <ul className="space-y-2.5">
                {sec.links.map((label, i) => (
                  <li key={i}>
                    <a href={sec.hrefs[i]} className="text-sm text-gray-400 hover:text-white transition-colors">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Japan Doctor Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>{f.location}</span>
            <span>|</span>
            <span>{f.langSwitch}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

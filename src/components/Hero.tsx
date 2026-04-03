"use client";

import { useLanguage } from "@/i18n/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-white to-accent-light" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/80 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse-soft" />
              <span className="text-sm font-medium text-primary">{h.badge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              <span className="text-foreground">{h.titleLine1}</span>
              <br />
              <span className="gradient-text">{h.titleLine2}</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg">
              {h.desc}
              <strong className="text-foreground">{h.descBold1}</strong>
              {h.descMid}
              <strong className="text-foreground">{h.descBold2}</strong>
              {h.descEnd}
            </p>

            <div className="mt-8 flex flex-wrap gap-8">
              <div>
                <div className="text-3xl font-bold text-primary">{h.stat1}</div>
                <div className="text-sm text-gray-500">{h.stat1Label}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">{h.stat2}</div>
                <div className="text-sm text-gray-500">{h.stat2Label}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">{h.stat3}</div>
                <div className="text-sm text-gray-500">{h.stat3Label}</div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#booking" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-1">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                {h.ctaPrimary}
              </a>
              <a href="#how-it-works" className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full text-lg font-semibold border-2 border-primary/20 hover:border-primary/40 hover:bg-primary-light transition-all duration-300">
                {h.ctaSecondary}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                </svg>
              </a>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-[3rem] transform rotate-3" />
              <div className="relative bg-white rounded-[2.5rem] shadow-2xl shadow-primary/10 p-8 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{h.mockDoctorName}</div>
                      <div className="text-xs text-success flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-success rounded-full" />
                        {h.mockOnline}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/60 rounded-xl p-4 text-sm text-gray-600">
                    <p>&ldquo;{h.mockMessage}&rdquo;</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-50 rounded-full px-4 py-3 text-sm text-gray-400">{h.mockInput}</div>
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                  </div>
                </div>
                <div className="mt-6 flex justify-around">
                  {h.mockNav.map((label) => (
                    <div key={label} className="text-center">
                      <div className="w-8 h-8 mx-auto bg-primary/10 rounded-lg mb-1" />
                      <span className="text-[10px] text-gray-500">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useLanguage } from "@/i18n/LanguageContext";

export default function Pricing() {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-section-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
            <span className="text-sm font-medium text-primary">{t.pricing.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{t.pricing.title}</h2>
          <p className="mt-4 text-lg text-gray-600">{t.pricing.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {t.pricing.plans.map((plan, i) => {
            const highlight = i === 1;
            return (
              <div
                key={i}
                className={`relative rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 ${
                  highlight
                    ? "bg-gradient-to-b from-primary to-primary-dark text-white border-primary shadow-xl shadow-primary/20 scale-105"
                    : "bg-white border-border hover:border-primary/30 hover:shadow-lg"
                }`}
              >
                {highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold px-4 py-1 rounded-full">{t.pricing.popular}</div>
                )}
                <h3 className={`text-lg font-bold ${highlight ? "text-white" : "text-foreground"}`}>{plan.name}</h3>
                <div className="mt-4">
                  <span className={`text-4xl font-bold ${highlight ? "text-white" : "text-foreground"}`}>{plan.price}</span>
                  <span className={`text-sm ml-2 ${highlight ? "text-white/70" : "text-gray-500"}`}>{plan.priceNote}</span>
                </div>
                <p className={`mt-2 text-sm ${highlight ? "text-white/80" : "text-gray-600"}`}>{plan.desc}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <svg className={`w-5 h-5 shrink-0 mt-0.5 ${highlight ? "text-accent" : "text-success"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <span className={highlight ? "text-white/90" : "text-gray-600"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#booking" className={`mt-8 block text-center py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                  highlight ? "bg-white text-primary hover:shadow-lg" : "bg-primary text-white hover:bg-primary-dark hover:shadow-lg"
                }`}>{plan.cta}</a>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-4">{t.pricing.paymentMethods}</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-600">
            {["VISA", "Mastercard", "JCB", "AMEX", "WeChat Pay", "Alipay", "Apple Pay"].map((m) => (
              <span key={m} className="bg-white px-4 py-2 rounded-lg border border-border">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

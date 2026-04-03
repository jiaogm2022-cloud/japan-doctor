"use client";

import { useLanguage } from "@/i18n/LanguageContext";

const deptIcons = ["🩺", "🧴", "👂", "👶", "🌸", "✨"];

export default function Departments() {
  const { t } = useLanguage();

  return (
    <section id="departments" className="py-20 lg:py-28 bg-section-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
            <span className="text-sm font-medium text-primary">{t.departments.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{t.departments.title}</h2>
          <p className="mt-4 text-lg text-gray-600">{t.departments.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.departments.items.map((dept, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{deptIcons[i]}</span>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{dept.name}</h3>
                  <p className="text-xs text-gray-400">{dept.nameEn}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {dept.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-50 text-gray-600 px-3 py-1.5 rounded-full group-hover:bg-primary-light group-hover:text-primary transition-colors">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-8 text-sm text-gray-500">{t.departments.note}</p>
      </div>
    </section>
  );
}

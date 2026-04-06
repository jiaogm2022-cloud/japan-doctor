import { SITE_URL } from "@/lib/constants";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ── MedicalBusiness + Organization ── */
const medicalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Japan Doctor",
  alternateName: "ジャパンドクター",
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  description:
    "Japan Doctor 为全球用户提供多语言远程医疗服务。在线视频问诊日本持证医生、处方药物国际配送，支持中文、英语、日语。24/7全天候服务。",
  telephone: "+65-8942-7926",
  email: "jiaogm2022@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tokyo",
    addressCountry: "JP",
  },
  areaServed: [
    { "@type": "Country", name: "Japan" },
    { "@type": "Country", name: "China" },
    { "@type": "Country", name: "Singapore" },
    { "@type": "Country", name: "Malaysia" },
    { "@type": "Country", name: "Thailand" },
    { "@type": "Country", name: "Vietnam" },
    { "@type": "Country", name: "South Korea" },
  ],
  availableLanguage: [
    { "@type": "Language", name: "Chinese", alternateName: "zh" },
    { "@type": "Language", name: "English", alternateName: "en" },
    { "@type": "Language", name: "Japanese", alternateName: "ja" },
    { "@type": "Language", name: "Korean", alternateName: "ko" },
    { "@type": "Language", name: "Vietnamese", alternateName: "vi" },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  priceRange: "¥5,500 - ¥33,000",
  currenciesAccepted: "JPY",
  paymentAccepted: "Credit Card, WeChat Pay, Alipay, Apple Pay",
  medicalSpecialty: [
    "Internal Medicine",
    "Dermatology",
    "Otolaryngology",
    "Pediatrics",
    "Gynecology",
    "Aesthetic Medicine",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Telemedicine Services",
    itemListElement: [
      {
        "@type": "Offer",
        name: "基础问诊 / Basic Consultation",
        price: "5500",
        priceCurrency: "JPY",
        description:
          "15分钟视频问诊，中/英/日三语服务，电子处方开具",
      },
      {
        "@type": "Offer",
        name: "标准诊疗 / Standard Care",
        price: "11000",
        priceCurrency: "JPY",
        description:
          "30分钟视频问诊+处方药物配送（日本/中国/东南亚），英文诊断证明",
      },
      {
        "@type": "Offer",
        name: "尊享套餐 / Premium Care",
        price: "33000",
        priceCurrency: "JPY",
        description:
          "不限时长视频问诊，专属医疗管家，国际急速配送，保险理赔协助，24/7专线",
      },
    ],
  },
};

/* ── FAQPage Schema ── */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "没有日本健康保险也能看诊吗？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "可以。Japan Doctor 提供自费诊疗服务，无需日本健康保险。定价已包含所有诊疗费用，透明清晰。持有海外旅行保险可提供英文诊断证明用于理赔。",
      },
    },
    {
      "@type": "Question",
      name: "医生会说中文吗？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "我们的医疗团队支持中文、英文、日文三语服务。部分医生本身就会中文，部分则配备专业医疗翻译。",
      },
    },
    {
      "@type": "Question",
      name: "药物可以配送到日本以外的地方吗？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "可以。提供国际配送服务：中国大陆通过EMS/DHL约7-10个工作日；东南亚约10-14个工作日。日本境内东京23区当日达，全国2-3个工作日。",
      },
    },
    {
      "@type": "Question",
      name: "可以开处方药吗？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "可以。医生持有日本厚生劳动省颁发的医师执照，有权开具处方药。某些管控类药物（如麻醉类）无法通过远程诊疗开具，需要面诊。",
      },
    },
    {
      "@type": "Question",
      name: "Can I see a doctor without Japanese health insurance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Japan Doctor provides self-pay medical services. No Japanese health insurance is required. We can provide English medical certificates for travel insurance claims.",
      },
    },
    {
      "@type": "Question",
      name: "What payment methods are accepted?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We accept VISA, Mastercard, JCB, AMEX credit/debit cards, as well as WeChat Pay, Alipay, and Apple Pay.",
      },
    },
    {
      "@type": "Question",
      name: "問診の隐私安全如何保障？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "所有视频问诊均采用端到端加密，诊疗记录严格按照日本《个人情报保护法》和医疗信息安全相关法规管理。",
      },
    },
    {
      "@type": "Question",
      name: "诊断证明可以用于旅行保险理赔吗？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "可以。提供英文版诊断证明和收据，符合大多数国际旅行保险的理赔要求。",
      },
    },
  ],
};

/* ── WebSite schema (for sitelinks search box) ── */
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Japan Doctor",
  alternateName: "日本远程医疗",
  url: SITE_URL,
  inLanguage: ["zh-CN", "en", "ja", "ko", "vi"],
};

/* ── BreadcrumbList ── */
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "首页",
      item: SITE_URL,
    },
  ],
};

export default function StructuredData() {
  return (
    <>
      <JsonLd data={medicalBusinessSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={breadcrumbSchema} />
    </>
  );
}

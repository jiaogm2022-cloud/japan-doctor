import type { Translations } from "./zh";

const en: Translations = {
  // Header
  nav: {
    home: "Home",
    services: "Services",
    howItWorks: "How It Works",
    departments: "Departments",
    doctors: "Our Doctors",
    pricing: "Pricing",
    faq: "FAQ",
    bookNow: "Book Now",
    subtitle: "Japan Medicine · Global Service",
  },

  // Hero
  hero: {
    badge: "24/7 Online · Multilingual · Worldwide",
    titleLine1: "Japanese Doctors,",
    titleLine2: "Available Worldwide",
    desc: "From China, Southeast Asia, or anywhere in the world — complete your ",
    descBold1: "video consultation",
    descMid: " on your phone, with prescriptions ",
    descBold2: "delivered internationally",
    descEnd: ". Covering internal medicine, dermatology, ENT, and more.",
    stat1: "3 min",
    stat1Label: "Avg. wait time",
    stat2: "24/7",
    stat2Label: "Always available",
    stat3: "3",
    stat3Label: "Languages",
    ctaPrimary: "Start Video Consultation",
    ctaSecondary: "Learn More",
    mockDoctorName: "Dr. Tanaka",
    mockOnline: "Online",
    mockMessage: "Hello, please describe your symptoms and I will diagnose and prescribe for you.",
    mockInput: "Describe your symptoms...",
    mockNav: ["Video", "Chat", "Rx", "Delivery"],
  },

  // Services
  services: {
    badge: "Core Services",
    title: "Online Consultation + Global Medicine Delivery",
    subtitle: "From consultation to medication — all on your phone. Whether you're in Japan, China, Southeast Asia, or anywhere in the world.",
    items: [
      {
        title: "Video Consultation",
        desc: "Face-to-face video calls with licensed Japanese doctors. Available in Chinese, English, and Japanese. No appointment needed — see a doctor in as fast as 3 minutes. Available globally.",
        highlights: ["Multilingual", "No appointment", "Available Worldwide"],
      },
      {
        title: "International Medicine Delivery",
        desc: "Prescribed medications shipped directly to your door. Japan domestic: same-day in Tokyo's 23 wards, 2-3 days nationwide. Mainland China: 7-10 business days. Southeast Asia & other regions: 10-14 business days.",
        highlights: ["Japan same-day", "China 7-10 days", "SE Asia covered"],
      },
      {
        title: "24/7 Availability",
        desc: "365 days a year, 24 hours a day. Wherever your timezone, late-night fever, weekend illness, or holiday emergencies — a doctor is always available.",
        highlights: ["365 days", "Any timezone", "Holidays OK"],
      },
      {
        title: "English Medical Certificate",
        desc: "We provide English-language diagnosis certificates and receipts for travel and international health insurance claims worldwide.",
        highlights: ["English cert", "Global insurance", "Official receipt"],
      },
    ],
  },

  // How It Works
  howItWorks: {
    badge: "How It Works",
    title: "6 Steps to Online Healthcare",
    subtitle: "All on your phone — from registration to medication in as fast as 30 minutes",
    steps: [
      { title: "Register Online", desc: "Fill in basic info and upload your passport or residence card photo. Takes just 1 minute." },
      { title: "Choose Department", desc: "Select the medical department you need, describe your symptoms, and enter the queue." },
      { title: "Video Consultation", desc: "Connect with a licensed doctor via video call. Chinese/English/Japanese available. Average wait ~3 minutes." },
      { title: "Prescription", desc: "The doctor issues an electronic prescription based on the diagnosis. You can confirm medication details online." },
      { title: "Online Payment", desc: "Supports VISA, Mastercard, JCB, AMEX, WeChat Pay, and Alipay." },
      { title: "Medicine Delivery", desc: "Our partner pharmacy ships prescription medications to your address worldwide. Japan (Tokyo 23 wards): same-day. Mainland China: 7-10 business days. Southeast Asia & other regions: 10-14 business days." },
    ],
  },

  // Departments
  departments: {
    badge: "Departments",
    title: "Comprehensive Medical Coverage",
    subtitle: "Online consultations with licensed Japanese doctors covering common illnesses and specialist needs",
    note: "* If your symptoms are not listed above, you can still book a consultation. The doctor will provide advice or referral guidance based on your condition.",
    items: [
      { name: "Internal Medicine", nameEn: "Internal Medicine", tags: ["Cold & Fever", "Headache", "Stomach pain", "Allergies", "Hypertension", "Diabetes", "Thyroid disorders", "Anemia", "Gout", "Oncology Consultation", "Cancer Second Opinion"] },
      { name: "Dermatology", nameEn: "Dermatology", tags: ["Eczema", "Hives", "Acne", "Skin allergy", "Sunburn", "Insect bites", "Psoriasis", "Seborrheic dermatitis", "Fungal infection", "Herpes / Shingles"] },
      { name: "ENT", nameEn: "Ear, Nose & Throat", tags: ["Rhinitis", "Sore throat", "Otitis media", "Hay fever", "Hearing issues", "Sinusitis", "Tonsillitis", "Hoarseness", "Vertigo & Tinnitus", "Mouth ulcers"] },
      { name: "Pediatrics", nameEn: "Pediatrics", tags: ["Fever", "Cough", "Diarrhea", "Rash", "Food allergy", "Cold", "Growth & Development", "Vaccination advice", "Newborn care", "Childhood asthma"] },
      { name: "Gynecology", nameEn: "Gynecology", tags: ["Irregular periods", "Emergency contraception", "Infections", "Pregnancy advice", "Menopause", "HPV consultation", "Uterine fibroids", "Ovarian cysts", "Breast health", "Fertility consultation"] },
      { name: "Aesthetic Dermatology", nameEn: "Aesthetic Dermatology", tags: ["Skin brightening", "Anti-aging", "Hair loss (AGA)", "Weight management", "Vitamin Rx", "Cosmetic injection advice", "Enlarged pores", "Hyperpigmentation", "Scar treatment", "Stretch marks"] },
    ],
  },

  // Doctors
  doctors: {
    badge: "Our Doctors",
    title: "Licensed Japanese Physicians",
    subtitle: "All doctors hold medical licenses issued by Japan's Ministry of Health, Labour and Welfare. Multilingual communication guaranteed.",
    available: "Available Now",
    items: [
      { name: "Kenta Tanaka", title: "Chief Physician, Internal Medicine", exp: "15 years of experience", langs: ["日本語", "English"], specialties: ["Internal Medicine", "Gastroenterology", "Allergy"] },
      { name: "Misaki Yamada", title: "Dermatology Specialist", exp: "12 years of experience", langs: ["日本語", "中文"], specialties: ["Dermatology", "Aesthetic Derm", "Atopic Dermatitis"] },
      { name: "Minghua Li", title: "General Practitioner", exp: "10 years of experience", langs: ["中文", "日本語", "English"], specialties: ["Internal Medicine", "Pediatrics", "ENT"] },
      { name: "Yuki Sato", title: "OB/GYN Specialist", exp: "13 years of experience", langs: ["日本語", "English"], specialties: ["Gynecology", "Prenatal Care", "Menopause"] },
    ],
  },

  // Pricing
  pricing: {
    badge: "Pricing",
    title: "Transparent Pricing, No Hidden Fees",
    subtitle: "All prices include tax. Accepts VISA / Mastercard / JCB / AMEX / WeChat Pay / Alipay",
    popular: "Most Popular",
    paymentMethods: "Accepted Payment Methods",
    plans: [
      {
        name: "Basic Consultation",
        price: "¥5,500",
        priceNote: "~$37 USD",
        desc: "For mild symptoms, follow-ups, and health advice",
        cta: "Book Now",
        features: ["Video consultation (up to 15 min)", "Chinese/English/Japanese", "E-prescription", "Basic symptom diagnosis", "Medication guidance"],
      },
      {
        name: "Standard Care",
        price: "¥11,000",
        priceNote: "~$73 USD",
        desc: "Consultation + medicine delivery — most popular",
        cta: "Book Now",
        features: ["Video consultation (up to 30 min)", "Chinese/English/Japanese", "E-prescription", "International medicine delivery (Japan / China / SE Asia)", "English medical certificate", "Free follow-up within 3 days"],
      },
      {
        name: "Premium Package",
        price: "¥33,000",
        priceNote: "~$220 USD",
        desc: "Full concierge medical service",
        cta: "Book Premium",
        features: ["Unlimited video consultation", "Dedicated medical concierge", "Priority international express delivery", "English cert + insurance claim assist", "Unlimited follow-ups for 7 days", "Hospital referral arrangement", "24/7 dedicated hotline"],
      },
    ],
  },

  // FAQ
  faq: {
    badge: "FAQ",
    title: "FAQ",
    subtitle: "Common questions about online consultations and medicine delivery",
    items: [
      { q: "Can I see a doctor without Japanese health insurance?", a: "Yes. Japan Doctor provides self-pay medical services — no Japanese health insurance required. Our pricing is all-inclusive and transparent. If you have overseas travel insurance, we can provide English medical certificates for claims." },
      { q: "Do the doctors speak Chinese?", a: "Our medical team supports Chinese, English, and Japanese. Some doctors speak Chinese natively, while others are assisted by professional medical interpreters. You can select your language preference when booking." },
      { q: "Can medicine be delivered outside Japan?", a: "Yes. We offer international shipping: Mainland China via EMS/DHL takes approximately 7-10 business days; Southeast Asia (Singapore, Malaysia, Thailand, etc.) 10-14 business days; other regions — please contact us. Within Japan, Tokyo's 23 wards offer same-day delivery (before 4:45 PM), and nationwide delivery takes 2-3 business days. Express options are available for an extra fee. Some controlled substances may be subject to customs restrictions at the destination — your doctor will advise you in advance." },
      { q: "Can you prescribe medications?", a: "Yes. Our doctors hold medical licenses issued by Japan's Ministry of Health, Labour and Welfare, and are authorized to issue prescriptions. However, certain controlled substances (e.g., narcotics) cannot be prescribed via telemedicine and require an in-person visit." },
      { q: "What if I need further examination or hospitalization?", a: "If the doctor determines you need in-person examination or hospitalization, our Premium Package includes hospital referral arrangements. We will book an appropriate hospital and assist with communication. Basic and Standard users can also purchase referral services separately." },
      { q: "How is my medical privacy protected?", a: "All video consultations use end-to-end encryption. Medical records are managed strictly in accordance with Japan's Act on the Protection of Personal Information and medical data security regulations. No medical information will be disclosed to third parties without your consent." },
      { q: "What payment methods are accepted?", a: "We accept VISA, Mastercard, JCB, and AMEX credit/debit cards, as well as WeChat Pay, Alipay, and Apple Pay. UnionPay and cash payments are currently not supported." },
      { q: "Can the medical certificate be used for travel insurance claims?", a: "Yes. We provide English-language medical certificates and receipts that meet most international travel insurance claim requirements. We recommend confirming your insurance company's specific requirements before your consultation." },
    ],
  },

  // Booking
  booking: {
    title: "Start Your Online Consultation",
    subtitle: "Whether you're in Japan, China, Southeast Asia, or anywhere in the world, Japan Doctor connects you with licensed Japanese doctors. Book now — connect with a doctor in as fast as 3 minutes.",
    phone: "Phone",
    email: "Email",
    lineWechat: "LINE / WeChat",
    whatsapp: "WhatsApp",
    line: "LINE",
    wechat: "WeChat",
    formTitle: "Book a Consultation",
    nameLabel: "Name *",
    namePlaceholder: "Enter your name",
    phoneLabel: "Phone *",
    phonePlaceholder: "+81 / +86 / +65 / ...",
    emailLabel: "Email",
    emailPlaceholder: "your@email.com",
    langLabel: "Language Preference *",
    deptLabel: "Department *",
    deptPlaceholder: "Select department",
    deptOptions: ["Internal Medicine", "Dermatology", "ENT", "Pediatrics", "Gynecology", "Aesthetic Dermatology"],
    symptomsLabel: "Symptoms",
    symptomsPlaceholder: "Briefly describe your symptoms...",
    submit: "Submit · See a doctor in 3 min",
    agreement: "By submitting, you agree to our ",
    terms: "Terms of Service",
    and: " and ",
    privacy: "Privacy Policy",
  },

  // Footer
  footer: {
    desc: "Japan Doctor provides convenient, professional Japanese telemedicine services to users worldwide. Multilingual doctors, 24/7 availability, prescription medicine delivered to China, Southeast Asia, and beyond.",
    certified: "Telemedicine facility certified by Japan's MHLW",
    services: "Services",
    support: "Support",
    legal: "Legal",
    serviceLinks: ["Online Consultation", "Medicine Delivery", "Departments", "Pricing"],
    supportLinks: ["FAQ", "How It Works", "Contact Us", "Insurance Claim Guide"],
    legalLinks: ["Terms of Service", "Privacy Policy", "SCTA Disclosure", "Medical Advertising"],
    location: "Tokyo, Japan",
    langSwitch: "中文 / English / 日本語",
  },
} as const;

export default en;

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

const AUTH_KEY = "jd_admin_auth";
const BOOKINGS_KEY = "jd_bookings";
const NOTES_KEY = "jd_notes";
const SEEN_KEY = "jd_seen";

type Booking = {
  id: string;
  name: string;
  phone: string;
  email: string;
  lang: string;
  dept: string;
  symptoms: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
};

const STATUS_LABELS: Record<Booking["status"], string> = {
  pending: "待处理",
  confirmed: "已确认",
  completed: "已完成",
  cancelled: "已取消",
};

const STATUS_COLORS: Record<Booking["status"], string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-gray-100 text-gray-500",
};

const DEPT_LABELS: Record<string, string> = {
  internal: "内科",
  dermatology: "皮肤科",
  ent: "耳鼻喉科",
  pediatrics: "儿科",
  gynecology: "妇科",
  aesthetic: "医美",
};

const LANG_LABELS: Record<string, string> = {
  zh: "中文",
  en: "English",
  ja: "日本語",
  ko: "한국어",
  vi: "Tiếng Việt",
};

const DEMO_BOOKINGS: Booking[] = [
  {
    id: "demo-1",
    name: "张小明",
    phone: "+86 138 0000 1234",
    email: "zhang@example.com",
    lang: "zh",
    dept: "internal",
    symptoms: "发烧、咳嗽两天，体温 38.2°C",
    status: "pending",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-2",
    name: "Li Wei",
    phone: "+65 9123 4567",
    email: "liwei@example.com",
    lang: "en",
    dept: "dermatology",
    symptoms: "Skin rash on arm for 3 days",
    status: "confirmed",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-3",
    name: "田中 花子",
    phone: "+81 90-1234-5678",
    email: "tanaka@example.com",
    lang: "ja",
    dept: "gynecology",
    symptoms: "定期検診を希望",
    status: "completed",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-4",
    name: "陈美丽",
    phone: "+65 8765 4321",
    email: "chen@example.com",
    lang: "zh",
    dept: "pediatrics",
    symptoms: "小孩 5 岁，腹泻三天，精神不振",
    status: "pending",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
];

type Tab = "overview" | "bookings";

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatTimeAgo(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
  if (diff < 60) return "刚刚";
  if (diff < 3600) return `${Math.floor(diff / 60)} 分钟前`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} 小时前`;
  return `${Math.floor(diff / 86400)} 天前`;
}

function q(s: string) {
  return `"${String(s ?? "").replace(/"/g, '""')}"`;
}

function exportCSV(bookings: Booking[]) {
  const header = ["ID", "姓名", "电话", "邮箱", "语言", "科室", "症状", "状态", "提交时间"];
  const rows = bookings.map((b) => [
    q(b.id),
    q(b.name),
    q(b.phone),
    q(b.email),
    q(LANG_LABELS[b.lang] ?? b.lang),
    q(DEPT_LABELS[b.dept] ?? b.dept),
    q(b.symptoms),
    q(STATUS_LABELS[b.status]),
    q(new Date(b.createdAt).toLocaleString("zh-CN")),
  ]);
  const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `japan-doctor-bookings-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Dashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [noteInput, setNoteInput] = useState("");
  const [seenIds, setSeenIds] = useState<Set<string>>(new Set());
  const [newCount, setNewCount] = useState(0);
  const [noteSaved, setNoteSaved] = useState(false);
  const prevCountRef = useRef(0);

  const loadBookings = useCallback(() => {
    const stored = localStorage.getItem(BOOKINGS_KEY);
    const parsed: Booking[] = stored ? JSON.parse(stored) : [];
    const real = parsed.filter((b) => !b.id.startsWith("demo-"));
    const all = [...DEMO_BOOKINGS, ...real].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setBookings(all);

    // Sync seenIds from localStorage so blue dots don't re-appear on refresh
    const seen = new Set<string>(JSON.parse(localStorage.getItem(SEEN_KEY) ?? "[]"));
    setSeenIds(seen);

    // Only count real (non-demo) unseen bookings for the new-booking badge
    const unseenReal = real.filter((b) => !seen.has(b.id)).length;
    if (unseenReal > prevCountRef.current) setNewCount(unseenReal);
    prevCountRef.current = unseenReal;
  }, []);

  const loadNotes = useCallback(() => {
    const stored = localStorage.getItem(NOTES_KEY);
    setNotes(stored ? JSON.parse(stored) : {});
  }, []);

  useEffect(() => {
    if (localStorage.getItem(AUTH_KEY) !== "1") {
      router.replace("/admin");
      return;
    }
    loadBookings();
    loadNotes();

    // Auto-refresh every 30s
    const interval = setInterval(loadBookings, 30_000);
    return () => clearInterval(interval);
  }, [router, loadBookings, loadNotes]);

  // When opening a booking, mark it as seen
  function openBooking(b: Booking) {
    setSelectedBooking(b);
    setNoteInput(notes[b.id] ?? "");
    setNoteSaved(false);
    const wasUnseen = !b.id.startsWith("demo-") && !seenIds.has(b.id);
    const updated = new Set(seenIds);
    updated.add(b.id);
    localStorage.setItem(SEEN_KEY, JSON.stringify([...updated]));
    setSeenIds(updated);
    if (wasUnseen) setNewCount((n) => Math.max(0, n - 1));
  }

  function logout() {
    localStorage.removeItem(AUTH_KEY);
    router.push("/admin");
  }

  function updateStatus(id: string, status: Booking["status"]) {
    const stored = localStorage.getItem(BOOKINGS_KEY);
    const real: Booking[] = stored ? JSON.parse(stored) : [];
    const updated = real.map((b) => (b.id === id ? { ...b, status } : b));
    const exists = real.find((b) => b.id === id);
    if (!exists) {
      const demo = DEMO_BOOKINGS.find((b) => b.id === id);
      if (demo) updated.push({ ...demo, status });
    }
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    loadBookings();
    if (selectedBooking?.id === id) {
      setSelectedBooking((prev) => prev ? { ...prev, status } : null);
    }
  }

  function deleteBooking(id: string) {
    const stored = localStorage.getItem(BOOKINGS_KEY);
    const real: Booking[] = stored ? JSON.parse(stored) : [];
    const isDemo = id.startsWith("demo-");
    if (isDemo) {
      updateStatus(id, "cancelled");
    } else {
      const updated = real.filter((b) => b.id !== id);
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
      loadBookings();
    }
    setSelectedBooking(null);
  }

  function saveNote(id: string) {
    const updated = { ...notes, [id]: noteInput };
    setNotes(updated);
    localStorage.setItem(NOTES_KEY, JSON.stringify(updated));
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  }

  const isUnseen = (id: string) => !seenIds.has(id) && !id.startsWith("demo-");

  const filtered = bookings.filter((b) => {
    const matchStatus = filterStatus === "all" || b.status === filterStatus;
    if (!matchStatus) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.name.toLowerCase().includes(q) ||
      b.phone.toLowerCase().includes(q) ||
      b.email.toLowerCase().includes(q) ||
      b.symptoms.toLowerCase().includes(q)
    );
  });

  const today = new Date().toDateString();
  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    today: bookings.filter((b) => new Date(b.createdAt).toDateString() === today).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar */}
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
            </div>
            <span className="font-bold text-foreground">Japan Doctor</span>
            <span className="text-gray-400 text-sm hidden sm:inline">/ 管理后台</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => exportCSV(bookings)}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100"
              title="导出 CSV"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              导出
            </button>
            <a
              href="/"
              target="_blank"
              className="text-sm text-gray-500 hover:text-primary transition-colors hidden sm:inline-flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              查看网站
            </a>
            <button
              onClick={logout}
              className="text-sm text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
              </svg>
              退出
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-border rounded-xl p-1 mb-8 w-fit">
          {(["overview", "bookings"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === t
                  ? "bg-primary text-white shadow"
                  : "text-gray-500 hover:text-foreground"
              }`}
            >
              {t === "overview" ? "数据总览" : "预约管理"}
              {t === "bookings" && stats.pending > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center min-w-[18px] h-[18px] text-[10px] font-bold bg-red-500 text-white rounded-full px-1">
                  {stats.pending}
                </span>
              )}
              {t === "bookings" && newCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full border border-white" />
              )}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {tab === "overview" && (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "总预约数", value: stats.total, icon: "M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z", color: "text-primary bg-primary/10" },
                { label: "待处理", value: stats.pending, icon: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", color: "text-yellow-600 bg-yellow-50" },
                { label: "已确认", value: stats.confirmed, icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", color: "text-blue-600 bg-blue-50" },
                { label: "今日新增", value: stats.today, icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5", color: "text-green-600 bg-green-50" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl p-6 border border-border">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                    </svg>
                  </div>
                  <div className="text-3xl font-bold text-foreground">{s.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Recent bookings */}
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <h2 className="font-semibold text-foreground">最近预约</h2>
                <button onClick={() => setTab("bookings")} className="text-sm text-primary hover:underline">查看全部</button>
              </div>
              <div className="divide-y divide-border">
                {bookings.slice(0, 5).map((b) => (
                  <div key={b.id} className="px-6 py-4 flex items-center justify-between gap-4">
                    <div className="min-w-0 flex items-center gap-2">
                      {isUnseen(b.id) && <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />}
                      <div className="min-w-0">
                        <div className="font-medium text-foreground text-sm truncate">{b.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {DEPT_LABELS[b.dept] ?? b.dept} · {LANG_LABELS[b.lang] ?? b.lang}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_COLORS[b.status]}`}>
                        {STATUS_LABELS[b.status]}
                      </span>
                      <span className="text-xs text-gray-400">{formatTimeAgo(b.createdAt)}</span>
                    </div>
                  </div>
                ))}
                {bookings.length === 0 && (
                  <div className="px-6 py-12 text-center text-gray-400 text-sm">暂无预约记录</div>
                )}
              </div>
            </div>

            {/* Dept breakdown */}
            <div className="bg-white rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-foreground">科室分布</h2>
                <button
                  onClick={() => exportCSV(bookings)}
                  className="text-xs text-gray-400 hover:text-primary transition-colors flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  导出 CSV
                </button>
              </div>
              <div className="space-y-3">
                {Object.entries(DEPT_LABELS).map(([key, label]) => {
                  const count = bookings.filter((b) => b.dept === key).length;
                  const pct = bookings.length > 0 ? Math.round((count / bookings.length) * 100) : 0;
                  return (
                    <div key={key} className="flex items-center gap-3">
                      <div className="w-20 text-sm text-gray-600 shrink-0">{label}</div>
                      <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="text-sm text-gray-500 w-8 text-right">{count}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {tab === "bookings" && (
          <div className="flex gap-6">
            {/* List */}
            <div className="flex-1 min-w-0">
              {/* Search + Filter row */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索姓名、电话、邮箱..."
                    className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="flex gap-2 flex-wrap">
                  {["all", "pending", "confirmed", "completed", "cancelled"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setFilterStatus(s)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                        filterStatus === s
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-gray-500 border-border hover:border-primary/40"
                      }`}
                    >
                      {s === "all"
                        ? `全部 (${bookings.length})`
                        : `${STATUS_LABELS[s as Booking["status"]]} (${bookings.filter((b) => b.status === s).length})`}
                    </button>
                  ))}
                </div>
              </div>

              {searchQuery && (
                <p className="text-xs text-gray-500 mb-3">找到 {filtered.length} 条结果</p>
              )}

              <div className="bg-white rounded-2xl border border-border overflow-hidden">
                <div className="divide-y divide-border">
                  {filtered.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => openBooking(b)}
                      className={`w-full px-5 py-4 flex items-start justify-between gap-4 text-left hover:bg-gray-50 transition-colors ${
                        selectedBooking?.id === b.id ? "bg-primary/5 border-l-2 border-l-primary" : ""
                      }`}
                    >
                      <div className="min-w-0 flex-1 flex items-start gap-2">
                        {isUnseen(b.id) && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm text-foreground">{b.name}</span>
                            <span className="text-xs text-gray-400">{LANG_LABELS[b.lang] ?? b.lang}</span>
                          </div>
                          <div className="text-xs text-gray-500 truncate">{b.symptoms || "—"}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {DEPT_LABELS[b.dept] ?? b.dept} · {formatDateTime(b.createdAt)}
                          </div>
                        </div>
                      </div>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${STATUS_COLORS[b.status]}`}>
                        {STATUS_LABELS[b.status]}
                      </span>
                    </button>
                  ))}
                  {filtered.length === 0 && (
                    <div className="py-16 text-center text-gray-400 text-sm">
                      {searchQuery ? `未找到"${searchQuery}"相关记录` : "暂无记录"}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Detail panel */}
            {selectedBooking && (
              <div className="w-80 shrink-0">
                <div className="bg-white rounded-2xl border border-border p-6 sticky top-24 space-y-4 max-h-[calc(100vh-7rem)] overflow-y-auto">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">预约详情</h3>
                    <button
                      onClick={() => setSelectedBooking(null)}
                      className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">患者姓名</div>
                      <div className="font-medium">{selectedBooking.name}</div>
                    </div>

                    {/* Quick contact buttons */}
                    <div>
                      <div className="text-xs text-gray-400 mb-2">快捷联系</div>
                      <div className="flex gap-2">
                        {selectedBooking.phone && (
                          <a
                            href={`tel:${selectedBooking.phone.replace(/\s/g, "")}`}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors text-xs font-medium"
                            title={selectedBooking.phone}
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                            </svg>
                            拨号
                          </a>
                        )}
                        {selectedBooking.phone && (
                          <a
                            href={`https://wa.me/${selectedBooking.phone.replace(/[\s+\-()]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors text-xs font-medium"
                          >
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                            </svg>
                            WA
                          </a>
                        )}
                        {selectedBooking.email && (
                          <a
                            href={`mailto:${selectedBooking.email}`}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors text-xs font-medium"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                            邮件
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">电话</div>
                        <div className="font-medium text-xs break-all">{selectedBooking.phone || "—"}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">语言</div>
                        <div className="font-medium">{LANG_LABELS[selectedBooking.lang] ?? selectedBooking.lang}</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-400 mb-1">邮箱</div>
                      <div className="text-xs break-all">{selectedBooking.email || "—"}</div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-400 mb-1">科室</div>
                      <div className="font-medium">{DEPT_LABELS[selectedBooking.dept] ?? selectedBooking.dept}</div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-400 mb-1">症状描述</div>
                      <div className="text-gray-700 leading-relaxed">{selectedBooking.symptoms || "—"}</div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-400 mb-1">提交时间</div>
                      <div className="text-gray-600">{new Date(selectedBooking.createdAt).toLocaleString("zh-CN")}</div>
                    </div>

                    {/* Notes */}
                    <div>
                      <div className="text-xs text-gray-400 mb-1.5">内部备注</div>
                      <textarea
                        rows={3}
                        value={noteInput}
                        onChange={(e) => setNoteInput(e.target.value)}
                        placeholder="添加跟进备注..."
                        className="w-full px-3 py-2 text-xs border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                      <button
                        onClick={() => saveNote(selectedBooking.id)}
                        disabled={noteInput === (notes[selectedBooking.id] ?? "") && !noteSaved}
                        className={`mt-1.5 w-full py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          noteSaved
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                        }`}
                      >
                        {noteSaved ? "✓ 已保存" : "保存备注"}
                      </button>
                    </div>

                    {/* Status */}
                    <div>
                      <div className="text-xs text-gray-400 mb-2">更新状态</div>
                      <div className="grid grid-cols-2 gap-2">
                        {(["pending", "confirmed", "completed", "cancelled"] as Booking["status"][]).map((s) => (
                          <button
                            key={s}
                            onClick={() => updateStatus(selectedBooking.id, s)}
                            className={`py-2 rounded-lg text-xs font-medium transition-all ${
                              selectedBooking.status === s
                                ? `${STATUS_COLORS[s]} ring-1 ring-current`
                                : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                            }`}
                          >
                            {STATUS_LABELS[s]}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => deleteBooking(selectedBooking.id)}
                      className="w-full py-2.5 rounded-xl text-xs font-medium text-red-500 hover:bg-red-50 transition-colors border border-red-100"
                    >
                      删除记录
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

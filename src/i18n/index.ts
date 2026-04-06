import zh from "./zh";
import en from "./en";
import ja from "./ja";
import ko from "./ko";
import vi from "./vi";
import type { Translations } from "./zh";

export type Lang = "zh" | "en" | "ja" | "ko" | "vi";

export const dictionaries: Record<Lang, Translations> = { zh, en, ja, ko, vi };

export type { Translations };

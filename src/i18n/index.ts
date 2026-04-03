import zh from "./zh";
import en from "./en";
import ja from "./ja";
import type { Translations } from "./zh";

export type Lang = "zh" | "en" | "ja";

export const dictionaries: Record<Lang, Translations> = { zh, en, ja };

export type { Translations };

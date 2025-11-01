export const ALL_ENCODINGS = ["UTF-32", "UTF-16", "UTF-8"] as const;

export type Encoding = (typeof ALL_ENCODINGS)[number];

export const ALL_NORMALIZATION_FORMS = ["NFC", "NFD", "NFKC", "NFKD"] as const;

export type NormalizationForm = (typeof ALL_NORMALIZATION_FORMS)[number];

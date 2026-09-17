const KEYWORD_SWATCHES: [string, string][] = [
  ["navy", "#2f3b52"],
  ["blue", "#a9c6e3"],
  ["sky", "#bcd9ef"],
  ["pink", "#f0c3d3"],
  ["rose", "#f3c9d8"],
  ["red", "#a6432c"],
  ["brown", "#8a5a3c"],
  ["green", "#5f7a52"],
  ["mint", "#c8e6c4"],
  ["yellow", "#e9d590"],
  ["butter", "#f0e4b8"],
  ["peach", "#eab98f"],
  ["lilac", "#c9b3dd"],
  ["purple", "#a98bc4"],
  ["grey", "#c7c3ba"],
  ["gray", "#c7c3ba"],
  ["off-white", "#efeadf"],
  ["white", "#fbfaf5"],
];

/** Approximates a plain-text pill color description as a swatch for the placeholder pill graphic. */
export function guessSwatch(description: string): string {
  const lower = description.toLowerCase();
  for (const [keyword, hex] of KEYWORD_SWATCHES) {
    if (lower.includes(keyword)) return hex;
  }
  return "#c9c4b7";
}

import { Histogram } from "./histogram";

/**
 * Compares two histograms and returns the percentage of similarity
 * @param first First histogram
 * @param second Second histogram
 * @returns Percentage of similarity
 */
function compareHistograms(first: Histogram, second: Histogram): number {
  // Get the total difference between the histograms
  const totalDiff =
    first.reds.reduce(
      (acc, value, i) => acc + Math.abs(value - second.reds[i]),
      0,
    ) +
    first.greens.reduce(
      (acc, value, i) => acc + Math.abs(value - second.greens[i]),
      0,
    ) +
    first.blues.reduce(
      (acc, value, i) => acc + Math.abs(value - second.blues[i]),
      0,
    ) +
    first.alphas.reduce(
      (acc, value, i) => acc + Math.abs(value - second.alphas[i]),
      0,
    );

  // Return the percentage of similarity
  // Note: the total diff can sometimes ig be over 100% (because of floating point errors), so i'm just gonna cap it at 100%
  return 100 - Math.min(100, totalDiff / 4);
}

export default compareHistograms;

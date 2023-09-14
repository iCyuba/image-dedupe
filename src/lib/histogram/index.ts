export interface Histogram {
  reds: number[];
  greens: number[];
  blues: number[];
  alphas: number[];
}

/**
 * Generate a histogram from an ImageData object
 * @param data The ImageData object to generate a histogram from
 * @returns The 4 channels with each having 256 values with the count of each occurrence
 */
function histogramFromImageData({ data }: ImageData): Histogram {
  const reds = new Array<number>(256).fill(0);
  const greens = new Array<number>(256).fill(0);
  const blues = new Array<number>(256).fill(0);
  const alphas = new Array<number>(256).fill(0);

  // Loop through the array for each pixel
  // Note: the array is a 1D array, so the index for each pixel is 4 * i (4 channels per pixel)
  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];
    const alpha = data[i + 3];

    // Increment the count for each channel
    reds[red]++;
    greens[green]++;
    blues[blue]++;
    alphas[alpha]++;
  }

  // Return the histogram (but as percentages). Devide each value by the total number of pixels (data.length / 4)
  return {
    reds: reds.map((red) => (red / (data.length / 4)) * 100),
    greens: greens.map((green) => (green / (data.length / 4)) * 100),
    blues: blues.map((blue) => (blue / (data.length / 4)) * 100),
    alphas: alphas.map((alpha) => (alpha / (data.length / 4)) * 100),
  };
}

export default histogramFromImageData;

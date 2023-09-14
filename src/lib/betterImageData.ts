export interface Pixel {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export type PixelArray = Pixel[][];

/**
 * More usable image data
 * @param data Image data to convert
 * @returns A 2D array of pixels
 */
function betterImageData({ data, width }: ImageData): PixelArray {
  // Convert the data to a 2D array of pixels
  const newData: Pixel[][] = [];
  for (let y = 0; y < data.length; y += 4) {
    const rowIndex = Math.floor(y / 4 / width);
    const colIndex = Math.floor(y / 4 - rowIndex * width);

    const pixel = {
      red: data[y],
      green: data[y + 1],
      blue: data[y + 2],
      alpha: data[y + 3],
    };

    // Set the pixel in the 2D array
    const row = newData[rowIndex] || [];
    row[colIndex] = pixel;
    if (!newData[rowIndex]) newData[rowIndex] = row;
  }

  return newData;
}

export default betterImageData;

/**
 * Brighten an image by a given amount
 * @param imageData Image data to brighten
 * @param amount Amount to brighten the image by (0-255)
 * @returns New image data with the brightness applied
 */
function brighten(imageData: ImageData, amount: number): ImageData {
  // Copy the image data
  const newImageData = new ImageData(
    new Uint8ClampedArray(imageData.data),
    imageData.width,
    imageData.height
  );

  // Loop through each color channel of each pixel and add the amount to it
  // But obviously skip the alpha channel (which is the 4th one)
  for (let i = 0; i < newImageData.data.length; i += 4) {
    // Note: imageData.data is already clamped between 0 and 255, no need to do it here
    newImageData.data[i] += amount; // red
    newImageData.data[i + 1] += amount; // green
    newImageData.data[i + 2] += amount; // blue
  }

  // Return the new image data
  return newImageData;
}

export default brighten;

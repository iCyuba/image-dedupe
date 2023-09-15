export type Position = { x: number; y: number };
/**
 * Add a tiny flare to the image.
 *
 * Note: If you pass -1 for the x or y position, it will be placed in the center of the image
 * @param imageData Image data to add the flare to
 * @param position Position of the flare (tuple of x and y)
 * @param radius Radius of the flare (default 1)
 * @returns New image data with the flare added
 */
function flare(
  imageData: ImageData,
  { x, y }: Position,
  radius = 20
): ImageData {
  // Copy the image data
  const newImageData = new ImageData(
    new Uint8ClampedArray(imageData.data),
    imageData.width,
    imageData.height
  );

  // Set the x and y to the center if they are -1
  if (x === -1) x = Math.floor(imageData.width / 2);
  if (y === -1) y = Math.floor(imageData.height / 2);

  // Loop through each color channel of each pixel and add an appropriate amount to it
  for (let i = 0; i < newImageData.data.length; i += 4) {
    // Get the distance from the center
    const rowIndex = Math.floor(i / 4 / imageData.width);
    const colIndex = Math.floor((i / 4) % imageData.width);

    const distance = Math.sqrt(
      Math.pow(y - rowIndex, 2) + Math.pow(x - colIndex, 2)
    );

    // Calculate the strength of the flare
    const strength = 50 / (distance / radius);

    if (strength < 1) continue;

    // Add the strength to each color channel
    newImageData.data[i] += strength; // red
    newImageData.data[i + 1] += strength; // green
    newImageData.data[i + 2] += strength; // blue
  }

  // Return the new image data
  return newImageData;
}

export default flare;

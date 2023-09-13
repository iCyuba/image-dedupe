/**
 * Get image data from an image object
 * @param image Image object
 * @param canvas Canvas element to draw the image onto (if not provided, a new canvas will be created)
 * @returns Image data
 */
function imageDataFromImage(
  image: HTMLImageElement,
  canvas = document.createElement("canvas"),
): ImageData {
  // Get the width and height of the image
  const { width, height } = image;

  // Set the canvas width and height to match the image
  canvas.width = width;
  canvas.height = height;

  // Draw the image onto the canvas
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(image, 0, 0, width, height);

  // Return the image data from the canvas
  return ctx.getImageData(0, 0, width, height);
}

export default imageDataFromImage;

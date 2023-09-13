/**
 * Get image data from a bitmap
 *
 * Closes the bitmap after getting the image data
 * @param bitmap Bitmap to get the image data from
 * @param canvas Canvas element to draw the image onto (if not provided, a new canvas will be created)
 * @returns Image data
 */
function imageDataFromBitmap(
  bitmap: ImageBitmap,
  canvas = document.createElement("canvas")
): ImageData {
  // Get the width and height of the image
  const { width, height } = bitmap;

  // Set the canvas width and height to match the image
  canvas.width = width;
  canvas.height = height;

  // Draw the image onto the canvas
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bitmap, 0, 0, width, height);

  // Close the bitmap
  bitmap.close();

  // Return the image data from the canvas
  return ctx.getImageData(0, 0, width, height);
}

export default imageDataFromBitmap;

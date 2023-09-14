import betterImageData, { type Pixel } from "./betterImageData";
import invert2dArray from "./invert2dArray";

/**
 * Crop an image, will remove dark pixels around the border
 * @param imageData Image data to crop
 * @returns Cropped image data
 */
function crop(imageData: ImageData): ImageData {
  // Get the width and height of the image
  const { width, height } = imageData;

  // Get the image data as a 2D array of pixels
  const data = betterImageData(imageData);
  const inverseData = invert2dArray(data);

  // GC is gonna love this one... so many new arrays
  const hasContent = (pixel: Pixel) =>
    pixel.red > 64 || pixel.green > 64 || pixel.blue > 64;
  const top = data.findIndex((row) => row.some(hasContent));
  const bottom =
    height - data.toReversed().findIndex((row) => row.some(hasContent));
  const left = inverseData.findIndex((row) => row.some(hasContent));
  const right =
    width - inverseData.toReversed().findIndex((row) => row.some(hasContent));

  // Make a temporary canvas to draw the image on
  const canvas = new OffscreenCanvas(imageData.width, imageData.height);
  const ctx = canvas.getContext("2d")!;

  // Put the image data on the canvas
  ctx.putImageData(imageData, 0, 0);

  // Get the cropped image data
  const croppedImageData = ctx.getImageData(
    left,
    top,
    right - left,
    bottom - top
  );

  console.log("top", top, "left", left, "bottom", bottom, "right", right);

  return croppedImageData;
}

export default crop;

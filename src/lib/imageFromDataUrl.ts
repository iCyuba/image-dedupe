/**
 * Get an image from a data url
 * @param dataUrl Data url to get the image from
 * @returns Image object
 */
async function getImageFromDataUrl(dataUrl: string): Promise<HTMLImageElement> {
  // Create an image from the data url
  const image = new Image();
  image.src = dataUrl;

  // Wait for the image to load
  await new Promise((resolve) =>
    image.addEventListener("load", resolve, { once: true }),
  );

  // Return the image
  return image;
}

export default getImageFromDataUrl;

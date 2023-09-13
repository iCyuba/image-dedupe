/**
 * Get an image from a file
 * @returns Image object
 */
async function getImageFromFile(file: File): Promise<HTMLImageElement> {
  // Read the image data as a data url
  const reader = new FileReader();
  reader.readAsDataURL(file);

  // Wait for the data to load
  const data = await new Promise<ProgressEvent<FileReader>>(
    // The reader class will emit a load event when the data is ready
    // Here I'm just resolving the promise with the result of the event (therefore once is set to true)
    (resolve) => reader.addEventListener("load", resolve, { once: true }),
  );

  // Get the data url from the event
  let dataUrl = data.target?.result;

  // If the data url is an array buffer, convert it to a string
  if (dataUrl instanceof ArrayBuffer)
    dataUrl = new TextDecoder().decode(dataUrl);

  // If the data url is not a string, throw an error
  if (typeof dataUrl !== "string") throw new Error("Data url is not a string");

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

export default getImageFromFile;

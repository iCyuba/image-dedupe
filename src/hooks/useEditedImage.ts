import { useCallback, useState } from "react";
import crop from "../lib/crop";
import imageDataFromBitmap from "../lib/imageDataFromBitmap";

function useEditedImage() {
  const [isLoading, setLoading] = useState(false);
  const [editedImage, setEditedImage] = useState<ImageData | null>(null);

  const load = useCallback(async (file: File) => {
    // Set loading to true
    setLoading(true);

    // Create an image bitmap from the file
    const bitmap = await createImageBitmap(file);

    // Get the image data from the bitmap (this also closes the bitmap)
    const imageData = imageDataFromBitmap(bitmap);

    // Crop the image
    const croppedImageData = crop(imageData);

    // Set the edited image
    setEditedImage(croppedImageData);

    // Set loading back to false
    setLoading(false);
  }, []);

  return { editedImage, isLoading, load };
}

export default useEditedImage;

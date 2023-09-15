import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import brighten from "../lib/image/brighten";
import crop from "../lib/image/crop";
import flare, { Position } from "../lib/image/flare";
import imageDataFromBitmap from "../lib/imageDataFromBitmap";

function useEditedImage(ref: React.RefObject<HTMLCanvasElement>) {
  const [isLoading, setLoading] = useState(false);
  const [editedImage, setEditedImage] = useState<ImageData | null>(null);
  const [staticFlares, setStaticFlares] = useState<Position[]>([]);
  const [hasFlare, setFlare] = useState(false);
  const flarePosition = useRef<Position | null>();

  const image = useMemo(() => {
    // Return if the image isn't loaded
    if (!editedImage) return null;

    // Brighten the image
    const image = brighten(editedImage, 35);

    // Add the static flares to the image
    const withFlares = staticFlares.reduce(
      (imageData, flarePosition) => flare(imageData, flarePosition, 20),

      // Start with just the brightened image
      image
    );

    // Return the image with flares
    return withFlares;
  }, [editedImage, staticFlares]);

  // Update the canvas when the edited image changes
  useEffect(() => {
    if (ref.current && image) {
      const ctx = ref.current.getContext("2d")!;

      ctx.canvas.width = image.width;
      ctx.canvas.height = image.height;

      ctx.putImageData(image, 0, 0);
    }
  }, [ref, image, hasFlare]);

  // When the flare starts moving, start the loop to render it
  useEffect(() => {
    // Return if there's no flare, the image isn't loaded, or the canvas ref doesn't exist
    if (!hasFlare || !ref.current || !image) return;

    // Get the canvas context
    const ctx = ref.current.getContext("2d")!;

    let shouldStop = false;

    // Loop function for rendering the flare every frame
    function loop() {
      // Stop the loop if the flare doesn't have a position anymore (or the image was removed for some reason)
      if (!flarePosition.current || !image) return;

      // Add the flare to the image
      const flared = flare(image, flarePosition.current, 20);

      // Draw the image on the canvas
      ctx.putImageData(flared, 0, 0);

      // Request the next animation frame
      if (!shouldStop) requestAnimationFrame(loop);
    }

    // Start the loop
    loop();

    // Return a function to stop the loop
    return () => void (shouldStop = true);
  }, [image, ref, hasFlare]);

  // Call this function to set image
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

  // Add a new static flare to the image
  const addFlare = useCallback(
    (position: Position) => {
      // Add the flare to the list of static flares
      setStaticFlares((flares) => [...flares, position]);
    },

    [setStaticFlares]
  );

  // Set the dynamic flare position
  const moveFlare = useCallback(
    (position: Position | null) => {
      // Set the flare position
      flarePosition.current = position;

      // If the position is null, remove the flare
      if (!position) setFlare(false);
      // Otherwise, add the flare
      else setFlare(true);
    },

    [flarePosition]
  );

  return {
    addFlare,
    image,
    isLoading,
    load,
    moveFlare,
  };
}

export default useEditedImage;

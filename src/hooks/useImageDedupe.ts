import { ChangeEvent, useCallback, useMemo, useState } from "react";

import compareHistograms from "../lib/compareHistograms";
import histogramFromImageData, { Histogram } from "../lib/histogram";
import imageDataFromBitmap from "../lib/imageDataFromBitmap";

interface Image {
  file: File;
  histogram: Histogram;
}

export type ImagePair = { first: Image; second: Image; similarity: number };

/**
 * Find duplicate images
 * @param toleranceThreshold The tolerance threshold for the similarity of the images
 */
function useImageDedupe(toleranceThreshold: number = 85) {
  const [isLoading, setLoading] = useState(false);
  const [images, setImages] = useState<ImagePair[]>([]);

  // Memoize the duplicate images so they don't get recalculated every time the images change
  const duplicates = useMemo(
    () =>
      images.filter(({ similarity }) => similarity >= 100 - toleranceThreshold),
    [images, toleranceThreshold]
  );

  /**
   * Event handler for uploading images
   * @param ev Change event from the input element
   */
  const upload = useCallback(async (ev: ChangeEvent<HTMLInputElement>) => {
    // Set loading to true
    setLoading(true);

    // Load all the files and return if there are no files
    const files = ev.target.files;
    if (!files || files.length === 0) return;

    // Map the files to bitmaps
    const bitmaps = await Promise.all(
      Array.from(files).map(async (file) => {
        // Bitmap from image
        const bitmap = await createImageBitmap(file);

        // Return the file and bitmap
        return { file, bitmap };
      })
    );

    // Create a canvas element to draw the images on
    const canvas = document.createElement("canvas");

    // Map the bitmaps to histograms
    const images: Image[] = bitmaps.map(({ file, bitmap }) => ({
      histogram: histogramFromImageData(imageDataFromBitmap(bitmap, canvas)),
      file,
    }));

    // Get all possible pairs of histograms (ty copilot <3)
    const possiblePairs = images.flatMap((histogram, i) =>
      images.slice(i + 1).map((other) => ({ first: histogram, second: other }))
    );

    // Compare the histograms and get the ones that are similar
    const pairs = possiblePairs.map((pair) => ({
      ...pair,
      similarity: compareHistograms(
        pair.first.histogram,
        pair.second.histogram
      ),
    }));

    // Sort the pairs from most similar to least
    pairs.sort((a, b) => b.similarity - a.similarity);

    // Set the image pairs
    setImages(pairs);

    // Set loading back to false
    setLoading(false);
  }, []);

  return { duplicates, images, isLoading, upload };
}

export default useImageDedupe;

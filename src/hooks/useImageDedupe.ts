import { useCallback, useMemo, useState } from "react";

import histogramFromImageData, { Histogram } from "../lib/histogram";
import compareHistograms from "../lib/histogram/compare";
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

  const load = useCallback(async (files: FileList | null) => {
    // Return if there are no files
    if (!files || files.length === 0) return;

    // Set loading to true
    setLoading(true);

    // Map the files to bitmaps
    const bitmaps = await Promise.all(
      Array.from(files).map(async (file) => ({
        bitmap: await createImageBitmap(file),
        file,
      }))
    );

    // Create an offscreen canvas to draw the images on
    const canvas = new OffscreenCanvas(1, 1); // The size doesn't matter, it gets changed by the function...

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

  return { duplicates, images, isLoading, load };
}

export default useImageDedupe;

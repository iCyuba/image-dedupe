import {
  ChangeEvent,
  useCallback,
  useRef,
  useState,
  useTransition,
} from "react";

import compareHistograms from "../lib/compareHistograms";
import dataUrlFromFile from "../lib/dataUrlFromFile";
import histogramFromImageData, { Histogram } from "../lib/histogram";
import imageDataFromImage from "../lib/imageDataFromImage";
import imageFromDataUrl from "../lib/imageFromDataUrl";

interface RawImage {
  file: File;
  dataUrl: string;
  image: HTMLImageElement;
}

interface Image {
  file: File;
  dataUrl: string;
  histogram: Histogram;
}

export type ImagePair = { first: Image; second: Image; similarity: number };

/**
 * Find duplicate images
 * @param threshold The threshold for the similarity of the images
 */
function useImageDedupe(threshold: number = 85) {
  const [isProcessing, startTransition] = useTransition();
  const [isUploading, setUploading] = useState(false);
  const uploaded = useRef<RawImage[]>([]);
  const [duplicateImages, setDuplicateImages] = useState<ImagePair[]>([]);

  /**
   * Event handler for uploading images
   * @param ev Change event from the input element
   */
  const upload = useCallback(async (ev: ChangeEvent<HTMLInputElement>) => {
    // Set uploading to true
    setUploading(true);

    // Load all the files and return if there are no files
    const files = ev.target.files;
    if (!files || files.length === 0) return;

    // Map the files to to raw images
    const images = await Promise.all(
      Array.from(files).map(async (file) => {
        // Data url from the file
        const dataUrl = await dataUrlFromFile(file);

        // Image from data url
        const image = await imageFromDataUrl(dataUrl);

        // And finally return the image, file and histogram
        return { file, dataUrl, image };
      })
    );

    // Set the uploaded images
    uploaded.current = images;

    // Set uploading to false
    setUploading(false);
  }, []);

  /**
   * Start the transition to update the image list
   */
  const start = useCallback(
    () =>
      startTransition(() => {
        // Get the uploaded images
        const images = uploaded.current;

        // If there are no uploaded images, throw an error
        if (images.length === 0) throw new Error("No images uploaded");

        // Create a canvas element to draw the images on
        const canvas = document.createElement("canvas");

        // Map the images to images with histograms
        // Note: It's split like this so I can reuse the canvas element for each image
        const histograms = images.map(
          ({ image, ...rest }) =>
            ({
              histogram: histogramFromImageData(
                imageDataFromImage(image, canvas)
              ),
              ...rest,
            } as Image)
        );

        // First get all possible pairs of histograms (ty copilot <3)
        const pairs = histograms.flatMap((histogram, i) =>
          histograms.slice(i + 1).map((other) => [histogram, other])
        );

        // Compare the histograms and get the ones that are similar
        const similarity = pairs.map((pair) => ({
          pair,
          similarity: compareHistograms(pair[0].histogram, pair[1].histogram),
        }));

        // Sort the pairs from most similar to least
        similarity.sort((a, b) => b.similarity - a.similarity);

        // Set the duplicate images
        setDuplicateImages(
          similarity
            .filter(({ similarity }) => similarity > threshold)
            .map(({ pair, similarity }) => ({
              first: pair[0],
              second: pair[1],
              similarity,
            }))
        );
      }),
    [threshold]
  );

  return { duplicateImages, isProcessing, isUploading, start, upload };
}

export default useImageDedupe;

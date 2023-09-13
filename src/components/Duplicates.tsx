import { memo, useMemo, useState } from "react";
import { ImagePair } from "../hooks/useImageDedupe";
import Image from "./Image";
import Pagination from "./Pagination";

const pageSize = 300;

interface DuplicatesProps {
  duplicateImages: ImagePair[];
}

const Duplicates = memo(function Duplicates({
  duplicateImages,
}: DuplicatesProps) {
  // Due to the exponential size of the array, we only want to display a few
  // Maximum of 1000 images (500 pairs)
  const [page, setPage] = useState(0);

  // Get the images to display
  const images = useMemo(
    () => duplicateImages.slice(page * pageSize, (page + 1) * pageSize),

    // Becuase this could potentially be an expensive operation, we only want to do it when the page changes
    [duplicateImages, page]
  );

  // Return if there are no duplicate images
  if (duplicateImages.length === 0) return null;

  const maxPage = Math.ceil(duplicateImages.length / pageSize);

  return (
    <div className="card">
      <h2>Duplicate Images</h2>

      <Pagination page={page} setPage={setPage} maxPage={maxPage} />

      {images.map(({ first, second, similarity }, i) => (
        <div key={i} style={{ paddingBottom: "5rem" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Image file={first.file} />

            <Image file={second.file} />
          </div>

          <p>Similarity: {Math.round(similarity * 100) / 100}%</p>
        </div>
      ))}

      <Pagination page={page} setPage={setPage} maxPage={maxPage} />
    </div>
  );
});

export default Duplicates;

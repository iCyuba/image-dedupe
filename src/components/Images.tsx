import { memo, useMemo, useState } from "react";
import { ImagePair } from "../hooks/useImageDedupe";
import Image from "./Image";
import Pagination from "./Pagination";

const pageSize = 300;

interface ImagesProps {
  images: ImagePair[];
}

const Images = memo(function Images({ images: images }: ImagesProps) {
  // Due to the exponential size of the array, we only want to display a few
  // Maximum of 1000 images (500 pairs)
  const [page, setPage] = useState(0);

  // Get the images to display
  const pageImages = useMemo(
    () => images.slice(page * pageSize, (page + 1) * pageSize),

    // Becuase this could potentially be an expensive operation, we only want to do it when the page changes
    [images, page]
  );

  // Return if there are no duplicate images
  if (images.length === 0) return <h3>No duplicate images found</h3>;

  const maxPage = Math.ceil(images.length / pageSize);

  return (
    <div
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Duplicate Images</h2>

      <Pagination page={page} setPage={setPage} maxPage={maxPage} />

      {pageImages.map(({ first, second, similarity }, i) => (
        <div
          key={i}
          style={{ paddingBottom: "5rem", width: "fit-content", gap: "2rem" }}
        >
          <div style={{ display: "flex", flexDirection: "row", gap: "2rem" }}>
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

export default Images;

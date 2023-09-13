import { memo } from "react";
import { ImagePair } from "../hooks/useImageDedupe";

interface DuplicatesProps {
  duplicateImages: ImagePair[];
}

const Duplicates = memo(function Duplicates({
  duplicateImages,
}: DuplicatesProps) {
  // Return if there are no duplicate images
  if (duplicateImages.length === 0) return null;

  return (
    <div className="card">
      <h2>Duplicate Images</h2>

      {duplicateImages.map(({ first, second, similarity }, i) => (
        <div key={i} style={{ paddingBottom: "5rem" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <img style={{ width: "100%" }} src={first.dataUrl} />
              <i>{first.file.name}</i>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <img style={{ width: "100%" }} src={second.dataUrl} />
              <i>{second.file.name}</i>
            </div>
          </div>

          <p>Similarity: {Math.round(similarity * 100) / 100}%</p>
        </div>
      ))}
    </div>
  );
});

export default Duplicates;

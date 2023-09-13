import { memo } from "react";

interface UploadProps {
  setTolerance: (tolerance: number) => void;
  toleranceThreshold: number;
  upload: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

const Upload = memo(function Upload({
  setTolerance,
  toleranceThreshold,
  upload,
}: UploadProps) {
  return (
    <div className="card">
      <input
        onChange={upload}
        type="file"
        multiple
        accept="image/png, image/jpeg"
      />

      <label>
        <input
          type="range"
          value={toleranceThreshold}
          onChange={(ev) => setTolerance(Number(ev.target.value))}
        />
        Tolerance threshold: {toleranceThreshold}
      </label>

      <p>
        The percentage of allowed difference between the colors of two images.
        (Personally, I think 85 works best)
      </p>
      <p>
        <i>
          warning: the higher the tolerance, the longer it will take to display
          (rendering the images is slow ig)
        </i>
      </p>
    </div>
  );
});

export default Upload;

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
        Tolerance threshold is the percentage of allowed difference between the
        colors of two images. (Personally, I think 15 works best)
      </p>
    </div>
  );
});

export default Upload;

import { memo } from "react";

interface UploadProps {
  setTolerance: (tolerance: number) => void;
  toleranceThreshold: number;
  load: (files: FileList | null) => void;
  isLoading: boolean;
}

const Upload = memo(function Upload({
  setTolerance,
  toleranceThreshold,
  load,
  isLoading,
}: UploadProps) {
  return (
    <div className="card">
      <input
        onChange={(ev) => load(ev.target.files)}
        type="file"
        multiple
        accept="image/png, image/jpeg"
        disabled={isLoading}
      />

      <label>
        <input
          type="range"
          value={toleranceThreshold}
          onChange={(ev) => setTolerance(Number(ev.target.value))}
          disabled={isLoading}
        />
        Tolerance threshold: {toleranceThreshold}
      </label>

      <p>
        Tolerance threshold is the allowed difference between the percentages of
        the colors of two images. (Personally, I think 15 works best)
      </p>
    </div>
  );
});

export default Upload;

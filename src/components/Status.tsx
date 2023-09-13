import { memo } from "react";

interface StatusProps {
  isProcessing: boolean;
  isUploading: boolean;
}

const Status = memo(function Status({
  isProcessing,
  isUploading,
}: StatusProps) {
  return (
    <div className="card">
      {isProcessing && <p>Processing...</p>}

      {isUploading && <p>Uploading...</p>}
    </div>
  );
});

export default Status;

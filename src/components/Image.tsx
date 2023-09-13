import { memo, useEffect, useRef } from "react";

const Image = memo(function Image({ file }: { file: File }) {
  // A reference to the image element
  const imageRef = useRef<HTMLImageElement>(null);

  // Get the resource url of the image
  const url = URL.createObjectURL(file);

  // When the image is loaded, release the resource
  useEffect(() => {
    imageRef.current?.addEventListener("load", () => {
      URL.revokeObjectURL(url);
    });
  }, [url]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <img style={{ width: "100%" }} src={url} />
      <i>{file.name}</i>
    </div>
  );
});

export default Image;

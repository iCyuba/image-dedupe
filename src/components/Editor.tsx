import { useEffect, useRef } from "react";
import useEditedImage from "../hooks/useEditedImage";

function Editor() {
  const canvas = useRef<HTMLCanvasElement>(null);

  const { editedImage, isLoading, load } = useEditedImage();

  // Update the canvas when the edited image changes
  useEffect(() => {
    if (canvas.current && editedImage) {
      const ctx = canvas.current.getContext("2d")!;

      ctx.canvas.width = editedImage.width;
      ctx.canvas.height = editedImage.height;

      ctx.putImageData(editedImage, 0, 0);
    }
  }, [editedImage]);

  return (
    <>
      <h2>Image Editor</h2>

      <input
        onChange={(ev) => ev.target.files?.length && load(ev.target.files![0])}
        type="file"
        accept="image/png, image/jpeg"
        disabled={isLoading}
      />

      <canvas style={{ width: "100%" }} ref={canvas} />
    </>
  );
}

export default Editor;

import { MouseEvent, useCallback, useRef } from "react";
import useEditedImage from "../hooks/useEditedImage";

function Editor() {
  const canvas = useRef<HTMLCanvasElement>(null);

  const { addFlare, image, isLoading, load, moveFlare } =
    useEditedImage(canvas);

  // Get the position of the mouse on the canvas relative to the image size
  const getFlarePosition = useCallback(
    (ev: MouseEvent<HTMLCanvasElement>) => {
      if (!image) return null;

      const target = ev.target as HTMLCanvasElement;
      const x = Math.round(
        (ev.nativeEvent.offsetX / target.clientWidth) * image.width
      );
      const y = Math.round(
        (ev.nativeEvent.offsetY / target.clientHeight) * image.height
      );

      return { x, y };
    },

    [image]
  );

  return (
    <>
      <h2>Image Editor</h2>

      <input
        onChange={(ev) => ev.target.files?.length && load(ev.target.files![0])}
        type="file"
        accept="image/png, image/jpeg"
        disabled={isLoading}
      />

      <canvas
        style={{ width: "100%" }}
        ref={canvas}
        onMouseMove={(ev) => moveFlare(getFlarePosition(ev))}
        onMouseLeave={() => moveFlare(null)}
        onClick={(ev) => {
          const flare = getFlarePosition(ev);

          if (flare) addFlare(flare);
        }}
      />
    </>
  );
}

export default Editor;

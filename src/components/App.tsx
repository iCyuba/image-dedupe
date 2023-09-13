import { useState } from "react";
import useImageDedupe from "../hooks/useImageDedupe";
import Duplicates from "./Duplicates";
import Status from "./Status";
import Upload from "./Upload";

function App() {
  const [toleranceThreshold, setTolerance] = useState(85);
  const { duplicateImages, isProcessing, isUploading, start, upload } =
    useImageDedupe(toleranceThreshold);

  return (
    <>
      <h1>Image de-dupe</h1>

      <Status isProcessing={isProcessing} isUploading={isUploading} />

      <Upload
        setTolerance={setTolerance}
        toleranceThreshold={toleranceThreshold}
        upload={upload}
      />

      <button onClick={start}>Start</button>

      <Duplicates duplicateImages={duplicateImages} />
    </>
  );
}

export default App;

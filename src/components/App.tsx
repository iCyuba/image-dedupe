import { useState } from "react";
import useImageDedupe from "../hooks/useImageDedupe";
import Images from "./Images";
import Upload from "./Upload";

function App() {
  const [toleranceThreshold, setTolerance] = useState(15);
  const { duplicates, isLoading, upload } = useImageDedupe(toleranceThreshold);

  return (
    <>
      <h1>Image de-dupe</h1>

      {isLoading && <p>Loading...</p>}

      <Upload
        setTolerance={setTolerance}
        toleranceThreshold={toleranceThreshold}
        upload={upload}
        isLoading={isLoading}
      />

      <Images images={duplicates} />
    </>
  );
}

export default App;

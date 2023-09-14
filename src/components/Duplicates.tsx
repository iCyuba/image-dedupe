import { useState } from "react";
import useImageDedupe from "../hooks/useImageDedupe";
import ImageList from "./ImageList";
import Upload from "./Upload";

function Duplicates() {
  const [toleranceThreshold, setTolerance] = useState(15);
  const { duplicates, isLoading, load } = useImageDedupe(toleranceThreshold);

  return (
    <>
      <h2>Image de-dupe</h2>

      {isLoading && <p>Loading...</p>}

      <Upload
        setTolerance={setTolerance}
        toleranceThreshold={toleranceThreshold}
        load={load}
        isLoading={isLoading}
      />

      <ImageList images={duplicates} />
    </>
  );
}

export default Duplicates;

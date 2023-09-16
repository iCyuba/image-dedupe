import { useState } from "react";
import Duplicates from "./Duplicates";
import Editor from "./Editor";

enum View {
  Duplicates,
  Editor,
}

function App() {
  const [view, setView] = useState(View.Duplicates);

  return (
    <>
      <h1>Image Utils</h1>

      {view === View.Duplicates ? (
        <button onClick={() => setView(View.Editor)}>Go to editor</button>
      ) : (
        <button onClick={() => setView(View.Duplicates)}>
          Go to duplicates
        </button>
      )}

      {view === View.Duplicates ? <Duplicates /> : <Editor />}
    </>
  );
}

export default App;

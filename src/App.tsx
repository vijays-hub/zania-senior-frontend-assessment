import { useEffect } from "react";

// TODO: Fix the custom path import in TS Config
import DocumentListWrapper from "./components/Documents";
import {
  getDocumentsFromStorage,
  setDocumentsToStorage,
} from "./lib/utils/storage";
import MOCK_DOCUMENT_DATA from "./lib/constants";

function App() {
  useEffect(() => {
    /**
     * We should pre-fill our local storage with some mock data, if it's empty.
     * This will help in having some data to work with, even if the server is down.
     */
    const persistedDocuments = getDocumentsFromStorage();
    if (!persistedDocuments.length) setDocumentsToStorage(MOCK_DOCUMENT_DATA);
  }, []);

  return (
    <div className="App">
      <DocumentListWrapper />
    </div>
  );
}

export default App;

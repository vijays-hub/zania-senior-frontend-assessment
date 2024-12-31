import React, { useCallback, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DocumentCard from "./Document";
import DocumentPreview from "./Preview";
import { DocumentConfig } from "../../lib/types";
import MOCK_DOCUMENT_DATA from "../../lib/constants";
import { setDocumentsToStorage } from "../../lib/utils/storage";
import { fetchDocuments } from "../../services/documentsService";
import "./styles.css";

const DocumentListWrapper: React.FC = () => {
  // Components Utils ---> START
  const [fetchingDocuments, setFetchingDocuments] = useState(true);
  const [documents, setDocuments] = useState(MOCK_DOCUMENT_DATA);
  const [selectedDocument, setSelectedDocument] =
    useState<DocumentConfig | null>(null);
  // Components Utils ---> END

  // Hooks ---> START
  const handleCardSwap = useCallback(
    (fromIndex: number, toIndex: number) => {
      /**
       * The idea is to swap the documents array elements based on the fromIndex and toIndex.
       * Let's create a new array (shallow-copy) and swap the elements based on the indexes, so that
       * we avoid mutating the original array.
       *
       * ? What we are doing here is:
       * 1. Create a shallow copy of the documents array.
       * 2. Remove the element from the fromIndex using splice. This returns array of removed elements.
       *    We are interested in the first element, so we use array destructuring to get it.
       * 3. Insert the removed element at the toIndex using splice.
       * 4. Update the position of each document in the new array. This is essential to persist the
       *    position of the documents in the array on page refresh.
       * 5. Update the storage with new documents!
       *
       * ! Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
       */
      const newDocuments = [...documents];
      const [removed] = newDocuments.splice(fromIndex, 1);
      newDocuments.splice(toIndex, 0, removed);

      setDocumentsToStorage(newDocuments);

      setDocuments(
        newDocuments.map((doc, index) => ({
          ...doc,
          position: index,
        }))
      );
    },
    [documents]
  );

  useEffect(() => {
    async function fetchDocumentsFromServer() {
      try {
        // Fetch documents from the server
        const documents = await fetchDocuments();

        // ! Adding a delay of 1s to simulate network latency
        setTimeout(() => {
          setFetchingDocuments(false);
          setDocuments(documents);
        }, 1000);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      }
    }

    fetchDocumentsFromServer();
  }, []);
  // Hooks ---> END

  if (fetchingDocuments) {
    return (
      <div className="loading-spinner-container">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="document-container">
        <div className="document-grid">
          {documents.length ? (
            documents.map((doc, index) => (
              <DocumentCard
                key={`${doc.type}-${doc.position}`}
                document={doc}
                index={index}
                swapCard={handleCardSwap}
                onClick={() => setSelectedDocument(doc)}
              />
            ))
          ) : (
            <div className="no-documents">No documents found!</div>
          )}
        </div>
        {selectedDocument && (
          <DocumentPreview
            onClose={() => setSelectedDocument(null)}
            document={selectedDocument}
          />
        )}
      </div>
    </DndProvider>
  );
};

export default DocumentListWrapper;

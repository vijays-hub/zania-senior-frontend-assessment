import React, { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DocumentCard from "./Document";
import DocumentPreview from "./Preview";
import { DocumentConfig } from "../../lib/types";
import MOCK_DOCUMENT_DATA from "../../lib/constants";
import "./styles.css";

const DocumentListWrapper: React.FC = () => {
  // Components Utils ---> START
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
       *
       * ! Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
       */
      const newDocuments = [...documents];
      const [removed] = newDocuments.splice(fromIndex, 1);
      newDocuments.splice(toIndex, 0, removed);

      setDocuments(
        newDocuments.map((doc, index) => ({
          ...doc,
          position: index,
        }))
      );
    },
    [documents]
  );
  // Hooks ---> END

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="document-container">
        <div className="document-grid">
          {documents.map((doc, index) => (
            <DocumentCard
              key={`${doc.type}-${doc.position}`}
              document={doc}
              index={index}
              swapCard={handleCardSwap}
              onClick={() => setSelectedDocument(doc)}
            />
          ))}
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

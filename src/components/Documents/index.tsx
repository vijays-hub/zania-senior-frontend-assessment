import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DocumentCard from "./Document";
import DocumentPreview from "./Preview";
import { DocumentConfig } from "../../lib/types";
import LoadingSpinner from "../LoadingSpinner";
import useDocuments from "../../hooks/useDocuments";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import "./styles.css";

dayjs.extend(relativeTime);

const DocumentListWrapper: React.FC = () => {
  // Components Utils ---> START
  const [selectedDocument, setSelectedDocument] =
    useState<DocumentConfig | null>(null);
  // Components Utils ---> END

  const {
    documents,
    fetchingDocuments,
    lastSyncedAt,
    syncingDocuments,
    handleCardSwap,
  } = useDocuments();

  if (fetchingDocuments) return <LoadingSpinner />;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="document-container">
        {syncingDocuments && (
          <div className="sync_status">
            <LoadingSpinner />
          </div>
        )}

        <div className="last_synced">
          <h4>Last Sync: ({dayjs(lastSyncedAt.current).fromNow()})</h4>
        </div>

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

import React, { useState } from "react";
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

  return (
    <div className="document-container">
      <div className="document-grid">
        {documents.map((doc, index) => (
          <DocumentCard
            key={`${doc.type}-${doc.position}`}
            document={doc}
            index={index}
            swapCard={() => {}}
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
  );
};

export default DocumentListWrapper;

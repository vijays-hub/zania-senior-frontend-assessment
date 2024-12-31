import { useState } from "react";
import { DocumentConfig } from "../../../lib/types";
import "./styles.css";

import verticalDotIcon from "../../../assets/icons/vertical_dots_icon.webp";

type DocumentCardConfig = {
  document: DocumentConfig;
  index: number;
  onClick: () => void;
  swapCard: (fromIndex: number, toIndex: number) => void;
};

const DocumentCard: React.FC<DocumentCardConfig> = ({ document, onClick }) => {
  // Components Utils ---> START
  const [imageLoaded, setImageLoaded] = useState(false);
  // Components Utils ---> END

  return (
    <div>
      <div className="document-card" onClick={onClick}>
        {!imageLoaded && (
          <div className="loading-spinner-container">
            <div className="loading-spinner" />
          </div>
        )}
        <div>
          <img
            src={document.thumbnail}
            alt={document.title}
            className={`document-thumbnail ${!imageLoaded ? "invisible" : ""}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <div className="card-footer">
          <h3 className="document-title">{document.title}</h3>
          <img
            src={verticalDotIcon}
            alt="Vertical Dots Icon"
            className="dots-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;

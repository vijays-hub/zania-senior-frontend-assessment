import React, { useEffect } from "react";
import { DocumentConfig } from "../../../lib/types";
import "./styles.css";

const DocumentPreview: React.FC<{
  onClose: () => void;
  document: DocumentConfig;
}> = ({ onClose, document }) => {
  // Hooks ---> START
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    // Attaching keydown event listener for watching "Escape" key press on mount!
    window.addEventListener("keydown", handleEsc);

    // Cleanup: Remove event listener so that it doesn't cause memory leaks!
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);
  // Hooks ---> END

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <button onClick={onClose} className="close-button">
            X
          </button>
        </div>
        <div className="modal-content">
          <img
            src={document.thumbnail}
            alt="Document thumbnail Preview"
            className="modal-image"
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;

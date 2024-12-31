import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DocumentConfig } from "../../../lib/types";
import "./styles.css";

import verticalDotIcon from "../../../assets/icons/vertical_dots_icon.webp";

type DocumentCardConfig = {
  document: DocumentConfig;
  index: number;
  onClick: () => void;
  swapCard: (fromIndex: number, toIndex: number) => void;
};

const DocumentCard: React.FC<DocumentCardConfig> = ({
  document,
  index,
  swapCard,
  onClick,
}) => {
  // Components Utils ---> START
  const [imageLoaded, setImageLoaded] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { index },
    collect: (monitor) => ({
      // Returning the isDragging prop to check if the card is being dragged!
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "CARD",
    // TODO: Add better type for item
    drop: (item: { index: number }) => {
      if (item.index !== index) {
        /**
         * Called when a card is dropped on another card. The item.index is the index
         * of the card being dragged and index is the index of the card where it's
         * being dropped. We will call the swapCard function to swap the cards in the
         * documents array.
         */
        swapCard(item.index, index);
        // Updating the index of the dragged card!
        item.index = index;
      }
    },
  });
  // Components Utils ---> END

  return (
    <div ref={(node) => drag(drop(node))}>
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

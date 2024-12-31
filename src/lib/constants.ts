import { DOCUMENT_TYPE, DocumentConfig } from "./types";

// Assets
import bankDraft from "../assets/bank_draft.webp";
import billOfLading from "../assets/bill_of_lading.webp";
import invoice from "../assets/invoice.webp";

const MOCK_DOCUMENT_DATA: Array<DocumentConfig> = [
  {
    type: DOCUMENT_TYPE.BANK_DRAFT,
    title: "Bank Draft",
    position: 0,
    thumbnail: bankDraft,
  },
  {
    type: DOCUMENT_TYPE.BILL_OF_LADING,
    title: "Bill of Lading",
    position: 1,
    thumbnail: billOfLading,
  },
  {
    type: DOCUMENT_TYPE.INVOICE,
    title: "Invoice",
    position: 2,
    thumbnail: invoice,
  },
  {
    type: DOCUMENT_TYPE.BANK_DRAFT,
    title: "Bank Draft 2",
    position: 3,
    thumbnail: bankDraft,
  },
  {
    type: DOCUMENT_TYPE.BILL_OF_LADING,
    title: "Bill of Lading 2",
    position: 4,
    thumbnail: billOfLading,
  },
];

export default MOCK_DOCUMENT_DATA;

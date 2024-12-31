interface DocumentConfig {
  type: DOCUMENT_TYPE;
  title: string;
  position: number; // Decides the placement of the document in the list
  thumbnail: string;
}

// ENUMS
enum DOCUMENT_TYPE {
  BANK_DRAFT = "bank_draft",
  BILL_OF_LADING = "bill-of-lading",
  INVOICE = "invoice",
}

// Exporting the interface(s) and Type(s)
export type { DocumentConfig };

// Exporting the ENUMS
export { DOCUMENT_TYPE };

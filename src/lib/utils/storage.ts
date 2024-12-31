/**
 * Adding common storage functions here, like setting and getting data from local storage.
 * This will help in keeping the code DRY.
 *
 * This is our ideal CRUD operations in a server, but we are using local storage for now.
 *
 * !! Using local-storage for simplicity. We cn try indexedDB if the data grows.
 */

import { DocumentConfig } from "../types";

const DOCUMENTS_STORAGE_KEY = "documents";

const setDocumentsToStorage = (documents: DocumentConfig[]) => {
  localStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(documents));
};

const getDocumentsFromStorage = (): DocumentConfig[] => {
  const persistedDocuments = localStorage.getItem(DOCUMENTS_STORAGE_KEY);
  return persistedDocuments ? JSON.parse(persistedDocuments) : [];
};

// TODO: Add UPDATE/DELETE functions if needed!

export {
  setDocumentsToStorage,
  getDocumentsFromStorage,
  DOCUMENTS_STORAGE_KEY,
};
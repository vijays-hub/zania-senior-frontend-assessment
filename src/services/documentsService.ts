/**
 * Dump all API calls related to documents here!
 *
 * TODO: Let's have a common API service to handle all the API calls. Similar to axios but with our native fetch API.
 */

import { DocumentConfig } from "../lib/types";

export const fetchDocuments = async (): Promise<Array<DocumentConfig>> => {
  try {
    const response = await fetch("/documents");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch documents:", error);
    return [];
  }
};

import { http, HttpResponse } from "msw";
import MOCK_DOCUMENT_DATA from "../constants";

export const handlers = [
  //   Mock a GET /documents request handler
  http.get(
    `/documents`,
    // @ts-ignore
    // TODO: Fix the type of req, res, ctx
    (req, res, ctx) => {
      /**
       * We will fallback to the mock data if we don't have any documents in the database.
       * Since this is FE focused, our database would be nothing but the local storage.
       *
       * !! Using local-storage for simplicity. We cn try indexedDB if the data grows.
       */
      const persistedDocuments = localStorage.getItem("documents")
        ? JSON.parse(localStorage.getItem("documents") || "[]")
        : null;

      const documents =
        persistedDocuments && persistedDocuments.length
          ? persistedDocuments
          : MOCK_DOCUMENT_DATA;

      return HttpResponse.json(documents);
    }
  ),
];

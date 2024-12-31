import { http, HttpResponse } from "msw";
import { getDocumentsFromStorage } from "../utils/storage";

export const handlers = [
  //   Mock a GET /documents request handler
  http.get(
    `/documents`,
    // @ts-ignore
    // TODO: Fix the type of req, res, ctx
    (req, res, ctx) => {
      /**
       * ! Mocking the response from the server
       * !! Using local-storage for simplicity. We cn try indexedDB if the data grows.
       *
       * The persisted documents are fetched from the local storage. It is guaranteed that there
       * will always be data in the local storage, as we are setting the initial data in the storage
       * when the app is loaded for the first time. Checkout App.tsx for more info.
       */
      const persistedDocuments = getDocumentsFromStorage();

      return HttpResponse.json(persistedDocuments);
    }
  ),
];

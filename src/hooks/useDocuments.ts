import { useCallback, useEffect, useRef, useState } from "react";
import { DocumentConfig } from "../lib/types";
import { fetchDocuments } from "../services/documentsService";
import { setDocumentsToStorage } from "../lib/utils/storage";

const useDocuments = () => {
  // Components Utils ---> START
  const [fetchingDocuments, setFetchingDocuments] = useState(true);
  const [syncingDocuments, setSyncingDocuments] = useState(false);
  const [documents, setDocuments] = useState<Array<DocumentConfig>>([]);

  /**
   * Why are we using useRef here?
   * We could have went with one more state variable to store the last synced documents.
   * But we don't need to re-render the component when the last synced documents change.
   * So we can simply use a ref to store the last synced documents. This also helps in
   * identifying if the documents have changed since the last sync.
   */
  const lastSyncedDocuments = useRef<string>("");
  const lastSyncedAt = useRef<number>(Date.now());

  // Components Utils ---> END

  // Hooks ---> START
  const handleCardSwap = useCallback(
    (fromIndex: number, toIndex: number) => {
      /**
       * The idea is to swap the documents array elements based on the fromIndex and toIndex.
       * Let's create a new array (shallow-copy) and swap the elements based on the indexes, so that
       * we avoid mutating the original array.
       *
       * ? What we are doing here is:
       * 1. Create a shallow copy of the documents array.
       * 2. Remove the element from the fromIndex using splice. This returns array of removed elements.
       *    We are interested in the first element, so we use array destructuring to get it.
       * 3. Insert the removed element at the toIndex using splice.
       * 4. Update the storage with new documents!
       * 5. A interval is set to sync the documents with the server (our storage) every 5 seconds.
       *
       * ! Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
       */
      const newDocuments = [...documents];
      const [removed] = newDocuments.splice(fromIndex, 1);
      newDocuments.splice(toIndex, 0, removed);

      setDocuments(newDocuments);
    },
    [documents]
  );

  /**
   * A use-effect to run only when the documents change. We should be syncing our documents
   * state with the server every 5 seconds. But we should do so only if there has been a change
   * in the documents since the last sync.
   */
  useEffect(() => {
    const syncIfDocumentsChanged = async () => {
      // Check if the documents have changed since the last sync
      if (
        lastSyncedDocuments.current !==
        JSON.stringify(documents.map((doc) => doc.position)) // documents will have the latest state
      ) {
        setSyncingDocuments(true);
        try {
          // Sync documents with the server. Adding a delay of 0.5s to simulate network latency
          setTimeout(() => {
            setDocumentsToStorage(documents);
            lastSyncedDocuments.current = JSON.stringify(
              documents.map((doc) => doc.position)
            );
            lastSyncedAt.current = Date.now();
            setSyncingDocuments(false);
          }, 500);
        } catch (error) {
          console.error("Failed to sync documents:", error);
        }
      }
    };

    const syncInterval = setInterval(syncIfDocumentsChanged, 5000);

    // Clear the interval when the component unmounts - Cleanup
    return () => clearInterval(syncInterval);
  }, [documents]);

  useEffect(() => {
    async function fetchDocumentsFromServer() {
      try {
        // Fetch documents from the server
        const documents = await fetchDocuments();

        // ! Adding a delay of 1s to simulate network latency
        setTimeout(() => {
          setFetchingDocuments(false);
          setDocuments(documents);

          // Update the last synced documents. Using position as a unique identifier.
          lastSyncedDocuments.current = JSON.stringify(
            documents.map((doc) => doc.position)
          );
        }, 1000);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      }
    }

    fetchDocumentsFromServer();
  }, []);
  // Hooks ---> END

  return {
    fetchingDocuments,
    documents,
    syncingDocuments,
    lastSyncedAt,
    setDocuments,
    handleCardSwap,
  };
};

export default useDocuments;

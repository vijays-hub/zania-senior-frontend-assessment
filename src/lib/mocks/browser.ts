import { setupWorker } from "msw/browser";

import { handlers } from "./handlers";

// Setup browser service worker using the required handlers
export const worker = setupWorker(...handlers);

export const startMockServiceWorker = () => {
  worker.start();
};

export const stopMockServiceWorker = () => {
  worker.stop();
};

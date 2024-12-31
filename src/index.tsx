import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

/**
 * Mock Service Worker:
 * In order for our mock definition to execute during the runtime, it needs to be imported into
 * our application's code. However, since mocking is a development-oriented technique, we will be
 * importing our `src/mocks/browser.js` file conditionally, depending on the current environment.
 * Simply put, we don't want to import the mock service worker in production.
 */
if (process.env.NODE_ENV === "development") {
  const { startMockServiceWorker } = require("./lib/mocks/browser");
  startMockServiceWorker();
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

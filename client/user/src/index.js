import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { AuthProvider } from "./context/auth/AuthContext";
import { JobsProvider } from "./context/jobs/JobsContext";

ReactDOM.render(
  <AuthProvider>
    <JobsProvider>
      <App />
    </JobsProvider>
  </AuthProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();

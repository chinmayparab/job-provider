import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./lang/i18n";
import * as serviceWorker from "./serviceWorker";
import { AuthProvider } from "./context/auth/AuthContext";
import { JobsProvider } from "./context/jobs/JobsContext";
import { ResumeProvider } from "./context/resume/ResumeContext";
import { AlertProvider } from "./context/alert/AlertContext";

ReactDOM.render(
  <AlertProvider>
    <AuthProvider>
      <ResumeProvider>
        <JobsProvider>
          <App />
        </JobsProvider>
      </ResumeProvider>
    </AuthProvider>
  </AlertProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();

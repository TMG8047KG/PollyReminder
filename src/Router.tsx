import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Main";
import RemindMaker from './ReminderMaker';
import { BrowserRouter, Route, Routes } from "react-router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path={'/remindmaker'} element={<RemindMaker/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

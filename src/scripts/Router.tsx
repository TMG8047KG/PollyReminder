import React from "react";
import ReactDOM from "react-dom/client";
import App from "../Main";
import RemindMaker from '../ReminderFactory';
import Repeatable from '../Repeatables';
import { BrowserRouter, Route, Routes } from "react-router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path={'/remindmaker'} element={<RemindMaker/>} />
        <Route path={'/repeatable'} element={<Repeatable/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

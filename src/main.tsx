import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import TransparencyPage from "./pages/TransparencyPage";
import ServiceDetail from "./components/ServiceDetail";
import BarangayPage from "./pages/BarangayPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:id" element={<ServiceDetail />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="transparency" element={<TransparencyPage />} />
          <Route path="barangay" element={<BarangayPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

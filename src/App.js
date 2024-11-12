import React from "react";
import "./App.css";
import AvailableBus from "./Pages/AvailableBusPage/AvailableBus.js";
import AdminProfile from "./Pages/AdminProfile/AdminProfile.js";
import MainPage from "./Pages/MainPage/MainPage.js";
import NewPage from "./Pages/TestPage/NewPage.js";
import Registration from "./Pages/Registration/Registration.js";
import Autorization from "./Pages/Autorization/Autorization.js";
import MakingOrder from "./Pages/MakingOrder/MakingOrder.js";
import UserPage from "./Pages/UserPage/UserPage.js";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AssignBus from "./Pages/AssignBus/AssignBus.js";
// Создаем Redux хранилище

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/TestPage" element={<NewPage />} />
          <Route path="/Autorization" element={<Autorization />} />
          <Route path="/available-bus" element={<AvailableBus />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/MakingOrder" element={<MakingOrder />} />
          <Route path="/UserPage" element={<UserPage />} />
          <Route path="/AssignBus" element={<AssignBus />} />

          <Route path="*" element={<MainPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "../layouts/Layout";
import Home from "../pages/Home";
import { Modal } from "@mantine/core";
import { useUI } from "../contexts/UIContext";
import SignInModal from "./SignInModal";

function App() {
  const { showSignInModal, toggleSignInModal } = useUI();

  return (
    <div>
      <Modal opened={showSignInModal} onClose={() => toggleSignInModal(false)} centered>
        <SignInModal />
      </Modal>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/restaurants" element={"Restaurants"} />
          <Route path="*" element={"Not found"} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

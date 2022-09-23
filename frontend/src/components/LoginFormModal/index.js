// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import { Modal } from "../../context/modal";
import LoginForm from "./LoginForm";
import './LoginForm.css'
function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button  className="loginLnk" onClick={() => setShowModal(true)}>
        Log In
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;

// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import { Modal } from "../../context/modal";

import "../LoginFormModal/LoginForm.css";

import SignupForm from "./signupForm";


function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="loginLnk" onClick={() => setShowModal(true)}>
        SignUp
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;

import React from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../configuration";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const navigate = useNavigate();

  const onLogoutBtn = async () => {
    await signOut(auth)
      .then(() => {
        navigate("/login", { state: { isLogout: true } });
      })
      .catch((error) => {
        console.log(error.code);
      });
  };

  return (
    <div className="fixed flex justify-between bg-primaryColor top-0 left-0 right-0">
      <h1 className="p-4 text-xl font-bold text-white">Chat Web App</h1>
      <button
        className="mr-4 rounded-lg px-2 py-1 text-base text-white"
        onClick={() => onLogoutBtn()}
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
        <span className="ml-3">Logout</span>
      </button>
    </div>
  );
}

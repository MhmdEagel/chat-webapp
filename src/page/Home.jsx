import React, { useEffect, useState } from "react";
import { auth} from "../configuration";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import Navbar from "../components/Home/Navbar";
import NewMessage from "../components/Home/NewMessage";
import Messages from "../components/Home/Messages";

export default function Home() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        navigate("/login");
        console.log("user is logged out");
      }
    });
  }, []);

  return (
    <>
      <Navbar />
      <Messages currentUser={currentUser} />
      <NewMessage userObj={currentUser} />
    </>
  );
}

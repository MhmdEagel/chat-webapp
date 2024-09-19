import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configuration";

export default function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
        const uid = user.uid;
        console.log(uid);
      } else {
        navigate("/login");
        console.log("user is logged out");
      }
    });
  }, []);

  return (
    <div className="flex h-[100vh] w-[100vw] flex-col items-center justify-center gap-4 bg-primaryBackground">
      <CircularProgress size={100} />
      <div className="text-center font-bold text-white">
        <h1 className="text-4xl">Loading...</h1>
        <p className="text-lg">Please wait.</p>
      </div>
    </div>
  );
}

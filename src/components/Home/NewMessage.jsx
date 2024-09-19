import React, { useState } from "react";

import { db } from "../../configuration";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { CircularProgress } from "@mui/material";

export default function NewMessage({ userObj }) {
  const [message, SetMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmitMessage() {
    setIsLoading(true);
    await addDoc(collection(db, "chat"), {
      uid: userObj.uid,
      email: userObj.email,
      messages: message,
      timestamp: Timestamp.now().seconds,
    })
      .then(() => {
        console.log("message successfully uploaded");
      })
      .catch((error) => {
        console.log(error.code);
      });
    setIsLoading(false);
    SetMessage("");
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center gap-3 bg-blue-400 px-4 py-4">
      {isLoading ? (
        <>
          <input
            value={message}
            type="text"
            className="w-full rounded-lg px-1 py-2 focus:border-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-800"
            disabled
          />
          <CircularProgress />
        </>
      ) : (
        <input
          value={message}
          type="text"
          className="w-full rounded-lg px-1 py-2 focus:border-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-800"
          onChange={(e) => {
            SetMessage(e.target.value);
          }}
        />
      )}
      <button
        className="flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-primaryColor p-4 text-lg text-white hover:bg-white hover:text-primaryColor"
        onClick={() => onSubmitMessage()}
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </div>
  );
}

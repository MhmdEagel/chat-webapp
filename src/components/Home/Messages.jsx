import React, { useEffect, useState } from "react";
import { db } from "../../configuration";
import MessageItem from "./MessageItem";
import { CircularProgress } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";

export default function Messages({ currentUser }) {
  const [allMessages, setAllMessages] = useState(null);

  useEffect(() => {
    onSnapshot(collection(db, "chat"), (snapshot) => {
      const documents = snapshot.docs.sort(
        (a, b) => a.data().timestamp - b.data().timestamp,
      );
      setAllMessages(documents);
    });
  }, []);

  useEffect(() => {
    document
      .getElementById("scrollable-content")
      .scrollTo(0, document.getElementById("scrollable-content").scrollHeight);
  }, [allMessages])

  return (
    <div
      className="absolute bottom-0 left-0 right-0 top-0 my-24 flex flex-col overflow-auto"
      id="scrollable-content"
    >
      <section className="mx-16 mb-4 mt-auto flex flex-col items-end justify-end gap-7 pt-6">
        {allMessages ? (
          allMessages.map((message) => (
            <MessageItem
              messages={message.data().messages}
              currentUser={currentUser}
              uid={message.data().uid}
            />
          ))
        ) : (
          <div className="flex w-full justify-center">
            <CircularProgress />
          </div>
        )}
      </section>
    </div>
  );
}

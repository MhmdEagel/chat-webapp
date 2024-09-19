import { Avatar, CircularProgress } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../configuration";

export default function MessageItem({ uid, messages, currentUser }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function getUserData() {
      const userData = await getDoc(doc(db, "users", uid));
      if (userData.exists()) {
        setUserData(userData.data());
      }
    }
    getUserData();
  }, [messages]);

  return uid != currentUser.uid ? (
    <div className="relative flex flex-col items-start self-start">
      <div className="ml-6">
      {userData != null ? userData.username : <CircularProgress size={10} /> }
      </div>
      <div className="ml-4 mt-1 rounded-bl-lg rounded-br-lg rounded-tr-lg bg-primaryColor p-4 text-white">
        <p>{messages}</p>
      </div>
      <div className="absolute -left-5 -top-5">
        {userData != null ? <Avatar src={userData.imgUrl} /> : <Avatar />}
      </div>
    </div>
  ) : (
    <div className="relative flex flex-col items-end">
      <div className="mr-6 w-fit">
      {userData != null ? userData.username : <CircularProgress size={10} /> }
      </div>
      <div className="mr-4 rounded-bl-lg rounded-br-lg rounded-tl-lg bg-primaryColor p-4 text-white">
        <p>{messages}</p>
      </div>
      <div className="absolute -right-5 -top-5">
        {userData != null ? <Avatar src={userData.imgUrl} /> : <Avatar />}
      </div>
    </div>
  );
}

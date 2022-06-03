import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db from "../../../firebase";
import "./SidebarChat.css";

function SidebarChat({ addNewChat, id, name }) {
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(id + "HI this is seed for dp");
  }, [id]);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");
    if (roomName) {
      //do some clever database stuff!!
      db.collection("Rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>Last message...</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new chat</h2>
    </div>
  );
}

export default SidebarChat;

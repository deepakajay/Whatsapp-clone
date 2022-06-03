import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import db from "../../firebase";
import "./Chat.css";

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const { roomId } = useParams();

  useEffect(()=>{
      if(roomId){
          db.collection('Rooms').doc(roomId).onSnapshot(snapshot=>(
              setRoomName(snapshot.data().name)
          ))
      }
  },[roomId])

  useEffect(() => {
    setSeed(roomId + "HI this is seed for dp");
  }, [roomId]);

  const sendMessage = (event) => {
    event.preventDefault();
    setInput("");
    console.log(input);
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        <p className={`chat__message ${false && "chat__receiver"}`}>
          <span className="chat__name">Deepak</span>
          Hey guys
          <span className="chat__timeStamp">3:52PM</span>
        </p>
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;

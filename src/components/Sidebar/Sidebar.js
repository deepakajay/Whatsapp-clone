import React,{useEffect, useState} from "react";
import "./Sidebar.css";
import { Avatar, IconButton, Typography } from "@mui/material";
import {
  Chat,
  DonutLarge,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import SidebarChat from "./SidebarChat/SidebarChat";
import db from "../../firebase";
import { useStateValue } from "../../Context/StateProvider";

function Sidebar() {
const [rooms,setRooms]=useState([]);
const[{user},dispatch]=useStateValue();
const [photo,setPhoto]=useState("");

useEffect(()=>{
  db.collection('Rooms').onSnapshot((snapshot)=>
  // console.log(snapshot.docs[0].data)
  setRooms(
    snapshot.docs.map((doc)=>({
      id:doc.id,
      data:doc.data(),
    }))
  )
  )
},[user])

useEffect(()=>{
setPhoto(user.photoURL);
},[user])

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={photo} referrerpolicy="no-referrer" alt=""/>
        
        <div className="sidebar__headerRight">
        <Typography variant="h6" style={{fontWeight:700}}>{user.displayName}</Typography>
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or or start new chat" type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat/>
        {
          rooms.map(room=>(
            <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
          ))
        }
      </div>
    </div>
  );
}

export default Sidebar;

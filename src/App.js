import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Welcome from "./Welcome";
import { useState } from "react";
import LogIn from "./components/LogIn/LogIn";
import { useStateValue } from "./Context/StateProvider";

function App() {
const[{user},dispatch]=useStateValue();

  return (
    <div className="app">
      {!user ? (
        <LogIn/>
      ) : (
        <div className="app__body">
          <BrowserRouter>
            <Sidebar />
            <Routes>
              <Route path="/" element={<Chat />} />
              <Route path="/rooms/:roomId" element={<Chat />} />
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default App;

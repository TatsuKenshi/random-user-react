import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";

const url = "https://randomuser.me/api";
const defaultPortrait = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("random person");

  // array of buttons
  const infoButtons = [
    { id: "0", icon: <FaUser />, tag: "name" },
    { id: "1", icon: <FaEnvelopeOpen />, tag: "email" },
    { id: "2", icon: <FaCalendarTimes />, tag: "age" },
    { id: "3", icon: <FaMap />, tag: "street" },
    { id: "4", icon: <FaPhone />, tag: "phone" },
    { id: "5", icon: <FaLock />, tag: "password" },
  ];

  const handleValue = (e) => {
    console.log(e.target);
  };

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={(person && person.image) || defaultPortrait}
            alt="random user"
          />
          <p className="user-title">my {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            {/* map the buttons */}
            {infoButtons.map((button) => {
              const { id, icon, tag } = button;
              return (
                <button key={id} data-label={tag} onMouseOver={handleValue}>
                  {icon}
                </button>
              );
            })}
            {/* map the buttons */}
          </div>
          <button className="btn" type="button">
            {isLoading ? "loading..." : "random user"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;

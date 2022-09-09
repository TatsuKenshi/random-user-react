import React, { useState, useEffect, useRef } from "react";
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
  // initial states
  const [isLoading, setIsLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("random person");

  // fetching ref
  const shouldFetch = useRef(true);

  // array of info buttons
  const infoButtons = [
    { id: "0", icon: <FaUser />, tag: "name" },
    { id: "1", icon: <FaEnvelopeOpen />, tag: "email" },
    { id: "2", icon: <FaCalendarTimes />, tag: "age" },
    { id: "3", icon: <FaMap />, tag: "street" },
    { id: "4", icon: <FaPhone />, tag: "phone" },
    { id: "5", icon: <FaLock />, tag: "password" },
  ];

  // value state handling function
  const handleValue = (e) => {
    if (e.target.classList.contains("icon")) {
      const newValue = e.target.dataset.label;
      setTitle(newValue);
      setValue(person[newValue]);
    }
  };

  // fetching functionality
  const getUser = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const person = data.results[0];
        const { phone, email } = person;
        const { large: image } = person.picture;
        const {
          login: { password },
        } = person;
        const { first, last } = person.name;
        const {
          dob: { age },
        } = person;
        const {
          street: { number, name },
        } = person.location;

        const newPerson = {
          image,
          phone,
          email,
          password,
          age,
          street: `${number} ${name}`,
          name: `${first} ${last}`,
        };

        setPerson(newPerson);
        setTitle("name");
        setValue(newPerson.name);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (shouldFetch.current) {
      shouldFetch.current = false;
      getUser();
    }
  }, []);

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        {/* user image & info */}
        <div className="container">
          <img
            src={(person && person.image) || defaultPortrait}
            alt="random user"
          />
          <p className="user-title">my {title} is</p>
          <p className="user-value">{value}</p>
          {/* user image & info */}

          {/* map the info buttons */}
          <div className="values-list">
            {infoButtons.map((button) => {
              const { id, icon, tag } = button;
              return (
                <button
                  key={id}
                  data-label={tag}
                  className="icon"
                  onMouseOver={handleValue}
                >
                  {icon}
                </button>
              );
            })}
          </div>
          {/* map the info buttons */}

          {/* fetch button */}
          <button className="btn" type="button" onClick={getUser}>
            {isLoading ? "loading..." : "random user"}
          </button>
          {/* fetch button */}
        </div>
      </div>
    </main>
  );
}

export default App;

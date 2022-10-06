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
    if (e.currentTarget.dataset.label) {
      const newValue = e.currentTarget.dataset.label;
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
    <main className=" w-screen h-screen bg-slate-200">
      <div className="bg-stone-900 w-screen h-[40vh] text-center">
        <h1 className="pt-[10vh] text-3xl text-white font-bold">
          Random User Generator
        </h1>
      </div>
      <div className="w-screen h-[60vh]">
        {/* user image & info */}
        <div className="-mt-[15vh] w-[90vw] sm:w-[70%] max-w-[900px] text-center mx-auto p-4 bg-white rounded-md">
          <img
            className="mx-auto w-[200px] rounded-[50%]"
            src={(person && person.image) || defaultPortrait}
            alt="random user"
          />
          <p className="text-lg font-bold">Hi, my {title} is</p>
          <p className="text-xl font-bold break-all">{value}</p>
          {/* user image & info */}

          {/* map the info buttons */}
          <div className="values-list">
            {infoButtons.map((button) => {
              const { id, icon, tag } = button;
              return (
                <button
                  key={id}
                  data-label={tag}
                  className="w-[30px] h-[30px] mt-[10px]"
                  onMouseOver={handleValue}
                >
                  {icon}
                </button>
              );
            })}
          </div>
          {/* map the info buttons */}

          {/* fetch button */}
          <button
            className="text-lg font-bold border border-solid border-stone-900 px-4 rounded-xl mt-[10px]"
            type="button"
            onClick={getUser}
          >
            {isLoading ? "Loading..." : "Random User"}
          </button>
          {/* fetch button */}
        </div>
      </div>
    </main>
  );
}

export default App;

import React, { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [authToken, setAuthToken] = useState("");
  const [authUsername, setAuthUsername] = useState("");
  const [authUserId, setAuthUserId] = useState(null);

  const decodeToken = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((char) => "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  };


  const handleLogOut = () => {
    localStorage.removeItem("token");
    setAuthToken("");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = decodeToken(token);
      setAuthUserId(user);
      if (user) {
        setAuthToken(token);
      } else {
        setAuthToken("");
      }
    }
  }, []);

  return (
    <StateContext.Provider
      value={{ activeMenu, setActiveMenu, authToken, setAuthToken,handleLogOut, authUsername, setAuthUsername, authUserId, setAuthUserId}}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const authContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); 

  function insertUserToken(tkn) {
    setToken(tkn);

    const decoded = jwtDecode(tkn); 
    setUser(decoded);    

    localStorage.setItem("token", tkn);
  }

  function logoutContext() {
    setToken(null);
    setUser(null); 
    localStorage.removeItem("token");
  }

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      setToken(savedToken);

      const decoded = jwtDecode(savedToken);
      setUser(decoded);
    }
  }, []);

  return (
    <authContext.Provider
      value={{ token, user, insertUserToken, logoutContext }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
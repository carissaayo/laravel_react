import { createContext, useState, useContext } from "react";
import { User } from "../types";

const StateContext = createContext({
  user: null,
  token: null,
  notification: "",
  setUser: (user: User) => {},
  setToken: (token: string) => {},
  setNotification: (message: string) => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    name: "John Doe",
  });
  const [token, _setToken] = useState<string | null>(
    localStorage.getItem("ACCESS_TOKEN")
    // "1234"
  );
  const [notification, _setNotification] = useState("");

  const setNotification = (message: string) => {
    _setNotification(message);

    setTimeout(() => {
      _setNotification("");
    }, 5000);
  };

  const setToken = (token: string) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
        notification,
        setNotification,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

import React, { createContext, useReducer, useContext } from "react";
// Початковий стан

const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
};

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const AuthContext = createContext();

// Редуктор

const reduser = (state, action) => {
  switch (action.type) {
    case LOGIN:
      window.location.assign(`/balance?&id=${action.payload.user.id}`);
      console.log("enter");
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
      };

    case LOGOUT:
      window.location.assign("/signin");
      console.log("Exit");
      return {
        ...state,
        isAuthenticated: false,
        token: action.payload.token,
        user: null,
      };
    default:
      return state;
  }
};

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reduser, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
// Створення контексту

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth повинно використовуватися в межах AuthProvider");
  }
  return context;
};

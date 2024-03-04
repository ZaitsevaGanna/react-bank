import { createContext, useReducer, useContext } from "react";
//Початковий стан

const initialState = {
  user: { id: undefined },
  isAuthenticated: false,
  token: null,
};

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const AuthContext = createContext();

//Редуктор

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
      };

    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
//Створення контексту

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth повинно використовуватися в межах AuthProvider");
  }
  return context;
};

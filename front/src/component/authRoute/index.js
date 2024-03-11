import { Navigate } from "react-router-dom";
import { useAuth } from "../authContext";

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(";").shift();
// }

export default function AuthRoute({ element }) {
  const { state } = useAuth();
  const { token } = state;

  // Пример использования: получаем значение токена из куки с именем "token"
  // const token = getCookie("accessToken");
  //const cookie = document.cookie;

  console.log("Токен", token);

  // const token = localStorage.getItem("token");

  if (token) {
    return element;
  } else {
    return <Navigate to="/signup" />;
  }
}

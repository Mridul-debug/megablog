import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      onClick={logoutHandler}
      className="px-4 py-2 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-700 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;

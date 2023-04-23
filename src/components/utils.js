import { redirect } from "react-router-dom";

export const checkAuthLoader = () => {
  const token = localStorage.getItem("TOKEN");
  if (!token) {
    return redirect("../auth/signin");
  }
  return null;
};

import Cookies from "js-cookie";

export const handleLogout = async () => {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");

  if (accessToken) Cookies.remove("accessToken");
  if (refreshToken) Cookies.remove("refreshToken");

  window.location.href = "/";
};

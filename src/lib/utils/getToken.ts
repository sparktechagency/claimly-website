// utils/auth.js
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("accessToken");
  }
  return null;
};
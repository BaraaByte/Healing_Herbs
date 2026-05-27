
import React, { useContext } from "react";
import { userContext } from "../../context/UserContext";
import toast from "react-hot-toast";

export default function Logout() {
  const { logout } = useContext(userContext);

  const handleLogout = async () => {
    try {
      toast.success("تم تسجيل الخروج بنجاح!");
    } catch(err) {
      toast.error(err.response.data.error  || "فشل تسجيل الخروج من السيرفر.");
    } finally {
      logout();
    }
  };

  return (
    <button
      className="bg-primary text-white px-6 py-2 rounded-xl hover:opacity-90 transition-all duration-300 font-[var(--font-noto-arabic)]"
      onClick={handleLogout}
    >
      تسجيل الخروج
    </button>
  );
}

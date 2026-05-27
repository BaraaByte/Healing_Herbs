import React, { useContext } from "react";
import { userContext } from "../../context/UserContext";
import api from "../utils/axiosInstance";
import toast from "react-hot-toast";

export default function Report() {
  const { userTokenAccess } = useContext(userContext);

async function fetchReport() {
  try {
    const { data } = await api.get(
      "/api/v1/reports/health/html",
      {
        headers: {
          Authorization: `Bearer ${userTokenAccess}`,
          Accept: "text/html",
        },
        responseType: "text",
      }
    );

    const newWindow = window.open();
    newWindow.document.open();
    newWindow.document.write(data);
    newWindow.document.close();
  } catch (err) {
    console.log(err);
    
    toast.error("❌ خطأ أثناء جلب التقرير");
  }
}


  return (
    <>
      <button
        onClick={() => fetchReport(true)}
        className="bg-green-600 w-full my-3 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition shadow-md"
      >
        تحميل التقرير
      </button>
 
    </>
  );
}

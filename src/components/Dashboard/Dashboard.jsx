// import { useContext, useEffect, useState } from "react";
// import api from "../utils/axiosInstance";
// import { userContext } from "../../context/UserContext";
// import toast from "react-hot-toast";
import { Link, Outlet } from "react-router-dom";
import Report from "../Report/Report";
import Loader from "../Loader/Loader";
import { DataContext } from "../../context/DataContext";
import Stats from "./Stats/Stats";

export default function Dashboard() {

  return (
    <>
        <section className="min-h-screen bg-gray-50 font-cairo">
        <div className="flex flex-row">
        <ul className="list-none flex space-x-4 p-4 m-4 rounded-2xl bg-white shadow-md w-full justify-center">
          <li>
            <Link to={'/'}>الحساب</Link>
          </li>
          <li>
            <Link to={'appointments'}>المواعيد</Link>
          </li>
          <li>
            <Link  to={'medicalTests'}>التحاليل</Link>
          </li>
        </ul>
        </div>
          <div className="container mx-auto px-4 py-6">
          <Outlet/>
           
          </div>
        </section>
    </>
  );
}

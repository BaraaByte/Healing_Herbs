import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import AxiosInterceptor from '../../context/AxiosInterceptor'
import Footer from '../Footer/Footer'

export default function Layout() {
  return (<>
  <AxiosInterceptor>

    <Navbar/>
    <main className="bg-gradient-to-br from-emerald-50 to-green-50 pt-20 min-h-screen">
      <Outlet/>
    </main>
    <Link
        to="/chatbot"
        className="fixed bottom-8 right-8 flex items-center justify-center rounded-full bg-emerald-500 p-4 shadow-lg hover:bg-primary transition-all duration-300 z-10"
      >
        <i className="fa fa-robot fa-2x text-white"></i>
      </Link>
    <Footer/>
  </AxiosInterceptor>
  </>
  )
}

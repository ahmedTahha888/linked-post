import { useContext, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { FiMessageCircle } from "react-icons/fi";
import { IoIosMenu } from "react-icons/io";
import { PiHouseLine } from "react-icons/pi";
import { RiUser3Line } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import image from "./../../assets/WhatsApp Image 2026-03-27 at 7.41.22 PM.jpeg";
const MainNavbar = () => {
 const navigate = useNavigate()
 const { logoutContext }= useContext(authContext)
 function logout(){
  logoutContext()
  navigate("/login")
 }
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-2 py-1.5 sm:gap-3 sm:px-3 ">
        <div className="flex items-center gap-3">
          <img
            src={image}
            className="h-9 w-9 rounded-xl object-cover"
            alt="Route Posts"
          />
          <p className="hidden text-xl font-extrabold text-slate-900 sm:block">
            Route Posts
          </p>
        </div>

        <nav className="flex min-w-0 items-center gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50/90 px-1 py-1 sm:px-1.5">
          <NavLink
            to="/feed"
            className={({ isActive }) =>
              `relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 ${
                isActive ? "bg-white text-[#1f6fe5]" : "text-gray-700"
              }`
            }
          >
            <span className="relative text-xl">
              <PiHouseLine />
            </span>
            <span className="hidden sm:inline">Feed</span>
            <span className="sr-only sm:hidden">Feed</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 ${
                isActive ? "bg-white text-[#1f6fe5]" : "text-gray-700"
              }`
            }
          >
            <span className="relative text-xl">
              <RiUser3Line />
            </span>
            <span className="hidden sm:inline">Profile</span>
            <span className="sr-only sm:hidden">Profile</span>
          </NavLink>
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 ${
                isActive ? "bg-white text-[#1f6fe5]" : "text-gray-700"
              }`
            }
          >
            <span className="relative text-xl">
              <FiMessageCircle />
            </span>
            <span className="hidden sm:inline">Notifications</span>
            <span className="sr-only sm:hidden">Notifications</span>
          </NavLink>
        </nav>
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1.5 transition hover:bg-slate-100"
          >
            <img
              src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-Transparent.png"
              alt=""
              className="h-8 w-8 rounded-full object-cover"
            />
            <span>Ahmed</span>
            <span>
              <IoIosMenu />
            </span>
          </button>

          {openMenu && (
            <div className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
              <Link to="/profile" className="flex w-full items-center rounded gap-2 px-3 py-2 hover:bg-[#F1F5F9] rounded-4">
                <RiUser3Line />
                Profile
              </Link>

              <Link to='/setting' className="flex w-full items-center rounded gap-2 px-3 py-2 hover:bg-[#F1F5F9] rounded-3">
                <CiSettings />
                Settings
              </Link>

              <Link onClick={logout} className="flex w-full items-center gap-2 rounded px-3 py-2 text-red-500 hover:bg-[#FFF1F2] rounded-3">
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default MainNavbar;

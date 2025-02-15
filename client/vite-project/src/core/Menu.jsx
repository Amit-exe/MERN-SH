import { NavLink } from "react-router-dom";
import { Home } from "lucide-react";
function Menu() {
  return (
    <div className="flex flex-row  p-5 justify-between align-bottom bg-gray-800 ">
      <h1 className="text-3xl text-gray-300">MERN Skeleton</h1>
      <div className="flex flex-row gap-4 text-xl text-gray-300">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-orange-700 font-medium" : ""
          }
        >
          <Home />
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? "text-orange-700 font-medium" : ""
          }
        >
          USERS
        </NavLink>
        <NavLink
          to="/signup"
          className={({ isActive }) =>
            isActive ? "text-orange-700 font-medium" : ""
          }
        >
          SIGN UP
        </NavLink>
        <NavLink
          to="signin"
          className={({ isActive }) =>
            isActive ? "text-orange-700 font-medium" : ""
          }
        >
          SIGN IN
        </NavLink>
      </div>
    </div>
  );
}

export default Menu;

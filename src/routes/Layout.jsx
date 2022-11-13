import React from 'react';
import {NavLink, Outlet} from "react-router-dom";
import {useUserContext} from "../components/userContext";

const Layout = () => {
  const userContext = useUserContext()
  function handleLogOut() {
    userContext.setUser({email: ''})
  }

  return (
    <div className="">
      <nav className="grid grid-cols-[1fr_1fr_2fr_1fr_1fr_1fr_1fr] bg-slate-200 py-5 text-lg">
        <span className="col-start-2 text-left">
          {userContext.user.email}
        </span>
        <NavLink className="col-start-4 text-right" to="/">
          About
        </NavLink>
        <NavLink  className="text-right"
                  to={{
                    pathname: `/notes/${userContext.user.email}`,
                  }}
        >
          Notes
        </NavLink>
        <button className="text-red-300 text-right" onClick={handleLogOut}>Log out</button>
      </nav>
      <main className="grid grid-cols-[1fr_6fr_1fr]">
        <div className="col-start-2">
          <Outlet/>
        </div>
      </main>
    </div>
  );
};

export default Layout;
import { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";

import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axiosClient";

const DefaultLayout = () => {
  const { user, token, setUser, setToken, notification } = useStateContext();

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }

  const onLogout = (ev: React.FormEvent<HTMLAnchorElement>) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser(null);
      setToken(null);
    });
  };

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside>
      <div className="content">
        <header>
          <div>Header</div>

          <div>
            {user?.name} &nbsp; &nbsp;
            <a onClick={onLogout} className="btn-logout" href="#">
              Logout
            </a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        {notification && <div className="notification">{notification}</div>}
      </div>
    </div>
  );
};

export default DefaultLayout;

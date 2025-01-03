import { useState } from "react";
import { HomeIcon, UsersIcon } from "@heroicons/react/24/outline";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/services/auth/authslice";
import { Sidebar, Topbar } from "./components";

const navigation = [
  { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
  { name: "Profile", path: "/dashboard/profile", icon: UsersIcon },
];

export const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const location = useLocation();
  const onSignOut = () => {
    dispatch(logout());
  };
  const onNavigate = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <div>
      {/* Sidebar Component */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navigation={navigation}
        currentPath={location.pathname}
        onNavigate={onNavigate}
      />

      {/* Top nav + content */}
      <div className="lg:pl-72">
        <Topbar {...{ onSignOut, onSidebarOpen: setSidebarOpen }} />
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Dashboard from "../../../Components/Admin-dashboard/MainContent";
import Clients from "../../../Components/Admin-clients/Clients";
import Orders from "../../../Components/Admin-orders/Orders";
import Menus from "../../../Components/Admin-menus/Menus";
import DarkModeSwitch from "../../../Components/DarkModeSwitch/DarkModeSwitch";
import "./admin.css";

const Admin = () => {
  const [isSidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
  const [isSearchFormVisible, setSearchFormVisible] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 576) {
        setSearchFormVisible(false);
      }
      setSidebarHidden(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "Clients":
        return <Clients />;
      case "Orders":
        return <Orders />;
      case "Menus":
        return <Menus />;
      default:
        return <div>Sayfa Bulunamadı</div>;
    }
  };

  return (
    <>
      <section id="sidebar" className={isSidebarHidden ? "hide" : ""}>
        <a href="#" className="brand">
          <span className="text p-3 text-red-600">Viva La Pizza</span>
        </a>
        <ul className="side-menu top">
          {["dashboard", "Clients", "Orders", "Menus"].map((menu) => (
            <li
              key={menu}
              className={activePage === menu ? "active" : ""}
              onClick={() => setActivePage(menu)} 
            >
              <a href="#">
                <span className="text">
                  {menu.charAt(0).toUpperCase() + menu.slice(1)}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="content">
        <Navbar
          toggleSidebar={() => setSidebarHidden((prev) => !prev)}
          toggleSearchForm={() => setSearchFormVisible((prev) => !prev)}
          isSearchFormVisible={isSearchFormVisible}
        />
        {renderContent()}
      </section>

      <DarkModeSwitch isDarkMode={isDarkMode} toggleDarkMode={setDarkMode} />
    </>
  );
};

export default Admin;

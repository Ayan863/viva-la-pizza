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

  // Ekran boyutuna göre sidebar görünümünü ayarlama
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

  // Aktif sayfaya göre içerik render fonksiyonu
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
          <span className="text p-3">Viva La Pizza</span>
        </a>
        <ul className="side-menu top">
          {["dashboard", "Clients", "Orders", "Menus"].map((menu) => (
            <li
              key={menu}
              className={activePage === menu ? "active" : ""}
              onClick={() => setActivePage(menu)} // Aktif sayfayı güncelle
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

      {/* Ana içerik */}
      <section id="content">
        <Navbar
          toggleSidebar={() => setSidebarHidden((prev) => !prev)}
          toggleSearchForm={() => setSearchFormVisible((prev) => !prev)}
          isSearchFormVisible={isSearchFormVisible}
        />
        {renderContent()}
      </section>

      {/* Karanlık Mod Anahtarı */}
      <DarkModeSwitch isDarkMode={isDarkMode} toggleDarkMode={setDarkMode} />
    </>
  );
};

export default Admin;

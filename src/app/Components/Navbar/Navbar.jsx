import React from "react";

const Navbar = ({ toggleSidebar}) => {
  return (
    <nav>
      <button onClick={toggleSidebar} className="bx bx-menu"></button>
      
      <form action="#" >
        
      </form>
      <a href="#" className="profile">
        <img src="/cheaf.png" alt="Profile" />
      </a>
    </nav>
  );
};

export default Navbar;

import React from "react";
// import OrdersTable from "./OrdersTable";
// import Todos from "./Todos";

const MainContent = () => {
  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>Admin Panel</h1>
          
        </div>
        
      </div>
      <ul className="box-info">
        <li>
          <span className="text">
            <h3>1020</h3>
            <p>New Order</p>
          </span>
        </li>
        <li>
          <span className="text">
            <h3>2834</h3>
            <p>Visitors</p>
          </span>
        </li>
        <li>
          <span className="text">
            <h3>$2543</h3>
            <p>Total Sales</p>
          </span>
        </li>
      </ul>
      <div className="table-data">
        {/* <OrdersTable /> */}
        {/* <Todos /> */}
      </div>
    </main>
  );
};

export default MainContent;

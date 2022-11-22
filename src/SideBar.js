import React from "react";

const SideBar = ({ onClick, infor }) => {
  return (
    <div className="sidebar">
      <h1>SideBar</h1>
    
      <div className="listings">
        <ul>
          <li>
            ID : <strong>{infor.id}</strong>
          </li>
          <li>
            Title : <strong>{infor.title}</strong>
          </li>
          <li>
            Date : <strong>{infor.date}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;

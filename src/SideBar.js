import React from "react";
function sideBar({ content }) {
  return (


    <div className="sidebar">
        <h1>SideBar</h1>     
        <div className="listings">
      <ul>
        <li>
          ID : <strong>{content.id}</strong>
        </li>
        <li>
          Title : <strong>{content.title}</strong>
        </li>
        <li>
          Date : <strong>{content.date}</strong>
        </li>
      </ul>
      </div>
    </div>
  );
}

export default sideBar;

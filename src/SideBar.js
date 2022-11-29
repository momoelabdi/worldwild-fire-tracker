import * as React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function SideBar({ eventData }) {
  const content = eventData.map((e, i) => {
    if (e.categories[0].id === 8) {
      return (
        <ul key={i} className="item">
          <li>
            <Link to={"#"} onClick={() => null}>
              ID :<strong> {e.id}</strong>
            </Link>
          </li>

          <li>
            Title : <strong>{e.title}</strong>
          </li>
          <li>
            Date : <strong>{e.geometries[0].date.slice(0, 10)}</strong>
          </li>
        </ul>
      );
    }
    return null;
  });

  return (
    <div className="sidebar">
      <h1>SideBar</h1>
      <div className="listings">{content}</div>
    </div>
  );
}

export default SideBar;

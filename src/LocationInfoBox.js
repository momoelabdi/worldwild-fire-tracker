import React from "react";

const LocationInfoBox = ({ info }) => {
  return (
    <div className="location-info">
      <h2> Event Infos</h2>
      <ul>
        <li>
        <strong>{info.title}</strong>
        </li>
        <li>
          <strong>{info.date.slice(0, 10)}</strong>
        </li>
      </ul>
    </div>
  );
};

export default LocationInfoBox;

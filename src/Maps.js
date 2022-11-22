import React, { useState } from "react";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { pink } from "@mui/material/colors";
import LocationInfoBox from "./LocationInfoBox";

const Maps = ({ eventData }) => {
  let api_key = process.env.REACT_APP_WATER_MAP_API_KEY;

  const [locationInfo, setLocationInfo] = useState(null);
  const [isShown, setIsShown] = useState(false);

  const markers = eventData.map((ev, index) => {
    if (ev.categories[0].id === 8) {
      return (
        <Marker
          longitude={ev.geometries[0].coordinates[0]}
          latitude={ev.geometries[0].coordinates[1]}
          key={index}
          anchor="bottom"
        >
          <LocalFireDepartmentIcon
            sx={{ color: pink[500] }}
            onMouseEnter={() =>
              setIsShown(true) &
              setLocationInfo({
                id: ev.id,
                title: ev.title,
                date: ev.geometries[0].date,
              })
            }
            onMouseLeave={() => setIsShown(false)}
          />
        </Marker>
      );
    }
    return null;
  });

  console.log( eventData );

  const content = eventData.map((e, i) => {
   
    return (
      <ul key={i} className="item">
        <li >
          ID : <strong>{e.id}</strong>
        </li>
        <li  >
          Title : <strong>{e.title}</strong>
        </li>
        <li>
          Date : <strong>{e.geometries[0].date}</strong>
        </li>
      </ul>
    );
  });


  return (
    <div>
      <div className="sidebar">
        <h1>SideBar</h1>
        <div className="listings">
       {content}
       </div>  
      </div>

      <div className="map">
        <Map
          initialViewState={{
            longitude: 55.8187,
            latitude: 30.4945,
            zoom: 2,
            projection: "globe",
          }}
          // style={{ width: 800, height: 800 }}
          mapboxAccessToken={api_key}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          {markers}
        </Map>
      </div>

      {isShown
        ? locationInfo && <LocationInfoBox info={locationInfo} />
        : !isShown}
    </div>
  );
};
export default Maps;

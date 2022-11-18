import React from "react";
import "./App.css";
// import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import LocationMarker from "./LocationMarker";
import Map, { Marker } from "react-map-gl";
import { Icon } from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { pink } from '@mui/material/colors';


const Maps = ({ eventData }) => {
  let api_key = process.env.REACT_APP_WATER_MAP_API_KEY;


  const markers = eventData.map((ev, index) => {
    if (ev.categories[0].id === 8) {
      return (
        <Marker longitude={ev.geometries[0].coordinates[0]} latitude={ev.geometries[0].coordinates[1]}  key={index} anchor="bottom">
          <LocalFireDepartmentIcon sx={{ color: pink[500] }}/>
      </Marker>
       
      );
    }
    return null;
  });
// console.log(markers.coordinates[0]);
// console.log(...markers.geometries);

  return (
    <Map
      initialViewState={{
        longitude: -102.4,
        latitude: 40.0,
        zoom: 6,
        projection: 'globe',
      }}
      style={{ width: 1200, height: 800 }}
      mapboxAccessToken={api_key}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {markers}
    </Map>
  );
};
export default Maps;

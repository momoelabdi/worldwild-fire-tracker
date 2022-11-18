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
        <LocalFireDepartmentIcon sx={{ color: pink[500] }}   key={index}
          latitude={ev.geometries[0].coordinates[1]}
          longitude={ev.geometries[0].coordinates[0]}
        />
      );
    }
    return null;
  });

  console.log(markers);

  return (
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
        projection: 'globe',
      }}
      style={{ width: 600, height: 400 }}
      mapboxAccessToken={api_key}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker longitude={-100} latitude={40} anchor="bottom">
          <LocalFireDepartmentIcon sx={{ color: pink[500] }}/>
      </Marker>
    </Map>
  );
};
export default Maps;

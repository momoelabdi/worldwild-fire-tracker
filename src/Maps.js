import React, {useState} from "react";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { pink } from '@mui/material/colors';
import LocationInfoBox from "./LocationInfoBox";



const Maps = ({ eventData }) => {
  let api_key = process.env.REACT_APP_WATER_MAP_API_KEY;

  const [locationInfo, setLocationInfo ] = useState(null);

  const markers = eventData.map((ev, index) => {
    if (ev.categories[0].id === 8) {
      return (
        <Marker longitude={ev.geometries[0].coordinates[0]} latitude={ev.geometries[0].coordinates[1]}  key={index} onClick={() => setLocationInfo({id: ev.id, title: ev.title})} anchor="bottom">
          <LocalFireDepartmentIcon sx={{ color: pink[500] }}/>
      </Marker>
       
      );
    }
    return null;
  });
  return (
  <div>
    <Map
      initialViewState={{
        longitude: 55.8187,
        latitude: 30.4945,
        zoom: 2,
        // projection: 'globe',
      }}
      style={{ width: 1200, height: 800 }}
      mapboxAccessToken={api_key}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {markers}
    </Map>
    {locationInfo && <LocationInfoBox info={locationInfo} /> }
    </div>
  );
};
export default Maps;

import React from "react";
import "./App.css";
// import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import LocationMarker from "./LocationMarker";
import Map, {Marker} from 'react-map-gl';

const Maps = ({ eventData, lat, lng}) => {
  let api_key = process.env.REACT_APP_WATER_MAP_API_KEY;


  const markers = eventData.map((ev, index) => {
    if(ev.categories[0].id === 8) {
      return <LocationMarker key={index} lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]} />
    }
    console.log(lat={...ev.geometries[0].coordinates[1]});
    return null
  });



  return (
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{width: 600, height: 400}}
      mapboxAccessToken={api_key}
      mapStyle="mapbox://styles/mapbox/streets-v9"

    >

      <Marker longitude={-100} latitude={40} anchor="bottom">
        {markers}
      </Marker>
      </Map>
      );
    };
    export default Maps;

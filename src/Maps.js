import * as React from "react";
import { useRef, useState } from "react";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { Map, Marker } from "react-map-gl";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { pink } from "@mui/material/colors";
import LocationInfoBox from "./LocationInfoBox";
// import SideBar from "./SideBar";
import { Link } from "react-router-dom";

const Maps = ({ eventData }) => {
  let api_key = process.env.REACT_APP_WATER_MAP_API_KEY;
  const [locationInfo, setLocationInfo] = useState();
  const [isShown, setIsShown] = useState(false);
  const wildFires = 8;
  const mapRef = useRef();

  const initialViewState = {
    longitude: 13.3414,
    latitude: 47.332,
    zoom: 3,
    // pitch: 0,
    // bearing: 0,
    // duration: 12000, // Animate over 12 seconds
    // essential: true,
    // projection: "globe",
  };

  const markers = eventData.map((ev, index) => {
    if (ev.categories[0].id === wildFires) {
      return (
        <Marker
          key={index}
          id={ev.id}
          longitude={ev.geometries[0].coordinates[0]}
          latitude={ev.geometries[0].coordinates[1]}
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


  function flyToFire(lng, lat) {
    mapRef.current?.flyTo({
      center: [lng, lat],
      zoom: 10,
      duration: 3000,
    });
  }

  const later = markers.forEach((marker, i) => {
    for (const ids in marker) {
      return (
        <ul key={i} className="item">
          <li>
            <Link
              to={"#"}
              onClick={() =>
                flyToFire(
                  `${marker.props.longitude}`,
                  `${marker.props.latitude}`
                )
              }
            >
              ID :<sstong>{marker.props.id}</sstong>
            </Link>
          </li>
          <li>
            Title : <strong>{marker.props.title}</strong>
          </li>
        </ul>
      );
    }
  });

  // const onSelectCity = useCallback(({ latitude, longitude }) => {
  //   mapRef.current?.flyTo({
  //     center:  [latitude, longitude],
  //     zoom: 5,
  //     duration: 2000,
  //   });
  // }, []);


  // markers.forEach((marker) => {
  //   for (const ids in marker) {
      
  //     if (e.id === marker.props.id) {
  //       return (marker.props.longitude, marker.props.latitude)
  //     }
  //     return null;
  //   }
  // });
  

  return (
    <div>
      <div className="sidebar">
        <h1>SideBar</h1>
        <div className="listings">{later}</div>
      </div>
      <div className="map">
        <Map
          ref={mapRef}
          initialViewState={initialViewState}
          // style={{ width: 800, height: 800 }}
          mapboxAccessToken={api_key}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          {markers}
        </Map>
        {isShown
          ? locationInfo && <LocationInfoBox info={locationInfo} />
          : !isShown}
      </div>
    </div>
  );
};

export default Maps;

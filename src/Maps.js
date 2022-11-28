import React from "react";
import { useRef, useState } from "react";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { Map, Marker } from "react-map-gl";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { pink } from "@mui/material/colors";
import LocationInfoBox from "./LocationInfoBox";
import { Link } from "react-router-dom";

const Maps = ({ eventData }) => {
  let api_key = process.env.REACT_APP_WATER_MAP_API_KEY;

  const [locationInfo, setLocationInfo] = useState();
  const [isShown, setIsShown] = useState(false);
  const wildFires = 8;
  const mapRef = useRef();
  // const [lngLat,  setLngLat] = useState([])

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
          id={ev.id}
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

  // const onSelectCity = useCallback(({ latitude, longitude }) => {
  //   mapRef.current?.flyTo({
  //     center: { latitude, longitude },
  //     zoom: 5,
  //     duration: 2000,
  //   });
  // }, []);

  function flyToFire([lng, lat]) {
    mapRef.current?.flyTo({
      center: [lng, lat],
      zoom: 5,
      duration: 3000,
    });
  }

  const content = eventData.map((e, i) => {
    markers.forEach((marker) => {
      for (const ids in marker) {
        if (e.id === marker.props.id) {
          flyToFire([marker.props.longitude, marker.props.latitude]);
        }
      }
    });

    if (e.categories[0].id === wildFires) {
      return (
        <ul key={i} className="item">
          <li>
            <Link to={"#"} onClick={() => flyToFire()}>
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
    <div>
      <div className="sidebar">
        <h1>SideBar</h1>
        <div className="listings">{content}</div>
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

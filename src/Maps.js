import { useRef, useState, useCallback } from "react";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { Map, Marker, useMap, MapRef } from "react-map-gl";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { pink } from "@mui/material/colors";
import LocationInfoBox from "./LocationInfoBox";
import SideBar from "./SideBar";

const Maps = ({ eventData, time }) => {
  let api_key = process.env.REACT_APP_WATER_MAP_API_KEY;

  const [locationInfo, setLocationInfo] = useState(null);
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

  const onSelectCity = useCallback(({ longitude, latitude }) => {
    mapRef.current?.flyTo({
      center: [-75.343, 39.984],
      zoom: 10,
      duration: 3000,
    });
  }, []);

  return (
    <div>
       <SideBar content={locationInfo} />
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
          ? <LocationInfoBox info={locationInfo} />
          : !isShown}
      </div>
    </div>
  );
};
export default Maps;

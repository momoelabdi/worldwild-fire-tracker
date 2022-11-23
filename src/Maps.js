import { useState } from "react";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { Map, Marker, useMap } from "react-map-gl";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { pink } from "@mui/material/colors";
import LocationInfoBox from "./LocationInfoBox";

const Maps = ({ eventData }) => {
  let api_key = process.env.REACT_APP_WATER_MAP_API_KEY;

  const [locationInfo, setLocationInfo] = useState(null);
  const [isShown, setIsShown] = useState(false);
  const wildFires = 8;

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

  function NavigateButton() {
    const {current: map} = useMap();
    const onClick = () => {
      map.flyTo({latitude: 13.3414, longitude: 47.332});
    };

    return <button onClick={onClick}>Go</button>;
  }

  const content = eventData.map((e, i) => {
    if (e.categories[0].id === wildFires) {
      return (
        <ul key={i} className="item">
          <li>
            ID : <strong>{e.id}</strong>
          </li>
          <li>
            Title : <strong>{e.title}</strong>
          </li>
          <li>
            Date : <strong>{e.geometries[0].date.slice(0, 10)}</strong>
          </li>
          <li>
            Lat: <strong>{e.geometries[0].coordinates[0]}</strong>
          </li>
          <li>
            Lng: <strong>{e.geometries[0].coordinates[1]}</strong>
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
        <NavigateButton />
        <div className="listings">
          {content}
        </div>
      </div>

      <div className="map">
      <Map className="myMap"
          initialViewState={{
            longitude: 13.3414,
            latitude: 47.332,
            zoom: 3,
            // pitch: 0,
            // bearing: 0,
            // duration: 12000, // Animate over 12 seconds
            essential: true,
            // projection: "globe",
          }}
          
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

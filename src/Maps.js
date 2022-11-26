import React from "react";
import { useRef, useState, useCallback } from "react";
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
      // console.info(ev.id);
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

  // console.log(markers[44].props.id);

  markers.forEach((marker) => {
    for (let i in marker) {
      // console.log(`${marker.props.id}`)
    }
  });

  //  let marki = Object.entries(markers)
  // console.log(...marki);
  // const to = markers.map((i, index) => {
  //   return i.id
  // },[])

  const from = eventData.map((i, index) => {
    return i.id;
  });

  let x = from;

  // console.log(...x);

  const onSelectCity = useCallback(({ longitude, latitude }) => {
    mapRef.current?.flyTo({
      center: [13.3414, 47.332],
      zoom: 10,
      duration: 3000,
    });
  }, []);

  function flyToStore(currentFeature) {
    mapRef.current?.flyTo({
      center: currentFeature, //.geometries[0].coordinates,
      zoom: 10,
      duration: 3000,
    });
  }

  // const to = locationInfo.map((i, index)=> {
  //   return (<p key={index}>{i.id}</p>)
  // });

  const content = eventData.map((e, i) => {
    if (e.categories[0].id === wildFires) {
      return (
        <ul key={i} className="item">
          <li>
            {/* { e.id === i.id ? flyToStore(e.id) :  null } */}
            ID : <strong>{e.id}</strong>
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

  let to = content[44].props;

  console.log(to);

  // console.log(...content);

  content.forEach((cont) => {
    for (let ids in cont) {
      // console.log(`${cont.props}`)
    }
  });

  return (
    <div>
      <div className="sidebar">
        <h1>SideBar</h1>
        <button onClick={null}>Finder</button>
        <div className="listings">
          {from}
          {content}
        </div>
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
        {isShown ? from && <LocationInfoBox info={locationInfo} /> : !isShown}
      </div>
    </div>
  );
};
export default Maps;

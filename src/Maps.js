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
  
  const onSelectCity = useCallback(({ longitude, latitude }) => {
    mapRef.current?.flyTo({
      center: {latitude, longitude},
      zoom: 10,
      duration: 3000,
    });
  }, []);
  
  function flyToFire(coordinates ) {
    mapRef.current?.flyTo({
      center: {},
      zoom: 10,
      duration: 3000,
    });
  }


  // markers.forEach((marker) => {
  //   for (let i in marker) {
  //     return(`${marker.props.id}`)
  //   }
  // })
  // content.forEach((cont) => {
  //   for (let ids in cont) {
  //     return (`${cont.props.children[0].props.children[1].props.children}`)
  //   } 
  //   });
  
  
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
        </ul>    
      );
    }  
    return null;
  });  
  
  
  
  markers.forEach((marker) => {
    const from = eventData.map((i, index) => {
      return i.id;
    });
    
    for (const ids in marker){
      // console.log(`${marker.props.latitude} ${marker.props.longitude}`);
      let to = marker.props.id;
      if(from === to) { onSelectCity(`${marker.props.latitude} ${marker.props.longitude}`)}
      
    }})

    
    //   content.forEach((cont) => {
      //   for (const ids in cont ) {
        // let from =  content.props.children[0].props.children[1].props.children  
        // }})


  return (
    <div>
      <div className="sidebar">
        <h1>SideBar</h1>
        <div className="listings">
          {/* {from} */}
          <Link onClick={onSelectCity}> {content} </Link>
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
        {isShown ? locationInfo && <LocationInfoBox info={locationInfo} /> : !isShown}
      </div>
    </div>
  );
};
export default Maps;

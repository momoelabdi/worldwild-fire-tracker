import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";
import mapboxgl from 'mapbox-gl';
// import LocationMarker from "./LocationMarker";


const Map = ({ eventData }) => {
  let api_key = process.env.REACT_APP_WATER_MAP_API_KEY;
  mapboxgl.accessToken = api_key;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(7.627);
  const [lat, setLat] = useState(47.5151);
  const [zoom, setZoom] = useState(10.08);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
      // scrollZoom: false,
      projection: 'globe'
    });
  });


  useEffect(() => {
    if (!map.current) return;
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed());
      setLat(map.current.getCenter().lat.toFixed());
      setZoom(map.current.getZoom().toFixed());
    });
  });

  // const markers = eventData.map((ev, index) => {
  //   if (ev.categories[0].id === 8) {
  //     setLat(ev.geometries[0].coordinates[1])
  //     setLng(ev.geometries[0].coordinates[0])
  //     new mapboxgl.Marker({color: 'black', rotation: 45}).addTo(map.current).setLngLat([12.65147, 55.608166]).addTo(map.current);
  //   }
  //   console.log(ev.geometries[0].coordinates[0]);
  //   return null;
  // });
  // console.log(typeof mapboxgl.Marker)

   new mapboxgl.Marker({ color: 'black', rotation: 45 })
  .setLngLat([12.65147, 55.608166])
  .addTo(map.current);

  console.log(typeof marker2 );


  return (
    <div>
      <div className="sidebar">
        <div className="heading">
          <h1>Water Map</h1>
        </div>

        <div id="listings" className="listings"></div>
      </div>
      <div id="listings" className="listings"></div>
      <div ref={mapContainer} id="map" className="map"></div>
    </div>
  );
};

export default Map;

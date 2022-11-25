import { useRef, useState, useCallback } from "react";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { Map, Marker, useMap, MapRef } from "react-map-gl";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { pink } from "@mui/material/colors";
import LocationInfoBox from "./LocationInfoBox";

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




  const onSelectCity = useCallback(({ eventData }) => {  
    mapRef.current?.flyTo({
      center: [13.3414, 47.332],
      zoom: 10,
      duration: 3000,
    });
  }, []);




  
  const from = eventData.map((i, index) => {
    const LngLat = i.geometries[0].coordinates;
    
    return (<p key={index}>{i.geometries[0].coordinates}</p>)
  });
  const to = eventData.map((i, index) => {
    // let langLat = i.geometries[0].coordinates[1]
   
    return (<p key={index}>{i.geometries[0].coordinates}</p>)
  });
  


function flyToStore() {
  mapRef.current?.flyTo({
    center: [from.LngLat],
    zoom: 10,
    duration: 3000,
  });

}

console.log(from.LngLat);
// const to = locationInfo.map((i, index)=> {
//   return (<p key={index}>{i.id}</p>)
// });


function buildLocations(eventData) {
  
}


// console.log(...markers);
// console.log( ...markers);
// console.log( ...from);
// console.log( to);

// const content = eventData.map((e, i) => {
//   if (e.categories[0].id === wildFires) {
//     return (
//       <ul key={i} className="item">
//           <li>
//             <Link  onClick={flyToStore}>
//               {" "}
//               ID : <strong>{e.id}</strong>
//             </Link>
//           </li>
//           <li>
//             Title : <strong>{e.title}</strong>
//           </li>
//           <li>
//             Date : <strong>{e.geometries[0].date.slice(0, 10)}</strong>
//           </li>
//           <li>
//             Lat: <strong>{e.geometries[0].coordinates[0]}</strong>
//           </li>
//           <li>
//             Lng: <strong>{e.geometries[0].coordinates[1]}</strong>
//           </li>
//         </ul>
//       );
//     }
    
    // return null;
  // });

  
  // console.log(...content);
  
  /* { locationInfo && <SideBar  content={locationInfo} />} */

  return (
    <div>
      <div className="sidebar">
        <h1>SideBar</h1>
      <button onClick={flyToStore} >Finder</button>
        <div className="listings">
          {from}
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

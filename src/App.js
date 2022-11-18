import React, { useEffect, useState } from "react";
import "./App.css";
import Maps from "./Maps";
import Loader from "./Loader";
import Header from "./Header";

function App() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const res = await fetch("https://eonet.gsfc.nasa.gov/api/v2.1/events");
      const { events } = await res.json();

      setEventData(events);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  return (
    <div className="App">
      <Header />
      {!loading ? <Maps eventData={eventData} /> : <Loader />}
    </div>
  );
}

export default App;

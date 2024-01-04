import React, { useState, useEffect } from "react";
import axios from "axios";

function DestinationList() {
  const [places, setPlaces] = useState([]);
  const baseURL = "http://localhost:4001/trips?keywords=";

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(baseURL);
        setPlaces(response.data.items.slice(0, 10)); // แสดง 10 รายการเท่านั้น
      } catch (error) {
        console.error("Error fetching data: ", error);
        setPlaces([]);
      }
    };

    fetchDestinations();
  }, []);

  const handleReadMore = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="destination-list">
      <div className="place">
        {places.map((placeData, index) => (
          <div key={index}>
            <h1>{placeData.title}</h1>
            <p>{placeData.description.slice(0, 100)}</p>
            {placeData.photos && placeData.photos.length > 0 && (
              <img src={placeData.photos[0]} alt="Place" />
            )}
            <Link to={`/places/${placeData.id}`}>
              <button>Read More</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DestinationList;

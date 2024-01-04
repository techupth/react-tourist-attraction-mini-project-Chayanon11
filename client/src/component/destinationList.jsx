import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function DestinationList() {
  const [places, setPlaces] = useState([]);
  const baseURL = "http://localhost:4001/trips?keywords=";

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(baseURL);
        setPlaces(response.data.items.slice(0, 10));
      } catch (error) {
        console.error("Error fetching data: ", error);
        setPlaces([]);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <div className="destination-list">
      <h2 class="text-4xl text-blue-500 animate-slide-in-right text-center mt-8 animate-pulse">
        Top 10 Destinations
      </h2>
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

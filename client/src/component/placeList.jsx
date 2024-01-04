import React, { useEffect, useState } from "react";
import axios from "axios";

export function PlaceList() {
  const baseURL = "http://localhost:4001/trips?keywords=";
  const [places, setPlaces] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(baseURL);
        setPlaces(
          response.data && Array.isArray(response.data.data)
            ? response.data.data.slice(0, 10)
            : []
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsError(true);
        setIsLoading(false);
        setPlaces([]);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {isLoading && <h1>Loading ....</h1>}
      {isError && <h1>Request failed</h1>}
      {!isLoading && !isError && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {places.map((place, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-md">
              <h2 className="text-lg font-semibold mb-2">{place.title}</h2>
              <p className="text-gray-600 mb-2">{place.description}</p>
              {place.photos && place.photos.length > 0 && (
                <img
                  src={place.photos[0]}
                  alt="Place"
                  className="w-full rounded-md mb-2"
                />
              )}
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

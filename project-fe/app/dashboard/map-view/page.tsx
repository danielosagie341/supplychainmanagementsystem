"use client";

import React, { useEffect, useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import Autocomplete from "react-google-autocomplete";
import { useMap } from "@vis.gl/react-google-maps";
import { useGetNearbyPlaceMutation, usePostUserDirections } from "@/hooks/orders.hook";
import { get } from "http";

const MapViewPage = () => {
  const [origin, setOrigin] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(null);
  const [destination, setDestination] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  const postUserMutation = usePostUserDirections();
  const getNearbyPlaceMutation = useGetNearbyPlaceMutation();

  const GOOGLE_MAPS_API_KEY = "AIzaSyBNiQU_nkK6ddg5Ldi5Ofn_TPakcgMbCm4";
  useEffect(() => {
    if (!mapInstance || !origin || !destination) return;

    const line = new google.maps.Polyline({
      path: [origin, destination],
      geodesic: true,
      strokeColor: "#4285F4",
      strokeOpacity: 0.8,
      strokeWeight: 4,
    });

    line.setMap(mapInstance);

    return () => {
      line.setMap(null); // Clean up when re-rendering
    };
  }, [mapInstance, origin, destination]);

  const extractLocation = (place: google.maps.places.PlaceResult) => {
    if (!place.geometry || !place.geometry.location) return null;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    const address = place.formatted_address || place.name || "";

    // Optional: breakdown
    const components = place.address_components || [];

    const streetNumber =
      components.find((c) => c.types.includes("street_number"))?.long_name ||
      "";
    const route =
      components.find((c) => c.types.includes("route"))?.long_name || "";
    const locality =
      components.find((c) => c.types.includes("locality"))?.long_name || "";
    const postalCode =
      components.find((c) => c.types.includes("postal_code"))?.long_name || "";

    const fullStreetAddress =
      `${streetNumber} ${route}, ${locality} ${postalCode}`.trim();

    return {
      lat,
      lng,
      address: fullStreetAddress || address,
    };
  };

  const mapCenter = origin ?? { lat: 0, lng: 0 };

  const handleSubmit = async(destination: string,origin:{
    lat: number;
    lng: number;
    address: string;
})=>{
    await postUserMutation.mutateAsync({
      destination: destination,
      origin: origin.address,
    }).then(() => {
      getNearbyPlaceMutation.mutateAsync({
        radius:1000,
        type:"restaurant",
        location:{
          lat:37.7749,
          lng:-122.4194
        }
      });
    })
    // getNearbyPlaceMutation
  }

  if (!postUserMutation.data || !getNearbyPlaceMutation.data) {
    return (
      <div className="absolute z-10 top-5 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-xl px-6 py-4 w-[90%] max-w-xl flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Set Origin & Destination
        </h2>

        <div className="flex flex-col gap-3">
          <Autocomplete
            apiKey={GOOGLE_MAPS_API_KEY}
            placeholder="Enter origin"
            types={["address"]}
            onPlaceSelected={(place) => {
              const loc = extractLocation(place);
              if (loc) setOrigin(loc);
            }}
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <Autocomplete
            apiKey={GOOGLE_MAPS_API_KEY}
            placeholder="Enter destination"
            onPlaceSelected={(place) => {
              const loc = extractLocation(place);
              if (loc) setDestination(loc);
            }}
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
          //   disabled={!origin || !destination}
          onClick={() => {
            console.log("Origin:", origin);
            console.log("Destination:", destination);
            handleSubmit(
               destination?.address as string,
             origin as any,
            );
          }}
        >
         {postUserMutation.isPending? <div className="w-2 h-2 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div> : "Get Directions"}
        </button>
      </div>
    );
  }

  // if (postUserMutation.isPending) {
  //   return (
  //     <div className="flex flex-col items-center justify-center h-screen space-y-4">
  //       <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  //       <p className="text-gray-600 text-sm">Fetching your location...</p>
  //     </div>
  //   );
  // }

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      {/* Overlay for inputs */}

      {/* Google Map */}
      <Map
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={mapCenter}
        defaultZoom={origin ? 8 : 2}
        // center={origin || undefined}
        gestureHandling={"greedy"}
        disableDefaultUI={false}

        // onLoad={(map) => setMapInstance(map)}
      >
        {origin && <Marker position={origin} />}
        {destination && <Marker position={destination} />}
        {origin && destination && (
          <MapContent origin={origin} destination={destination} />
        )}
      </Map>
    </APIProvider>
  );
};

export default MapViewPage;

const MapContent = ({
  origin,
  destination,
}: {
  origin: any;
  destination: any;
}) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !origin || !destination) return;

    const line = new google.maps.Polyline({
      path: [origin, destination],
      geodesic: true,
      strokeColor: "#4285F4",
      strokeOpacity: 0.8,
      strokeWeight: 4,
    });

    line.setMap(map);

    return () => {
      line.setMap(null); // cleanup
    };
  }, [map, origin, destination]);

  return null;
};

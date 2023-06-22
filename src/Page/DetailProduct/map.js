import React, { useRef, useEffect, useState } from "react";
import mapboxgl, { Marker } from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoidGhhbmh0cmFuMDcxMiIsImEiOiJjbGlhaW8zZm0wM2NhM2hvaDhnc2gxb2dhIn0.ziej2ArD6334VbkoSGy0uw";

export default function Map(props) {
  const marker = ({ lat, lng, map }) => {
    new Marker({ color: "#eb1414", scale: 1 }).setLngLat([lng, lat]).addTo(map);
  };
  const mapContainer = useRef(null);
  const map = useRef(null);
  // const [lng, setLng] = useState(106.59904);
  // const [lat, setLat] = useState(10.76124);
  const [lng, setLng] = useState(props.x);
  const [lat, setLat] = useState(props.y);
  const [zoom, setZoom] = useState(14);
  //const marker = new mapboxgl.Marker()
  //.setLngLat([`${lng}, ${lat}`]).addTo(mapContainer)

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
      //marker
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on("load", () =>
      marker({ map: map.current, ...map.current.getCenter() })
    );
  });

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

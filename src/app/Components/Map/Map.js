'use client';

import React, { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css"; // Geocoder CSS
import "leaflet-control-geocoder"; 
import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk';

import styles from './map.module.css';

const Map = () => {
  const mapContainer = useRef(null);
  const searchInput = useRef(null);
  const map = useRef(null);
  const geocoder = useRef(null);
  const center = { lng: 49.8671, lat: 40.4093 };
  const [zoom] = useState(12);
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    if (map.current) return; 

    map.current = new L.Map(mapContainer.current, {
      center: L.latLng(center.lat, center.lng),
      zoom: zoom,
    });

    const mtLayer = new MaptilerLayer({
      apiKey: "k8dHGVjEkdQd7ySUbcHN",
    }).addTo(map.current);

    const customIcon = L.icon({
      iconUrl: '/location.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32], 
      popupAnchor: [0, -32], 
    });

    const reverseGeocode = (lat, lng) => {
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=k8dHGVjEkdQd7ySUbcHN`; 
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.results && data.results.length > 0) {
            const address = data.results[0].formatted;
            setSelectedLocation(address); 
          } else {
          }
        })
        .catch((error) => {
          setSelectedLocation("Xəta baş verdi.");
        });
    };
    

    map.current.on('click', function (e) {
      const { lat, lng } = e.latlng; 

      map.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.current.removeLayer(layer);
        }
      });

      L.marker([lat, lng], { icon: customIcon })
        .addTo(map.current)
        .bindPopup(`Deliver here`)
        .openPopup();

      reverseGeocode(lat, lng); 
    });

    geocoder.current = L.Control.geocoder({
      defaultMarkGeocode: true,
      geocoder: new L.Control.Geocoder.Nominatim({
        geocodingQueryParams: {
          viewbox: "49.7643,40.4093,50.3705,40.3210", 
          bounded: 1, 
        },
      }),
    }).addTo(map.current);

  }, [center.lng, center.lat, zoom]);

  return (
    <div className={styles.mapWrap}>
      <div ref={mapContainer} className={styles.map} />
    </div>
  );
};

export default Map;

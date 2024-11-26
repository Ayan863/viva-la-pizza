'use client';

import React, { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css"; // Geocoder CSS
import "leaflet-control-geocoder"; // Geocoder JS
import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk';

import styles from './map.module.css';

const Map = () => {
  const mapContainer = useRef(null);
  const searchInput = useRef(null); // Search input sahəsi üçün referans
  const map = useRef(null);
  const geocoder = useRef(null); // Geocoder referansı
  const center = { lng: 49.8671, lat: 40.4093 }; // Bakı mərkəzi
  const [zoom] = useState(12);
  const [selectedLocation, setSelectedLocation] = useState(""); // Seçilən yerin adı üçün state

  useEffect(() => {
    if (map.current) return; // stops map from initializing more than once

    // Xəritəni başlat
    map.current = new L.Map(mapContainer.current, {
      center: L.latLng(center.lat, center.lng),
      zoom: zoom,
    });

    // Maptiler qatını əlavə et
    const mtLayer = new MaptilerLayer({
      apiKey: "k8dHGVjEkdQd7ySUbcHN",
    }).addTo(map.current);

    // Marker üçün xüsusi ikon
    const customIcon = L.icon({
      iconUrl: '/location.png', // Şəkil faylının yolu
      iconSize: [32, 32], // İkonun ölçüsü
      iconAnchor: [16, 32], // İkonun xəritədə yerləşmə nöqtəsi
      popupAnchor: [0, -32], // Popup-un ikonla əlaqəli nöqtəsi
    });

    // Geocoder ilə adresi tapmaq
    const reverseGeocode = (lat, lng) => {
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=k8dHGVjEkdQd7ySUbcHN`; // API açarını buraya əlavə edin
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.results && data.results.length > 0) {
            const address = data.results[0].formatted;
            setSelectedLocation(address); // Tapılan ünvanı state-də saxla
          } else {
          }
        })
        .catch((error) => {
          setSelectedLocation("Xəta baş verdi.");
        });
    };
    

    // Xəritədə klik hadisəsini əlavə et
    map.current.on('click', function (e) {
      const { lat, lng } = e.latlng; // Klik olunan koordinatlar

      // Mövcud markerləri təmizlə (isteğe bağlı)
      map.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.current.removeLayer(layer);
        }
      });

      // Yeni marker əlavə et
      L.marker([lat, lng], { icon: customIcon })
        .addTo(map.current)
        .bindPopup(`Deliver here`)
        .openPopup();

      // Seçilən yerin adını tapmaq üçün geocode istifadə et
      reverseGeocode(lat, lng); // Geocoding ilə yerin adını tapırıq
    });

    // Geocoder əlavə et
    geocoder.current = L.Control.geocoder({
      defaultMarkGeocode: true,
      geocoder: new L.Control.Geocoder.Nominatim({
        geocodingQueryParams: {
          // Bakı üçün hədlər
          viewbox: "49.7643,40.4093,50.3705,40.3210", // Şimal-Qərb, Cənub-Şərq
          bounded: 1, // Axtarışı viewbox daxilində məhdudlaşdırır
        },
      }),
    }).addTo(map.current);

  }, [center.lng, center.lat, zoom]);

  return (
    <div className={styles.mapWrap}>
      {/* <input
        ref={searchInput} // Input sahəsi üçün referans
        type="text"
        value={selectedLocation} // Seçilən yerin adı buraya yerləşəcək
        placeholder="Search..." // Xəritədə klik ediləndə "Search..." dəyişəcək
        className={styles.searchInput}
        readOnly // İstifadəçinin dəyişdirməsinə icazə vermir
      /> */}
      <div ref={mapContainer} className={styles.map} />
    </div>
  );
};

export default Map;

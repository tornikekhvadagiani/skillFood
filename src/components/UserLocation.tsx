import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

interface Coordinates {
  lat: number;
  lng: number;
}

const UserLocation: React.FC = () => {
  const [position, setPosition] = useState<Coordinates | null>(null);

  const LocationMarker: React.FC = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
      },
    });

    return position ? <Marker position={position} /> : null;
  };

  return (
    <MapContainer center={{ lat: 41.7151, lng: 44.8271 }} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker />
    </MapContainer>
  );
};

export default UserLocation;

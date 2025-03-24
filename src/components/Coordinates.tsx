import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import L, { LatLngExpression } from "leaflet";
import { useAuth } from "../contexts/AuthContext";

const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface ICoordinates {
  lat: number;
  lng: number;
}

const LocationMarker: React.FC<{
  setPosition: (coords: ICoordinates) => void;
  position: ICoordinates | null;
}> = ({ position, setPosition }) => {
  const { setCoordinates } = useAuth(); // ✅ Now inside a component

  useMapEvents({
    click(e: L.LeafletMouseEvent) {
      const newPosition = { lat: e.latlng.lat, lng: e.latlng.lng };
      setPosition(newPosition);
      setCoordinates(newPosition);
    },
  });

  return position ? (
    <Marker position={[position.lat, position.lng]} icon={markerIcon} />
  ) : null;
};

const Coordinates: React.FC = () => {
  const [position, setPosition] = useState<ICoordinates | null>(null);

  const center: LatLngExpression = [41.7151, 44.8271];

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker setPosition={setPosition} position={position} />
    </MapContainer>
  );
};

export default Coordinates;

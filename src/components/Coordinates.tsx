import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import L, { LatLngExpression } from "leaflet";
import useUser from "../store/useUser";

const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface ICoordinates {
  lat: string | null;
  lng: string | null;
}

const LocationMarker: React.FC<{
  setPosition: (coords: ICoordinates) => void;
  position: ICoordinates | null;
}> = ({ position, setPosition }) => {
  const { setCoordinates } = useUser();

  useMapEvents({
    click(e: L.LeafletMouseEvent) {
      const newPosition: ICoordinates = {
        lat: String(e.latlng.lat),
        lng: String(e.latlng.lng),
      };
      setPosition(newPosition);
      setCoordinates(newPosition);
    },
  });

  return position && position.lat !== null && position.lng !== null ? (
    <Marker
      position={[Number(position.lat), Number(position.lng)]}
      icon={markerIcon}
    />
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

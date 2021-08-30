import L, { LatLngExpression } from "leaflet";
import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./App.css";

const svgIconWithHeading = (heading: number) => {
  return `<div style="transform: rotate(${heading}deg)"><svg width="48" height="48" viewBox="0 0 24 24">
    <path fill="#000000" d="M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z" />
 </svg></div>`;
};

const icon = (heading: number) => {
  return L.divIcon({
    html: svgIconWithHeading(heading),
    className: "",
    iconSize: [48, 48],
  });
};

const generatePlanes = (count: number) => {
  const planes = [];
  for (let key = 0; key < count; key++) {
    let heading = Math.floor(Math.random() * 360);
    let longitude = Math.random() * 3 + 40.9;
    let latitude = Math.random() * 3.8 - 72.9;
    let callSign = `plane-${key}`;

    console.log(key, longitude, latitude, heading, callSign);
    planes.push({ key, longitude, latitude, heading, callSign });
  }

  return planes.map((plane) => (
    <Marker
      key={plane.key}
      position={[plane.longitude, plane.latitude]}
      icon={icon(plane.heading)}
    >
      <Popup><span style={{ fontSize: 20 }}>{`I'm ${plane.callSign} on heading ${plane.heading}!`}</span></Popup>
    </Marker>
  ));
};

const App = () => {
  const OneHundredMilesInMeters = 160934;
  const kBosCoords: LatLngExpression = [42.3656, -71.0096];

  return (
    <MapContainer center={kBosCoords} zoom={9}>
      <Marker position={kBosCoords}>
        <Popup>
          <span style={{ fontSize: 24 }}>
            Boston Logan International Airport
          </span>
        </Popup>
      </Marker>

      {generatePlanes(60)}

      <Circle
        center={kBosCoords}
        radius={OneHundredMilesInMeters}
        fillColor={"transparent"}
      />

      {/* TileLayer with Attribution is required to use Open Street Maps */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default App;

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { MapPin } from 'lucide-react';
import { formatDistance } from '../utils/distance';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in Leaflet with React
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// SVG for user location marker
const userLocationSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10" fill="#3B82F6" fill-opacity="0.2"/>
    <circle cx="12" cy="12" r="3" fill="#3B82F6"/>
  </svg>
`;

// Custom icon for user location
const userIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(userLocationSvg),
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

// Component to auto-fit map bounds
const MapBounds = ({ institutions, userLocation }) => {
  const map = useMap();

  useEffect(() => {
    const bounds = [];
    
    // Add institution locations
    institutions.forEach(inst => {
      bounds.push([inst.location.lat, inst.location.lng]);
    });
    
    // Add user location if available
    if (userLocation?.lat && userLocation?.lng) {
      bounds.push([userLocation.lat, userLocation.lng]);
    }
    
    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [institutions, userLocation, map]);

  return null;
};

const Map = ({ institutions = [], userLocation = null, onInstitutionClick = null }) => {
  // Default center
  const defaultCenter = [43.6532, -79.3832];
  const center = userLocation?.lat && userLocation?.lng 
    ? [userLocation.lat, userLocation.lng]
    : defaultCenter;

  return (
    <div className="w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-soft border border-neutral-200">
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ minHeight: '400px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapBounds institutions={institutions} userLocation={userLocation} />
        
        {/* User location marker */}
        {userLocation?.lat && userLocation?.lng && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>
              <div className="p-2">
                <p className="font-semibold text-primary-900">Your Location</p>
              </div>
            </Popup>
          </Marker>
        )}
        
        {/* Institution markers */}
        {institutions.map((institution) => (
          <Marker
            key={institution.id}
            position={[institution.location.lat, institution.location.lng]}
            eventHandlers={{
              click: () => {
                if (onInstitutionClick) {
                  onInstitutionClick(institution);
                }
              },
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-neutral-900 mb-1">
                  {institution.name}
                </h3>
                <p className="text-sm text-neutral-600 mb-2">
                  {institution.location.address}
                </p>
                {institution.distance !== undefined && (
                  <div className="flex items-center gap-1 text-sm text-primary-700">
                    <MapPin size={14} />
                    <span>{formatDistance(institution.distance)} away</span>
                  </div>
                )}
                {institution.website && (
                  <a
                    href={institution.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-700 hover:text-primary-900 underline mt-2 inline-block"
                  >
                    Visit website
                  </a>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;

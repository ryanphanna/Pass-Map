import { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import Map from '../components/Map';
import ExhibitDetail from '../components/ExhibitDetail';
import { exhibits, institutions } from '../data/sampleData';
import { sortByDistance } from '../utils/distance';
import { MapPin, Navigation as NavigationIcon } from 'lucide-react';

const MapView = () => {
  const { userLocation, setUserLocation } = useApp();
  const [selectedExhibit, setSelectedExhibit] = useState(null);
  const [showNearMeOnly, setShowNearMeOnly] = useState(false);
  const [sortedInstitutions, setSortedInstitutions] = useState(institutions);
  const [locationPermission, setLocationPermission] = useState('prompt');

  // Request user's geolocation
  useEffect(() => {
    const getUserLocation = async () => {
      if ('geolocation' in navigator) {
        try {
          const permission = await navigator.permissions.query({ name: 'geolocation' });
          setLocationPermission(permission.state);

          if (permission.state === 'granted' || permission.state === 'prompt') {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                setUserLocation(prev => ({
                  city: prev?.city || null,
                  neighborhood: prev?.neighborhood || null,
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                }));
                setLocationPermission('granted');
              },
              (error) => {
                console.log('Geolocation error:', error);
                setLocationPermission('denied');
              }
            );
          }
        } catch (error) {
          console.log('Permission query error:', error);
        }
      }
    };

    getUserLocation();
  }, [setUserLocation]);

  // Sort institutions by distance when user location changes
  const sortedInstitutionsByDistance = useMemo(() => {
    if (userLocation?.lat && userLocation?.lng) {
      return sortByDistance(institutions, userLocation);
    }
    return institutions;
  }, [userLocation]);

  useEffect(() => {
    setSortedInstitutions(sortedInstitutionsByDistance);
  }, [sortedInstitutionsByDistance]);

  // Filter institutions for "Near me" (within 10km)
  const getFilteredInstitutions = () => {
    if (showNearMeOnly && userLocation?.lat && userLocation?.lng) {
      return sortedInstitutions.filter(inst => inst.distance && inst.distance <= 10);
    }
    return sortedInstitutions;
  };

  const filteredInstitutions = getFilteredInstitutions();

  return (
    <div className="min-h-screen bg-accent-cream pb-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-neutral-900 via-primary-900 to-primary-800 text-white py-16 sm:py-20 px-6 sm:px-8 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/10 rounded-full -translate-y-48 translate-x-48 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-sage/10 rounded-full translate-y-32 -translate-x-48 blur-3xl" />

        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center gap-3 mb-4">
            <MapPin size={20} className="text-accent-gold" strokeWidth={2.5} />
            <span className="text-caption text-white/70 uppercase tracking-widest">Explore</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-4 text-shadow-editorial leading-none">
            Map View
          </h1>
          <p className="text-body-lg text-white/75 max-w-2xl leading-magazine">
            Discover cultural institutions on an interactive map
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 -mt-8 mb-6">
        <div className="bg-white rounded-2xl shadow-soft p-4 flex flex-wrap items-center justify-between gap-4">
          {/* Institution Count */}
          <div className="text-neutral-700 font-medium">
            Showing {filteredInstitutions.length} institution{filteredInstitutions.length !== 1 ? 's' : ''}
          </div>

          {/* Near Me Filter */}
          {userLocation?.lat && userLocation?.lng && (
            <button
              onClick={() => setShowNearMeOnly(!showNearMeOnly)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                showNearMeOnly
                  ? 'bg-accent-sage text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <NavigationIcon size={18} />
              Near Me (10km)
            </button>
          )}

          {/* Location Status */}
          {locationPermission === 'denied' && (
            <div className="text-sm text-neutral-600 flex items-center gap-2">
              <MapPin size={16} />
              <span>Enable location for distance info</span>
            </div>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="h-[600px]">
          <Map
            institutions={filteredInstitutions}
            userLocation={userLocation}
            onInstitutionClick={(institution) => {
              // Find exhibits for this institution and show the first one
              const institutionExhibits = exhibits.filter(
                ex => ex.institutionId === institution.id
              );
              if (institutionExhibits.length > 0) {
                setSelectedExhibit(institutionExhibits[0]);
              }
            }}
          />
        </div>
      </div>

      {/* Exhibit Detail Modal */}
      {selectedExhibit && (
        <ExhibitDetail
          exhibit={selectedExhibit}
          onClose={() => setSelectedExhibit(null)}
        />
      )}
    </div>
  );
};

export default MapView;

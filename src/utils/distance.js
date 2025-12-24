/**
 * Calculate the distance between two geographic coordinates using the Haversine formula
 * @param {number} lat1 - Latitude of first point
 * @param {number} lon1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lon2 - Longitude of second point
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
};

/**
 * Convert degrees to radians
 * @param {number} degrees 
 * @returns {number} Radians
 */
const toRad = (degrees) => {
  return degrees * (Math.PI / 180);
};

/**
 * Format distance for display
 * @param {number} distance - Distance in kilometers
 * @returns {string} Formatted distance string
 */
export const formatDistance = (distance) => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance.toFixed(1)}km`;
};

/**
 * Sort institutions by distance from a given location
 * @param {Array} institutions - Array of institution objects with location.lat and location.lng
 * @param {Object} userLocation - User location with lat and lng properties
 * @returns {Array} Sorted institutions with distance property added
 */
export const sortByDistance = (institutions, userLocation) => {
  if (!userLocation || !userLocation.lat || !userLocation.lng) {
    return institutions;
  }

  return institutions
    .map(institution => ({
      ...institution,
      distance: calculateDistance(
        userLocation.lat,
        userLocation.lng,
        institution.location.lat,
        institution.location.lng
      )
    }))
    .sort((a, b) => a.distance - b.distance);
};

/**
 * Filter institutions within a certain radius
 * @param {Array} institutions - Array of institution objects
 * @param {Object} userLocation - User location with lat and lng
 * @param {number} radiusKm - Radius in kilometers
 * @returns {Array} Filtered institutions
 */
export const filterByRadius = (institutions, userLocation, radiusKm = 10) => {
  if (!userLocation || !userLocation.lat || !userLocation.lng) {
    return institutions;
  }

  return institutions.filter(institution => {
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      institution.location.lat,
      institution.location.lng
    );
    return distance <= radiusKm;
  });
};

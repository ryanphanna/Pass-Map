import { describe, it, expect } from 'vitest';
import { 
  calculateDistance, 
  formatDistance, 
  sortByDistance, 
  filterByRadius 
} from './distance';

describe('Distance Utilities', () => {
  describe('calculateDistance', () => {
    it('should calculate distance between two points correctly', () => {
      // Toronto coordinates (CN Tower to ROM)
      const lat1 = 43.6426; // CN Tower
      const lng1 = -79.3871;
      const lat2 = 43.6677; // ROM
      const lng2 = -79.3948;

      const distance = calculateDistance(lat1, lng1, lat2, lng2);
      
      // Expected distance is approximately 2.9 km
      expect(distance).toBeGreaterThan(2.5);
      expect(distance).toBeLessThan(3.5);
    });

    it('should return 0 for same location', () => {
      const lat = 43.6532;
      const lng = -79.3832;
      
      const distance = calculateDistance(lat, lng, lat, lng);
      
      expect(distance).toBe(0);
    });

    it('should calculate large distances correctly', () => {
      // Toronto to New York (approximately 550 km)
      const torontoLat = 43.6532;
      const torontoLng = -79.3832;
      const nyLat = 40.7128;
      const nyLng = -74.0060;

      const distance = calculateDistance(torontoLat, torontoLng, nyLat, nyLng);
      
      expect(distance).toBeGreaterThan(500);
      expect(distance).toBeLessThan(600);
    });
  });

  describe('formatDistance', () => {
    it('should format distances under 1km in meters', () => {
      expect(formatDistance(0.5)).toBe('500m');
      expect(formatDistance(0.123)).toBe('123m');
      expect(formatDistance(0.999)).toBe('999m');
    });

    it('should format distances over 1km in kilometers', () => {
      expect(formatDistance(1.0)).toBe('1.0km');
      expect(formatDistance(2.5)).toBe('2.5km');
      expect(formatDistance(10.789)).toBe('10.8km');
    });

    it('should handle very small distances', () => {
      expect(formatDistance(0.001)).toBe('1m');
      expect(formatDistance(0.0)).toBe('0m');
    });

    it('should handle very large distances', () => {
      expect(formatDistance(100)).toBe('100.0km');
      expect(formatDistance(555.555)).toBe('555.6km');
    });
  });

  describe('sortByDistance', () => {
    const institutions = [
      { id: '1', name: 'Institution 1', location: { lat: 43.6677, lng: -79.3948 } }, // ROM
      { id: '2', name: 'Institution 2', location: { lat: 43.6426, lng: -79.3871 } }, // CN Tower
      { id: '3', name: 'Institution 3', location: { lat: 43.6536, lng: -79.3925 } }, // AGO
    ];

    it('should sort institutions by distance from user location', () => {
      const userLocation = { lat: 43.6532, lng: -79.3832 }; // Downtown Toronto

      const sorted = sortByDistance(institutions, userLocation);
      
      // Check that distance property is added
      expect(sorted[0]).toHaveProperty('distance');
      expect(sorted[1]).toHaveProperty('distance');
      expect(sorted[2]).toHaveProperty('distance');
      
      // Check that distances are in ascending order
      expect(sorted[0].distance).toBeLessThanOrEqual(sorted[1].distance);
      expect(sorted[1].distance).toBeLessThanOrEqual(sorted[2].distance);
    });

    it('should return original array if no user location provided', () => {
      const sorted = sortByDistance(institutions, null);
      
      expect(sorted).toEqual(institutions);
    });

    it('should return original array if user location has no coordinates', () => {
      const sorted = sortByDistance(institutions, { city: 'Toronto' });
      
      expect(sorted).toEqual(institutions);
    });

    it('should handle empty institutions array', () => {
      const sorted = sortByDistance([], { lat: 43.6532, lng: -79.3832 });
      
      expect(sorted).toEqual([]);
    });
  });

  describe('filterByRadius', () => {
    const institutions = [
      { id: '1', name: 'Institution 1', location: { lat: 43.6677, lng: -79.3948 } }, // ROM (~2km)
      { id: '2', name: 'Institution 2', location: { lat: 43.8176, lng: -79.1859 } }, // Zoo (~30km)
      { id: '3', name: 'Institution 3', location: { lat: 43.6536, lng: -79.3925 } }, // AGO (~1km)
    ];

    it('should filter institutions within specified radius', () => {
      const userLocation = { lat: 43.6532, lng: -79.3832 }; // Downtown Toronto
      
      const filtered = filterByRadius(institutions, userLocation, 5);
      
      // Should include ROM and AGO but not Zoo
      expect(filtered.length).toBe(2);
      expect(filtered.find(i => i.id === '1')).toBeDefined(); // ROM
      expect(filtered.find(i => i.id === '3')).toBeDefined(); // AGO
      expect(filtered.find(i => i.id === '2')).toBeUndefined(); // Zoo
    });

    it('should use default radius of 10km if not specified', () => {
      const userLocation = { lat: 43.6532, lng: -79.3832 };
      
      const filtered = filterByRadius(institutions, userLocation);
      
      // Should include ROM and AGO but not Zoo
      expect(filtered.length).toBe(2);
    });

    it('should return all institutions with large radius', () => {
      const userLocation = { lat: 43.6532, lng: -79.3832 };
      
      const filtered = filterByRadius(institutions, userLocation, 100);
      
      expect(filtered.length).toBe(3);
    });

    it('should return original array if no user location provided', () => {
      const filtered = filterByRadius(institutions, null, 10);
      
      expect(filtered).toEqual(institutions);
    });

    it('should return original array if user location has no coordinates', () => {
      const filtered = filterByRadius(institutions, { city: 'Toronto' }, 10);
      
      expect(filtered).toEqual(institutions);
    });

    it('should handle empty institutions array', () => {
      const filtered = filterByRadius([], { lat: 43.6532, lng: -79.3832 }, 10);
      
      expect(filtered).toEqual([]);
    });
  });
});

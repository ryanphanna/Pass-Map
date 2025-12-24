import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ExhibitCard from './ExhibitCard';
import { AppProvider } from '../context/AppContext';

// Mock the getInstitutionById function
vi.mock('../data/sampleData', () => ({
  getInstitutionById: () => ({
    id: 1,
    name: 'Test Institution',
    location: { lat: 0, lng: 0 }
  })
}));

// Helper to render component with context
const renderWithContext = (component) => {
  return render(
    <AppProvider>
      {component}
    </AppProvider>
  );
};

describe('ExhibitCard - Date Handling', () => {
  beforeEach(() => {
    // Reset any previous time mocks
    vi.useRealTimers();
  });

  afterEach(() => {
    // Restore time after each test
    vi.useRealTimers();
  });

  describe('getDaysUntilEnd() - Basic Functionality', () => {
    it('should return null for permanent exhibits', () => {
      const exhibit = {
        id: 1,
        title: 'Permanent Exhibit',
        description: 'Test description',
        image: 'test.jpg',
        institutionId: 1,
        isPermanent: true,
        endDate: null,
        isFree: false
      };

      renderWithContext(<ExhibitCard exhibit={exhibit} />);
      
      // Should show "Permanent" badge instead of days countdown
      expect(screen.getByText('Permanent')).toBeInTheDocument();
      expect(screen.queryByText(/\d+ days/)).not.toBeInTheDocument();
    });

    it('should return null for exhibits without endDate', () => {
      const exhibit = {
        id: 1,
        title: 'No End Date Exhibit',
        description: 'Test description',
        image: 'test.jpg',
        institutionId: 1,
        isPermanent: false,
        endDate: null,
        isFree: false
      };

      renderWithContext(<ExhibitCard exhibit={exhibit} />);
      
      // Should not show days countdown
      expect(screen.queryByText(/\d+ days/)).not.toBeInTheDocument();
      expect(screen.queryByText('Ending Soon')).not.toBeInTheDocument();
    });

    it('should calculate days correctly for future date', () => {
      // Mock current date to be January 1, 2025
      const mockDate = new Date('2025-01-01T12:00:00Z');
      vi.setSystemTime(mockDate);

      const exhibit = {
        id: 1,
        title: 'Future Exhibit',
        description: 'Test description',
        image: 'test.jpg',
        institutionId: 1,
        isPermanent: false,
        endDate: '2025-01-15', // 14 days from now
        isFree: false
      };

      renderWithContext(<ExhibitCard exhibit={exhibit} />);
      
      // Should show 14 days
      expect(screen.getByText('14 days')).toBeInTheDocument();
    });

    it('should return null for past dates (never show negative days)', () => {
      // Mock current date to be January 15, 2025
      const mockDate = new Date('2025-01-15T12:00:00Z');
      vi.setSystemTime(mockDate);

      const exhibit = {
        id: 1,
        title: 'Past Exhibit',
        description: 'Test description',
        image: 'test.jpg',
        institutionId: 1,
        isPermanent: false,
        endDate: '2025-01-05', // 10 days ago
        isFree: false
      };

      renderWithContext(<ExhibitCard exhibit={exhibit} />);
      
      // Should not show any days countdown (no negative values)
      expect(screen.queryByText(/\d+ days/)).not.toBeInTheDocument();
      expect(screen.queryByText(/-\d+ days/)).not.toBeInTheDocument();
    });

    it('should show "Ending Soon" for 1 day remaining', () => {
      // Mock current date to be January 14, 2025
      const mockDate = new Date('2025-01-14T12:00:00Z');
      vi.setSystemTime(mockDate);

      const exhibit = {
        id: 1,
        title: 'Tomorrow Exhibit',
        description: 'Test description',
        image: 'test.jpg',
        institutionId: 1,
        isPermanent: false,
        endDate: '2025-01-15', // 1 day from now
        isFree: false
      };

      renderWithContext(<ExhibitCard exhibit={exhibit} />);
      
      // Should show "Ending Soon" badge (1 day is within 7 days threshold)
      expect(screen.getByText('Ending Soon')).toBeInTheDocument();
    });
  });

  describe('getDaysUntilEnd() - Timezone Edge Cases', () => {
    it('should handle timezone boundaries correctly (start of day normalization)', () => {
      // Mock current date late in the day (11:59 PM)
      const mockDate = new Date('2025-01-01T23:59:59Z');
      vi.setSystemTime(mockDate);

      const exhibit = {
        id: 1,
        title: 'Timezone Test Exhibit',
        description: 'Test description',
        image: 'test.jpg',
        institutionId: 1,
        isPermanent: false,
        endDate: '2025-01-15',
        isFree: false
      };

      renderWithContext(<ExhibitCard exhibit={exhibit} />);
      
      // Should still calculate as 14 days due to normalization
      expect(screen.getByText('14 days')).toBeInTheDocument();
    });

    it('should handle different date string formats', () => {
      const mockDate = new Date('2025-01-01T00:00:00Z');
      vi.setSystemTime(mockDate);

      // Test with ISO format
      const exhibit = {
        id: 1,
        title: 'ISO Date Exhibit',
        description: 'Test description',
        image: 'test.jpg',
        institutionId: 1,
        isPermanent: false,
        endDate: '2025-01-15T00:00:00Z',
        isFree: false
      };

      renderWithContext(<ExhibitCard exhibit={exhibit} />);
      
      expect(screen.getByText('14 days')).toBeInTheDocument();
    });

    it('should return null when exhibit ends today at start of day', () => {
      // Mock current date to be January 15, 2025 at start of day
      const mockDate = new Date('2025-01-15T00:00:00Z');
      vi.setSystemTime(mockDate);

      const exhibit = {
        id: 1,
        title: 'Ends Today Exhibit',
        description: 'Test description',
        image: 'test.jpg',
        institutionId: 1,
        isPermanent: false,
        endDate: '2025-01-15',
        isFree: false
      };

      renderWithContext(<ExhibitCard exhibit={exhibit} />);
      
      // Should not show days (0 days = already ended)
      expect(screen.queryByText(/\d+ days/)).not.toBeInTheDocument();
    });
  });

  describe('getDaysUntilEnd() - Ending Soon Badge', () => {
    it('should show "Ending Soon" badge for exhibits with 7 or fewer days', () => {
      const mockDate = new Date('2025-01-01T12:00:00Z');
      vi.setSystemTime(mockDate);

      const exhibit = {
        id: 1,
        title: 'Ending Soon Exhibit',
        description: 'Test description',
        image: 'test.jpg',
        institutionId: 1,
        isPermanent: false,
        endDate: '2025-01-08', // 7 days from now
        isFree: false
      };

      renderWithContext(<ExhibitCard exhibit={exhibit} />);
      
      // Should show "Ending Soon" badge (days count is hidden when badge shows)
      expect(screen.getByText('Ending Soon')).toBeInTheDocument();
      // Days count is not shown in metadata when ending soon badge is displayed
    });

    it('should not show "Ending Soon" badge for exhibits with more than 7 days', () => {
      const mockDate = new Date('2025-01-01T12:00:00Z');
      vi.setSystemTime(mockDate);

      const exhibit = {
        id: 1,
        title: 'Not Ending Soon Exhibit',
        description: 'Test description',
        image: 'test.jpg',
        institutionId: 1,
        isPermanent: false,
        endDate: '2025-01-10', // 9 days from now
        isFree: false
      };

      renderWithContext(<ExhibitCard exhibit={exhibit} />);
      
      // Should show days but not "Ending Soon" badge
      expect(screen.queryByText('Ending Soon')).not.toBeInTheDocument();
      expect(screen.getByText('9 days')).toBeInTheDocument();
    });
  });

  describe('getDaysUntilEnd() - Edge Cases', () => {
    it('should use Math.ceil to round up partial days', () => {
      // This test verifies that the calculation handles partial days correctly
      // When there's 1 day remaining (within 7 days threshold), shows "Ending Soon" badge
      const mockDate = new Date('2025-01-01T12:00:00Z');
      vi.setSystemTime(mockDate);

      const exhibit = {
        id: 1,
        title: 'Ceil Test Exhibit',
        description: 'Test description',
        image: 'test.jpg',
        institutionId: 1,
        isPermanent: false,
        endDate: '2025-01-02', // Less than 1 full day but should show as 1 day
        isFree: false
      };

      renderWithContext(<ExhibitCard exhibit={exhibit} />);
      
      // Should show "Ending Soon" badge since 1 day <= 7 days threshold
      expect(screen.getByText('Ending Soon')).toBeInTheDocument();
    });

    it('should handle leap year correctly', () => {
      const mockDate = new Date('2024-02-28T12:00:00Z');
      vi.setSystemTime(mockDate);

      const exhibit = {
        id: 1,
        title: 'Leap Year Exhibit',
        description: 'Test description',
        image: 'test.jpg',
        institutionId: 1,
        isPermanent: false,
        endDate: '2024-03-01', // 2 days from now (Feb 29 is leap day)
        isFree: false
      };

      renderWithContext(<ExhibitCard exhibit={exhibit} />);
      
      // Should show "Ending Soon" badge since 2 days <= 7 days threshold
      expect(screen.getByText('Ending Soon')).toBeInTheDocument();
    });

    it('should handle year boundaries correctly', () => {
      const mockDate = new Date('2024-12-31T12:00:00Z');
      vi.setSystemTime(mockDate);

      const exhibit = {
        id: 1,
        title: 'New Year Exhibit',
        description: 'Test description',
        image: 'test.jpg',
        institutionId: 1,
        isPermanent: false,
        endDate: '2025-01-15', // 15 days into new year
        isFree: false
      };

      renderWithContext(<ExhibitCard exhibit={exhibit} />);
      
      expect(screen.getByText('15 days')).toBeInTheDocument();
    });
  });
});

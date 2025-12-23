# 🗺️ Development Roadmap

This document tracks known issues, improvements, and future enhancements for the Culture Discovery app. Items are organized by priority and can be tackled in any order.

---

## 🔴 High Priority - Core UX Gaps

### 1. Make Exhibit Cards Clickable

**Problem:** Cards show `cursor-pointer` but have no click handler - exhibits aren't actually clickable.

**What's Needed:**
- Create ExhibitDetail component/modal that shows:
  - Full description
  - Institution hours and admission prices
  - Directions/location
  - Link to purchase tickets
  - Accessibility information
- Add click handler to ExhibitCard
- Decide on modal vs full page view

**Files to modify:** `src/components/ExhibitCard.jsx`, new `src/components/ExhibitDetail.jsx`

---

### 2. Make App City-Agnostic

**Problem:** App is hardcoded for "Toronto" everywhere but should work for any city.

**What's Needed:**
- Remove "Toronto" from all component text
- Make it "Culture [CityName]" where city comes from user settings
- Update navigation, headers, and page titles
- `index.html` title should be dynamic or generic "Culture Discovery"

**Files to modify:**
- `src/components/Navigation.jsx`
- `src/pages/Discover.jsx`
- `src/pages/Saved.jsx`
- `index.html`

---

### 3. Add Search & Filter Functionality

**Problem:** No way to search for specific exhibits or filter the feed.

**What's Needed:**
- Search bar component that filters by:
  - Exhibit title
  - Institution name
  - Description keywords
- Filter options:
  - Date range
  - Free vs paid
  - Interests
  - Institution type
- Add to Discover page

**Files to modify:** `src/pages/Discover.jsx`, new `src/components/SearchBar.jsx`, new `src/components/FilterPanel.jsx`

---

### 4. Add Loading States

**Problem:** No loading indicators - will be needed when connecting to Airtable API.

**What's Needed:**
- Create skeleton loading components for:
  - ExhibitCard skeleton
  - Feed loading state
  - Page loading state
- Add loading state to AppContext

**Files to create:** `src/components/SkeletonCard.jsx`, `src/components/LoadingState.jsx`

**Files to modify:** `src/context/AppContext.jsx`

---

## 🟡 Medium Priority - Polish & Improvements

### 5. Liquid Glass Bottom Navigation

**Problem:** Top navigation isn't mobile-optimized. Liquid glass bottom nav would be more contemporary.

**What's Needed:**
- Move navigation to bottom on mobile
- Add liquid glass blur effect (backdrop-filter)
- Keep top nav on desktop, bottom nav on mobile
- Smooth animations between states

**Files to modify:** `src/components/Navigation.jsx`, `src/index.css`

---

### 6. Wire Up Visit Tracking

**Problem:** `markVisited()` function exists but is never called - no UI to track visits.

**What's Needed:**
- Add "Mark as Visited" button in exhibit detail view
- Show visit history in Settings
- Use visit data to improve "Worth Another Visit" section
- Add visual indicator on cards for visited exhibits

**Files to modify:** `src/components/ExhibitDetail.jsx`, `src/pages/Settings.jsx`, `src/components/ExhibitCard.jsx`

---

### 7. Add Error Boundaries

**Problem:** No graceful error handling if components crash.

**What's Needed:**
- Create ErrorBoundary component
- Wrap app and major sections
- Show friendly error message instead of blank screen
- Add error logging (console for now)

**Files to create:** `src/components/ErrorBoundary.jsx`

**Files to modify:** `src/App.jsx`, `src/main.jsx`

---

### 8. Optimize Images

**Problem:** Using external Unsplash URLs without optimization, no lazy loading.

**What's Needed:**
- Add `loading="lazy"` to all images
- Consider using Unsplash API with size parameters
- Add fallback images for broken links
- Add blur-up placeholder effect

**Files to modify:** `src/components/ExhibitCard.jsx`, `src/components/ReciprocalCard.jsx`

---

### 9. Remove Unused Code

**Problem:** `src/App.css` is imported but contains default Vite boilerplate that's not used.

**What's Needed:**
- Delete `src/App.css`
- Remove import from `src/App.jsx`
- Verify nothing breaks

**Files to delete:** `src/App.css`

**Files to modify:** `src/App.jsx`

---

### 10. Expand Data Structure for Airtable

**Problem:** Current data structure is missing fields needed for full functionality.

**What's Needed:** Update `src/data/sampleData.js` to include:

**Institutions:**
```javascript
{
  // ... existing fields
  hours: {
    monday: "10:00 AM - 5:00 PM",
    tuesday: "10:00 AM - 5:00 PM",
    wednesday: "10:00 AM - 5:00 PM",
    thursday: "10:00 AM - 9:00 PM",
    friday: "10:00 AM - 5:00 PM",
    saturday: "10:00 AM - 5:00 PM",
    sunday: "10:00 AM - 5:00 PM"
  },
  admissionPrices: {
    adult: 25,
    student: 15,
    senior: 20,
    child: 10,
    member: 0
  },
  contactInfo: {
    phone: "+1-416-555-0100",
    email: "info@institution.org"
  },
  accessibility: ["wheelchair", "audio-guide", "asl"],
  parking: "Street parking and paid lot available"
}
```

**Exhibits:**
```javascript
{
  // ... existing fields
  ticketUrl: "https://...",
  gallery: "2nd Floor, North Wing",
  accessibility: ["wheelchair", "audio-guide"],
  recommendedDuration: "60-90 minutes",
  ageRecommendation: "8+"
}
```

**Files to modify:** `src/data/sampleData.js`

---

## 🟢 Low Priority - Future Enhancements

### 11. Add Location Features

**Problem:** Have lat/lng data but no map view or distance calculations.

**What's Needed:**
- Add map view showing institutions
- Calculate distance from user location
- Sort by distance
- "Near me" filter
- Consider using Mapbox or Google Maps

**Files to create:** `src/components/Map.jsx`

**Files to modify:** `src/pages/Discover.jsx`, `src/data/sampleData.js`

---

### 12. PWA Features

**Problem:** Not installable as a Progressive Web App.

**What's Needed:**
- Create `manifest.json`:
```json
{
  "name": "Culture Discovery",
  "short_name": "Culture",
  "description": "Discover cultural institutions and exhibits",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#f7f5f2",
  "theme_color": "#1c1917",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```
- Add service worker for offline support
- Add "Add to Home Screen" prompt
- Cache static assets

**Files to create:** `public/manifest.json`, `public/sw.js`

**Files to modify:** `index.html`, `vite.config.js`

---

### 13. Add Sharing Features

**Problem:** Can't share exhibits or saved collections.

**What's Needed:**
- Share button on exhibit cards
- Native Web Share API support
- Fallback for copy link
- Social media meta tags in `index.html`
- Generate shareable URLs for exhibits

**Files to modify:** `src/components/ExhibitCard.jsx`, `index.html`

---

### 14. Accessibility Improvements

**Problem:** Some interactive elements missing proper ARIA labels, focus states could be better.

**What's Needed:**
- Audit with aXe or Lighthouse
- Add missing ARIA labels
- Improve focus indicators (keyboard navigation)
- Verify color contrast meets WCAG AA
- Add skip-to-content link
- Test with screen reader

**Files to modify:** Multiple component files

---

### 15. Environment Setup for Airtable

**Problem:** No environment variable handling for API keys.

**What's Needed:**
- Create `.env.example`:
```env
VITE_AIRTABLE_API_KEY=your_api_key_here
VITE_AIRTABLE_BASE_ID=your_base_id_here
```
- Add `.env` to `.gitignore` (already there)
- Update README with setup instructions
- Create Airtable service module

**Files to create:** `.env.example`, `src/services/airtable.js`

**Files to modify:** `README.md`

---

### 16. Code Splitting

**Problem:** All pages load upfront instead of lazy loading.

**What's Needed:**
```javascript
// In App.jsx
import { lazy, Suspense } from 'react';

const Discover = lazy(() => import('./pages/Discover'));
const Saved = lazy(() => import('./pages/Saved'));
const Settings = lazy(() => import('./pages/Settings'));

// Wrap in Suspense with loading fallback
```

**Files to modify:** `src/App.jsx`

---

### 17. Component Optimization

**Problem:** Components re-render unnecessarily.

**What's Needed:**
- Wrap ExhibitCard in `React.memo()`
- Wrap ReciprocalCard in `React.memo()`
- Use `useMemo()` for expensive calculations (like filtering, sorting)
- Use `useCallback()` for event handlers passed as props

**Files to modify:** `src/components/ExhibitCard.jsx`, `src/components/ReciprocalCard.jsx`, `src/pages/Discover.jsx`

---

### 18. Custom Favicon & Branding

**Problem:** Still using default Vite logo.

**What's Needed:**
- Design/source custom favicon
- Create multiple sizes (16x16, 32x32, 180x180, 512x512)
- Update `index.html` with proper favicon links
- Add Apple touch icons

**Files to modify:** `public/` folder, `index.html`

---

### 19. Date Handling Improvements

**Problem:** Date calculations don't handle timezones or negative days.

**What's Needed:**
```javascript
// In ExhibitCard.jsx
const getDaysUntilEnd = () => {
  if (!exhibit.endDate || exhibit.isPermanent) return null;

  const now = new Date();
  now.setHours(0, 0, 0, 0); // Normalize to start of day

  const end = new Date(exhibit.endDate);
  end.setHours(0, 0, 0, 0);

  const diffTime = end - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays > 0 ? diffDays : null; // Return null if already ended
};
```

**Files to modify:** `src/components/ExhibitCard.jsx`

---

### 20. Testing Setup

**Problem:** No tests or testing infrastructure.

**What's Needed:**
- Install Vitest and React Testing Library
- Configure Vitest for React
- Add test scripts to package.json
- Create example tests for:
  - Component rendering
  - Context functionality
  - User interactions
- Set up GitHub Actions for CI

**Files to create:** `vitest.config.js`, test files in `src/**/*.test.jsx`

**Files to modify:** `package.json`

---

## 📝 Notes

- These issues are prioritized but can be tackled in any order
- Each issue is designed to be independent where possible
- High priority issues are core UX gaps that affect usability
- Medium priority issues improve polish and prepare for Airtable integration
- Low priority issues are nice-to-haves for future iterations

## 🎯 Suggested Order of Implementation

1. **Make cards clickable** - Biggest UX gap, users can't interact with exhibits
2. **City-agnostic branding** - Important for scalability beyond Toronto
3. **Loading states** - Needed before Airtable integration
4. **Search & filter** - Major usability improvement for browsing
5. **Liquid glass bottom nav** - Modern mobile UX enhancement
6. **Everything else** - As time permits based on priority

---

## 🔄 How to Use This Roadmap

When ready to tackle an issue:
1. Pick an item from the list
2. Reference the "Files to modify/create" section
3. Follow the implementation details provided
4. Test thoroughly
5. Commit with a clear message referencing the issue number
6. Check off the item once complete

Feel free to implement any of these issues by referencing the issue number or title!

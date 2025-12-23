# Toronto Culture Discovery App

A React web app for discovering cultural institutions and exhibits in Toronto. Browse museums, galleries, zoos, and special exhibits with a beautiful, magazine-style interface.

## Features

### 🎨 Three Main Views

1. **Discover** - Curated feed with:
   - Special exhibits ending soon (with countdown)
   - Reciprocal membership benefits
   - Free access opportunities
   - Interest-matched permanent exhibits
   - Institutions you haven't visited recently

2. **Saved** - Bookmark your favorite exhibits for later

3. **Settings** - Manage:
   - Your memberships (ROM, AGO, Toronto Zoo, etc.)
   - Cultural interests (art, science, history, etc.)
   - Location preferences

### ✨ Key Features

- **Mobile-first design** - Responsive layout optimized for all devices
- **Bento-grid layout** - Varied card sizes create a dynamic, magazine-like experience
- **Local storage** - All preferences saved in your browser
- **Interest matching** - Personalized recommendations based on your preferences
- **Smart notifications** - See exhibits ending soon without urgency
- **Reciprocal benefits** - Discover where your memberships provide extra benefits

## Tech Stack

- **React 19** - Built with Vite for fast development
- **Tailwind CSS 4** - Clean, contemporary styling
- **Lucide React** - Beautiful, consistent icons
- **Local Storage** - Client-side data persistence

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ryanphanna/Pass-Map.git
cd Pass-Map
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment to GitHub Pages

This app is configured for automatic deployment to GitHub Pages.

### Automatic Deployment

The app automatically deploys when you push to the `main` branch or any `claude/*` branch. The GitHub Actions workflow handles building and deploying.

### Manual Deployment

You can also deploy manually using:

```bash
npm run deploy
```

This will build the app and push the `dist` directory to the `gh-pages` branch.

### GitHub Pages Setup

**IMPORTANT**: For GitHub Pages to work with GitHub Actions, you must configure your repository settings:

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Build and deployment**:
   - **Source**: Select **"GitHub Actions"** from the dropdown (NOT "Deploy from a branch")
4. Click **Settings** → **Actions** → **General** (in the left sidebar)
5. Scroll to **Workflow permissions** at the bottom:
   - Select **"Read and write permissions"**
   - Check **"Allow GitHub Actions to create and approve pull requests"**
   - Click **Save**

Once configured, the app will automatically deploy when you push to `main` or any `claude/*` branch.

The app will be available at: `https://ryanphanna.github.io/Pass-Map/`

#### Troubleshooting

If you get a 403 or 404 error:
- Verify the Pages source is set to "GitHub Actions" (not "Deploy from a branch")
- Check that workflow permissions are set to "Read and write"
- Ensure the repository is public (or you have GitHub Pro for private repos)
- Wait 1-2 minutes after the first successful deployment for DNS to propagate

## Data Structure

The app currently uses hardcoded sample data in `src/data/sampleData.js`. The data structure is designed to be easily replaced with Airtable API calls.

### Institutions

```javascript
{
  id: 'rom',
  name: 'Royal Ontario Museum',
  type: 'museum',
  location: { address, neighborhood, lat, lng },
  membershipTiers: ['individual', 'family'],
  website: 'https://...',
  image: 'https://...'
}
```

### Exhibits

```javascript
{
  id: 'rom-1',
  institutionId: 'rom',
  title: 'Exhibit Name',
  type: 'permanent' | 'special' | 'program',
  description: '...',
  startDate: '2024-01-01' | null,
  endDate: '2024-12-31' | null,
  isPermanent: boolean,
  interests: ['art', 'culture'],
  image: 'https://...',
  isFree: boolean,
  freeAccessDetails: { days, times }
}
```

### Reciprocal Benefits

```javascript
{
  id: 'rom-ago',
  fromInstitutionId: 'rom',
  toInstitutionId: 'ago',
  membershipTier: 'family',
  benefit: '10% discount',
  description: '...'
}
```

## Development Roadmap

For a comprehensive list of planned features, improvements, and known issues, see **[ROADMAP.md](./ROADMAP.md)**.

The roadmap includes 20+ items organized by priority:
- 🔴 **High Priority** - Core UX gaps (clickable cards, search/filter, loading states)
- 🟡 **Medium Priority** - Polish & improvements (bottom nav, error handling, image optimization)
- 🟢 **Low Priority** - Future enhancements (PWA features, maps, testing, accessibility)

Each item includes detailed implementation notes, affected files, and code examples.

## Project Structure

```
toronto-culture-app/
├── src/
│   ├── components/       # Reusable components
│   │   ├── Navigation.jsx
│   │   ├── ExhibitCard.jsx
│   │   └── ReciprocalCard.jsx
│   ├── context/         # React Context providers
│   │   └── AppContext.jsx
│   ├── data/            # Sample data
│   │   └── sampleData.js
│   ├── pages/           # Page components
│   │   ├── Discover.jsx
│   │   ├── Saved.jsx
│   │   └── Settings.jsx
│   ├── App.jsx          # Root component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── .github/workflows/   # GitHub Actions
└── package.json
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Sample images from [Unsplash](https://unsplash.com)
- Icons from [Lucide](https://lucide.dev)
- Built with [Vite](https://vite.dev) and [React](https://react.dev)

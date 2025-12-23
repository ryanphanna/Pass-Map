import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Navigation from './components/Navigation';
import ErrorBoundary from './components/ErrorBoundary';
import Discover from './pages/Discover';
import Saved from './pages/Saved';
import Settings from './pages/Settings';

function App() {
  const [currentView, setCurrentView] = useState('discover');

  const renderView = () => {
    switch (currentView) {
      case 'discover':
        return <ErrorBoundary><Discover onNavigate={setCurrentView} /></ErrorBoundary>;
      case 'saved':
        return <ErrorBoundary><Saved /></ErrorBoundary>;
      case 'settings':
        return <ErrorBoundary><Settings /></ErrorBoundary>;
      default:
        return <ErrorBoundary><Discover onNavigate={setCurrentView} /></ErrorBoundary>;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-accent-cream">
        <Navigation currentView={currentView} setCurrentView={setCurrentView} />
        <main className="pt-20">
          {renderView()}
        </main>
      </div>
    </AppProvider>
  );
}

export default App;

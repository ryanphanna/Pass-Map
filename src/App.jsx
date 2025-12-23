import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Navigation from './components/Navigation';
import Discover from './pages/Discover';
import Saved from './pages/Saved';
import Settings from './pages/Settings';

function App() {
  const [currentView, setCurrentView] = useState('discover');

  const renderView = () => {
    switch (currentView) {
      case 'discover':
        return <Discover />;
      case 'saved':
        return <Saved />;
      case 'settings':
        return <Settings />;
      default:
        return <Discover />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Navigation currentView={currentView} setCurrentView={setCurrentView} />
        <main className="pt-16">
          {renderView()}
        </main>
      </div>
    </AppProvider>
  );
}

export default App;

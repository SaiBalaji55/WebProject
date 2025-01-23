import React, { useState } from 'react';
import { PortfolioBuilder } from './components/PortfolioBuilder';
import { Login } from './components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<{ username: string; email: string } | null>(null);

  const handleLogin = (username: string, email: string) => {
    setUserData({ username, email });
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <PortfolioBuilder initialUserData={userData} />
      )}
    </div>
  );
}

export default App;
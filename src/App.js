import React from 'react';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="app-title">Dev Dynamics Dashboard</h1>
        <p className="app-subtitle">Welcome to the Dev Dynamics Team Dashboard</p>
      </header>
      <main>
        <Dashboard />
      </main>
      <footer>
        <p className="footer-text">© 2024 Dev Dynamics. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

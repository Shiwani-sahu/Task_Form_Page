// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Form from './pages/Form';
import LocalStoragePage from './pages/LocalStoragePage';
import FirebasePage from './pages/FirebasePage';
import './index.css';

import EditForm from './components/EditForm';

const App = () => (
  <Router>
    <div className="app-container">
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/">Form</Link>
          </li>
          <li>
            <Link to="/local-storage">Local Storage</Link>
          </li>
          <li>
            <Link to="/firebase">Firebase</Link>
            
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/local-storage" element={<LocalStoragePage />} />
        <Route path="/firebase" element={<FirebasePage />} />
        <Route path="/edit/:id" element={<EditForm />} />
      </Routes>
    </div>
  </Router>
);

export default App;

import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation, Link } from 'react-router-dom';
import WikipediaSearch from '../Search/Search.js';
// import { useAuth0 } from "@auth0/auth0-react"; // Commented out useAuth0 import
// import { NavBarButtons } from '../Main/Main.js';
import './App.css';
import Card from '../Card/Card.js';
import useSearchResults from '../hooks/useSearchResults.js';
import Profile from '../UserView/UserView.js';
import ErrorBoundary from '../Errors/ErrorBoundary.js';

function App() {
  const [isLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication

  const navigate = useNavigate();
  const location = useLocation();
  const showRandomControversy = location.pathname !== '/profile';
  const [savedControversies, setSavedControversies] = useState([]);

  const randomSearchInputs = ['4chan', 'Titan (Submersible)', 'Billy Mitchell (gamer)', 'You Showed Me', 'Ezra Miller', 'Russell Brand', 'Bernie Madoff', 'Amy Winehouse','Erika Jayne', 'Clinton body count conspiracy theory'];
  const { initialResults, controversies, triggerSearch } = useSearchResults();

  const randomSearch = () => {
    const randomIndex = Math.floor(Math.random() * randomSearchInputs.length);
    triggerSearch(randomSearchInputs[randomIndex]);
  };

  const saveControversy = (snippetToShow, isFavorite = false) => {
    const controversyObject = {
      isFavorite: isFavorite,
      content: snippetToShow,
    };
    setSavedControversies([...savedControversies, controversyObject]);
  };

  useEffect(() => {
    randomSearch();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true); // Set isAuthenticated to true on login button click
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Set isAuthenticated to false on logout button click
  };

  if (isLoading) {
    return (
      <div className="page-loading">
        <p>One moment please</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="App">
        <header className="App-header">
          <Link to="/" className="logo-link"> 
            <h1 className='header-text'>H8rAid!</h1>
          </Link>
          {isAuthenticated && <button id='profile' onClick={() => navigate("/profile")}>Profile</button>}
          {/* <NavBarButtons /> */}
          {!isAuthenticated ? (
            <button className="button__login" onClick={handleLogin}>
              Log In
            </button>
          ) : (
            <button className="button__logout" onClick={handleLogout}>
              Log Out
            </button>
          )}
        </header>
        <Routes>
        <Route path='/' element={<WikipediaSearch isAuthenticated={isAuthenticated} savedControversies={savedControversies} saveControversy={saveControversy} />} />
          <Route path='/main' element={<Navigate to='/' />} />
          <Route path='/profile' element={<Profile savedControversies={savedControversies} />} />
          <Route path="article/:id" element={<WikipediaSearch />} />
        </Routes>
        {showRandomControversy && ( 
        <section className='random-view'>
          <h2 className='random-headline'>Random Controversy</h2>
          {controversies[0] && <h2 className='result-name'>{initialResults.title}</h2>}
          <section className='results-list'>
          {controversies.map((item, i) => (
            <Card
              key={i}
              title={item.parse.title}
              snippet={item.parse.text["*"]}
              onSave={() => saveControversy(item.parse.text["*"])} 
              onSaveAsFavorite={() => saveControversy(item.parse.text["*"], true)}
            />
          ))}
          </section>
        </section>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;
import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Card from '../Card/Card';
import './Search.css';
import useSearchResults from '../hooks/useSearchResults';

function WikipediaSearch({ saveControversy, isAuthenticated }) {
  const [searchInput, setSearchInput] = useState('');
  const { initialResults, controversies, triggerSearch } = useSearchResults();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== '') {
      triggerSearch(searchInput);
    }
    setSearchInput('');
  };

  // const { isAuthenticated } = useAuth0();

  return (
    <main>
      <div className='search-banner'>
        {isAuthenticated && (
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              autoComplete="off"
              placeholder="Search on Wikipedia"
              aria-label="Search Wikipedia"
            />
            <button id="search-button"type="submit">Search</button>
          </form>
        )}
        {controversies[0] && <h2 className='result-name'>Controversies for {initialResults.title}</h2>}
      </div>
      <div>
        {controversies.length > 0 && (
          <section>
            <section className="results-list">
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
    </main>
  );
};

export default WikipediaSearch;
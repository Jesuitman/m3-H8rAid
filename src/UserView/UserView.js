import React, { useState } from 'react';
import Card from '../Card/Card';
import PropTypes from "prop-types";
import './UserView.css';

const Profile = ({ savedControversies }) => {
  const [showFavorites, setShowFavorites] = useState(false);

  const handleShowAll = () => {
    setShowFavorites(false);
  };

  const handleShowFavorites = () => {
    setShowFavorites(true);
  };

  const filteredControversies = showFavorites
    ? savedControversies.filter((controversy) => controversy.isFavorite)
    : savedControversies;

  return (
    <div className="profile">
      <div className="filter-buttons">
        <button class="show-all"onClick={handleShowAll}>Show All</button>
        <button class="show-favorites"onClick={handleShowFavorites}>Show Favorites</button>
      </div>
      <h2 className='random-headline'>Saved Controversies</h2>
      <div>
        {filteredControversies.map((controversy, index) => (
          <Card
            key={index}
            snippet={controversy.content}
            onSave={() => {
            }}
            onSaveAsFavorite={() => {
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;

Profile.propTypes = {
  savedControversies: PropTypes.array.isRequired,
}
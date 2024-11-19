import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ setSearchQuery }) => {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/">AnimeForum</Link>
        <Link to="/">Home</Link>
        <Link to="/create">Create Post</Link>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search posts"
          onChange={(e) => setSearchQuery(e.target.value)}
          className='search-box'
        />
      </div>
    </nav>
  );
};


export default Navbar;

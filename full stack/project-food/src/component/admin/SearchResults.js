import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = () => {
    const location = useLocation();
    const results = location.state?.results || { foods: [], categories: [], users: [] };

    // Theme state to toggle between light and dark
    const [theme, setTheme] = useState('light');

    // Function to toggle theme
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className={`search-results-container ${theme}`}>
            <h1>Search Results</h1>

            <div className="cards-container">
                {/* Food Results */}
                <div className={`result-card ${theme}`}>
                    <h2>Foods</h2>
                    {results.foods.length > 0 ? (
                        results.foods.map((food) => (
                            <div key={food.id} className="card-item">
                                <p><strong>Name:</strong> {food.name}</p>
                                <p><strong>Price:</strong> {food.price}</p>
                                <p><strong>Type:</strong> {food.type}</p>
                                <p><strong>Description:</strong> {food.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No foods found</p>
                    )}
                </div>

                {/* Category Results */}
                <div className={`result-card ${theme}`}>
                    <h2>Categories</h2>
                    {results.categories.length > 0 ? (
                        results.categories.map((category) => (
                            <div key={category.id} className="card-item">
                                <p><strong>Category Name:</strong> {category.name}</p>
                            </div>
                        ))
                    ) : (
                        <p>No categories found</p>
                    )}
                </div>

                {/* User Results */}
                <div className={`result-card ${theme}`}>
                    <h2>Users</h2>
                    {results.users.length > 0 ? (
                        results.users.map((user) => (
                            <div key={user.id} className="card-item">
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Phone:</strong> {user.phone}</p>
                                <p><strong>Type:</strong> {user.type}</p>
                            </div>
                        ))
                    ) : (
                        <p>No users found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchResults;















//import React from 'react';
//import { useLocation } from 'react-router-dom';
//
//const SearchResults = () => {
//    const location = useLocation();
//    const results = location.state?.results || { foods: [], categories: [], users: [] };
//
//    return (
//        <div>
//            <h1>Search Results</h1>
//
//            {/* Display Foods */}
//            <h2>Foods</h2>
//            {results.foods.length > 0 ? (
//                <ul>
//                    {results.foods.map(food => (
//                        <li key={food.id}>{food.name} - {food.price}</li>
//                    ))}
//                </ul>
//            ) : (
//                <p>No foods found</p>
//            )}
//
//            {/* Display Categories */}
//            <h2>Categories</h2>
//            {results.categories.length > 0 ? (
//                <ul>
//                    {results.categories.map(category => (
//                        <li key={category.id}>{category.name}</li>
//                    ))}
//                </ul>
//            ) : (
//                <p>No categories found</p>
//            )}
//
//            {/* Display Users */}
//            <h2>Users</h2>
//            {results.users.length > 0 ? (
//                <ul>
//                    {results.users.map(user => (
//                        <li key={user.id}>{user.name} - {user.email}</li>
//                    ))}
//                </ul>
//            ) : (
//                <p>No users found</p>
//            )}
//        </div>
//    );
//};
//
//export default SearchResults;
//



//import React from 'react';
//
//const SearchResults = () => {
//
//  return (
//    <div>
//      <h1>Search Results</h1>
//
//    </div>
//  );
//};
//
//export default SearchResults;

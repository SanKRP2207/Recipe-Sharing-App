import React, { useEffect, useState } from 'react';
import { getRecipes, addToFavorites } from '../services/firestore';

import { useAuth } from '../context/AuthContext';

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [favoriteStatus, setFavoriteStatus] = useState({});
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipes = await getRecipes();
      setRecipes(recipes);
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    setFilteredRecipes(
      recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, recipes]);

  const handleAddToFavorites = async (recipeId) => {
    if (!currentUser) {
      alert('You need to be logged in to add favorites.');
      return;
    }

    try {
      await addToFavorites(currentUser.uid, recipeId);
      setFavoriteStatus(prevStatus => ({
        ...prevStatus,
        [recipeId]: true
      }));
    } catch (error) {
      console.error('Error adding to favorites: ', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <input
          className="w-full p-3 mb-6 text-xl border rounded"
          type="text"
          placeholder="Search recipes"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredRecipes.map(recipe => (
          <div key={recipe.id} className="block p-6 bg-white shadow-md rounded-lg">

            <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
            <p className="text-sm text-gray-700"><strong>Ingredients</strong>{recipe.ingredients}</p>
            <p className="text-sm text-gray-700"><strong>instructions</strong>{recipe.instructions}</p>

            <button
              onClick={() => handleAddToFavorites(recipe.id)}
              className={`mt-4 p-2 rounded ${favoriteStatus[recipe.id] ? 'bg-green-500' : 'bg-blue-500'} text-white hover:bg-blue-600`}
              disabled={favoriteStatus[recipe.id]}
            >
              {favoriteStatus[recipe.id] ? 'Favorited' : 'Add to Favorites'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

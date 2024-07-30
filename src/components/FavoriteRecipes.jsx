import React, { useEffect, useState } from 'react';
import { getFavoriteRecipes } from '../services/firestore';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const fetchFavorites = async () => {
        const favoriteRecipes = await getFavoriteRecipes(currentUser.uid);
        setFavorites(favoriteRecipes);
      };

      fetchFavorites();
    }
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Favorite Recipes</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favorites.map(recipe => (
          <Link to={`/recipes/${recipe.id}`} key={recipe.id} className="block p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
            <p className="text-sm text-gray-700">{recipe.ingredients.substring(0, 200)}...</p>
            <p className="text-sm text-gray-700">{recipe.instructions.substring(0, 200)}...</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

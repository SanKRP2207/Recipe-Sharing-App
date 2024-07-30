import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SignUp from './components/SignUp';
import Login from './components/Login';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import FavoriteRecipes from './components/FavoriteRecipes';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar/>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/add-recipe" element={<RecipeForm />} />
            <Route path="/favorites" element={<FavoriteRecipes />} />
            <Route path="/" element={<RecipeList />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

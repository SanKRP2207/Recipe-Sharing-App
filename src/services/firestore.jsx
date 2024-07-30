import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

export const getRecipes = async () => {
  const snapshot = await getDocs(collection(firestore, 'recipes'));
  const recipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return recipes;
};

export const createRecipe = async (recipe) => {
  await addDoc(collection(firestore, 'recipes'), recipe);
};

export const getRecipeById = async (id) => {
  const docRef = doc(firestore, 'recipes', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const updateRecipe = async (id, updatedRecipe) => {
  const docRef = doc(firestore, 'recipes', id);
  await updateDoc(docRef, updatedRecipe);
};

export const deleteRecipe = async (id) => {
  const docRef = doc(firestore, 'recipes', id);
  await deleteDoc(docRef);
};

export const getFavoriteRecipes = async (userId) => {
  const snapshot = await getDocs(collection(firestore, `users/${userId}/favorites`));
  const favorites = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return favorites;
};

export const addToFavorites = async (userId, recipeId) => {
  const docRef = doc(firestore, 'recipes', recipeId);
  const recipeSnap = await getDoc(docRef);

  if (recipeSnap.exists()) {
    const recipeData = recipeSnap.data();
    const userFavoritesRef = collection(firestore, `users/${userId}/favorites`);
    await addDoc(userFavoritesRef, { ...recipeData, id: recipeId });
  } else {
    throw new Error('Recipe does not exist');
  }
};
export const removeFromFavorites = async (userId, recipeId) => {
  const userFavoritesRef = firestore.collection('users').doc(userId).collection('favorites').doc(recipeId);
  await userFavoritesRef.delete();
};
import create from "zustand";

const useRecipeStore = create((set, get) => ({
  // Existing state
  recipes: [],
  searchTerm: "",
  filteredRecipes: [],

  // NEW: favorites and recommendations
  favorites: [],
  recommendations: [],

  // Existing actions
  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
      filteredRecipes: [...state.filteredRecipes, newRecipe],
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
      filteredRecipes: state.filteredRecipes.filter(
        (recipe) => recipe.id !== id,
      ),
      favorites: state.favorites.filter((fid) => fid !== id), // remove deleted from favorites
    })),

  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe,
      ),
      filteredRecipes: state.filteredRecipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe,
      ),
    })),

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes();
  },

  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()),
      ),
    })),

  setRecipes: (recipes) =>
    set({
      recipes,
      filteredRecipes: recipes,
    }),

  // NEW: favorites actions
  addFavorite: (recipeId) => {
    const state = get();
    if (!state.favorites.includes(recipeId)) {
      set({ favorites: [...state.favorites, recipeId] });
    }
  },

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // NEW: generate mock recommendations
  generateRecommendations: () => {
    const state = get();
    const recommended = state.recipes.filter(
      (recipe) => state.favorites.includes(recipe.id) && Math.random() > 0.5,
    );
    set({ recommendations: recommended });
  },
}));

export default useRecipeStore;

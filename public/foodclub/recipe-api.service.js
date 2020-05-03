const RECIPES_API = `${BASE_API_URL}/recipes`; // http://localhost:3000/api/recipes

class RecipesService {
  getRecipes = () => _get(RECIPES_API, OPTIONS_WITH_AUTH);

  addRecipe = (formData) => _post(RECIPES_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

  deleteRecipe = (recipeId) => _delete(`${RECIPES_API}/${recipeId}`, OPTIONS_WITH_AUTH);
}
const recipesService = new RecipesService();
const foodclub = new FoodClub(recipesService);

foodclub.init();
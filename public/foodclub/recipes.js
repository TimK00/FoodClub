/**
 * AJAX add new recipes to recipe list on save.
 */
const doAddRecipe = async (e) => {
    e.preventDefault();
    foodclub._addRecipeEventHandler();
  };
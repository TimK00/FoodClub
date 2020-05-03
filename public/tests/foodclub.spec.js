const recipesService = new RecipesService();
const foodclub = new Foodclub(recipesService);

describe('Foodclub App', () => {
  it('should initialize some HTML', () => {
    spyOn(foodclub, 'init');
    foodclub.init();

    expect(foodclub.init).toHaveBeenCalled();
  });

  it('should add a recipe', async () => {
    const newRecipe = {
      recipe_id: 0,
      recipe_name: 'Third recipe',
      status: 'pending',
      created_date: '2020-04-14 22:50:32',
    };
    const addRecipeServiceSpy = spyOn(recipesService, 'addRecipe');

    expect(foodclub.recipes.length).toBe(0);

    await foodclub.addRecipe(newRecipe);

    expect(addRecipeServiceSpy).toHaveBeenCalled();
    expect(foodclub.recipes.length).toBe(1);
  });

  it('should delete a recipe', async () => {
    const existingRecipe = {
      recipe_id: 0,
      recipe_name: 'Third recipe',
      status: 'pending',
      created_date: '2020-04-14 22:50:32',
    };
    const deleteRecipeServiceSpy = spyOn(recipesService, 'deleteRecipe');

    expect(foodclub.recipes.length).toBe(1);

    await foodclub.deleteRecipe(existingRecipe.recipe_id);

    expect(deleteRecipeServiceSpy).toHaveBeenCalled();
    expect(foodclub.recipes.length).toBe(0);
  });

  xit('should update an individual recipe', () => {
    // ..
  });
});

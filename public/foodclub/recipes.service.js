/**
 * @class FoodClub
 *
 * Creates a list of recipes and updates a list
 */

class FoodClub {
  recipes = [];
  recipesService;

  constructor(recipesService) {
    this.recipesService = recipesService;
  }

  init() {
    this.render();
  }

  /**
   * DOM renderer for building the list row item.
   * Uses bootstrap classes with some custom overrides.
   *
   * {@link https://getbootstrap.com/docs/4.4/components/list-group/}
   * @example
   * <li class="list-group-item">
   *   <button class="btn btn-secondary" onclick="deleteRecipe(e, index)">X</button>
   *   <span>Recipe name</span>
   *   <span>pending</span>
   *   <span>date create</span>
   * </li>
   */
  _renderListRowItem = (recipe) => {
    const listGroupItem = document.createElement('li');
    listGroupItem.id = `recipe-${recipe.recipe_id}`;
    listGroupItem.className = 'list-group-item';

    const deleteBtn = document.createElement('button');
    const deleteBtnTxt = document.createTextNode('X');
    deleteBtn.id = 'delete-btn';
    deleteBtn.className = 'btn btn-secondary';
    deleteBtn.addEventListener('click', this._deleteEventHandler(recipe.recipe_id));
    deleteBtn.appendChild(deleteBtnTxt);

    const recipeNameSpan = document.createElement('span');
    const recipeName = document.createTextNode(recipe.recipe_name);
    recipeNameSpan.appendChild(recipeName);

    const recipeDifficultySpan = document.createElement('span');
    const recipeDifficulty = document.createTextNode(recipe.difficulty);
    recipeDifficultySpan.append(recipeDifficulty);

    // add list item's details
    listGroupItem.append(deleteBtn);
    listGroupItem.append(recipeNameSpan);
    listGroupItem.append(recipeDifficultySpan);

    return listGroupItem;
  };

  /**
   * DOM renderer for assembling the list items then mounting them to a parent node.
   */
  _renderList = () => {
    // get the "Loading..." text node from parent element
    const recipesDiv = document.getElementById('recipes');
    const loadingDiv = recipesDiv.childNodes[0];
    const fragment = document.createDocumentFragment();
    const ul = document.createElement('ul');
    ul.id = 'recipes-list';
    ul.className = 'list-group list-group-flush checked-list-box';

    this.recipes.map((recipe) => {
      const listGroupRowItem = this._renderListRowItem(recipe);

      // add entire list item
      ul.appendChild(listGroupRowItem);
    });

    fragment.appendChild(ul);
    recipesDiv.replaceChild(fragment, loadingDiv);
  };

  /**
   * DOM renderer for displaying a default message when a user has an empty list.
   */
  _renderMsg = () => {
    const recipesDiv = document.getElementById('recipes');
    const loadingDiv = recipesDiv.childNodes[0];
    const listParent = document.getElementById('recipes-list');
    const msgDiv = this._createMsgElement('Create some new recipes!');

    if (recipesDiv) {
      recipesDiv.replaceChild(msgDiv, loadingDiv);
    } else {
      recipesDiv.replaceChild(msgDiv, listParent);
    }
  };

  /**
   * Pure function for adding a recipe.
   *
   * @param {Object} newRecipe - form's values as an object
   */
  addRecipe = async (newRecipe) => {
    try {
      const { recipe_name, difficulty } = newRecipe;
      await this.recipesService.addRecipe({ recipe_name, difficulty }); // we just want the name and difficulty
      this.recipes.push(newRecipe); // push recipe with all it parts
    } catch (err) {
      console.log(err);
      alert('Unable to add recipe. Please try again later.');
    }
  };

  /**
   * DOM Event handler helper for adding a recipe to the DOM.
   *
   * @param {number} recipeId - id of the recipe to delete
   */
  _addRecipeEventHandler = () => {
    const recipeInput = document.getElementById('formInputRecipeName');
    const recipe_name = recipeInput.value;

    const difficultyInput = document.getElementById('formInputDifficulty');
    const difficulty = difficultyInput.value;

    // validation checks
    if (!recipe_name) {
      alert('Please enter a recipe name.');
      return;
    }

    if (!difficulty) {
      alert('Please enter a difficulty.');
      return;
    }

    const recipe = { recipe_name, difficulty }; // assemble the new recipe parts
    const { newRecipe, newRecipeEl } = this._createNewRecipeEl(recipe); // add recipe to list

    this.addRecipe(newRecipe);

    const listParent = document.getElementById('recipes-list');

    if (listParent) {
      listParent.appendChild(newRecipeEl);
    } else {
      this._renderList();
    }
    recipeInput.value = ''; // clear form text input
  };

  /**
   * Create the DOM element for the new recipe with all its parts.
   *
   * @param {Object} recipe - { recipe_name, difficulty } partial object
   */
  _createNewRecipeEl = (recipe) => {
    const recipe_id = this.recipes.length;
    const newRecipe = { ...recipe, recipe_id };
    const newRecipeEl = this._renderListRowItem(newRecipe);

    return { newRecipe, newRecipeEl };
  };

  /**
   * Pure function for deleting a recipe.
   *
   * @param {number} recipeId - id for the recipe to be deleted
   */
  deleteRecipe = async (recipeId) => {
    try {
      const res = await this.recipesService.deleteRecipe(recipeId);
      this.recipes = this.recipes.filter((recipe) => recipe.recipe_id !== recipeId);

      if (res !== null) {
        alert('Recipe deleted successfully!');
      }
      return res;
    } catch (err) {
      alert('Unable to delete recipe. Please try again later.');
    }
  };

  /**
   * DOM Event handler helper for deleting a recipe from the DOM.
   * This relies on a pre-existing in the list of recipes.
   *
   * @param {number} recipeId - id of the recipe to delete
   */
  _deleteEventHandler = (recipeId) => () => {
    const recipe = document.getElementById(`recipe-${recipeId}`);
    recipe.remove();

    this.deleteRecipe(recipeId).then(() => {
      if (!this.recipes.length) {
        this._renderMsg();
      }
    });
  };

  /**
   * Creates a message div block.
   *
   * @param {string} msg - custom message to display
   */
  _createMsgElement = (msg) => {
    const msgDiv = document.createElement('div');
    const text = document.createTextNode(msg);
    msgDiv.id = 'user-message';
    msgDiv.className = 'center';
    msgDiv.appendChild(text);

    return msgDiv;
  };

  render = async () => {
    const recipes = await this.recipesService.getRecipes();

    try {
      if (recipes.length) {
        this.recipes = recipes;
        this._renderList();
      } else {
        this._renderMsg();
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  searchList() {

    

    var input, filter, li, span, i, recipeId, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    console.log("fxn", recipe.recipdeId);

    for (i = 0; i < li.length; i++) {
        recipeId = listGroupItem.id;
        span = li[i].getElementsByTagName("span")[0];
        txtValue = span.textContent || span.innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
  } ;
}

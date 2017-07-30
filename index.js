let index = -1;

class Recipe {
  constructor(){
      this.items = [];
      this.totalRecipies = 0;
  }

  getIndex(){
    return index;
  }

  createRecipe(){
      const name = document.getElementById('name').value,
            description = document.getElementById('description').value,
            ingredients = document.getElementById('ingredients').value.split(',');

      this.items.push({ name, description, ingredients });
      console.log(this.items[this.totalRecipies]);
      this.totalRecipies++;
      renderRecipes();
      clearFormValues();
    }

  updateRecipe(index){
    const recipe = this.items[index],
          name = recipe.name,
          description = recipe.description,
          ingredients = recipe.ingredients.split(',');
    this.items.splice(index, 1, { name, description, ingredients });
    console.log(this.items[index]);
    renderRecipes();
    clearFormValues();
  }

  displayIngredient(ingredientString){
    const ingredientArray = ingredientString.split('/'),
          quantity = ingredientArray[0],
          ingredient = ingredientArray[1];
    if(isNaN(quantity)){
      return quantity + ' of ' + ingredient;
    } else {
      return quantity + ' ' + ingredient;
    }
  }

  getRecipe(number = -1){
    return (number === -1) ? this.items : this.items[number];
  }

}

const recipes = new Recipe();

function clearFormValues(){
  document.getElementById('name').value = "";
  document.getElementById('description').value = "";
  document.getElementById('ingredients').value = "";
}

function createRecipe(){
  recipes.createRecipe();
}

function updateRecipe(index){
  recipes.updateRecipe(index);
}

function renderRecipes(){
  const recipeList = Handlebars.compile(document.getElementById('recipe-template').innerHTML);
  document.getElementById('recipes').innerHTML = recipeList(recipes.items);
}

function displayEditForm(index){
  changeIndex(index);
  const recipeForm = Handlebars.compile(document.getElementById('recipe-form-template').innerHTML);
  document.getElementById('form').innerHTML = recipeForm(recipes.items[index]);
  console.log(index);
  console.log(recipes);
}

function changeIndex(newIndex){
  index = newIndex;
}

function handleSubmit(){
    (index < 0) ? createRecipe() : updateRecipe(index);
}

function init() {
  Handlebars.registerPartial("recipeFormPartial", document.getElementById('recipe-form-partial').innerHTML);
  Handlebars.registerPartial("recipeDetailsPartial", document.getElementById('recipe-details-partial').innerHTML);
  Handlebars.registerHelper('displayIngredient', ingredient => {
    	return new Handlebars.SafeString(recipes.displayIngredient(ingredient));
  	});
  const recipeForm = Handlebars.compile(document.getElementById('recipe-form-template').innerHTML);
  document.getElementById('form').innerHTML = recipeForm();
  if(recipes.totalRecipies > 0) renderRecipes(recipes);
}

document.addEventListener("DOMContentLoaded", (event) => {
  init();
});

// Get recipe ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Load recipes
const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

// Get the recipe
const recipe = recipes[id];

// DOM elements
const title = document.getElementById("recipeTitle");
const ingredientList = document.getElementById("ingredientList");
const stepsText = document.getElementById("stepsText");

// Render recipe
if (recipe) {
  title.textContent = recipe.name;

  ingredientList.innerHTML = "";
  recipe.ingredients.forEach(ing => {
    const li = document.createElement("li");
    li.textContent = ing;
    ingredientList.appendChild(li);
  });

  stepsText.textContent = recipe.steps;
} else {
  title.textContent = "Recipe Not Found";
}

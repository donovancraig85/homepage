console.log("app.js loaded")
// Load existing recipes or create empty array
let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

// DOM elements
const nameInput = document.getElementById("recipeName");
const ingredientsInput = document.getElementById("recipeIngredients");
const stepsInput = document.getElementById("recipeSteps");
const saveBtn = document.getElementById("saveRecipe");
const searchInput = document.getElementById("searchInput");
const recipeList = document.getElementById("recipes");

// Save recipe
saveBtn.addEventListener("click", () => {
  const recipe = {
    name: nameInput.value.trim(),
    ingredients: ingredientsInput.value.trim().split("\n"),
    steps: stepsInput.value.trim()
  };

  if (!recipe.name) {
    alert("Recipe must have a name");
    return;
  }

  recipes.push(recipe);
  localStorage.setItem("recipes", JSON.stringify(recipes));

  nameInput.value = "";
  ingredientsInput.value = "";
  stepsInput.value = "";

  renderRecipes(recipes);
});

// Search recipes
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = recipes.filter(r =>
    r.name.toLowerCase().includes(query) ||
    r.ingredients.some(i => i.toLowerCase().includes(query))
  );
  renderRecipes(filtered);
});

// Render recipe list
function renderRecipes(list) {
  recipeList.innerHTML = "";
  list.forEach(recipe => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${recipe.name}</strong><br>
      <em>${recipe.ingredients.length} ingredients</em>
    `;
    recipeList.appendChild(li);
  });
}

// Initial load
renderRecipes(recipes);

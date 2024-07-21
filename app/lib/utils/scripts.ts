import { personalMacros, recipe } from "./interfaces";

export function calculateCalories(
  carbs: number,
  proteins: number,
  fat: number,
) {
  let calories = 0;
  //Carbs: 4kcal
  calories += carbs * 4;
  //Proteins: 4kcal
  calories += proteins * 4;
  //Fat: 9kcal
  calories += fat * 9;

  //Round calories to 2 decimals
  calories = Math.round(calories * 100) / 100;

  return calories;
}

export function calculateMacros(recipe: recipe, macros: personalMacros) {
  /* Ho una lista di ingredienti
    Pancake
    50g farina d’avena - (33 carbs - 7 proteins - 3.5 fat - 191.5kcal) -  (66 carbs - 14 proteins - 7 fat - 383kcal)/100g
    10g miele d’arancio - (8.27 carbs - 0 proteins - 0 fat -  33.3kcal) - (82.7 carbs - 0.6 proteins - 0 fat - 333.2kcal)/100g
    200g albume naturelle - (0 carbs - 20.2 proteins - 0 fat - 80kcal) - (0 carbs - 10.1 proteins - 0 fat - 40kcal)/100g
  */
  const recipeIngredients = recipe.Ingredients;

  // Calcolo i macro totali della ricetta (41.27 carbs - 27.2 proteins - 3.5 fat - 305kcal)
  const recipeCarbs = recipeIngredients
    .map((x) => x.Ingredient.Carbs)
    .reduce((accumulator, carbs) => accumulator + carbs, 0);
  const recipeProteins = recipeIngredients
    .map((x) => x.Ingredient.Proteins)
    .reduce((accumulator, proteins) => accumulator + proteins, 0);
  const recipeFat = recipeIngredients
    .map((x) => x.Ingredient.Fat)
    .reduce((accumulator, fat) => accumulator + fat, 0);

  // Tiro fuori i miei macro personali (60 carbs - 45 proteins - 20 fat)
  const myCarbs = macros.Carbs;
  const myProteins = macros.Proteins;
  const myFat = macros.Fat;

  // Calcolo in proporzione quanti grammi totali ho in base alle mie proteine personali (27.2 : 50 + 10 + 200 = 45 : x)
  const recipeGrams = recipeIngredients
    .map((x) => x.Quantity)
    .reduce((accumulator, quantity) => accumulator + quantity, 0);
  const newGrams = (recipeGrams * myProteins) / recipeProteins;

  const unit = newGrams / recipeGrams;

  // Adatto i grammi a seconda dei nuovi macro
  recipe.Ingredients.map((x) => {
    x.Quantity = x.Quantity * unit;
  });

  /* Calcolo in proporzione i macro sulla base dei grammi nuovi della ricetta
    50g farina d’avena - (33 carbs - 7 proteins - 3.5 fat - 191.5kcal) -  (66 carbs - 14 proteins - 7 fat - 383kcal)/100g
    72.5g farina d’avena - (47.8 carbs - 10.15 proteins - 5 fat - 277.67kcal)
  */
  recipe.Ingredients.map((x) => {
    x.Ingredient.Carbs = x.Ingredient.Carbs * unit;
    x.Ingredient.Proteins = x.Ingredient.Proteins * unit;
    x.Ingredient.Fat = x.Ingredient.Fat * unit;
  });

  return recipe;
}

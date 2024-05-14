"use client";

import Link from "next/link";
import { getRecipes } from "../lib/data";
import { useEffect, useState } from "react";

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    getRecipes().then((data) => {
      setRecipes(data);
      setSelectedRecipe(data[0]);
      console.log(data[0]);
    });
  }, []);

  //TODO: manage uncountables
  function calculateCalories() {
    let calories = 0;
    selectedRecipe.Ingredients.forEach((ingredient) => {
      if (ingredient.Countable) {
        //Carbs: 4kcal
        calories += ingredient.Carbs * 4 * ingredient.Quantity;
        //Proteins: 4kcal
        calories += ingredient.Proteins * 4 * ingredient.Quantity;
        //Fat: 9kcal
        calories += ingredient.Fat * 9 * ingredient.Quantity;
      }
    });
    return calories;
  }

  return (
    <>
      <main className="m-auto grid  gap-y-9 bg-White md:my-32 md:max-w-desktop md:rounded-3xl md:p-10 md:pb-6">
        <div className="relative truncate md:rounded-xl">
          <div className="absolute left-2 right-2 top-2 flex justify-between">
            <div className="flex gap-3">
              <Link
                href="recipes/0/edit" // Change this to the correct recipe ID
                className="text-black flex gap-1 rounded-md bg-LightGrey/75 px-3 py-1 font-Outfit text-Nutmeg"
              >
                New
              </Link>
              <Link
                href="recipes/1/edit" // Change this to the correct recipe ID
                className="text-black flex gap-1 rounded-md bg-LightGrey/75 px-3 py-1 font-Outfit text-Nutmeg"
              >
                Edit
              </Link>
              <button className="text-black flex gap-1 rounded-md bg-LightGrey/75 px-3 py-1">
                <p className="my-auto font-Outfit text-Nutmeg">Delete</p>
              </button>
            </div>
            {/* Make a select that will contain a list of recipes */}
            <select
              name="recipes"
              className="rounded-md border border-LightGrey px-4 py-1.5"
            >
              {recipes &&
                recipes.map((recipe) => {
                  return (
                    <option key={recipe.Id} value={recipe.Id}>
                      {recipe.Title}
                    </option>
                  );
                })}
            </select>
          </div>
          <img src="/images/image-omelette.jpeg" alt="food picture" />
        </div>
        <div className="grid gap-y-8 px-8 md:px-0">
          <div className="grid gap-y-6">
            <h1 className="font-Youngserif text-4xl text-DarkCharcoal md:text-[2.5rem]">
              {/* Simple Omelette Recipe */}
              {selectedRecipe && selectedRecipe.Title}
            </h1>
            <p className="font-Outfit text-WengeBrown">
              {/* An easy and quick dish, perfect for any meal. This classic
              omelette combines beaten eggs cooked to perfection, optionally
              filled with your choice of cheese, vegetables, or meats. */}
              {selectedRecipe && selectedRecipe.Description}
            </p>
          </div>

          <div className="grid gap-y-3 rounded-xl bg-RoseWhite px-6 py-4 font-Outfit md:px-7 md:py-5">
            <h2 className="text-xl font-OutfitBold text-DarkRaspberry">
              Preparation time
            </h2>
            <ul className="grid list-disc gap-y-1 text-WengeBrown">
              <li className="flex items-center before:px-2 before:pe-7 before:text-xl before:content-['•']">
                <p>
                  <b>Total</b>: Approximately
                  {/* 10 minutes */}{" "}
                  {selectedRecipe &&
                    selectedRecipe.PreparationTime +
                      selectedRecipe.CookingTime}{" "}
                  minutes
                </p>
              </li>
              <li className="flex items-center before:px-2 before:pe-7 before:text-xl before:content-['•']">
                <p>
                  <b>Preparation</b>:{/* 5 */}{" "}
                  {selectedRecipe && selectedRecipe.PreparationTime} minutes
                </p>
              </li>
              <li className="flex items-center before:px-2 before:pe-7 before:text-xl before:content-['•']">
                <p>
                  <b>Cooking</b>:{/* 5 */}{" "}
                  {selectedRecipe && selectedRecipe.CookingTime} minutes
                </p>
              </li>
            </ul>
          </div>

          <div className="grid gap-y-5">
            <h2 className="font-Youngserif text-3xl text-[1.75rem] text-Nutmeg">
              Ingredients
            </h2>
            <ul className="grid gap-y-1 px-2 font-Outfit text-WengeBrown">
              {selectedRecipe &&
                selectedRecipe.Ingredients.map((ingredient) => {
                  return (
                    <li
                      key={ingredient.Id}
                      className="flex items-center before:pe-7 before:text-xl before:content-['•']"
                    >
                      {ingredient.Quantity} {ingredient.Name}
                    </li>
                  );
                })}
              {/* <li className="flex items-center before:pe-7 before:text-xl before:content-['•']">
                2-3 large eggs
              </li>
              <li className="flex items-center before:pe-7 before:text-xl before:content-['•']">
                Salt, to taste
              </li>
              <li className="flex items-center before:pe-7 before:text-xl before:content-['•']">
                Pepper, to taste
              </li>
              <li className="flex items-center before:pe-7 before:text-xl before:content-['•']">
                1 tablespoon of butter or oil
              </li>
              <li className="flex items-center before:pe-7 before:text-xl before:content-['•']">
                Optional fillings: cheese, diced vegetables, cooked meats, herbs
              </li> */}
            </ul>
          </div>

          <hr className="border-LightGrey" />

          <div className="grid gap-y-5 md:gap-y-4">
            <h2 className="font-Youngserif text-3xl text-[1.75rem] text-Nutmeg">
              Instructions
            </h2>
            <ol className="grid list-decimal gap-y-2 px-6 font-Outfit text-WengeBrown marker:font-Outfit marker:font-OutfitBold marker:text-Nutmeg">
              {selectedRecipe &&
                selectedRecipe.Preparations.map((preparation) => {
                  return (
                    <li key={preparation.Id} className="ps-4">
                      {preparation.Description}
                    </li>
                  );
                })}

              {/* <li className="ps-4">
                <b>Beat the eggs</b>: In a bowl, beat the eggs with a pinch of
                salt and pepper until they are well mixed. You can add a
                tablespoon of water or milk for a fluffier texture.
              </li>
              <li className="ps-4">
                <b>Heat the pan</b>: Place a non-stick frying pan over medium
                heat and add butter or oil.
              </li>
              <li className="ps-4">
                <b>Cook the omelette</b>: Once the butter is melted and
                bubbling, pour in the eggs. Tilt the pan to ensure the eggs
                evenly coat the surface.
              </li>
              <li className="ps-4">
                <b>Add fillings (optional)</b>: When the eggs begin to set at
                the edges but are still slightly runny in the middle, sprinkle
                your chosen fillings over one half of the omelette.
              </li>
              <li className="ps-4">
                <b>Fold and serve</b>: As the omelette continues to cook,
                carefully lift one edge and fold it over the fillings. Let it
                cook for another minute, then slide it onto a plate.
              </li>
              <li className="ps-4">
                <b>Enjoy</b>: Serve hot, with additional salt and pepper if
                needed.
              </li> */}
            </ol>
          </div>

          <hr className="border-LightGrey" />

          <div className="grid gap-y-3">
            <h2 className="font-Youngserif text-3xl text-[1.75rem] text-Nutmeg">
              Nutrition
            </h2>
            <p className="font-Outfit text-WengeBrown">
              The table below shows nutritional values per serving without the
              additional fillings.
            </p>
            {/* Calories per macro: Carbs: 4, Protein: 4, Fat: 9 */}
            <ul className="font-Outfit text-WengeBrown">
              <li className="grid grid-cols-2 gap-x-4 border-b border-LightGrey px-8 py-3">
                Calories
                <span className="font-OutfitBold text-Nutmeg">
                  {/* 277kcal */} {selectedRecipe && calculateCalories()} kcal
                </span>
              </li>
              <li className="grid grid-cols-2 gap-x-4 border-b border-LightGrey px-8 py-3">
                Carbs
                <span className="font-OutfitBold text-Nutmeg">
                  {/* 0 */}{" "}
                  {selectedRecipe &&
                    selectedRecipe.Ingredients.reduce(
                      (acc, ingredient) => acc + ingredient.Carbs,
                      0,
                    )}
                  g
                </span>
              </li>
              <li className="grid grid-cols-2 gap-x-4 border-b border-LightGrey px-8 py-3">
                Protein
                <span className="font-OutfitBold text-Nutmeg">
                  {/* 20 */}{" "}
                  {selectedRecipe &&
                    selectedRecipe.Ingredients.reduce(
                      (acc, ingredient) => acc + ingredient.Proteins,
                      0,
                    )}
                  g
                </span>
              </li>
              <li className="grid grid-cols-2 gap-x-4 px-8 py-3">
                Fat
                <span className="font-OutfitBold text-Nutmeg">
                  {/* 22 */}{" "}
                  {selectedRecipe &&
                    selectedRecipe.Ingredients.reduce(
                      (acc, ingredient) => acc + ingredient.Fat,
                      0,
                    )}
                  g
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default Recipe;

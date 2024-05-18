"use client";

import Link from "next/link";
import { getRecipes } from "../lib/data";
import { useEffect, useState } from "react";
import { seed } from "../lib/seed";

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    getRecipes().then((data) => {
      if (data.length === 0) {
        seed();
        location.reload();
      }
      setRecipes(data);
      setSelectedRecipe(data[0]);
      console.log(data[0]);
    });
  }, []);

  //TODO: manage uncountables
  function calculateCalories() {
    let calories = 0;
    selectedRecipe.Ingredients.forEach((item) => {
      if (item.Ingredient.Countable) {
        //Carbs: 4kcal
        calories += item.Ingredient.Carbs * 4 * item.Ingredient.Quantity;
        //Proteins: 4kcal
        calories += item.Ingredient.Proteins * 4 * item.Ingredient.Quantity;
        //Fat: 9kcal
        calories += item.Ingredient.Fat * 9 * item.Ingredient.Quantity;
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
          <img
            src={selectedRecipe && selectedRecipe.ImageLink}
            alt="food picture"
          />
        </div>
        <div className="grid gap-y-8 px-8 md:px-0">
          <div className="grid gap-y-6">
            <h1 className="font-Youngserif text-4xl text-DarkCharcoal md:text-[2.5rem]">
              {selectedRecipe && selectedRecipe.Title}
            </h1>
            <p className="font-Outfit text-WengeBrown">
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
                selectedRecipe.Ingredients.map((item) => {
                  return (
                    <li
                      key={item.Ingredient.Id}
                      className="flex items-center before:pe-7 before:text-xl before:content-['•']"
                    >
                      {item.Ingredient.Quantity} {item.Ingredient.Name}
                    </li>
                  );
                })}
            </ul>
          </div>

          <hr className="border-LightGrey" />

          <div className="grid gap-y-5 md:gap-y-4">
            <h2 className="font-Youngserif text-3xl text-[1.75rem] text-Nutmeg">
              Instructions
            </h2>
            <ol className="grid list-decimal gap-y-2 px-6 font-Outfit text-WengeBrown marker:font-Outfit marker:font-OutfitBold marker:text-Nutmeg">
              {selectedRecipe &&
                selectedRecipe.Instructions.map((item) => {
                  return (
                    <li key={item.Instruction.Id} className="ps-4">
                      {item.Instruction.Description}
                    </li>
                  );
                })}
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
                  {selectedRecipe && calculateCalories()} kcal
                </span>
              </li>
              <li className="grid grid-cols-2 gap-x-4 border-b border-LightGrey px-8 py-3">
                Carbs
                <span className="font-OutfitBold text-Nutmeg">
                  {selectedRecipe &&
                    selectedRecipe.Ingredients.reduce(
                      (acc, item) => acc + item.Ingredient.Carbs,
                      0,
                    )}
                  g
                </span>
              </li>
              <li className="grid grid-cols-2 gap-x-4 border-b border-LightGrey px-8 py-3">
                Protein
                <span className="font-OutfitBold text-Nutmeg">
                  {selectedRecipe &&
                    selectedRecipe.Ingredients.reduce(
                      (acc, item) => acc + item.Ingredient.Proteins,
                      0,
                    )}
                  g
                </span>
              </li>
              <li className="grid grid-cols-2 gap-x-4 px-8 py-3">
                Fat
                <span className="font-OutfitBold text-Nutmeg">
                  {selectedRecipe &&
                    selectedRecipe.Ingredients.reduce(
                      (acc, item) => acc + item.Ingredient.Fat,
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

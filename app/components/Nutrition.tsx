import React, { useEffect, useState } from "react";
import { ingredientRelationship } from "../lib/utils/interfaces";

const Nutrition = ({
  ingredients: recipeIngredients,
}: {
  ingredients: ingredientRelationship[];
}) => {
  const [carbs, setCarbs] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);
  const [calories, setCalories] = useState(0);

  useEffect(() => {
    if (recipeIngredients) {
      let carbs = 0;
      let protein = 0;
      let fat = 0;
      let calories = 0;
      recipeIngredients.forEach((recipeIngredient) => {
        if (recipeIngredient.Ingredient.Countable) {
          carbs +=
            recipeIngredient.Ingredient.Carbs / recipeIngredient.Quantity;
          protein +=
            recipeIngredient.Ingredient.Proteins / recipeIngredient.Quantity;
          fat += recipeIngredient.Ingredient.Fat / recipeIngredient.Quantity;
        } else {
          carbs +=
            (recipeIngredient.Quantity * recipeIngredient.Ingredient.Carbs) /
            recipeIngredient.Ingredient.Quantity;
          protein +=
            (recipeIngredient.Quantity * recipeIngredient.Ingredient.Proteins) /
            recipeIngredient.Ingredient.Quantity;
          fat +=
            (recipeIngredient.Quantity * recipeIngredient.Ingredient.Fat) /
            recipeIngredient.Ingredient.Quantity;
        }
      });
      //round to 2 decimal places
      carbs = Math.round(carbs * 100) / 100;
      protein = Math.round(protein * 100) / 100;
      fat = Math.round(fat * 100) / 100;
      calories = carbs * 4 + protein * 4 + fat * 9;

      setCarbs(carbs);
      setProtein(protein);
      setFat(fat);
      setCalories(calories);
    }
  }, [recipeIngredients]);

  return (
    <div className="grid gap-y-3">
      <h2 className="font-Youngserif text-3xl text-[1.75rem] text-Nutmeg">
        Nutrition
      </h2>
      <p className="font-Outfit text-WengeBrown">
        The table below shows nutritional values per serving without the
        additional fillings.
      </p>
      <ul className="font-Outfit text-WengeBrown">
        <li className="grid grid-cols-2 gap-x-4 border-b border-LightGrey px-8 py-3">
          Calories
          <span className="font-OutfitBold text-Nutmeg">{calories} kcal</span>
        </li>
        <li className="grid grid-cols-2 gap-x-4 border-b border-LightGrey px-8 py-3">
          Carbs
          <span className="font-OutfitBold text-Nutmeg">{carbs} g</span>
        </li>
        <li className="grid grid-cols-2 gap-x-4 border-b border-LightGrey px-8 py-3">
          Protein
          <span className="font-OutfitBold text-Nutmeg">{protein} g</span>
        </li>
        <li className="grid grid-cols-2 gap-x-4 px-8 py-3">
          Fat
          <span className="font-OutfitBold text-Nutmeg">{fat} g</span>
        </li>
      </ul>
    </div>
  );
};

export default Nutrition;

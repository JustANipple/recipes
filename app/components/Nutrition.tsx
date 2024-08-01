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
      const recipeCarbs = recipeIngredients
        .map((x) => x.Ingredient.Carbs)
        .reduce((accumulator, carbs) => accumulator + carbs, 0);
      const recipeProteins = recipeIngredients
        .map((x) => x.Ingredient.Proteins)
        .reduce((accumulator, proteins) => accumulator + proteins, 0);
      const recipeFat = recipeIngredients
        .map((x) => x.Ingredient.Fat)
        .reduce((accumulator, fat) => accumulator + fat, 0);

      setCarbs(recipeCarbs);
      setProtein(recipeProteins);
      setFat(recipeFat);

      const recipeCalories =
        Math.round(
          (recipeCarbs * 4 + recipeProteins * 4 + recipeFat * 9) * 100,
        ) / 100;
      setCalories(recipeCalories);
    }
  });

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

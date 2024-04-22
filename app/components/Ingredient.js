"use client";

import { useEffect, useState } from "react";
import { getIngredients } from "../lib/data";
import { RxCheck, RxCross2 } from "react-icons/rx";
import IngredientForm from "./IngredientForm";

const Ingredient = () => {
  const [showIngredientForm, setShowIngredientForm] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientIndex, setIngredientIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [ingredientId, setIngredientId] = useState(-1);

  useEffect(() => {
    const fetchIngredients = async () => {
      const ingredients = await getIngredients();
      setIngredients(ingredients);
      setIsLoading(false);
    };

    fetchIngredients();
  }, []);

  function handleClick(index) {
    setIngredientIndex(index);
    setIngredientId(ingredients[index].Id);
    setShowIngredientForm(!showIngredientForm);
  }

  return (
    <>
      <div
        className={`m-auto grid gap-y-9 bg-White p-8 md:my-32 md:max-w-desktop md:rounded-3xl md:p-10 md:pb-6 ${showIngredientForm ? "hidden" : ""}`}
      >
        <div className="flex justify-between">
          <h1 className="font-Youngserif text-4xl text-DarkCharcoal md:text-[2.5rem]">
            Ingredients list
          </h1>
          <button
            className="text-black flex gap-1 rounded-md bg-LightGrey/75 px-3 py-1 font-Outfit text-Nutmeg"
            onClick={handleClick}
          >
            New
          </button>
        </div>
        <hr className="border-LightGrey" />
        <table className="table-fixed">
          <thead className="font-OutfitBold text-Nutmeg">
            <tr className="border-b border-LightGrey text-left">
              <th className="py-3">Name</th>
              <th>UM</th>
              <th>Carbs</th>
              <th>Proteins</th>
              <th>Fat</th>
              <th>Countable</th>
            </tr>
          </thead>
          <tbody className="font-Outfit text-WengeBrown">
            {ingredients.map((ingredient, index) => {
              return (
                <tr
                  className="cursor-pointer transition-all ease-in-out hover:bg-Cream/50"
                  key={index}
                  onClick={() => handleClick(ingredient.Id)}
                >
                  <td className="py-3">{ingredient.Name}</td>
                  <td>{ingredient.UM}</td>
                  <td>{ingredient.Carbs}</td>
                  <td>{ingredient.Proteins}</td>
                  <td>{ingredient.Fat}</td>
                  <td>
                    {ingredient.Countable ? (
                      <RxCheck className="text-Green" />
                    ) : (
                      <RxCross2 className="text-Red" />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {isLoading ? (
        ""
      ) : (
        <IngredientForm
          showIngredientForm={showIngredientForm}
          handleClick={handleClick}
          ingredientIndex={ingredientIndex}
          ingredients={ingredients}
          ingredientId={ingredientId}
        />
      )}
    </>
  );
};

export default Ingredient;

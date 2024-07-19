"use client";

import { useEffect, useState } from "react";
import { recipe } from "../../../lib/utils/interfaces";
import { getRecipes } from "../../../lib/data/recipes";
import Link from "next/link";
import Nutrition from "../../../components/Nutrition";

const page = ({ params }: { params: { id: string } }) => {
  const [recipe, setRecipe] = useState<recipe>();

  useEffect(() => {
    const fetchRecipe = async () => {
      const data: recipe[] = await getRecipes(parseInt(params.id));
      setRecipe(data[0]);
    };

    fetchRecipe();
  }, []);

  return (
    <>
      {recipe && (
        <main className="m-auto grid  gap-y-9 bg-White md:my-32 md:max-w-desktop md:rounded-3xl md:p-10 md:pb-6">
          <div className="relative truncate md:rounded-xl">
            <div className="absolute left-2 right-2 top-2 flex justify-between">
              <Link
                href={`/recipes/${params.id}/edit`}
                className="text-black my-auto ms-auto flex gap-1 rounded-md bg-LightGrey/75 px-3 py-1 font-Outfit text-Nutmeg"
              >
                Edit
              </Link>
            </div>
            <img
              src={recipe && recipe.ImageLink}
              alt="food picture"
              className="max-h-72 w-full object-cover"
            />
          </div>
          <div className="grid gap-y-8 px-8 md:px-0">
            <div className="grid gap-y-6">
              <h1 className="font-Youngserif text-4xl text-DarkCharcoal md:text-[2.5rem]">
                {recipe && recipe.Title}
              </h1>
              <p className="font-Outfit text-WengeBrown">
                {recipe && recipe.Description}
              </p>
            </div>

            <div className="grid gap-y-3 rounded-xl bg-RoseWhite px-6 py-4 font-Outfit md:px-7 md:py-5">
              <h2 className="text-xl font-OutfitBold text-DarkRaspberry">
                Preparation time
              </h2>
              <ul className="grid list-disc gap-y-1 text-WengeBrown">
                <li className="flex items-center before:px-2 before:pe-7 before:text-xl before:content-['•']">
                  <p>
                    <b>Total</b>: Approximately{" "}
                    {recipe && recipe.PreparationTime + recipe.CookingTime}{" "}
                    minutes
                  </p>
                </li>
                <li className="flex items-center before:px-2 before:pe-7 before:text-xl before:content-['•']">
                  <p>
                    <b>Preparation</b>: {recipe && recipe.PreparationTime}{" "}
                    minutes
                  </p>
                </li>
                <li className="flex items-center before:px-2 before:pe-7 before:text-xl before:content-['•']">
                  <p>
                    <b>Cooking</b>: {recipe && recipe.CookingTime} minutes
                  </p>
                </li>
              </ul>
            </div>

            <div className="grid gap-y-5">
              <h2 className="font-Youngserif text-3xl text-[1.75rem] text-Nutmeg">
                Ingredients
              </h2>
              <ul className="grid gap-y-1 px-2 font-Outfit text-WengeBrown">
                {recipe &&
                  recipe.Ingredients.map((item) => {
                    return (
                      <li
                        key={item.IngredientId}
                        className="flex items-center before:pe-7 before:text-xl before:content-['•']"
                      >
                        {item.Quantity != 0 && item.Quantity}{" "}
                        {item.Ingredient.Countable ? "pc" : "g"}{" "}
                        {item.Ingredient.Name}
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
                {recipe &&
                  recipe.Instructions.map((item) => {
                    return (
                      <li key={item.Id} className="ps-4">
                        <b>{item.Title}:</b> {item.Description}
                      </li>
                    );
                  })}
              </ol>
            </div>

            <hr className="border-LightGrey" />

            {recipe && <Nutrition ingredients={recipe.Ingredients} />}
          </div>
        </main>
      )}
    </>
  );
};

export default page;

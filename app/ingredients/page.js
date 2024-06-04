"use client";

import React, { useEffect, useState } from "react";
import { getIngredients } from "../lib/data";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";

const Table = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredients().then((data) => {
      setIngredients(data);
      console.log(data);
    });
  }, []);

  return (
    <div
      className={`m-auto grid gap-y-9 bg-White p-8 md:mx-10 md:my-32 md:rounded-3xl md:p-10 md:pb-6`}
    >
      <div className="flex justify-between">
        <h1 className="font-Youngserif text-4xl text-DarkCharcoal md:text-[2.5rem]">
          Ingredients
        </h1>
        {/* Create new button to create a new ingredient */}
        <Link
          href="/ingredients/0/edit"
          className="text-indigo-600 hover:text-indigo-900"
        >
          New Ingredient
        </Link>
        <Link href="/" className="my-auto">
          <RxCross2 className="font-OutfitBold text-Nutmeg" />
        </Link>
      </div>

      <table className="text-gray-500 dark:text-gray-400 w-full text-left text-sm rtl:text-right">
        <thead className="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-xs uppercase">
          <tr>
            <th scope="col" className="py3 px-6">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              UM
            </th>
            <th scope="col" className="px-6 py-3">
              Carbs
            </th>
            <th scope="col" className="px-6 py-3">
              Proteins
            </th>
            <th scope="col" className="px-6 py-3">
              Fat
            </th>
            <th scope="col" className="px-6 py-3">
              Countable
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Calories
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient, index) => (
            <tr
              key={index}
              className="bg-white dark:bg-gray-800 dark:border-gray-700 border-b "
            >
              <td className="px-6 py-4">{ingredient.Name}</td>
              <td className="px-6 py-4">{ingredient.UM}</td>
              <td className="px-6 py-4">{ingredient.Carbs}</td>
              <td className="px-6 py-4">{ingredient.Proteins}</td>
              <td className="px-6 py-4">{ingredient.Fat}</td>
              <td className="px-6 py-4">{ingredient.Countable}</td>
              <td className="px-6 py-4">{ingredient.Quantity}</td>
              <td className="px-6 py-4">{ingredient.Calories}</td>
              <td className="px-6 py-4">
                <Link
                  href={`/ingredients/${ingredient.Id}/edit`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

"use client";

import UpdateIngredient from "../components/UpdateIngredient";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getIngredients } from "../lib/data";
import { RxCross2 } from "react-icons/rx";
import { MdEdit } from "react-icons/md";

const Table = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredients().then((data) => {
      setIngredients(data);
    });
  }, []);

  return (
    <div
      className={`m-auto grid gap-y-4 bg-White p-8 md:mx-10 md:my-32 md:rounded-3xl md:p-10 md:pb-6`}
    >
      <div className="flex justify-between">
        <h1 className="font-Youngserif text-4xl text-DarkCharcoal md:text-[2.5rem]">
          Ingredients
        </h1>
        <Link href="/" className="my-auto">
          <RxCross2 className="font-OutfitBold text-Nutmeg" />
        </Link>
      </div>
      <Link
        href="/ingredients/0/edit"
        className="flex w-fit items-center gap-2 rounded-md bg-LightGrey p-2 text-xs font-OutfitBold text-Nutmeg"
      >
        <MdEdit className="h-3 w-3 rounded-md bg-LightGrey font-OutfitBold text-Nutmeg" />
        <span>New Ingredient</span>
      </Link>

      <div className="overflow-scroll">
        <table className="text-gray-500 dark:text-gray-400 w-full text-left text-sm rtl:text-right">
          <thead className="bg-gray-50 dark:bg-gray-700 dark:text-gray-400 font-Outfit text-Nutmeg">
            <tr>
              <th scope="col" className="px-3 py-3">
                Name
              </th>
              <th scope="col" className="px-3 py-3">
                UM
              </th>
              <th scope="col" className="px-3 py-3">
                Carbs
              </th>
              <th scope="col" className="px-3 py-3">
                Proteins
              </th>
              <th scope="col" className="px-3 py-3">
                Fat
              </th>
              <th scope="col" className="px-3 py-3">
                Countable
              </th>
              <th scope="col" className="px-3 py-3">
                Quantity
              </th>
              <th scope="col" className="px-3 py-3">
                Calories
              </th>
              <th
                scope="col"
                className="sticky right-0 bg-White px-3 py-3 shadow-md"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient, index) => (
              <tr
                key={index}
                className="bg-white dark:bg-gray-800 dark:border-gray-700 border-t border-LightGrey font-Outfit text-WengeBrown"
              >
                <td className="overflow-hidden whitespace-nowrap px-3 py-4">
                  {ingredient.Name}
                </td>
                <td className="overflow-hidden whitespace-nowrap px-3 py-4">
                  {ingredient.UM}
                </td>
                <td className="overflow-hidden whitespace-nowrap px-3 py-4">
                  {ingredient.Carbs}
                </td>
                <td className="overflow-hidden whitespace-nowrap px-3 py-4">
                  {ingredient.Proteins}
                </td>
                <td className="overflow-hidden whitespace-nowrap px-3 py-4">
                  {ingredient.Fat}
                </td>
                <td className="overflow-hidden whitespace-nowrap px-3 py-4">
                  {ingredient.Countable ? "Yes" : "No"}
                </td>
                <td className="overflow-hidden whitespace-nowrap px-3 py-4">
                  {ingredient.Quantity || 0}
                </td>
                <td className="overflow-hidden whitespace-nowrap px-3 py-4">
                  {ingredient.Calories || 0}
                </td>
                <td className="sticky right-0 bg-White shadow-md">
                  <UpdateIngredient
                    showEditIngredient={true}
                    id={ingredient.Id}
                    icon={
                      <MdEdit className="m-auto h-7 w-7 rounded-md bg-LightGrey p-2 font-OutfitBold text-Nutmeg" />
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

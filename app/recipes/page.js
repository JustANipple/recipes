"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getRecipes } from "../lib/data";
import { RxCross2 } from "react-icons/rx";
import { MdEdit } from "react-icons/md";

const Table = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes().then((data) => {
      setRecipes(data);
    });
  }, []);

  return (
    <div
      className={`m-auto grid gap-y-4 bg-White p-8 md:mx-10 md:my-32 md:rounded-3xl md:p-10 md:pb-6`}
    >
      <div className="flex justify-between">
        <h1 className="font-Youngserif text-4xl text-DarkCharcoal md:text-[2.5rem]">
          Recipes
        </h1>
        <Link href="/" className="my-auto">
          <RxCross2 className="font-OutfitBold text-Nutmeg" />
        </Link>
      </div>
      <Link
        href="/recipes/0/edit"
        className="flex w-fit items-center gap-2 rounded-md bg-LightGrey p-2 text-xs font-OutfitBold text-Nutmeg"
      >
        <MdEdit className="h-3 w-3 rounded-md bg-LightGrey font-OutfitBold text-Nutmeg" />
        <span>New Recipe</span>
      </Link>

      <hr className="border-LightGrey" />

      <div className="flex flex-wrap justify-center gap-3">
        {recipes &&
          recipes.length > 0 &&
          recipes.map((recipe, index) => (
            <a
              href={`recipes/${recipe.Id}/edit`}
              key={index}
              className="grid w-72 gap-y-5 rounded-md bg-White p-6 shadow-lg transition duration-300 ease-in-out hover:shadow-xl"
            >
              <img
                src={recipe.ImageLink}
                alt={recipe.Title}
                className="h-40 w-full rounded-md object-cover"
              />
              <div className="grid gap-y-1">
                <span className=" rounded-md bg-LightGrey px-3 py-1 text-xs font-OutfitBold text-Nutmeg">
                  PreparationTime time: {recipe.PreparationTime}
                </span>
                <span className=" rounded-md bg-LightGrey px-3 py-1 text-xs font-OutfitBold text-Nutmeg">
                  Cooking time: {recipe.CookingTime}
                </span>
              </div>

              <h2 className="font-Youngserif text-2xl text-DarkCharcoal">
                {recipe.Title}
              </h2>
              <p className="font-Outfit text-WengeBrown">
                {recipe.Description}
              </p>
            </a>
          ))}
      </div>
    </div>
  );
};

export default Table;

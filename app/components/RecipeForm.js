"use client";

import { RxCross2, RxPlus } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { createRecipe } from "../lib/data";
import { useState } from "react";
import Ingredient from "./Ingredient";
import Link from "next/link";
import { getIngredients } from "../lib/data";

const RecipeForm = ({ showForm, handleClick, ingredients }) => {
  const [showIngredientsForm, setShowIngredientsForm] = useState(false);
  const [ingredientsList, setIngredientsList] = useState([]);

  function handlePlusClick() {
    setShowIngredientsForm(!showIngredientsForm);
  }

  return (
    <>
      <main
        className={`m-auto grid gap-y-9 bg-White p-8 md:my-32 md:max-w-desktop md:rounded-3xl md:p-10 md:pb-6 ${showForm ? "" : "hidden"}`}
      >
        {ingredientsList.length > 0 ? ingredients[0].Name : "Loading..."}
        <div className="flex justify-between">
          <h1 className="font-Youngserif text-4xl text-DarkCharcoal md:text-[2.5rem]">
            New/Edit Recipe
          </h1>
          <Link href="/">
            <RxCross2
              className="font-OutfitBold text-Nutmeg"
              onClick={handleClick}
            />
          </Link>
        </div>
        <hr className="border-LightGrey" />
        <div className="grid gap-y-5">
          <form
            action={createRecipe}
            className="grid gap-y-4 font-Outfit text-WengeBrown"
            id="editForm"
          >
            {/* ImageLink */}
            <div className="grid gap-y-2">
              <label htmlFor="imageLink" className="text-sm">
                ImageLink
              </label>
              <input
                type="text"
                name="imageLink"
                id="imageLink"
                placeholder="ImageLink"
                className="rounded-md border border-[lightGrey] px-4 py-1.5"
              />
            </div>
            {/* Title */}
            <div className="grid gap-y-2">
              <label htmlFor="title" className="text-sm">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                className="rounded-md border border-[lightGrey] px-4 py-1.5"
              />
            </div>
            {/* Description */}
            <div className="grid gap-y-2">
              <label htmlFor="description" className="text-sm">
                Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Description"
                className="rounded-md border border-[lightGrey] px-4 py-1.5"
              />
            </div>
            {/* Preparation time */}
            <div className="grid gap-y-2">
              <label htmlFor="preparation-time" className="text-sm">
                Preparation Time (minutes)
              </label>
              <input
                type="number"
                name="preparation-time"
                id="preparation-time"
                placeholder="Preparation Time"
                className="rounded-md border border-[lightGrey] px-4 py-1.5"
              />
            </div>
            {/* Cooking time */}
            <div className="grid gap-y-2">
              <label htmlFor="cooking-time" className="text-sm">
                Cooking Time (minutes)
              </label>
              <input
                type="number"
                name="cooking-time"
                id="cooking-time"
                placeholder="Cooking Time"
                className="rounded-md border border-[lightGrey] px-4 py-1.5"
              />
            </div>
            {/* Ingredients */}
            <div className="grid gap-y-2">
              <label htmlFor="ingredients" className="text-sm">
                Ingredient
              </label>
              <div className="flex items-center gap-3" id="ingredientRow">
                <input
                  type="text"
                  name="ingredient"
                  id="ingredient"
                  placeholder="Ingredient"
                  className="w-full basis-1/2 rounded-md border border-[lightGrey] px-4 py-1.5"
                />
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  placeholder="Qty"
                  className="w-full basis-1/3 rounded-md border border-[lightGrey] px-4 py-1.5"
                />
                <button className="text-black aspect-square h-full rounded-md bg-LightGrey">
                  <MdEdit className="m-auto font-OutfitBold text-Nutmeg" />
                </button>
                <button
                  className="text-black aspect-square h-full rounded-md bg-LightGrey"
                  type="button"
                  onClick={handlePlusClick}
                >
                  <RxPlus className="m-auto font-OutfitBold text-Nutmeg" />
                </button>
              </div>
            </div>
            {/* Instructions */}
            <div className="grid gap-y-2">
              <label htmlFor="instructions" className="text-sm">
                Instruction
              </label>
              <div className="flex gap-3 align-middle">
                <input
                  type="text"
                  name="instruction"
                  id="instruction"
                  placeholder="Instruction"
                  className="rounded-md border border-[lightGrey] px-4 py-1.5"
                />
                <button className="text-black aspect-square rounded-md bg-LightGrey">
                  <RxPlus className="m-auto font-OutfitBold text-Nutmeg" />
                </button>
              </div>
            </div>
          </form>
        </div>
        <hr className="border-LightGrey" />
        <button
          className="text-black ml-auto flex gap-1 rounded-md bg-LightGrey px-4 py-2"
          type="submit"
          form="editForm"
        >
          <p className="my-auto font-Outfit text-Nutmeg">Save</p>
        </button>
      </main>
    </>
  );
};

export default RecipeForm;

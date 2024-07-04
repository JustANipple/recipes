"use client";

import IngredientSelect from "../../../components/IngredientSelect";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RxCross2, RxPlus } from "react-icons/rx";
import {
  createRecipe,
  getRecipes,
  deleteRecipe,
} from "../../../lib/data/recipes";
import { getIngredients } from "../../../lib/data/ingredients";
import { useForm } from "react-hook-form";
import {
  ingredient,
  ingredientRelationship,
  instruction,
  recipe,
} from "../../../lib/utils/interfaces";

const Page = ({ params, handleClick }) => {
  const id = params.id;

  const [ingredients, setIngredients] = useState<ingredient[]>();
  const [recipe, setRecipe] = useState<recipe>();

  useEffect(() => {
    if (id == 0) {
      getIngredients().then((data) => {
        if (parseInt(id) > 0 && data != null) {
          setIngredients(data);
        } else {
          setIngredients(data);
        }
      });
    }
    getRecipes(id).then((data) => {
      if (data != null) {
        setRecipe(data[0]);
        reset({
          imageLink: data[0].ImageLink,
          title: data[0].Title,
          description: data[0].Description,
          preparationTime: data[0].PreparationTime,
          cookingTime: data[0].CookingTime,
          ingredients: data[0].Ingredients,
          instructions: data[0].Instructions,
        });
      }
    });
  }, []);

  function handleIngredientPlusClick() {
    setIngredientSelects([
      ...ingredientSelects,
      { IngredientId: 0, Quantity: 0 },
    ]);
  }

  function handleIngredientCrossClick() {
    if (ingredientSelects.length > 1) {
      setIngredientSelects(ingredientSelects.slice(0, -1));
    }
  }

  function handleInstructionPlusClick() {
    setInstructionInputs([
      ...instructionInputs,
      { Title: "", Description: "" },
    ]);
  }

  function handleInstructionCrossClick() {
    if (instructionInputs.length > 1) {
      setInstructionInputs(instructionInputs.slice(0, -1));
    }
  }

  const createRecipeWithId = createRecipe.bind(null, id);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const onSubmit = (data) => createRecipeWithId(data);

  return (
    <main className="m-auto grid gap-y-9 bg-White p-8 md:my-32 md:max-w-desktop md:rounded-3xl md:p-10 md:pb-6">
      <div className="flex items-center justify-between">
        <h1 className="font-Youngserif text-4xl text-DarkCharcoal md:text-[2.5rem]">
          {id > 0 ? "Edit" : "New"} Recipe
        </h1>
        <Link href="/" className="h-fit">
          <RxCross2
            className="font-OutfitBold text-Nutmeg"
            onClick={handleClick}
          />
        </Link>
      </div>
      <hr className="border-LightGrey" />
      <div className="grid gap-y-5">
        <form
          action={createRecipeWithId}
          className="grid gap-y-4 font-Outfit text-WengeBrown"
          id="editForm"
          onSubmit={handleSubmit(onSubmit)}
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
              {...register("imageLink")}
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
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-xs text-Red">This field is required</span>
            )}
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
              {...register("description")}
            />
          </div>
          {/* Preparation time */}
          <div className="grid gap-y-2">
            <label htmlFor="preparationTime" className="text-sm">
              Preparation Time (minutes)
            </label>
            <input
              type="number"
              name="preparationTime"
              id="preparationTime"
              placeholder="Preparation Time"
              className="rounded-md border border-[lightGrey] px-4 py-1.5"
              {...register("preparationTime")}
            />
          </div>
          {/* Cooking time */}
          <div className="grid gap-y-2">
            <label htmlFor="cooking-time" className="text-sm">
              Cooking Time (minutes)
            </label>
            <input
              type="number"
              name="cookingTime"
              id="cookingTime"
              placeholder="Cooking Time"
              className="rounded-md border border-[lightGrey] px-4 py-1.5"
              {...register("cookingTime")}
            />
          </div>
          {/* Ingredients */}
          <div className="grid gap-y-2">
            <div className="flex justify-between">
              <div className="flex gap-3">
                <label htmlFor="ingredients" className="text-sm">
                  Ingredient
                </label>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="text-black aspect-square h-full rounded-md bg-LightGrey text-sm disabled:opacity-50"
                  type="button"
                  disabled={id > 0}
                  onClick={handleIngredientPlusClick}
                >
                  <RxPlus className="m-auto h-full font-OutfitBold text-Nutmeg" />
                </button>
                <button
                  className="text-black aspect-square h-full rounded-md bg-LightGrey text-sm disabled:opacity-50"
                  type="button"
                  disabled={id > 0}
                  onClick={handleIngredientCrossClick}
                >
                  <RxCross2 className="m-auto h-full font-OutfitBold text-Nutmeg" />
                </button>
              </div>
            </div>
            {ingredientSelects &&
              ingredientSelects.map((_, index) => {
                return (
                  <IngredientSelect
                    key={index}
                    index={index}
                    ingredientsRecipe={ingredients}
                    register={register}
                    setValue={setValue}
                    id={id}
                    watch={watch}
                  />
                );
              })}
          </div>
          {/* Instructions */}
          <div className="grid gap-y-2">
            <div className="flex justify-between">
              <label htmlFor="instructions" className="text-sm">
                Instruction
              </label>
              <div className="flex justify-end gap-2">
                <button
                  className="text-black aspect-square h-full rounded-md bg-LightGrey text-sm disabled:opacity-50"
                  type="button"
                  disabled={id > 0}
                  onClick={handleInstructionPlusClick}
                >
                  <RxPlus className="m-auto h-full font-OutfitBold text-Nutmeg" />
                </button>
                <button
                  className="text-black aspect-square h-full rounded-md bg-LightGrey text-sm disabled:opacity-50"
                  type="button"
                  disabled={id > 0}
                  onClick={handleInstructionCrossClick}
                >
                  <RxCross2 className="m-auto h-full font-OutfitBold text-Nutmeg" />
                </button>
              </div>
            </div>
            {instructionInputs.map((_, index) => {
              return (
                <div className="flex gap-3" key={index}>
                  <input
                    type="text"
                    name="instructionTitle"
                    placeholder="Title"
                    disabled={id > 0}
                    className="w-full basis-1/3 rounded-md border border-[lightGrey] px-4 py-1.5 disabled:opacity-50"
                    {...register(`instructions[${index}].Title`)}
                  />
                  <input
                    type="text"
                    name="instructionDescription"
                    placeholder="Description"
                    className="w-full basis-2/3 rounded-md border border-[lightGrey] px-4 py-1.5"
                    {...register(`instructions[${index}].Description`)}
                  />
                </div>
              );
            })}
          </div>
        </form>
      </div>
      <hr className="border-LightGrey" />
      <div className="flex justify-end gap-3 align-middle">
        <button
          className="text-black flex gap-1 rounded-md bg-Nutmeg px-4 py-2"
          type="button"
          onClick={() => deleteRecipe(id)}
        >
          <p className="my-auto font-Outfit text-White">Delete</p>
        </button>
        <button
          className="text-black flex gap-1 rounded-md bg-LightGrey px-4 py-2"
          type="submit"
          form="editForm"
        >
          <p className="my-auto font-Outfit text-Nutmeg">Save</p>
        </button>
      </div>
    </main>
  );
};

export default Page;

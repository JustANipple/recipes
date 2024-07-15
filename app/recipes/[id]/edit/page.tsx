"use client";

import IngredientSelect from "../../../components/IngredientSelect";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RxCross2, RxPlus } from "react-icons/rx";
import {
  createRecipe,
  getRecipes,
  deleteRecipe,
  updateRecipe,
} from "../../../lib/data/recipes";
import { getIngredients } from "../../../lib/data/ingredients";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ingredient,
  ingredientRelationship,
  recipe,
} from "../../../lib/utils/interfaces";

const Page = ({ params, handleClick }) => {
  const id = params.id;

  const [ingredients, setIngredients] = useState<ingredient[]>();
  const [recipeIngredients, setRecipeIngredients] =
    useState<ingredientRelationship[]>();
  const [recipe, setRecipe] = useState<recipe>();
  const [ingredientRows, setIngredientRows] = useState<number[]>([0]);
  const [instructionRows, setInstructionRows] = useState<number[]>([0]);

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
    if (id != 0) {
      getRecipes(id).then((data) => {
        if (data != null) {
          setRecipe(data[0]);
          setRecipeIngredients(data[0].Ingredients);
          reset({
            ImageLink: data[0].ImageLink,
            Title: data[0].Title,
            Description: data[0].Description,
            PreparationTime: data[0].PreparationTime,
            CookingTime: data[0].CookingTime,
            Ingredients: data[0].Ingredients,
            Instructions: data[0].Instructions,
          });
        }
      });
    }
  }, []);

  function handleIngredientPlusClick() {
    setIngredientRows([...ingredientRows, ingredientRows.length]);
  }

  function handleIngredientCrossClick() {
    if (ingredientRows.length > 1) {
      setIngredientRows(ingredientRows.slice(0, -1));
    }
  }

  function handleInstructionPlusClick() {
    setInstructionRows([...instructionRows, instructionRows.length]);
  }

  function handleInstructionCrossClick() {
    if (instructionRows.length > 1) {
      setInstructionRows(instructionRows.slice(0, -1));
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
  } = useForm<recipe>();

  const onSubmit: SubmitHandler<recipe> = (data) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (key === "Ingredients") {
        const filteredValues = value
          .filter((ingredient) => {
            return (
              ingredient.Ingredient.Id != null &&
              ingredient.Ingredient.Id &&
              ingredient.Quantity != null &&
              ingredient.Quantity
            );
          })
          .map((ingredient) => {
            return {
              IngredientId: ingredient.Ingredient.Id,
              Quantity: ingredient.Quantity,
            };
          });

        // Serialize the array of ingredients to JSON
        formData.append(key, JSON.stringify(filteredValues));
      } else if (key === "Instructions") {
        const filteredValues = value
          .filter((instruction) => {
            return (
              instruction.Title != null &&
              instruction.Title &&
              instruction.Description != null &&
              instruction.Description
            );
          })
          .map((instruction) => {
            return {
              Title: instruction.Title,
              Description: instruction.Description,
            };
          });

        // Serialize the array of instructions to JSON
        formData.append(key, JSON.stringify(filteredValues));
      } else {
        formData.append(key, value);
      }
    }

    if (id != null && id != 0) {
      formData.append("Id", id.toString());
      updateRecipe(formData);
    } else {
      createRecipe(formData);
    }
  };

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
              {...register("ImageLink")}
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
              {...register("Title", { required: true })}
            />
            {errors.Title && (
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
              {...register("Description")}
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
              {...register("PreparationTime")}
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
              {...register("CookingTime")}
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
            {id > 0
              ? recipeIngredients &&
                recipeIngredients.map((_, index) => {
                  return (
                    <IngredientSelect
                      key={index}
                      index={index}
                      recipeIngredients={recipeIngredients}
                      register={register}
                      setValue={setValue}
                      id={id}
                      watch={watch}
                    />
                  );
                })
              : ingredientRows &&
                ingredientRows.map((_, index) => {
                  return (
                    <IngredientSelect
                      key={index}
                      index={index}
                      recipeIngredients={ingredients}
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
            {instructionRows &&
              instructionRows.map((_, index) => {
                return (
                  <div className="flex gap-3" key={index}>
                    <input
                      type="text"
                      name="instructionTitle"
                      placeholder="Title"
                      disabled={id > 0}
                      className="w-full basis-1/3 rounded-md border border-[lightGrey] px-4 py-1.5 disabled:opacity-50"
                      {...register(`Instructions.${index}.Title`)}
                    />
                    <input
                      type="text"
                      name="instructionDescription"
                      placeholder="Description"
                      className="w-full basis-2/3 rounded-md border border-[lightGrey] px-4 py-1.5"
                      {...register(`Instructions.${index}.Description`)}
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
          onClick={() => deleteRecipe(parseInt(id))}
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

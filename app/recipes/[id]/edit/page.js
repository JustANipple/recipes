"use client";

import IngredientSelect from "@/app/components/IngredientSelect";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RxCross2, RxPlus } from "react-icons/rx";
import { createRecipe, getIngredients } from "@/app/lib/data";
import { useForm } from "react-hook-form";
import UpdateIngredient from "@/app/components/UpdateIngredient";
import InstructionInput from "@/app/components/InstructionInput";

const Page = ({ params, showForm, handleClick }) => {
  const id = params.id;

  const [imageLink, setImageLink] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [preparationTime, setPreparationTime] = useState();
  const [cookingTime, setCookingTime] = useState();
  const [ingredients, setIngredients] = useState();
  const [instructions, setInstructions] = useState();

  const [ingredientSelects, setIngredientSelects] = useState([0]);
  const [instructionInputs, setInstructionInputs] = useState([0]);

  useEffect(() => {
    getIngredients(id).then((data) => {
      if (data != null) {
        setImageLink(data.ImageLink);
        setTitle(data.Title);
        setDescription(data.Description);
        setPreparationTime(data.PreparationTime);
        setCookingTime(data.CookingTime);
        setIngredients(data);
        setInstructions(data);
      }
    });
  }, []);

  function handleIngredientPlusClick() {
    setIngredientSelects([...ingredientSelects, ingredientSelects.length]);
  }

  function handleIngredientCrossClick() {
    if (ingredientSelects.length > 1) {
      setIngredientSelects(ingredientSelects.slice(0, -1));
    }
  }

  function handleInstructionPlusClick() {
    setInstructionInputs([...instructionInputs, instructionInputs.length]);
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
              onChange={(e) => setImageLink(e.target.value)}
              defaultValue={imageLink}
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
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={title}
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
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={description}
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
              onChange={(e) => setPreparationTime(e.target.value)}
              defaultValue={preparationTime}
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
              onChange={(e) => setCookingTime(e.target.value)}
              defaultValue={cookingTime}
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
                <UpdateIngredient
                  showEditIngredient={true}
                  id={0}
                  icon={
                    <RxPlus className="m-auto h-full font-OutfitBold text-Nutmeg" />
                  }
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="text-black aspect-square h-full rounded-md bg-LightGrey text-sm"
                  type="button"
                  onClick={handleIngredientPlusClick}
                >
                  <RxPlus className="m-auto h-full font-OutfitBold text-Nutmeg" />
                </button>
                <button
                  className="text-black aspect-square h-full rounded-md bg-LightGrey text-sm"
                  type="button"
                  onClick={handleIngredientCrossClick}
                >
                  <RxCross2 className="m-auto h-full font-OutfitBold text-Nutmeg" />
                </button>
              </div>
            </div>
            {ingredientSelects.map((_, index) => {
              return (
                <IngredientSelect
                  key={index}
                  index={index}
                  ingredients={ingredients}
                  register={register}
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
                  className="text-black aspect-square h-full rounded-md bg-LightGrey text-sm"
                  type="button"
                  onClick={handleInstructionPlusClick}
                >
                  <RxPlus className="m-auto h-full font-OutfitBold text-Nutmeg" />
                </button>
                <button
                  className="text-black aspect-square h-full rounded-md bg-LightGrey text-sm"
                  type="button"
                  onClick={handleInstructionCrossClick}
                >
                  <RxCross2 className="m-auto h-full font-OutfitBold text-Nutmeg" />
                </button>
              </div>
            </div>
            {instructionInputs.map((index) => {
              return (
                <InstructionInput
                  key={index}
                  index={index}
                  register={register}
                />
              );
            })}
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
  );
};

export default Page;

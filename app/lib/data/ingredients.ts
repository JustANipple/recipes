"use server";

import { ingredients } from "@prisma/client";
import prisma from "../utils/prisma";

//CREATE
export async function createIngredient(formData: FormData) {
  checkFormData(formData);

  const data = createIngredientData(formData);

  const ingredient = await prisma.ingredients.create({ data });

  // revalidatePath(`/ingredients${ingredient.Id}/edit`);
  return ingredient;
}

//READ
export async function getIngredients(id?: number) {
  const ingredients = await prisma.ingredients.findMany({
    where: id ? { Id: id } : undefined,
  });
  return ingredients;
}

//UPDATE
export async function updateIngredient(id: number, formData: FormData) {
  checkFormData(formData);

  const data = createIngredientData(formData);

  const ingredient = await prisma.ingredients.update({
    where: { Id: id },
    data,
  });

  // revalidatePath(`/ingredients${ingredient.Id}/edit`);
  return ingredient;
}

//DELETE
export async function deleteIngredient(id: number) {
  const existsInRelationships = await prisma.ingredientsRelationships.findFirst(
    {
      where: {
        IngredientId: id,
      },
    },
  );
  if (existsInRelationships) {
    throw new Error("Ingredient is used in a recipe");
  }
  const ingredient = await prisma.ingredients.delete({
    where: {
      Id: id,
    },
  });

  return ingredient;
  // redirect("/ingredients");
}

function createIngredientData(formData: FormData): ingredients {
  return {
    Id: parseInt(formData.get("id").toString()),
    Name: formData.get("name").toString(),
    Carbs: parseFloat(formData.get("carbs").toString()),
    Proteins: parseFloat(formData.get("proteins").toString()),
    Fat: parseFloat(formData.get("fat").toString()),
    Countable: formData.get("countable").valueOf() === "true",
    Quantity: parseFloat(formData.get("quantity").toString()),
  };
}

function checkFormData(formData: FormData) {
  if (formData.get("name") === "") throw new Error("name is required");

  if (isNaN(parseFloat(formData.get("carbs").toString())))
    throw new Error("carbs are required");

  if (isNaN(parseFloat(formData.get("proteins").toString())))
    throw new Error("proteins are required");

  if (isNaN(parseFloat(formData.get("fat").toString())))
    throw new Error("fat is required");

  if (
    formData.get("countable").valueOf() === "false" &&
    isNaN(parseFloat(formData.get("quantity").toString()))
  )
    throw new Error("must indicate a quantity if item is uncountable");
}

export function calculateCalories(
  carbs: number,
  proteins: number,
  fat: number,
) {
  let calories = 0;
  //Carbs: 4kcal
  calories += carbs * 4;
  //Proteins: 4kcal
  calories += proteins * 4;
  //Fat: 9kcal
  calories += fat * 9;
  return calories;
}

"use server";

import { ingredients } from "@prisma/client";
import prisma from "../utils/prisma";
import { ingredient } from "../utils/interfaces";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//CREATE
export async function createIngredient(formData: FormData) {
  checkFormData(formData);

  const data = createIngredientData(formData);

  const ingredient = await prisma.ingredients.create({ data });

  revalidatePath(`/ingredients${ingredient.Id}/edit`);
  redirect("/ingredients");
  // return ingredient;
}

//READ
export async function getIngredients(id?: number): Promise<ingredient[]> {
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

  revalidatePath(`/ingredients${ingredient.Id}/edit`);
  redirect("/ingredients");
  // return ingredient;
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

  redirect("/ingredients");
  // return ingredient;
}

function createIngredientData(formData: FormData): ingredient {
  const ingredient: ingredient = {
    Name: formData.get("Name").toString(),
    Carbs: parseFloat(formData.get("Carbs").toString()),
    Proteins: parseFloat(formData.get("Proteins").toString()),
    Fat: parseFloat(formData.get("Fat").toString()),
    Countable: formData.get("Countable").valueOf() === "true",
    Quantity: parseFloat(formData.get("Quantity").toString()),
  };

  if (formData.get("Id") != null) {
    ingredient.Id = parseInt(formData.get("Id").toString());
  }

  return ingredient;
}

function checkFormData(formData: FormData) {
  if (formData.get("Name") === "") throw new Error("name is required");

  if (isNaN(parseFloat(formData.get("Carbs").toString())))
    throw new Error("carbs are required");

  if (isNaN(parseFloat(formData.get("Proteins").toString())))
    throw new Error("proteins are required");

  if (isNaN(parseFloat(formData.get("Fat").toString())))
    throw new Error("fat is required");

  if (
    formData.get("Countable").valueOf() === "false" &&
    isNaN(parseFloat(formData.get("Quantity").toString()))
  )
    throw new Error("must indicate a quantity if item is uncountable");
}

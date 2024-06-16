"use server";

import { PrismaClient, ingredients } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

//CREATE
export async function createIngredient(formData: FormData) {
  checkFormData(formData);

  const data = createIngredientData(formData);

  const ingredient = await prisma.ingredients.create({ data });

  revalidatePath("/ingredients");
  redirect("/ingredients");

  return ingredient;
}

//READ ONE
export async function getIngredient(id: number) {
  let ingredient: ingredients;
  if (id && id !== 0) {
    ingredient = await prisma.ingredients.findFirst({
      where: {
        Id: id,
      },
    });
  }

  return ingredient;
}

//READ MULTIPLE
export async function getIngredients() {
  const ingredients = await prisma.ingredients.findMany();

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

  revalidatePath("/ingredients");
  redirect("/ingredients");

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

  revalidatePath("/ingredients");
  redirect("/ingredients");
}

function createIngredientData(formData: FormData): ingredients {
  return {
    Id: parseInt(formData.get("id").toString()),
    Name: formData.get("name").toString(),
    UM: formData.get("countable").valueOf() ? "pz" : "g",
    Carbs: parseFloat(formData.get("carbs").toString()),
    Proteins: parseFloat(formData.get("proteins").toString()),
    Fat: parseFloat(formData.get("fat").toString()),
    Countable: formData.get("countable").valueOf() ? true : false,
    Quantity: parseFloat(formData.get("quantity").toString()),
    Calories: calculateCalories(
      parseFloat(formData.get("carbs").toString()),
      parseFloat(formData.get("proteins").toString()),
      parseFloat(formData.get("fat").toString()),
    ),
  };
}

function checkFormData(formData: FormData) {
  if (!formData.get("name")) throw new Error("name is required");
  if (!formData.get("carbs")) throw new Error("carbs are required");
  if (!formData.get("proteins")) throw new Error("proteins are required");
  if (!formData.get("fat")) throw new Error("fat is required");
  if (!formData.get("countable"))
    throw new Error("choose if ingredient is countable or not");
  if (formData.get("countable") === "false" && !formData.get("quantity"))
    throw new Error("must indicate a quantity if item is uncountable");
}

function calculateCalories(carbs: number, proteins: number, fat: number) {
  let calories = 0;
  //Carbs: 4kcal
  calories += carbs * 4;
  //Proteins: 4kcal
  calories += proteins * 4;
  //Fat: 9kcal
  calories += fat * 9;
  return calories;
}
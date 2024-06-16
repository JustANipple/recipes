"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

function checkFormData(formData: FormData) {
  if ((formData.get("name") as string) === null)
    throw new Error("name is required");
}

export async function getIngredientsForRecipe() {
  const ingredients = await getIngredients();
  let ingredientsArray = [];
  ingredients.forEach((ingredient) => {
    ingredientsArray.push({
      Ingredient: ingredient,
      Quantity: 0,
    });
  });
  return ingredientsArray;
}

export async function createIngredient(id, formData: FormData) {
  if (!formData.countable && formData.quantity == 0) {
    throw new Error("Quantity is required for non-countable ingredients");
  }

  let ingredients = {};
  if (!id || parseInt(id) <= 0) {
    ingredients = await prisma.ingredients.create({
      data: {
        Name: formData.name,
        UM: formData.Countable ? "pz" : "g",
        Carbs: parseFloat(formData.carbs),
        Proteins: parseFloat(formData.proteins),
        Fat: parseFloat(formData.fat),
        Countable: formData.countable,
        Quantity: parseFloat(formData.quantity),
        Calories: calculateCalories(
          formData.carbs,
          formData.proteins,
          formData.fat,
        ),
      },
    });
  } else {
    ingredients = await prisma.ingredients.update({
      where: {
        Id: parseInt(id),
      },
      data: {
        Name: formData.name,
        UM: formData.countable ? "pz" : "g",
        Carbs: parseFloat(formData.carbs),
        Proteins: parseFloat(formData.proteins),
        Fat: parseFloat(formData.fat),
        Countable: formData.countable,
        Quantity: parseFloat(formData.quantity),
        Calories: calculateCalories(
          formData.carbs,
          formData.proteins,
          formData.fat,
        ),
      },
    });
  }

  revalidatePath("/ingredients");
  redirect("/ingredients");
}

export async function getIngredientById(id: number) {
  let ingredient;
  if (id && id !== 0) {
    ingredient = await prisma.ingredients.findFirst({
      where: {
        Id: id,
      },
    });
  }

  return ingredient;
}

export async function getIngredientsById(id: number) {
  let ingredients;
  if (id && id !== 0) {
    ingredients = await prisma.ingredientsRelationships.findMany({
      where: {
        RecipeId: id,
      },
      include: {
        Ingredient: true,
      },
    });
  }

  return ingredients;
}

export async function getIngredients() {
  const ingredients = await prisma.ingredients.findMany();

  return ingredients;
}

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

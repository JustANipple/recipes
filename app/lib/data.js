"use server";

import { PrismaClient } from "@prisma/client";

export async function createRecipe(formData) {
  const rawFormData = {
    imageLink: formData.get("imageLink"),
    title: formData.get("title"),
    description: formData.get("description"),
    preparationTime: formData.get("preparation-time"),
    cookingTime: formData.get("cooking-time"),
    carbs: formData.get("carbs"),
    protein: formData.get("protein"),
    fat: formData.get("fat"),
  };

  console.log(rawFormData);
}

export async function getRecipe() {
  const prisma = new PrismaClient();
  const recipes = await prisma.recipes.find({
    where: {
      title: "Simple Omelette Recipe",
    },
    include: {
      preparation: true,
      ingredients: true,
      instructions: true,
    },
  });
  return recipes;
}

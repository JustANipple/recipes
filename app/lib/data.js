"use server";

import { PrismaClient } from "@prisma/client";

export async function createRecipe(formData) {
  const rawFormData = {
    imageLink: formData.get("imageLink"),
    title: formData.get("title"),
    description: formData.get("description"),
    preparationTime: formData.get("preparation-time"),
    cookingTime: formData.get("cooking-time"),
    ingredient: formData.getAll("ingredient"),
    um: formData.getAll("um"),
    quantity: formData.getAll("quantity"),
    instruction: formData.getAll("instruction"),
    carbs: formData.get("carbs"),
    protein: formData.get("protein"),
    fat: formData.get("fat"),
  };

  console.log(rawFormData);

  const prisma = new PrismaClient();

  //Create a recipe
  const recipe = await prisma.recipes.create({
    data: {
      ImageLink: rawFormData.imageLink,
      Title: rawFormData.title,
      Description: rawFormData.description,
      Carbs: parseInt(rawFormData.carbs, 10),
      Protein: parseInt(rawFormData.protein, 10),
      Fat: parseInt(rawFormData.fat, 10),
    },
  });
  console.log("Recipe: " + recipe);

  //Create cooking and preparation times
  const preparation = await prisma.preparations.create({
    data: {
      PreparationTime: parseInt(rawFormData.preparationTime, 10),
      CookingTime: parseInt(rawFormData.cookingTime, 10),
    },
  });
  console.log("Preparation: " + preparation);
  //Create relations between preparation and recipe
  const preparationRelationship = await prisma.preparationsRelationships.create(
    {
      data: {
        RecipeId: recipe.Id,
        PreparationId: preparation.Id,
      },
    },
  );
  console.log("PreparationRelationship: " + preparationRelationship);

  //Create all the ingredients
  for (let i = 0; i < rawFormData.ingredient.length; i++) {
    const ingredients = await prisma.ingredients.create({
      data: {
        Name: rawFormData.ingredient[i],
        UM: rawFormData.um[i],
      },
    });
    console.log("Ingredient: " + ingredients);
    //Create relations between ingredients and recipe
    const ingredientsRelationship =
      await prisma.ingredientsRelationships.create({
        data: {
          RecipeId: recipe.Id,
          IngredientId: ingredients.Id,
          Quantity: rawFormData.quantity[i],
        },
      });
    console.log("IngredientRelationship: " + ingredientsRelationship);
  }

  //Create all the instructions
  for (let i = 0; i < rawFormData.instruction.length; i++) {
    const instructions = await prisma.instructions.create({
      data: {
        Description: rawFormData.instruction[i],
      },
    });
    console.log("Instruction: " + instructions);
    //Create relations between instructions and recipe
    const instructionsRelationship =
      await prisma.instructionsRelationships.create({
        data: {
          RecipeId: recipe.Id,
          InstructionId: instructions.Id,
        },
      });
    console.log("InstructionRelationship: " + instructionsRelationship);
  }
}

export async function getIngredients() {
  const prisma = new PrismaClient();
  return prisma.ingredients.findMany();
}

export async function getIngredient(id) {
  const prisma = new PrismaClient();
  return prisma.ingredients.findUnique({
    where: {
      Id: id,
    },
  });
}

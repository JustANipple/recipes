"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createRecipe(id, data) {
  console.log(data);
  const rawData = {
    imageLink: data.imageLink,
    title: data.title,
    description: data.description,
    preparationTime: data.preparationTime,
    cookingTime: data.cookingTime,
  };

  console.log(rawData);

  const prisma = new PrismaClient();

  //Create a recipe
  const recipe = await prisma.recipes.create({
    data: {
      ImageLink: rawData.imageLink,
      Title: rawData.title,
      Description: rawData.description,
      PreparationTime: parseFloat(rawData.preparationTime, 10),
      CookingTime: parseFloat(rawData.cookingTime, 10),
    },
  });
  console.log("Recipe: " + recipe);

  //Create cooking and preparation times
  const preparation = await prisma.preparations.create({
    data: {
      PreparationTime: parseInt(rawData.preparationTime, 10),
      CookingTime: parseInt(rawData.cookingTime, 10),
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

  for (let i = 0; i < rawData.ingredient.length; i++) {
    const ingredients = await prisma.ingredients.create({
      data: {
        Name: rawData.ingredient[i],
        UM: rawData.um[i],
      },
    });
    console.log("Ingredient: " + ingredients);
    //Create relations between ingredients and recipe
    const ingredientsRelationship =
      await prisma.ingredientsRelationships.create({
        data: {
          RecipeId: recipe.Id,
          IngredientId: ingredients.Id,
          Quantity: rawData.quantity[i],
        },
      });
    console.log("IngredientRelationship: " + ingredientsRelationship);
  }

  //Create all the instructions
  for (let i = 0; i < rawData.instruction.length; i++) {
    const instructions = await prisma.instructions.create({
      data: {
        Description: rawData.instruction[i],
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

//Ingredients
export async function createIngredient(id, data) {
  const rawData = {
    name: data.name,
    um: data.um,
    carbs: data.carbs,
    proteins: data.proteins,
    fat: data.fat,
    countable: data.countable,
    quantity: data.quantity || 0,
  };

  console.log(rawData);

  const prisma = new PrismaClient();

  let ingredient = {};
  if (parseInt(id) <= 0) {
    ingredient = await prisma.ingredients.create({
      data: {
        Name: rawData.name,
        UM: rawData.um,
        Carbs: parseFloat(rawData.carbs),
        Proteins: parseFloat(rawData.proteins),
        Fat: parseFloat(rawData.fat),
        Countable: rawData.countable === null ? false : true,
        Quantity: parseFloat(rawData.quantity),
      },
    });
  } else {
    ingredient = await prisma.ingredients.update({
      where: {
        Id: parseInt(id),
      },
      data: {
        Name: rawData.name,
        UM: rawData.um,
        Carbs: parseFloat(rawData.carbs),
        Proteins: parseFloat(rawData.proteins),
        Fat: parseFloat(rawData.fat),
        Countable: rawData.countable === null ? false : true,
        Quantity: parseFloat(rawData.quantity),
      },
    });
  }

  console.log(ingredient);

  revalidatePath("/ingredients");
  redirect("/recipes/0/edit");
}

export async function deleteIngredient(id) {
  const prisma = new PrismaClient();
  await prisma.ingredients.delete({
    where: {
      Id: parseInt(id),
    },
  });

  revalidatePath("/ingredients");
  redirect("/");
}

export async function getIngredients() {
  const prisma = new PrismaClient();
  const ingredients = await prisma.ingredients.findMany();
  return ingredients;
}

export async function getIngredient(id) {
  const prisma = new PrismaClient();
  const ingredient = await prisma.ingredients.findFirst({
    where: {
      Id: parseInt(id),
    },
  });
  return ingredient;
}

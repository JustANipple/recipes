"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

//#region Recipes
export async function createRecipe(id, data) {
  const rawData = {
    imageLink: data.imageLink,
    title: data.title,
    description: data.description,
    preparationTime: data.preparationTime,
    cookingTime: data.cookingTime,
  };

  //Transaction so that if one of the queries fails, the others are not executed
  await prisma.$transaction(async (prisma) => {
    //Recipe
    const recipe = await prisma.recipes.create({
      data: {
        ImageLink: rawData.imageLink,
        Title: rawData.title,
        Description: rawData.description,
        PreparationTime: parseFloat(rawData.preparationTime, 10),
        CookingTime: parseFloat(rawData.cookingTime, 10),
      },
    });
    //Preparations
    await createPreparation(rawData.preparationTime, rawData.cookingTime);
    //Ingredients
    for (let i = 0; i < data.ingredients.length; i++) {
      if (data.ingredients[i] === "" || data.quantities[i] === "") {
        continue;
      }
      await createIngredientRelationship(
        data.ingredients[i],
        data.quantities[i],
        recipe.Id,
      );
    }
    //Instructions
    await createInstructions(data.instructions, recipe.Id);
  });
}

export async function getRecipes(id) {
  let recipes;
  if (id && id !== 0) {
    recipes = await prisma.recipes.findFirst({
      where: {
        Id: parseInt(id),
      },
    });
  } else {
    recipes = await prisma.recipes.findMany();
  }

  //For each recipe, get ingredients referring to ingredientsRelationships
  for (let i = 0; i < recipes.length; i++) {
    const ingredients = await prisma.ingredientsRelationships.findMany({
      where: {
        RecipeId: recipes[i].Id,
      },
    });
    //For each ingredient, get the ingredient data
    for (let j = 0; j < ingredients.length; j++) {
      const ingredient = await prisma.ingredients.findFirst({
        where: {
          Id: ingredients[j].IngredientId,
        },
      });
      ingredients[j].ingredient = ingredient;
    }
    recipes[i].ingredients = ingredients;
  }

  //For each recipe, get preparations referring to preparationsRelationships
  for (let i = 0; i < recipes.length; i++) {
    const preparations = await prisma.preparationsRelationships.findMany({
      where: {
        RecipeId: recipes[i].Id,
      },
    });
    recipes[i].preparations = preparations;
  }

  //For each recipe, get instructions referring to instructionsRelationships
  for (let i = 0; i < recipes.length; i++) {
    const instructions = await prisma.instructionsRelationships.findMany({
      where: {
        RecipeId: recipes[i].Id,
      },
    });
    recipes[i].instructions = instructions;
  }
  console.log(recipes[0].instructions[0]);
  return recipes;
}
//#endregion Recipes

//#region Preparations
export async function createPreparation(
  recipeId,
  preparationTime,
  cookingTime,
) {
  const preparation = await prisma.preparations.create({
    data: {
      PreparationTime: parseInt(preparationTime, 10),
      CookingTime: parseInt(cookingTime, 10),
    },
  });
  createPreparationRelationship(recipeId, preparation.Id);
}

export async function createPreparationRelationship(recipeId, preparationId) {
  const preparationRelationship = await prisma.preparationsRelationships.create(
    {
      data: {
        RecipeId: parseInt(recipeId),
        PreparationId: preparationId,
      },
    },
  );
}
//#endregion Preparations

//#region Ingredients
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

  revalidatePath("/ingredients");
  redirect("/recipes/0/edit");
}

export async function createIngredientRelationship(
  ingredient,
  quantity,
  recipeId,
) {
  const ingredientsRelationship = await prisma.ingredientsRelationships.create({
    data: {
      RecipeId: recipeId,
      IngredientId: parseInt(ingredient),
      Quantity: parseFloat(quantity),
    },
  });
}

export async function getIngredients(id) {
  let ingredients;
  if (id && id !== 0) {
    ingredients = await prisma.ingredients.findFirst({
      where: {
        Id: parseInt(id),
      },
    });
  } else {
    ingredients = await prisma.ingredients.findMany();
  }
  return ingredients;
}

export async function deleteIngredient(id) {
  const ingredient = await prisma.ingredients.delete({
    where: {
      Id: parseInt(id),
    },
  });

  revalidatePath("/ingredients");
  redirect("/");
}
//#endregion Ingredients

//#region Instructions
export async function createInstructions(instructionsList, recipeId) {
  for (let i = 0; i < instructionsList.length; i++) {
    if (instructionsList[i] === "") {
      continue;
    }
    const instruction = await prisma.instructions.create({
      data: {
        Description: instructionsList[i],
      },
    });
    createInstructionRelationship(instruction, recipeId);
  }
}

export async function createInstructionRelationship(instruction, recipeId) {
  const instructionsRelationship =
    await prisma.instructionsRelationships.create({
      data: {
        RecipeId: recipeId,
        InstructionId: instruction.Id,
      },
    });
}
//#endregion Instructions

"use server";

import { recipes } from "@prisma/client";
import prisma from "../prisma";
import { ingredientRelationship, instruction, recipe } from "../interfaces";

export async function createRecipe(formData: FormData) {
  checkFormData(formData);

  const data = createRecipeData(formData);

  if (
    !isNaN(data.Id) &&
    data.Id > 0 &&
    (await prisma.recipes.findFirst({ where: { Id: data.Id } }))
  )
    throw new Error(`Recipe with id ${data.Id} already exists`);

  let recipe: recipes;
  await prisma.$transaction(async (prisma) => {
    recipe = await prisma.recipes.create({
      data: {
        ...data,
        Ingredients: {
          create: data.Ingredients.map((ingredient) => ({
            Ingredient: {
              connect: { Id: ingredient.IngredientId },
            },
            Quantity: ingredient.Quantity,
          })),
        },
        Instructions: {
          create: data.Instructions.map((instruction) => ({
            Title: instruction.Title,
            Description: instruction.Description,
          })),
        },
      },
    });
  });

  // revalidatePath(`/recipes${recipe.Id}/edit`);
  return recipe;
}

function createRecipeIngredientsData(
  formData: FormData,
): ingredientRelationship[] {
  const recipeIngredients: ingredientRelationship[] = formData
    .getAll("recipeIngredients[]")
    .map((recipeIngredient) => {
      const ingredient = JSON.parse(recipeIngredient.toString());
      return {
        // RecipeId: parseInt(formData.get("id").toString()),
        IngredientId: parseInt(ingredient.ingredientId),
        Quantity: parseFloat(ingredient.quantity),
      };
    });

  return recipeIngredients;
}

function createRecipeInstructionsData(formData: FormData): instruction[] {
  const recipeInstructions: instruction[] = formData
    .getAll("recipeInstructions[]")
    .map((recipeInstruction) => {
      const instruction = JSON.parse(recipeInstruction.toString());
      return {
        // RecipeId: parseInt(formData.get("id").toString()),
        Title: instruction.title,
        Description: instruction.description,
      };
    });

  return recipeInstructions;
}

function createRecipeData(formData: FormData): recipe {
  return {
    // Id: parseInt(formData.get("id").toString()),
    ImageLink: formData.get("imageLink").toString(),
    Title: formData.get("title").toString(),
    Description: formData.get("description").toString(),
    PreparationTime: parseFloat(formData.get("preparationTime").toString()),
    CookingTime: parseFloat(formData.get("cookingTime").toString()),
    Ingredients: createRecipeIngredientsData(formData),
    Instructions: createRecipeInstructionsData(formData),
  };
}

function checkFormData(formData: FormData) {
  if (formData.get("title") === "") throw new Error("title is required");

  if (formData.get("description") === "")
    throw new Error("description is required");

  if (formData.get("preparationTime") === "")
    throw new Error("preparation time is required");

  if (isNaN(parseFloat(formData.get("preparationTime").toString())))
    throw new Error("preparation time is not a number");

  if (isNaN(parseFloat(formData.get("cookingTime").toString())))
    throw new Error("cooking time is not a number");
}

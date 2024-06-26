"use server";

import {
  ingredientsRelationships,
  instructions,
  recipes,
} from "@prisma/client";
import prisma from "../prisma";

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
    const recipe = await prisma.recipes.create({
      data: {
        ...data,
        Ingredients: {
          create: data.RecipeIngredients.map((ingredient) => ({
            Ingredient: {
              connect: { Id: ingredient.IngredientId },
            },
            Quantity: ingredient.Quantity,
          })),
        },
        Instructions: {
          create: data.RecipeInstructions.map((instruction) => ({
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

interface recipe {
  Id?: number;
  ImageLink: string;
  Title: string;
  Description: string;
  PreparationTime: number;
  CookingTime: number;
  RecipeIngredients: ingredientsRelationships[];
  RecipeInstructions: instructions[];
}

function createRecipeData(formData: FormData): recipe {
  const recipeIngredients: ingredientsRelationships[] = formData
    .getAll("recipeIngredients[]")
    .map((recipeIngredient) => {
      const ingredient = JSON.parse(recipeIngredient.toString());
      return {
        RecipeId: parseInt(formData.get("id").toString()),
        IngredientId: parseInt(ingredient.ingredientId),
        Quantity: parseFloat(ingredient.quantity),
      };
    });

  const recipeInstructions: instructions[] = formData
    .getAll("recipeInstructions[]")
    .map((recipeInstruction) => {
      const instruction = JSON.parse(recipeInstruction.toString());
      return {
        RecipeId: parseInt(formData.get("id").toString()),
        Id: parseInt(formData.get("id").toString()),
        Title: instruction.title,
        Description: instruction.description,
      };
    });

  return {
    // Id: parseInt(formData.get("id").toString()),
    ImageLink: formData.get("imageLink").toString(),
    Title: formData.get("title").toString(),
    Description: formData.get("description").toString(),
    PreparationTime: parseFloat(formData.get("preparationTime").toString()),
    CookingTime: parseFloat(formData.get("cookingTime").toString()),
    RecipeIngredients: recipeIngredients,
    RecipeInstructions: recipeInstructions,
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

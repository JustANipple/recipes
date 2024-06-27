"use server";

import { recipes } from "@prisma/client";
import prisma from "../utils/prisma";
import {
  ingredientRelationship,
  instruction,
  recipe,
} from "../utils/interfaces";

export async function createRecipe(formData: FormData): Promise<recipes> {
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

export async function updateRecipe(formData: FormData): Promise<recipes> {
  checkFormData(formData);

  const data = createRecipeData(formData);

  const recipe = await prisma.recipes.update({
    where: { Id: data.Id },
    data: {
      ...data,
      Ingredients: {
        updateMany: data.Ingredients.map((ingredient) => ({
          where: {
            RecipeId: data.Id,
            IngredientId: ingredient.IngredientId,
          },
          data: {
            Quantity: ingredient.Quantity,
          },
        })),
      },
      Instructions: {
        updateMany: data.Instructions.map((instruction) => ({
          where: {
            RecipeId: data.Id,
            Title: instruction.Title,
          },
          data: {
            Description: instruction.Description,
          },
        })),
      },
    },
  });

  // revalidatePath(`/recipes${recipe.Id}/edit`);
  return recipe;
}

export async function getRecipes(id?: number): Promise<recipes[]> {
  const recipes = await prisma.recipes.findMany({
    where: id ? { Id: id } : undefined,
    include: {
      Ingredients: true,
      Instructions: true,
    },
  });

  return recipes;
}

export async function deleteRecipe(id: number) {
  const recipe = await prisma.recipes.delete({
    where: {
      Id: id,
    },
  });

  // revalidatePath("/recipes");
  // redirect("/");
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
        Title: instruction.title,
        Description: instruction.description,
      };
    });

  return recipeInstructions;
}

function createRecipeData(formData: FormData): recipe {
  // create recipe before returning it
  const recipe: recipe = {
    ImageLink: formData.get("imageLink").toString(),
    Title: formData.get("title").toString(),
    Description: formData.get("description").toString(),
    PreparationTime: parseFloat(formData.get("preparationTime").toString()),
    CookingTime: parseFloat(formData.get("cookingTime").toString()),
    Ingredients: createRecipeIngredientsData(formData),
    Instructions: createRecipeInstructionsData(formData),
  };

  if (formData.get("id") != null) {
    recipe.Id = parseInt(formData.get("id").toString());
  }

  return recipe;
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

  if (formData.get("recipeIngredients[]") === null)
    throw new Error("at least one ingredient is required");

  if (formData.get("recipeInstructions[]") === null)
    throw new Error("at least one instruction is required");
}

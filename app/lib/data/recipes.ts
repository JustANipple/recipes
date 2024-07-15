"use server";

import { recipes } from "@prisma/client";
import prisma from "../utils/prisma";
import {
  ingredient,
  ingredientRelationship,
  instruction,
  recipe,
} from "../utils/interfaces";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

  try {
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
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }

  revalidatePath(`/recipes${recipe.Id}/edit`);
  redirect("/recipes");
  // return recipe;
}

export async function updateRecipe(formData: FormData): Promise<recipes> {
  checkFormData(formData);

  const data = createRecipeData(formData);
  let recipe: recipes;

  try {
    recipe = await prisma.recipes.update({
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
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }

  // revalidatePath(`/recipes${recipe.Id}/edit`);
  return recipe;
}

export async function getRecipes(id?: number): Promise<recipe[]> {
  let recipes: recipe[];

  try {
    recipes = await prisma.recipes.findMany({
      where: id ? { Id: parseInt(id.toString()) } : undefined,
      include: {
        Ingredients: {
          include: {
            Ingredient: true,
          },
        },
        Instructions: true,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }

  return recipes;
}

export async function deleteRecipe(id: number) {
  let recipe: recipes;

  try {
    recipe = await prisma.recipes.delete({
      where: {
        Id: id,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }

  revalidatePath("/recipes");
  redirect("/");
  // return recipe;
}

function createRecipeIngredientsData(
  formData: FormData,
): ingredientRelationship[] {
  return formData.getAll("Ingredients").flatMap((recipeIngredient) => {
    const ingredients: ingredientRelationship[] = JSON.parse(
      recipeIngredient.toString(),
    );
    return ingredients.map((ingredient) => ({
      IngredientId: parseInt(ingredient.IngredientId.toString()),
      Quantity: parseFloat(ingredient.Quantity.toString()),
    }));
  });
}

function createRecipeInstructionsData(formData: FormData): instruction[] {
  const recipeInstructions: instruction[] = formData
    .getAll("Instructions")
    .flatMap((recipeInstruction) => {
      const instructions: instruction[] = JSON.parse(
        recipeInstruction.toString(),
      );
      return instructions.map((instruction) => ({
        Title: instruction.Title,
        Description: instruction.Description,
      }));
    });

  return recipeInstructions;
}

function createRecipeData(formData: FormData): recipe {
  // create recipe before returning it
  const recipe: recipe = {
    ImageLink: formData.get("ImageLink").toString(),
    Title: formData.get("Title").toString(),
    Description: formData.get("Description").toString(),
    PreparationTime: parseFloat(formData.get("PreparationTime").toString()),
    CookingTime: parseFloat(formData.get("CookingTime").toString()),
    Ingredients: createRecipeIngredientsData(formData),
    Instructions: createRecipeInstructionsData(formData),
  };

  if (formData.get("Id") != null) {
    recipe.Id = parseInt(formData.get("Id").toString());
  }

  return recipe;
}

function checkFormData(formData: FormData) {
  if (formData.get("Title") === "") throw new Error("title is required");

  if (formData.get("Description") === "")
    throw new Error("description is required");

  if (formData.get("PreparationTime") === "")
    throw new Error("preparation time is required");

  if (isNaN(parseFloat(formData.get("PreparationTime").toString())))
    throw new Error("preparation time is not a number");

  if (isNaN(parseFloat(formData.get("CookingTime").toString())))
    throw new Error("cooking time is not a number");

  if (formData.get("Ingredients") === null)
    throw new Error("at least one ingredient is required");

  if (formData.get("Instructions") === null)
    throw new Error("at least one instruction is required");
}

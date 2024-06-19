"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

//#region Recipes
export async function createRecipe(id, data) {
  data.ingredients = data.ingredients.filter(
    (ingredient) => ingredient.Ingredient.Id !== "",
  );
  data.instructions = data.instructions.filter(
    (instruction) => instruction.Title !== "" && instruction.Description !== "",
  );
  let recipe;
  if (id && parseInt(id) == 0) {
    await prisma.$transaction(async (prisma) => {
      recipe = await prisma.recipes.create({
        data: {
          ImageLink: data.imageLink,
          Title: data.title,
          Description: data.description,
          PreparationTime: parseFloat(data.preparationTime, 10),
          CookingTime: parseFloat(data.cookingTime, 10),

          Ingredients: {
            create: data.ingredients.map((ingredient) => ({
              Ingredient: {
                connect: { Id: parseInt(ingredient.Ingredient.Id) },
              },
              Quantity: parseFloat(ingredient.Quantity, 10),
            })),
          },

          Instructions: {
            create: data.instructions.map((instruction) => ({
              Title: instruction.Title,
              Description: instruction.Description,
            })),
          },
        },
      });
    });
  } else {
    // Update the recipe
    recipe = await prisma.recipes.update({
      where: {
        Id: parseInt(id),
      },
      data: {
        ImageLink: data.imageLink,
        Title: data.title,
        Description: data.description,
        PreparationTime: parseFloat(data.preparationTime, 10),
        CookingTime: parseFloat(data.cookingTime, 10),
      },
    });

    // Update the ingredients
    for (let ingredient of data.ingredients) {
      await prisma.ingredientsRelationships.update({
        where: {
          RecipeId_IngredientId: {
            RecipeId: parseInt(id),
            IngredientId: parseInt(ingredient.Ingredient.Id),
          },
        },
        data: { Quantity: parseFloat(ingredient.Quantity, 10) },
      });
    }

    // Update the instructions
    for (let instruction of data.instructions) {
      await prisma.instructions.update({
        where: { Title: instruction.Title },
        data: {
          Description: instruction.Description,
        },
      });
    }
  }

  redirect("/");
}

export async function getRecipes(id) {
  let recipes;
  if (id && id !== 0) {
    recipes = await prisma.recipes.findFirst({
      where: {
        Id: parseInt(id),
      },
      include: {
        Ingredients: {
          include: {
            Ingredient: true,
          },
        },
        Instructions: true,
      },
    });
  } else {
    recipes = await prisma.recipes.findMany({
      include: {
        Ingredients: {
          include: { Ingredient: true },
        },
        Instructions: true,
      },
    });
  }

  return recipes;
}

export async function deleteRecipe(id) {
  const recipe = await prisma.recipes.delete({
    where: {
      Id: parseInt(id),
    },
  });

  revalidatePath("/recipes");
  redirect("/");
}
//#endregion Recipes

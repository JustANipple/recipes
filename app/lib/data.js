"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

//#region Recipes
export async function createRecipe(id, data) {
  let recipe;
  if (id && id !== 0) {
    await prisma.$transaction(async (prisma) => {
      if (id && id !== 0) {
        recipe = await prisma.recipes.create({
          data: {
            ImageLink: data.imageLink,
            Title: data.title,
            Description: data.description,
            PreparationTime: parseFloat(data.preparationTime, 10),
            CookingTime: parseFloat(data.cookingTime, 10),

            Ingredients: {
              create: data.ingredients.map((ingredient) => ({
                Ingredient: { connect: { Id: parseInt(ingredient.id) } },
                Quantity: parseFloat(ingredient.quantity, 10),
              })),
            },

            Instructions: {
              create: data.instructions.map((instruction) => ({
                Title: instruction.title,
                Description: instruction.description,
              })),
            },
          },
        });
      }
    });
  }
  // TODO: Implement the logic to update a recipe
  else {
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

        Ingredients: {
          create: data.ingredients.map((ingredient) => ({
            Ingredient: { connect: { Id: parseInt(ingredient.id) } },
            Quantity: parseFloat(ingredient.quantity, 10),
          })),
        },

        Instructions: {
          create: data.instructions.map((instruction) => ({
            Title: instruction.title,
            Description: instruction.description,
          })),
        },
      },
    });
  }
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

//#region Ingredients
export async function createIngredient(id, data) {
  let ingredients = {};
  if (parseInt(id) <= 0) {
    ingredients = await prisma.ingredients.create({
      data: {
        Name: data.name,
        UM: data.um,
        Carbs: parseFloat(data.carbs),
        Proteins: parseFloat(data.proteins),
        Fat: parseFloat(data.fat),
        Countable: data.countable === null ? false : true,
        Quantity: parseFloat(data.quantity),
        Calories: calculateCalories(
          data.carbs,
          data.proteins,
          data.fat,
          data.countable,
          data.quantity || 0,
        ),
      },
    });
  } else {
    ingredients = await prisma.ingredients.update({
      where: {
        Id: parseInt(id),
      },
      data: {
        Name: data.name,
        UM: data.um,
        Carbs: parseFloat(data.carbs),
        Proteins: parseFloat(data.proteins),
        Fat: parseFloat(data.fat),
        Countable: data.countable === null ? false : true,
        Quantity: parseFloat(data.quantity),
        Calories: calculateCalories(
          data.carbs,
          data.proteins,
          data.fat,
          data.countable,
          data.quantity || 0,
        ),
      },
    });
  }

  revalidatePath("/ingredients");
  redirect("/recipes/0/edit");
}

export async function getIngredients(id) {
  let ingredients;
  if (id && parseInt(id) !== 0) {
    ingredients = await prisma.ingredientsRelationships.findFirst({
      where: {
        RecipeId: parseInt(id),
      },
      include: {
        Ingredient: true,
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

function calculateCalories(carbs, proteins, fat) {
  let calories = 0;
  //Carbs: 4kcal
  calories += parseFloat(carbs) * 4;
  //Proteins: 4kcal
  calories += parseFloat(proteins) * 4;
  //Fat: 9kcal
  calories += parseFloat(fat) * 9;
  return calories;
}

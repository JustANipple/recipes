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
              Quantity: parseFloat(ingredient.quantity, 10),
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
      await prisma.ingredients.update({
        where: { Id: parseInt(ingredient.Ingredient.Id) },
        data: { Quantity: parseFloat(ingredient.quantity, 10) },
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

export async function getIngredientById(id) {
  let ingredient;
  if (id && parseInt(id) !== 0) {
    ingredient = await prisma.ingredients.findFirst({
      where: {
        Id: parseInt(id),
      },
    });
  }

  return ingredient;
}

export async function getIngredientsById(id) {
  let ingredients;
  if (id && parseInt(id) !== 0) {
    ingredients = await prisma.ingredientsRelationships.findMany({
      where: {
        RecipeId: parseInt(id),
      },
      include: {
        Ingredient: true,
      },
    });
  }

  return ingredients;
}

export async function getIngredients() {
  let ingredientsArray = [];
  const ingredients = await prisma.ingredients.findMany();

  ingredients.forEach((ingredient) => {
    ingredientsArray.push({ Ingredient: ingredient });
  });

  return ingredientsArray;
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

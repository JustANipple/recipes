"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createRecipe(formData) {
  const rawFormData = {
    imageLink: formData.get("imageLink"),
    title: formData.get("title"),
    description: formData.get("description"),
    preparationTime: formData.get("preparationTime"),
    cookingTime: formData.get("cookingTime"),
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

//Ingredients
export async function createIngredient(id, formData) {
  const rawFormData = {
    name: formData.get("name"),
    um: formData.get("um"),
    carbs: formData.get("carbs"),
    proteins: formData.get("proteins"),
    fat: formData.get("fat"),
    countable: formData.get("countable"),
    quantity: formData.get("quantity"),
  };

  console.log(rawFormData);

  const prisma = new PrismaClient();

  let ingredient = {};
  if (parseInt(id) <= 0) {
    ingredient = await prisma.ingredients.create({
      data: {
        Name: rawFormData.name,
        UM: rawFormData.um,
        Carbs: parseFloat(rawFormData.carbs),
        Proteins: parseFloat(rawFormData.proteins),
        Fat: parseFloat(rawFormData.fat),
        Countable: rawFormData.countable === null ? false : true,
        Quantity: parseFloat(rawFormData.quantity),
      },
    });
  } else {
    ingredient = await prisma.ingredients.update({
      where: {
        Id: parseInt(id),
      },
      data: {
        Name: rawFormData.name,
        UM: rawFormData.um,
        Carbs: parseFloat(rawFormData.carbs),
        Proteins: parseFloat(rawFormData.proteins),
        Fat: parseFloat(rawFormData.fat),
        Countable: rawFormData.countable === null ? false : true,
        Quantity: parseFloat(rawFormData.quantity),
      },
    });
  }

  console.log(ingredient);

  revalidatePath("/ingredients");
  redirect("/");
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

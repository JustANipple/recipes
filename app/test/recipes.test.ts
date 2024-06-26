import {
  ingredients,
  ingredientsRelationships,
  instructions,
  recipes,
} from "@prisma/client";
import { expect, test } from "vitest";
import { createRecipe } from "../lib/data/recipes";

interface recipesRelations extends recipes {
  RecipeIngredients: ingredientsRelationships[];
  RecipeInstructions: instructions[];
}

const newIngredient: ingredients = {
  Id: undefined,
  Name: "Nome",
  Carbs: parseFloat("2"),
  Proteins: parseFloat("3"),
  Fat: parseFloat("5"),
  Countable: false,
  Quantity: parseFloat("20"),
};

const newIngredientRelationship: ingredientsRelationships = {
  RecipeId: 1,
  IngredientId: 1,
  Quantity: 20,
};

const newInstruction: instructions = {
  Id: undefined,
  RecipeId: 1,
  Title: "Title",
  Description: "Description",
};

const newRecipe: recipesRelations = {
  Id: 1,
  ImageLink: "ImageLink",
  Title: "Title",
  Description: "Description",
  PreparationTime: 0,
  CookingTime: 0,
  RecipeIngredients: [newIngredientRelationship],
  RecipeInstructions: [newInstruction],
};

const formData = new FormData();
formData.append("id", newRecipe.Id.toString());
formData.append("imageLink", newRecipe.ImageLink);
formData.append("title", newRecipe.Title);
formData.append("description", newRecipe.Description);
formData.append("preparationTime", newRecipe.PreparationTime.toString());
formData.append("cookingTime", newRecipe.CookingTime.toString());

for (let ingredient of newRecipe.RecipeIngredients) {
  formData.append(
    "recipeIngredients[]",
    JSON.stringify({
      ingredientId: ingredient.IngredientId,
      quantity: ingredient.Quantity,
    }),
  );
}

for (let instruction of newRecipe.RecipeInstructions) {
  formData.append(
    "recipeInstructions[]",
    JSON.stringify({
      title: instruction.Title,
      description: instruction.Description,
    }),
  );
}

test("createRecipe should create a recipe", async () => {
  const recipe = await createRecipe(formData);
  expect(recipe).toStrictEqual({ ...recipe, Id: 1 });
});

import { expect, test } from "vitest";
import {
  createRecipe,
  deleteRecipe,
  getRecipes,
  updateRecipe,
} from "../lib/data/recipes";
import { ingredientRelationship, instruction, recipe } from "../lib/interfaces";
import { recipes } from "@prisma/client";

const newIngredientRelationship: ingredientRelationship = {
  IngredientId: 125,
  Quantity: 20,
};

const newInstruction: instruction = {
  Title: "Title",
  Description: "Description",
};

const newRecipe: recipe = {
  ImageLink: "ImageLink",
  Title: "Title",
  Description: "Description",
  PreparationTime: 0,
  CookingTime: 0,
  Ingredients: [newIngredientRelationship],
  Instructions: [newInstruction],
};

const formData = new FormData();
formData.append("imageLink", newRecipe.ImageLink);
formData.append("title", newRecipe.Title);
formData.append("description", newRecipe.Description);
formData.append("preparationTime", newRecipe.PreparationTime.toString());
formData.append("cookingTime", newRecipe.CookingTime.toString());

for (let ingredient of newRecipe.Ingredients) {
  formData.append(
    "recipeIngredients[]",
    JSON.stringify({
      ingredientId: ingredient.IngredientId,
      quantity: ingredient.Quantity,
    }),
  );
}

for (let instruction of newRecipe.Instructions) {
  formData.append(
    "recipeInstructions[]",
    JSON.stringify({
      title: instruction.Title,
      description: instruction.Description,
    }),
  );
}

let recipeTest: recipes;

test("createRecipe should create a recipe", async () => {
  recipeTest = await createRecipe(formData);
  expect(recipeTest).toStrictEqual({ ...recipeTest, Title: recipeTest.Title });
});

test("getRecipes should get all recipes", async () => {
  const recipes = await getRecipes();
  expect(recipes.length).toBeGreaterThan(0);
});

test("updateRecipe should update a recipe", async () => {
  formData.set("id", recipeTest.Id.toString());
  formData.set("title", "Updated Title");
  recipeTest = await updateRecipe(formData);
  expect(recipeTest).toStrictEqual({ ...recipeTest, Title: "Updated Title" });
});

test("deleteRecipe should delete a recipe", async () => {
  formData.set("id", recipeTest.Id.toString());
  recipeTest = await deleteRecipe(recipeTest.Id);
  expect(recipeTest).toStrictEqual({ ...recipeTest, Id: 138 });
});

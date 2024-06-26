import { expect, test } from "vitest";
import { createRecipe } from "../lib/data/recipes";
import { ingredientRelationship, instruction, recipe } from "../lib/interfaces";

const newIngredientRelationship: ingredientRelationship = {
  IngredientId: 125,
  Quantity: 20,
};

const newInstruction: instruction = {
  Title: "Title",
  Description: "Description",
};

const newRecipe: recipe = {
  // Id: 0,
  ImageLink: "ImageLink",
  Title: "Title",
  Description: "Description",
  PreparationTime: 0,
  CookingTime: 0,
  Ingredients: [newIngredientRelationship],
  Instructions: [newInstruction],
};

const formData = new FormData();
formData.append("id", newRecipe.Id?.toString());
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

test("createRecipe should create a recipe", async () => {
  const recipe = await createRecipe(formData);
  expect(recipe).toStrictEqual({ ...recipe, Title: recipe.Title });
});

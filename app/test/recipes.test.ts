import { recipes } from "@prisma/client";
import { expect, test } from "vitest";
import { createRecipe } from "../lib/data/recipes";

const newRecipe: recipes = {
  Id: 1,
  ImageLink: "ImageLink",
  Title: "Title",
  Description: "Description",
  PreparationTime: 0,
  CookingTime: 0,
};

const formData = new FormData();
formData.append("id", newRecipe.Id.toString());
formData.append("imageLink", newRecipe.ImageLink);
formData.append("title", newRecipe.Title);
formData.append("description", newRecipe.Description);
formData.append("preparationTime", newRecipe.PreparationTime.toString());
formData.append("cookingTime", newRecipe.CookingTime.toString());

test("createRecipe should create a recipe", async () => {
  const recipe = await createRecipe(formData);
  expect(recipe).toStrictEqual({ ...recipe, Id: 1 });
});

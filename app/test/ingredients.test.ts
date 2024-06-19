import { expect, test } from "vitest";
import {
  createIngredient,
  deleteIngredient,
  getIngredients,
  updateIngredient,
} from "../lib/data/ingredients";
import { ingredients } from "@prisma/client";

const isCountable = false;
const newIngredient: ingredients = {
  Id: undefined,
  Name: "Nome",
  Carbs: parseFloat("2"),
  Proteins: parseFloat("3"),
  Fat: parseFloat("5"),
  Countable: isCountable,
  Quantity: parseFloat("20"),
};

const formData = new FormData();
formData.append("name", newIngredient.Name);
formData.append("carbs", newIngredient.Carbs.toString());
formData.append("proteins", newIngredient.Proteins.toString());
formData.append("fat", newIngredient.Fat.toString());
formData.append("countable", newIngredient.Countable.toString());
formData.append("id", newIngredient.Id?.toString());
formData.append("quantity", newIngredient.Quantity.toString());

test("createIngredient should create an ingredient", async () => {
  const ingredient = await createIngredient(formData);
  expect(ingredient).toStrictEqual({ ...ingredient, Id: 1 });
});

test("getIngredients should get all ingredients", async () => {
  const ingredients = await getIngredients();
  expect(ingredients.length).toBeGreaterThan(0);
});

test("updateIngredient should update an ingredient", async () => {
  const ingredient = await updateIngredient(
    parseInt(formData.get("id").toString()),
    formData,
  );
  expect(ingredient).toStrictEqual({ ...ingredient, Id: 1 });
});

test("deleteIngredient should delete an ingredient", async () => {
  const ingredient = await deleteIngredient(
    parseInt(formData.get("id").toString()),
  );
  expect(ingredient).toStrictEqual({ ...ingredient, Id: 1 });
});

import { expect, test, vi } from "vitest";
import {
  calculateCalories,
  createIngredient,
  deleteIngredient,
  updateIngredient,
} from "../lib/data/ingredients";
import prisma from "../lib/__mocks__/prisma";
import { ingredients } from "@prisma/client";

vi.mock("../lib/prisma");

const isCountable = false;
const ingr: ingredients = {
  Id: 1,
  Name: "Nome",
  Carbs: parseFloat("2"),
  Proteins: parseFloat("3"),
  Fat: parseFloat("5"),
  Countable: isCountable,
  UM: isCountable ? "pz" : "g",
  Quantity: parseFloat("20"),
  Calories: calculateCalories(
    parseFloat("2"),
    parseFloat("3"),
    parseFloat("5"),
  ),
};

const formData = new FormData();
formData.append("name", ingr.Name);
formData.append("um", ingr.UM);
formData.append("carbs", ingr.Carbs.toString());
formData.append("proteins", ingr.Proteins.toString());
formData.append("fat", ingr.Fat.toString());
formData.append("countable", ingr.Countable.toString());
formData.append("id", ingr.Id.toString());
formData.append("quantity", ingr.Quantity.toString());
formData.append("calories", ingr.Calories.toString());

test("createIngredient should create an ingredient", async () => {
  prisma.ingredients.create.mockResolvedValue({ ...ingr, Id: 1 });
  const ingredient = await createIngredient(formData);
  expect(ingredient).toStrictEqual({ ...ingredient, Id: 1 });
});

test("updateIngredient should update an ingredient", async () => {
  prisma.ingredients.update.mockResolvedValue({ ...ingr, Id: 1 });
  const ingredient = await updateIngredient(
    parseInt(formData.get("id").toString()),
    formData,
  );
  expect(ingredient).toStrictEqual({ ...ingredient, Id: 1 });
});

test("deleteIngredient should delete an ingredient", async () => {
  prisma.ingredients.delete.mockResolvedValue({ ...ingr, Id: 1 });
  const ingredient = await deleteIngredient(
    parseInt(formData.get("id").toString()),
  );
  expect(ingredient).toStrictEqual({ ...ingredient, Id: 1 });
});

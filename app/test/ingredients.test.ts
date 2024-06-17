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
const newIngredient: ingredients = {
  Id: 1,
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
formData.append("id", newIngredient.Id.toString());
formData.append("quantity", newIngredient.Quantity.toString());

test("createIngredient should create an ingredient", async () => {
  prisma.ingredients.create.mockResolvedValue({ ...newIngredient, Id: 1 });
  const ingredient = await createIngredient(formData);
  expect(ingredient).toStrictEqual({ ...ingredient, Id: 1 });
});

test("updateIngredient should update an ingredient", async () => {
  prisma.ingredients.update.mockResolvedValue({ ...newIngredient, Id: 1 });
  const ingredient = await updateIngredient(
    parseInt(formData.get("id").toString()),
    formData,
  );
  expect(ingredient).toStrictEqual({ ...ingredient, Id: 1 });
});

test("deleteIngredient should delete an ingredient", async () => {
  prisma.ingredients.delete.mockResolvedValue({ ...newIngredient, Id: 1 });
  const ingredient = await deleteIngredient(
    parseInt(formData.get("id").toString()),
  );
  expect(ingredient).toStrictEqual({ ...ingredient, Id: 1 });
});

import { expect, test, vi } from "vitest";
import { createIngredient } from "../lib/data/ingredients";
import prisma from "../lib/__mocks__/prisma";
import { ingredients } from "@prisma/client";

vi.mock("../lib/prisma");

test("createIngredient should create an ingredient", async () => {
  const newIngredient: ingredients = {
    Name: "Nome",
    UM: "pz",
    Carbs: parseFloat("2"),
    Proteins: parseFloat("3"),
    Fat: parseFloat("5"),
    Countable: false,
    Id: 1,
    Quantity: parseFloat(""),
    Calories: 17,
  };

  const formData = new FormData();
  formData.append("name", newIngredient.Name);
  formData.append("um", newIngredient.UM);
  formData.append("carbs", newIngredient.Carbs.toString());
  formData.append("proteins", newIngredient.Proteins.toString());
  formData.append("fat", newIngredient.Fat.toString());
  formData.append("countable", newIngredient.Countable.toString());
  formData.append("id", newIngredient.Id.toString());
  formData.append("quantity", newIngredient.Quantity.toString());
  formData.append("calories", newIngredient.Calories.toString());

  prisma.ingredients.create.mockResolvedValue({ ...newIngredient, Id: 1 });
  const ingredient = await createIngredient(formData);
  expect(ingredient).toStrictEqual({ ...newIngredient, Id: 1 });
});

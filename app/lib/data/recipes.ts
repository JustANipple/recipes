"use server";

import { recipes } from "@prisma/client";
import prisma from "../prisma";

function createRecipeData(formData: FormData): recipes {
  return {
    Id: parseInt(formData.get("id").toString()),
    ImageLink: formData.get("imageLink").toString(),
    Title: formData.get("title").toString(),
    Description: formData.get("description").toString(),
    PreparationTime: parseFloat(formData.get("preparationTime").toString()),
    CookingTime: parseFloat(formData.get("cookingTime").toString()),
  };
}

function checkFormData(formData: FormData) {
  if (formData.get("title") === "") throw new Error("title is required");

  if (formData.get("description") === "")
    throw new Error("description is required");

  if (formData.get("preparationTime") === "")
    throw new Error("preparation time is required");

  if (isNaN(parseFloat(formData.get("preparationTime").toString())))
    throw new Error("preparation time is not a number");

  if (isNaN(parseFloat(formData.get("cookingTime").toString())))
    throw new Error("cooking time is not a number");
}

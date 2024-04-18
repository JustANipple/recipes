import { PrismaClient } from "@prisma/client";

export async function getRecipes() {
  const prisma = new PrismaClient();
  const recipes = await prisma.recipes.findMany();
  return recipes;
}

export async function createRecipe() {
  const prisma = new PrismaClient();
  await prisma.recipes.create({
    data: {
      ImageLink:
        "https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg",
      Title: "Pizza recipe",
      Description: "Pizza with onions and olives",
      Carbs: 10,
      Protein: 10,
      Fat: 10,
    },
  });
}

import { PrismaClient } from "@prisma/client";

export async function getRecipe() {
  const prisma = new PrismaClient();
  const recipes = await prisma.recipes.find({
    where: {
      title: "Simple Omelette Recipe",
    },
    include: {
      preparation: true,
      ingredients: true,
      instructions: true,
    },
  });
  return recipes;
}

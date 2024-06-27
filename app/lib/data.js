"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function deleteRecipe(id) {
  const recipe = await prisma.recipes.delete({
    where: {
      Id: parseInt(id),
    },
  });

  revalidatePath("/recipes");
  redirect("/");
}
//#endregion Recipes

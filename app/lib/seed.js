const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seed() {
  //Recipe
  await prisma.recipes.create({
    data: {
      ImageLink: "./images/image-omelette.jpeg",
      Title: "Simple Omelette Recipe",
      Description:
        "An easy and quick dish, perfect for any meal. This classic omelette combines beaten eggs cooked to perfection, optionally filled with your choice of cheese, vegetables, or meats.",
      Carbs: 0,
      Protein: 20,
      Fat: 22,
    },
  });
  //Preparation
  await prisma.preparations.create({
    data: {
      PreparationTime: 5,
      CookingTime: 5,
    },
  });
  //Ingredients
  await prisma.ingredients.createMany({
    data: {
      Ingredients: "2-3 large eggs",
    },
    data: {
      Ingredients: "Salt, to taste",
    },
    data: {
      Ingredients: "Pepper, to taste",
    },
    data: {
      Ingredients: "1 tablespoon of butter or oil",
    },
    data: {
      Ingredients:
        "Optional fillings: cheese, diced vegetables, cooked meats, herbs",
    },
  });
  //Instructions
  await prisma.instructions.createMany({
    data: {
      Instructions:
        "<b>Beat the eggs</b>: In a bowl, beat the eggs with a pinch of salt and pepper until they are well mixed. You can add a tablespoon of water or milk for a fluffier texture.",
    },
    data: {
      Instructions:
        "<b>Heat the pan</b>: Place a non-stick frying pan over medium heat and add butter or oil.",
    },
    data: {
      Instructions:
        "<b>Cook the omelette</b>: Once the butter is melted and bubbling, pour in the eggs. Tilt the pan to ensure the eggs evenly coat the surface.",
    },
    data: {
      Instructions:
        "<b>Add fillings (optional)</b>: When the eggs begin to set at the edges but are still slightly runny in the middle, sprinkle your chosen fillings over one half of the omelette.",
    },
    data: {
      Instructions:
        "<b>Fold and serve</b>: As the omelette continues to cook, carefully lift one edge and fold it over the fillings. Let it cook for another minute, then slide it onto a plate.",
    },
    data: {
      Instructions:
        "<b>Enjoy</b>: Serve hot, with additional salt and pepper if needed.",
    },
  });
  //Create relations between recipe and instructions, ingredients, preparations
}

async function removeSeed() {
  await prisma.recipes.deleteMany();
  await prisma.preparations.deleteMany();
  await prisma.ingredients.deleteMany();
  await prisma.instructions.deleteMany();
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

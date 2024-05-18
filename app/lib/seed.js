"use server";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seed() {
  await prisma.recipes.create({
    data: {
      ImageLink: "./images/image-omelette.jpeg",
      Title: "Simple Omelette Recipe",
      Description:
        "An easy and quick dish, perfect for any meal. This classic omelette combines beaten eggs cooked to perfection, optionally filled with your choice of cheese, vegetables, or meats.",
      PreparationTime: 5,
      CookingTime: 5,
      Ingredients: {
        create: [
          {
            Quantity: 3,
            Ingredient: {
              create: {
                UM: "#",
                Name: "large eggs",
                Carbs: 1.1,
                Proteins: 13,
                Fat: 11,
              },
            },
          },
          {
            Quantity: 0,
            Ingredient: {
              create: {
                UM: "tbsp",
                Name: "salt to taste",
                Carbs: 0,
                Proteins: 0,
                Fat: 0,
              },
            },
          },
          {
            Quantity: 0,
            Ingredient: {
              create: {
                UM: "tbsp",
                Name: "pepper to taste",
                Carbs: 0,
                Proteins: 0,
                Fat: 0,
              },
            },
          },
          {
            Quantity: 1,
            Ingredient: {
              create: {
                UM: "tbsp",
                Name: "tablespoon of butter or oil",
                Quantity: 14,
                Carbs: 0,
                Proteins: 0,
                Fat: 14,
              },
            },
          },
          {
            Quantity: 0,
            Ingredient: {
              create: {
                UM: "#",
                Name: "Optional fillings: cheese, diced vegetables, cooked meats, herbs",
                Carbs: 0,
                Proteins: 0,
                Fat: 0,
              },
            },
          },
        ],
      },
      Instructions: {
        create: [
          {
            Title: "Beat the eggs",
            Description:
              "In a bowl, beat the eggs with a pinch of salt and pepper until they are well mixed. You can add a tablespoon of water or milk for a fluffier texture.",
          },
          {
            Instruction: {
              create: {
                Title: "Heat the pan",
                Description:
                  "Place a non-stick frying pan over medium heat and add butter or oil.",
              },
            },
          },
          {
            Instruction: {
              create: {
                Title: "Cook the omelette",
                Description:
                  "Once the butter is melted and bubbling, pour in the eggs. Tilt the pan to ensure the eggs evenly coat the surface.",
              },
            },
          },
          {
            Instruction: {
              create: {
                Title: "Add fillings (optional)",
                Description:
                  "When the eggs begin to set at the edges but are still slightly runny in the middle, sprinkle your chosen fillings over one half of the omelette.",
              },
            },
          },
          {
            Instruction: {
              create: {
                Title: "Fold and serve",
                Description:
                  "As the omelette continues to cook, carefully lift one edge and fold it over the fillings. Let it cook for another minute, then slide it onto a plate.",
              },
            },
          },
          {
            Instruction: {
              create: {
                Title: "Enjoy",
                Description:
                  "Serve hot, with additional salt and pepper if needed.",
              },
            },
          },
        ],
      },
    },
  });
}

async function removeSeed() {
  await prisma.recipes.deleteMany({});
  await prisma.ingredients.deleteMany({});
  await prisma.instructions.deleteMany({});
}

seed();

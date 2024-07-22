import { expect, test } from "vitest";
import {
  createRecipe,
  deleteRecipe,
  getRecipes,
  updateRecipe,
} from "../data/recipes";
import {
  ingredientRelationship,
  instruction,
  recipe,
} from "../utils/interfaces";
import { recipes } from "@prisma/client";
import { calculateMacros } from "../utils/scripts";

const newIngredientRelationship: ingredientRelationship = {
  IngredientId: 125,
  Quantity: 20,
};

const newInstruction: instruction = {
  Title: "Title",
  Description: "Description",
};

const newRecipe: recipe = {
  ImageLink: "ImageLink",
  Title: "Title",
  Description: "Description",
  PreparationTime: 0,
  CookingTime: 0,
  Ingredients: [newIngredientRelationship],
  Instructions: [newInstruction],
};

const formData = new FormData();
formData.append("imageLink", newRecipe.ImageLink);
formData.append("title", newRecipe.Title);
formData.append("description", newRecipe.Description);
formData.append("preparationTime", newRecipe.PreparationTime.toString());
formData.append("cookingTime", newRecipe.CookingTime.toString());

for (let ingredient of newRecipe.Ingredients) {
  formData.append(
    "recipeIngredients[]",
    JSON.stringify({
      ingredientId: ingredient.IngredientId,
      quantity: ingredient.Quantity,
    }),
  );
}

for (let instruction of newRecipe.Instructions) {
  formData.append(
    "recipeInstructions[]",
    JSON.stringify({
      title: instruction.Title,
      description: instruction.Description,
    }),
  );
}

let recipeTest: recipes;

test("createRecipe should create a recipe", async () => {
  recipeTest = await createRecipe(formData);
  expect(recipeTest).toStrictEqual({ ...recipeTest, Title: recipeTest.Title });
});

test("getRecipes should get all recipes", async () => {
  const recipes = await getRecipes();
  expect(recipes.length).toBeGreaterThan(0);
});

test("updateRecipe should update a recipe", async () => {
  formData.set("id", recipeTest.Id.toString());
  formData.set("title", "Updated Title");
  recipeTest = await updateRecipe(formData);
  expect(recipeTest).toStrictEqual({ ...recipeTest, Title: "Updated Title" });
});

test("deleteRecipe should delete a recipe", async () => {
  formData.set("id", recipeTest.Id.toString());
  recipeTest = await deleteRecipe(recipeTest.Id);
  expect(recipeTest).toStrictEqual({ ...recipeTest, Id: recipeTest.Id });
});

// Test for calculateMacros method
const pancakeIngredients: ingredientRelationship[] = [
  {
    IngredientId: 1,
    Quantity: 50,
    Ingredient: {
      Id: 1,
      Name: "Farina d'avena",
      Carbs: 33,
      Proteins: 7,
      Fat: 3.5,
      Countable: false,
      Quantity: 100,
    },
  },
  {
    IngredientId: 2,
    Quantity: 10,
    Ingredient: {
      Id: 2,
      Name: "Miele d'arancio",
      Carbs: 8.27,
      Proteins: 0,
      Fat: 0,
      Countable: false,
      Quantity: 100,
    },
  },
  {
    IngredientId: 3,
    Quantity: 200,
    Ingredient: {
      Id: 3,
      Name: "Albume naturelle",
      Carbs: 0,
      Proteins: 20.2,
      Fat: 0,
      Countable: false,
      Quantity: 100,
    },
  },
];

const pancakeRecipe: recipe = {
  ImageLink: "https://...",
  Title: "Pancake",
  Description: "Pancake",
  PreparationTime: 10,
  CookingTime: 15,
  Ingredients: pancakeIngredients,
  Instructions: [],
};

test("calculateMacros should calculate macros", async () => {
  expect(
    calculateMacros(pancakeRecipe, { Carbs: 60, Proteins: 45, Fat: 20 }),
  ).toStrictEqual({
    ...pancakeRecipe,
    Ingredients: [
      {
        IngredientId: 1,
        Quantity: 72.5,
        Ingredient: {
          Id: 1,
          Name: "Farina d'avena",
          Carbs: 47.8,
          Proteins: 10.15,
          Fat: 5,
          Countable: false,
          Quantity: 100,
        },
      },
      {
        IngredientId: 2,
        Quantity: 14.5,
        Ingredient: {
          Id: 2,
          Name: "Miele d'arancio",
          Carbs: 11.99,
          Proteins: 0,
          Fat: 0,
          Countable: false,
          Quantity: 100,
        },
      },
      {
        IngredientId: 3,
        Quantity: 290,
        Ingredient: {
          Id: 3,
          Name: "Albume naturelle",
          Carbs: 0,
          Proteins: 29.29,
          Fat: 0,
          Countable: false,
          Quantity: 100,
        },
      },
    ],
  });
});

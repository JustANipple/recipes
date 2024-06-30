import { ingredients } from "@prisma/client";

export interface recipe {
  Id?: number;
  ImageLink: string;
  Title: string;
  Description: string;
  PreparationTime: number;
  CookingTime: number;
  Ingredients: ingredientRelationship[];
  Instructions: instruction[];
}

export interface ingredient {
  Id?: number;
  Name: string;
  Carbs: number;
  Proteins: number;
  Fat: number;
  Countable: boolean;
  Quantity: number;
}

export interface instruction {
  Id?: number;
  Title: string;
  Description: string;
}

export interface ingredientRelationship {
  IngredientId: number;
  Quantity: number;
  Ingredient?: ingredients;
}

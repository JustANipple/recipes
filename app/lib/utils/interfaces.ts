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

export interface instruction {
  Title: string;
  Description: string;
}

export interface ingredientRelationship {
  IngredientId: number;
  Quantity: number;
}

    export interface Recipe {
  id: number;
  title: string;
  image: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
}

export interface RecipeDetails {
  id: number;
  title: string;
  image: string;
  instructions: string;
  extendedIngredients: {
    original: string;
  }[];
  readyInMinutes: number;
  servings: number;
}

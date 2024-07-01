export function calculateCalories(
  carbs: number,
  proteins: number,
  fat: number,
) {
  let calories = 0;
  //Carbs: 4kcal
  calories += carbs * 4;
  //Proteins: 4kcal
  calories += proteins * 4;
  //Fat: 9kcal
  calories += fat * 9;
  return calories;
}

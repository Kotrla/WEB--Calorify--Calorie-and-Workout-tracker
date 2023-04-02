export function calculateMacros(weight, height, gender, age, goal) {
  const protein = 0,
    carbs = 0,
    fats = 0,
    kcal = 0;

  switch (goal) {
    case "Lose fat":
      if (gender === "Male") {
        kcal =
          10 * Number(weight) +
          6.25 * Number(height) -
          5 * Number(age) +
          5 +
          200;
      } else {
        kcal =
          10 * Number(weight) +
          6.25 * Number(height) -
          5 * Number(age) -
          161 +
          200;
      }
      break;
    case "Maintain weight":
      if (gender === "Male") {
        kcal =
          13 * Number(weight) +
          6.25 * Number(height) -
          5 * Number(age) +
          5 +
          200;
      } else {
        kcal =
          13 * Number(weight) +
          6.25 * Number(height) -
          5 * Number(age) -
          161 +
          200;
      }
      break;
    case "Gain muscle":
      if (gender === "Male") {
        kcal =
          15 * Number(weight) +
          6.25 * Number(height) -
          5 * Number(age) +
          5 +
          200;
      } else {
        kcal =
          15 * Number(weight) +
          6.25 * Number(height) -
          5 * Number(age) -
          161 +
          200;
      }
      break;
  }

  kcal = kcal.toFixed(0);
  protein = ((kcal * 0.3) / 4).toFixed(0);
  carbs = ((kcal * 0.5) / 4).toFixed(0);
  fats = ((kcal * 0.2) / 9).toFixed(0);

  return { protein, carbs, fats, kcal };
}

export function calculateFoodMacros(protein, carbs, fats, kcal, quantity) {
  const multiplier = quantity / 100;
  const newProtein = (protein * multiplier).toFixed(0);
  const newCarbs = (carbs * multiplier).toFixed(0);
  const newFats = (fats * multiplier).toFixed(0);
  const newKcal = (kcal * multiplier).toFixed(0);
  
  return { protein: newProtein, carbs: newCarbs, fats: newFats, kcal: newKcal };
}

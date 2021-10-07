function calculateMacros(weight, height, gender, age, goal) {
  let protein = 0,
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

  return {
    protein: protein,
    carbs: carbs,
    fats: fats,
    kcal: kcal,
  };
}

function calculateFoodMacros(protein, carbs, fats, kcal, quantity) {
  let x = quantity / 100;
  let newProtein = (protein * x).toFixed(0);
  let newCarbs = (carbs * x).toFixed(0);
  let newFats = (fats * x).toFixed(0);
  let newKcal = (kcal * x).toFixed(0);
  return {
    protein: newProtein,
    carbs: newCarbs,
    fats: newFats,
    kcal: newKcal,
  };
}

module.exports.calculateFoodMacros = calculateFoodMacros;
module.exports.calculateMacros = calculateMacros;

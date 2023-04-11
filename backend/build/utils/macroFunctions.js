export function calculateMacros(weight, height, gender, age, goal) {
    const kcal = calculateCalories(weight, height, gender, age, goal);
    const protein = +((kcal * 0.3) / 4).toFixed(0);
    const carbs = +((kcal * 0.5) / 4).toFixed(0);
    const fats = +((kcal * 0.2) / 9).toFixed(0);
    return {
        protein, carbs, fats, kcal,
    };
}
export function calculateFoodMacros(protein, carbs, fats, kcal, quantity) {
    const multiplier = quantity / 100;
    const newProtein = (protein * multiplier).toFixed(0);
    const newCarbs = (carbs * multiplier).toFixed(0);
    const newFats = (fats * multiplier).toFixed(0);
    const newKcal = (kcal * multiplier).toFixed(0);
    return {
        protein: +newProtein, carbs: +newCarbs, fats: +newFats, kcal: +newKcal,
    };
}
function calculateCalories(weight, height, gender, age, goal) {
    const isMale = gender === 'Male';
    switch (goal) {
        case 'Lose fat':
            return calculatedPersonalParameters(10, weight, height, age, isMale);
        case 'Maintain weight':
            return calculatedPersonalParameters(13, weight, height, age, isMale);
        case 'Gain muscle':
            return calculatedPersonalParameters(15, weight, height, age, isMale);
        default:
            return 0;
    }
}
function calculatedPersonalParameters(multiplier, weight, height, age, isMale) {
    const genderConstant = isMale ? 205 : -361;
    return +(multiplier * weight + 6.25 * height - 5 * age + genderConstant).toFixed(0);
}
//# sourceMappingURL=macroFunctions.js.map
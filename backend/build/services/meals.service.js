import { __awaiter } from "tslib";
import { Meal } from '../models/meal.model';
import { calculateMealMacros, calculateTotalMealMacros, subtractMacros } from '../helpers/meals.helper';
export function getTodaysMeals(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const date = new Date().toLocaleDateString('en-US');
            return yield Meal.find({ user: userId, dateCreated: date });
        }
        catch (e) {
            throw new Error('Couldn\'t find meal');
        }
    });
}
export function getAllUserMeals(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield Meal.find({ user: userId });
        }
        catch (e) {
            throw new Error('Couldn\'t find meals');
        }
    });
}
export function getSpecificMeal(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { _id: userId } = req.user;
            const { meal } = req.body;
            const date = new Date().toLocaleDateString('en-US');
            return yield Meal.findOne({ user: userId, dateCreated: date, meal });
        }
        catch (e) {
            throw new Error('Couldn\'t find meal');
        }
    });
}
export function updateMeal(req, mealFromDb) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { _id: userId } = req.user;
            const { meal, quantity, food } = req.body;
            const { name } = food;
            const date = new Date().toLocaleDateString('en-US');
            const { protein, carbs, fats, kcal } = calculateTotalMealMacros(food, mealFromDb, quantity);
            const { protein: calculatedProtein, carbs: calculatedCarbs, fats: calculatedFats, kcal: calculatedKcal } = calculateMealMacros(food, quantity);
            return yield Meal.findOneAndUpdate({ user: userId, dateCreated: date, meal }, {
                protein, carbs, fats, kcal,
                $push: {
                    food: {
                        name, protein: calculatedProtein, carbs: calculatedCarbs,
                        fats: calculatedFats, kcal: calculatedKcal, quantity
                    }
                }
            }, { upsert: true });
        }
        catch (e) {
            throw new Error('Couldn\'t update meal');
        }
    });
}
export function removeMeal(req, mealFromDb) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { _id: mealId } = mealFromDb;
            const { protein: sentProtein, carbs: sentCarbs, fats: sentFats, kcal: sentKcal, name } = req.body;
            const { protein, carbs, fats, kcal } = subtractMacros(mealFromDb, req.body);
            return yield Meal.findOneAndUpdate({ _id: mealId }, {
                protein, carbs, fats, kcal,
                $pull: {
                    food: {
                        name, protein: sentProtein, carbs: sentCarbs, fats: sentFats, kcal: sentKcal
                    }
                }
            }, { new: true });
        }
        catch (e) {
            throw new Error('Couldn\'t remove meal');
        }
    });
}
//# sourceMappingURL=meals.service.js.map
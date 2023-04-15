import { __awaiter } from "tslib";
import { getSpecificTarget, subtractMacrosFromTarget, updateTarget } from '../services/target.service';
import { getAllUserMeals, getSpecificMeal, getTodaysMeals, removeMeal, updateMeal } from '../services/meals.service';
export const getMeals = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id: userId } = req.user;
        const meals = yield getTodaysMeals(userId);
        res.send({ meals });
    }
    catch (e) {
        next(e);
    }
});
export const getAllMeals = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id: userId } = req.user;
        const meals = yield getAllUserMeals(userId);
        res.send({ meals });
    }
    catch (e) {
        next(e);
    }
});
export const addMeal = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { meal, food } = req.body;
        if (!meal) {
            res.status(420).send('Please specify the meal!');
        }
        if (!food) {
            res.status(420).send('Please specify the food!');
        }
        const mealFromDatabase = yield getSpecificMeal(req);
        const targetFromDatabase = yield getSpecificTarget(req);
        const updatedMeals = yield updateMeal(req, mealFromDatabase);
        yield updateTarget(req, targetFromDatabase);
        res.send(updatedMeals);
    }
    catch (e) {
        next(e);
    }
});
export const deleteMeal = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mealFromDb = yield getSpecificMeal(req);
        const removedMeal = yield removeMeal(req, mealFromDb);
        const targetFromDb = yield getSpecificTarget(req);
        yield subtractMacrosFromTarget(req, targetFromDb);
        res.send(removedMeal);
    }
    catch (e) {
        next(e);
    }
});
//# sourceMappingURL=meals.controller.js.map
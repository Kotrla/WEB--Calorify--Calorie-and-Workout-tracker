import { __awaiter } from "tslib";
import { getSpecificTarget, subtractMacrosFromTarget, updateTarget } from '../services/target.service';
import { getAllUserMeals, getSpecificMeal, getTodaysMeals, removeMeal, updateMeal } from '../services/meals.service';
export const getMeals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: userId } = req.user;
    const meals = yield getTodaysMeals(userId);
    res.send({ meals });
});
export const getAllMeals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: userId } = req.user;
    const meals = yield getAllUserMeals(userId);
    res.send({ meals });
});
export const addMeal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { meal, food } = req.body;
    if (!meal)
        return res.status(420).send('Please specify the meal!');
    if (!food)
        return res.status(420).send('Please specify the food!');
    const mealFromDatabase = yield getSpecificMeal(req);
    const targetFromDatabase = yield getSpecificTarget(req);
    const updatedMeals = yield updateMeal(req, mealFromDatabase);
    yield updateTarget(req, targetFromDatabase);
    return res.send(updatedMeals);
});
export const deleteMeal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mealFromDb = yield getSpecificMeal(req);
    const removedMeal = yield removeMeal(req, mealFromDb);
    const targetFromDb = yield getSpecificTarget(req);
    yield subtractMacrosFromTarget(req, targetFromDb);
    return res.send(removedMeal);
});
//# sourceMappingURL=meals.controller.js.map
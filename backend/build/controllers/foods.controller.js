import { __awaiter } from "tslib";
import { addFood, getFoods } from '../services/foods.service';
export const getAllFoods = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foods = yield getFoods();
        res.send({ foods });
    }
    catch (e) {
        next(e);
    }
});
export const addFoodToDatabase = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, protein, carbs, fats, kcal } = req.body;
        const addedFood = yield addFood({ name, protein, carbs, fats, kcal });
        res.send(addedFood);
    }
    catch (e) {
        next(e);
    }
});
//# sourceMappingURL=foods.controller.js.map
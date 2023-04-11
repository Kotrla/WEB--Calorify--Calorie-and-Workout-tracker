import { __awaiter } from "tslib";
import { addFood, getFoods } from '../services/foods.service';
export const getAllFoods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foods = yield getFoods();
        return res.send({ foods });
    }
    catch (e) {
        return res.send([]);
    }
});
export const addFoodToDatabase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, protein, carbs, fats, kcal, } = req.body;
        const addedFood = yield addFood({
            name, protein, carbs, fats, kcal,
        });
        return res.send(addedFood);
    }
    catch (e) {
        if (!(e.name === 'MongoError' && e.code === 11000)) {
            return res.status(422).send(e);
        }
        return res.status(422).send('The food name already exists. Please choose a different name.');
    }
});
//# sourceMappingURL=foods.controller.js.map
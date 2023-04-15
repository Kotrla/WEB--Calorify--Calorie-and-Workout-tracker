import { __awaiter } from "tslib";
import { Food } from '../models/food.model';
export function getFoods() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield Food.find().sort('name');
        }
        catch (e) {
            throw new Error('Couldn\'t find foods');
        }
    });
}
export function addFood(food) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield Food.create(food);
        }
        catch (e) {
            throw new Error('Couldn\'t add food');
        }
    });
}
//# sourceMappingURL=foods.service.js.map
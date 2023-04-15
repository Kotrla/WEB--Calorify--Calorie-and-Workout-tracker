import { __awaiter } from "tslib";
import { subtractMacros } from '../helpers/meals.helper';
import { Target } from '../models/target.model';
import { calculateTargetMacros } from '../helpers/target.helper';
export function getTarget(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield Target.find({ user });
        }
        catch (e) {
            throw new Error('Couldn\'t find target');
        }
    });
}
export function getDailyConsumed(user, date) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield Target.findOne({ user, dateCreated: date });
        }
        catch (e) {
            throw new Error('Couldn\'t find consumed calories');
        }
    });
}
export function getSpecificTarget(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { _id: userId } = req.user;
            const date = new Date().toLocaleDateString('en-US');
            return yield Target.findOne({ user: userId, dateCreated: date });
        }
        catch (e) {
            throw new Error('Couldn\'t find specific target');
        }
    });
}
export function updateTarget(req, targetFromDb) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { _id: userId } = req.user;
            const { food, quantity } = req.body;
            const date = new Date().toLocaleDateString('en-US');
            const { protein, carbs, fats, kcal } = calculateTargetMacros(food, targetFromDb, quantity);
            return yield Target.findOneAndUpdate({ user: userId, dateCreated: date }, {
                protein, carbs, fats, kcal,
            }, { upsert: true });
        }
        catch (e) {
            throw new Error('Couldn\'t update target');
        }
    });
}
export function subtractMacrosFromTarget(req, targetFromDb) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { _id: userId } = req.user;
            const date = new Date().toLocaleDateString('en-US');
            const { protein, carbs, fats, kcal } = subtractMacros(targetFromDb, req.body);
            return yield Target.findOneAndUpdate({ user: userId, dateCreated: date }, { protein, carbs, fats, kcal }, { new: true });
        }
        catch (e) {
            throw new Error('Couldn\'t subtract macros');
        }
    });
}
//# sourceMappingURL=target.service.js.map
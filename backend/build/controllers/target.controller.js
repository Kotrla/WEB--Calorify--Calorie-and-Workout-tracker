import { __awaiter } from "tslib";
import { getDailyConsumed, getTarget } from '../services/target.service';
export const getTargets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id: user } = req.user;
        const targets = yield getTarget(user);
        res.send({ targets });
    }
    catch (e) {
        next(e);
    }
});
export const getDailyValues = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id: user } = req.user;
        const date = new Date().toLocaleDateString('en-US');
        const target = yield getDailyConsumed(user, date);
        res.send(target);
    }
    catch (e) {
        next(e);
    }
});
//# sourceMappingURL=target.controller.js.map
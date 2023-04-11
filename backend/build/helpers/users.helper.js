import { __awaiter } from "tslib";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getAge } from '../models/user.model';
import { calculateMacros } from '../utils/macroFunctions';
export function getEncryptedPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const { SALT } = process.env;
        const generatedSalt = yield bcrypt.genSalt(Number(SALT));
        return bcrypt.hash(password, generatedSalt);
    });
}
export function isCorrectPassword(password, user) {
    const { password: userPassword } = user.credentials;
    return bcrypt.compare(password, userPassword);
}
export function signJwt(user) {
    const { _id: userId } = user;
    const jwtSecret = process.env.JWT_SECRET || '';
    return jwt.sign({ _id: userId }, jwtSecret, { expiresIn: '365d' });
}
export function generateNewUserFromRequest(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const { personal, credentials, stats } = req.body;
        const { gender, goal, date } = personal;
        const { password } = credentials;
        const { height, weight } = stats;
        const calculatedAge = getAge(date);
        const encryptedPassword = yield getEncryptedPassword(password);
        const { protein, carbs, fats, kcal } = calculateMacros(weight, height, gender, calculatedAge, goal);
        return {
            personal: Object.assign(Object.assign({}, personal), { age: calculatedAge }), needs: { protein, carbs, fats, kcal },
            credentials: Object.assign(Object.assign({}, credentials), { password: encryptedPassword }), stats
        };
    });
}
export function generateUpdatedUserFromRequest(req) {
    const { personal, credentials, stats } = req.body;
    const { height, weight } = stats;
    const { gender, goal, date } = personal;
    const calculatedAge = getAge(date);
    const { protein, carbs, fats, kcal } = calculateMacros(weight, height, gender, calculatedAge, goal);
    return {
        personal: Object.assign(Object.assign({}, personal), { age: calculatedAge }), credentials,
        stats, needs: { protein, carbs, fats, kcal }
    };
}
//# sourceMappingURL=users.helper.js.map
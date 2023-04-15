import { __awaiter } from "tslib";
import { User } from '../models/user.model';
export function getUserById(userId = '') {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield User.find({ _id: userId });
        }
        catch (e) {
            throw new Error('Couldn\'t find user');
        }
    });
}
export function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield User.findOne({ 'credentials.email': email });
        }
        catch (e) {
            throw new Error('Couldn\'t find user');
        }
    });
}
export function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield User.create(user);
        }
        catch (e) {
            throw new Error('Couldn\'t add user');
        }
    });
}
export function updateUserById(userId = '', userData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield User.findOneAndUpdate({ _id: userId }, userData, { new: true });
        }
        catch (e) {
            throw new Error('Couldn\'t update user');
        }
    });
}
//# sourceMappingURL=users.service.js.map
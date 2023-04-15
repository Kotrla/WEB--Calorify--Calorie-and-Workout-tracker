import { __awaiter } from "tslib";
import { addUser, getUserByEmail, getUserById, updateUserById } from '../services/users.service';
import { generateNewUserFromRequest, generateUpdatedUserFromRequest, isCorrectPassword, signJwt } from '../helpers/users.helper';
export const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id: userId } = req.user;
        const user = yield getUserById(userId);
        res.send(user);
    }
    catch (e) {
        next(e);
    }
});
export const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body.credentials;
        const isUserPresent = yield getUserByEmail(email);
        if (isUserPresent) {
            res.status(455).send('Email already in use');
            return;
        }
        const newUser = yield generateNewUserFromRequest(req);
        const user = yield addUser(newUser);
        res.send(user);
    }
    catch (e) {
        next(e);
    }
});
export const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingUser = yield getUserByEmail(email);
        if (!existingUser) {
            res.status(400).send('Incorect credentials');
            return;
        }
        const isPasswordMatching = yield isCorrectPassword(password, existingUser);
        if (!isPasswordMatching) {
            res.status(400).send('Incorect credentials');
            return;
        }
        const token = signJwt(existingUser);
        res.send({ token });
    }
    catch (e) {
        next(e);
    }
});
export const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id: userId } = req.user;
        const updatedUser = generateUpdatedUserFromRequest(req);
        const user = yield updateUserById(userId, updatedUser);
        res.send(user);
    }
    catch (e) {
        next(e);
    }
});
export const updateMacros = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const { _id: userId } = req.user;
        const users = yield updateUserById(userId, userData);
        res.send(users);
    }
    catch (e) {
        next(e);
    }
});
//# sourceMappingURL=users.controller.js.map
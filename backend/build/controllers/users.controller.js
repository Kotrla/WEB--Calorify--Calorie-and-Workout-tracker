import { __awaiter } from "tslib";
import { addUser, getUserByEmail, getUserById, updateUserById } from '../services/users.service';
import { generateNewUserFromRequest, generateUpdatedUserFromRequest, isCorrectPassword, signJwt } from '../helpers/users.helper';
export const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: userId } = req.user;
    const user = yield getUserById(userId);
    res.send(user);
});
export const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body.credentials;
    const isUserPresent = yield getUserByEmail(email);
    if (isUserPresent) {
        return res.status(455).send('Email already in use');
    }
    const newUser = yield generateNewUserFromRequest(req);
    const user = yield addUser(newUser);
    return res.send(user);
});
export const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingUser = yield getUserByEmail(email);
        if (!existingUser) {
            return res.status(400).send('Incorect credentials');
        }
        const isPasswordMatching = yield isCorrectPassword(password, existingUser);
        if (!isPasswordMatching) {
            return res.status(400).send('Incorect credentials');
        }
        const token = signJwt(existingUser);
        return res.send({ token });
    }
    catch (e) {
        return res.status(400).send('Login failed');
    }
});
export const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: userId } = req.user;
    const updatedUser = generateUpdatedUserFromRequest(req);
    const user = yield updateUserById(userId, updatedUser);
    res.send(user);
});
export const updateMacros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const { _id: userId } = req.user;
    const users = yield updateUserById(userId, userData);
    res.send(users);
});
//# sourceMappingURL=users.controller.js.map
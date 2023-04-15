import { __awaiter } from "tslib";
import { addOrUpdateExercise, getUserWorkouts, getUserCurrentWorkout, removeExercise } from '../services/workouts.service';
export const getAllUserWorkouts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id: userId } = req.user;
        const workouts = yield getUserWorkouts(userId);
        res.send({ workouts });
    }
    catch (e) {
        next(e);
    }
});
export const getWorkout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id: userId } = req.user;
        const workout = yield getUserCurrentWorkout(userId);
        res.send(workout);
    }
    catch (e) {
        next(e);
    }
});
export const addExercise = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workout = yield addOrUpdateExercise(req);
        res.send(workout);
    }
    catch (e) {
        next(e);
    }
});
export const deleteExercise = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workout = yield removeExercise(req);
        res.send(workout);
    }
    catch (e) {
        next(e);
    }
});
//# sourceMappingURL=workouts.controller.js.map
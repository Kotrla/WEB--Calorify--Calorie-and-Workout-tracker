import { __awaiter } from "tslib";
import { addOrUpdateExercise, getUserWorkouts, getUserCurrentWorkout, removeExercise } from '../services/workouts.service';
export const getAllUserWorkouts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: userId } = req.user;
    const workouts = yield getUserWorkouts(userId);
    res.send({ workouts });
});
export const getWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: userId } = req.user;
    const workout = yield getUserCurrentWorkout(userId);
    res.send(workout);
});
export const addExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const workout = yield addOrUpdateExercise(req);
    res.send(workout);
});
export const deleteExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const workout = yield removeExercise(req);
    res.send(workout);
});
//# sourceMappingURL=workouts.controller.js.map
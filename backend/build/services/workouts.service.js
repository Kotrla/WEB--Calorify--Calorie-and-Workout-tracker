import { __awaiter } from "tslib";
import { Workout } from '../models/workout.model';
export function getUserWorkouts(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield Workout.find({ user });
        }
        catch (e) {
            throw new Error('Workouts not found');
        }
    });
}
export function getUserCurrentWorkout(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const date = new Date().toLocaleDateString('en-US');
            return yield Workout.findOne({ user, dateCreated: date });
        }
        catch (e) {
            throw new Error('Workout not found');
        }
    });
}
export function addOrUpdateExercise(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, reps } = req.body;
            const { _id: userId } = req.user;
            const date = new Date().toLocaleDateString('en-US');
            return yield Workout.findOneAndUpdate({ user: userId, dateCreated: date }, { $push: { exercises: { name, reps } } }, { upsert: true });
        }
        catch (e) {
            throw new Error('Couldn\'t add workout');
        }
    });
}
export function removeExercise(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, reps } = req.body;
            const { _id: userId } = req.user;
            const date = new Date().toLocaleDateString('en-US');
            return yield Workout.findOneAndUpdate({ user: userId, dateCreated: date }, { $pull: { exercises: { name, reps } } }, { new: true });
        }
        catch (e) {
            throw new Error('Couldn\'t remove workout');
        }
    });
}
//# sourceMappingURL=workouts.service.js.map
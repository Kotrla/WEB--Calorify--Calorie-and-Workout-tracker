import mongoose from 'mongoose';
const workoutSchema = new mongoose.Schema({
    exercises: [{
            name: { type: String },
            reps: { type: Number },
            load: { type: Number }
        }],
    user: { type: String },
    dateCreated: { type: String },
});
export const Workout = mongoose.model('Workout', workoutSchema);
//# sourceMappingURL=workout.model.js.map
import mongoose from 'mongoose';
const targetSchema = new mongoose.Schema({
    user: { type: String },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fats: { type: Number, default: 0 },
    kcal: { type: Number, default: 0 },
    dateCreated: { type: String },
});
export const Target = mongoose.model('Target', targetSchema);
//# sourceMappingURL=target.model.js.map
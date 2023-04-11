import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    personal: {
        firstName: {
            type: String, minlength: 4, maxlength: 20, sparse: true,
        },
        lastName: {
            type: String, minlength: 4, maxlength: 20, sparse: true,
        },
        age: { type: Number },
        gender: { type: String },
        goal: { type: String },
        date: { type: String },
    },
    credentials: {
        email: {
            type: String, required: true, minlength: 5, maxlength: 50, unique: true, sparse: true,
        },
        password: { type: String, required: true, minlength: 4 },
    },
    stats: {
        weight: { type: Number },
        height: { type: Number },
    },
    needs: {
        protein: Number,
        carbs: Number,
        fats: Number,
        kcal: Number,
    },
});
export const User = mongoose.model('User', userSchema);
export function getAge(dateString) {
    const currentDate = new Date();
    const birthDate = new Date(dateString);
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    const month = currentDate.getMonth() - birthDate.getMonth();
    const isMonthNegative = month < 0 || (month === 0 && currentDate.getDate() < birthDate.getDate());
    return isMonthNegative ? age - 1 : age;
}
//# sourceMappingURL=user.model.js.map
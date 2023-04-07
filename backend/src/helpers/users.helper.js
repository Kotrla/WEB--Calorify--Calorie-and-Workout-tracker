import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getAge } from '../models/user.model.js';
import { calculateMacros } from '../utils/macroFunctions.js';

export async function getEncryptedPassword(password) {
    const SALT = process.env.SALT;
    const generatedSalt = await bcrypt.genSalt(Number(SALT));

    return await bcrypt.hash(password, generatedSalt);
}

export function isCorrectPassword(password, user) {
    const { password: userPassword } = user.credentials;
    
    return bcrypt.compare(password, userPassword);
}

export function signJwt(user) {
    const { id } = user;
    const jwtSecret = process.env.JWT_SECRET;

    return jwt.sign({ _id: id }, jwtSecret, { expiresIn: '365d' });
}

export async function generateNewUserFromRequest(req) {
    const { personal, credentials, stats } = req.body;
    const { gender, goal, date } = personal
    const { password } = credentials;
    const { height, weight } = stats;

    const calculatedAge = getAge(date);
    const encryptedPassword = await getEncryptedPassword(password);
    const { protein, carbs, fats, kcal } = calculateMacros(Number(weight), Number(height), gender, calculatedAge, goal);
    
    return {
        personal: { ...personal, age: calculatedAge }, needs: { protein, carbs, fats, kcal },
        credentials: { ...credentials, password: encryptedPassword }, stats
    };
}

export function generateUpdatedUserFromRequest(req) {
    const { personal, credentials, stats } = req.body;
    const { height, weight } = stats;
    const { gender, goal, date } = personal

    const calculatedAge = getAge(date);
    const { protein, carbs, fats, kcal } = calculateMacros(Number(weight), Number(height), gender, calculatedAge, goal);

    return {
        personal: { ...personal, age: calculatedAge }, credentials, stats, needs: { protein, carbs, fats, kcal }
    };
}
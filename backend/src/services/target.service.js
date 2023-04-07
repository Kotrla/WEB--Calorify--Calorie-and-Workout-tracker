import { Target } from '../models/target.model.js';
import { subtractMacros } from '../helpers/meals.helper.js';
import { calculateTargetMacros } from '../helpers/target.helper.js';

export async function getTarget(user) {
    try {
        return await Target.find({ user });
    } catch (e) {
        throw new Error(e);
    }
}

export async function getDailyConsumed(user, date) {
    try {
        return await Target.find({ user, date });
    } catch (e) {
        throw new Error(e);
    }
}


export async function getSpecificTarget(req) {
    try {
        const { _id: userId } = req.user;
        const date = new Date().toLocaleDateString('en-US');
        
        return await Target.findOne({ user: userId, dateCreated: date });
    } catch (e) {
        throw new Error(e);
    }
}

export async function updateTarget(req, targetFromDb) {
    try {
        const { _id: userId } = req.user;
        const { food, quantity } = req.body;
        const date = new Date().toLocaleDateString('en-US');
        const { protein, carbs, fats, kcal } = calculateTargetMacros(food, targetFromDb, quantity);

        return await Target.findOneAndUpdate(
            { user: userId, dateCreated: date },
            { protein, carbs, fats, kcal },
            { upsert: true }
        );
    } catch (e) {
        throw new Error(e);
    }
}

export async function subtractMacrosFromTarget(req, targetFromDb) {
    try {
        const { _id: userId } = req.user;
        const date = new Date().toLocaleDateString('en-US');
        const { protein, carbs, fats, kcal } = subtractMacros(targetFromDb, req.body);

        return await Target.findOneAndUpdate(
            { user: userId,  dateCreated: date },
            { protein, carbs, fats, kcal },
            { new: true }
        );
    } catch (e) {
        throw new Error(e);
    }
}

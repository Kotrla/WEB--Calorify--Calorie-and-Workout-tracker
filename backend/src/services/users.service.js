import { User } from '../models/user.model.js';

export async function getUserById(userId) {
    try {
        return await User.find({ _id: userId });
    } catch (e) {
        throw new Error(e);
    }
}

export async function getUserByEmail(email) {
    try {
        return await User.findOne({ 'credentials.email': email });
    } catch (e) {
        throw null;
    }
}

export async function addUser(user) {
    try {
        return await User.create(user);
    } catch (e) {
        throw new Error(e);
    }
}

export async function updateUserById(userId, userData) {
    try {
        return await User.findOneAndUpdate({ _id: userId }, userData, { new: true })
    } catch (e) {
        throw new Error(e);
    }
}

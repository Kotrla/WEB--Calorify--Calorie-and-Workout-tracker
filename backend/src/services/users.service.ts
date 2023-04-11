import { IUser, User } from '../models/user.model';

export async function getUserById(userId: string = '') {
  try {
    return await User.find({ _id: userId });
  } catch (e) {
    throw new Error('e');
  }
}

export async function getUserByEmail(email: string) {
  try {
    return await User.findOne({ 'credentials.email': email });
  } catch (e) {
    throw new Error('e');
  }
}

export async function addUser(user: IUser) {
  try {
    return await User.create(user);
  } catch (e) {
    throw new Error('e');
  }
}

export async function updateUserById(userId: string = '', userData: IUser) {
  try {
    return await User.findOneAndUpdate({ _id: userId }, userData, { new: true });
  } catch (e) {
    throw new Error('e');
  }
}

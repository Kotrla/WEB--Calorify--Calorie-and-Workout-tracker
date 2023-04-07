import { getDailyConsumed, getTarget } from '../services/target.service.js';

export const getTargetValues = async (req, res) => {
    const { _id: user } = req.user;
    const target = await getTarget(user);

    res.send(target);
}

export const getDailyValues = async (req, res) => {
    const { _id: user } = req.user;
    const date = new Date().toLocaleDateString("en-US");
    const target = await getDailyConsumed(user, date);

    res.send(target);
}
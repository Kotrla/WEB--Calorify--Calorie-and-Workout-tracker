import { ITargetModel } from '../../../models/target.model.js';

export interface IAllUserTargetsResponse {
	targets: ITargetModel[];
}

export interface ITargetDailyResponse {
	daily: ITargetModel;
}

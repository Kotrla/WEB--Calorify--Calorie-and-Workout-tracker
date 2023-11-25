import { ITargetModel } from '../../../models/target.model';

export interface IAllUserTargetsResponse {
  targets: ITargetModel[];
}

export interface ITargetDailyResponse {
  daily: ITargetModel;
}

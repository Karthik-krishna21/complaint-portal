import { cardFilterProp } from './cardFilterProp';
import { complaintList } from './complaintList';
import { containerSize } from './containterSize';
import { Models } from '@rematch/core';
import { userList } from './userList';
import { complaintLength } from './complaintLength';

export interface RootModel extends Models<RootModel> {
  cardFilterProp: typeof cardFilterProp;
  complaintLength: typeof complaintLength;
  complaintList: typeof complaintList;
  containerSize: typeof containerSize;
  userList: typeof userList;
}

export const models: RootModel = {
  cardFilterProp,
  complaintLength,
  complaintList,
  containerSize,
  userList,
};

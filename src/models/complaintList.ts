import { createModel } from '@rematch/core';
import { RootModel } from '.';
import { IComplaintInfo, getComplaintList } from '../assets/ComplaintInfo';

export const complaintList = createModel<RootModel>()({
  state: getComplaintList(), // initial state
  reducers: {
    // handle state changes with pure functions
    update(state, payload: IComplaintInfo[]) {
      return payload;
    },
  },
});

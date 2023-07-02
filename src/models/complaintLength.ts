import { createModel } from '@rematch/core';
import { RootModel } from '.';
import { getComplaintList } from '../assets/ComplaintInfo';

export const complaintLength = createModel<RootModel>()({
  state: getComplaintList().length, // initial state
  reducers: {
    // handle state changes with pure functions
    update(state, payload: number) {
      return payload;
    },
  },
});

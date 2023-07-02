import { createModel } from '@rematch/core';
import { RootModel } from '.';
import { EIssueType, EVisitTime } from '../assets/ComplaintInfo';

export interface IFilterProp {
  filterKey: string;
  filterValue: EIssueType & EVisitTime;
}

export const cardFilterProp = createModel<RootModel>()({
  state: { filterKey: '', filterValue: EIssueType.EMPTY }, // initial state
  reducers: {
    // handle state changes with pure functions
    update(state, payload: IFilterProp) {
      return payload;
    },
  },
});

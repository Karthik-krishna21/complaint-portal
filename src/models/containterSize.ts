import { createModel } from '@rematch/core';
import { RootModel } from '.';

export interface IContainterSize {
  width: number;
  height: number;
}

export const containerSize = createModel<RootModel>()({
  state: { width: 0, height: 0 }, // initial state
  reducers: {
    // handle state changes with pure functions
    update(state, payload: IContainterSize) {
      return payload;
    },
  },
});

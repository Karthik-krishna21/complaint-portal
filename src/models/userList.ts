import { createModel } from '@rematch/core';
import { RootModel } from '.';
import { getUserInfo, IUserInfo } from '../assets/UserInfo';

export const userList = createModel<RootModel>()({
  state: getUserInfo(), // initial state
  reducers: {
    // handle state changes with pure functions
    update(state, payload: IUserInfo[]) {
      return payload;
    },
  },
});

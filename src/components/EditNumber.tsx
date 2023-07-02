import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';
import { Dispatch, RootState } from '../models/store';
import { InputText } from 'primereact/inputtext';
import { IUserInfo } from '../assets/UserInfo';

import './css/LoginDialogs.scss';

type Props = StateProps & DispatchProps & any;

const GetPassword = (props: Props) => {
  const { loggedIn, setMobileEditVisible, updateUserList, userList } = props;

  const [mobile, setMobile] = useState('');
  const [doesNumberExist, setNumberExists] = useState('');

  const onMobileChange = () => {
    const userIndex = userList.findIndex(
      (user: IUserInfo) => user.userId === loggedIn
    );
    const user: IUserInfo = userList[userIndex];

    const tempUserList = [...userList];
    tempUserList[userIndex] = {
      ...user,
      mobile,
    };

    updateUserList(tempUserList);
    setMobileEditVisible(false);
  };

  const onSubmitClick = () => {
    let numberFound = false;
    userList.forEach((user: IUserInfo) => {
      if (mobile === user.mobile) {
        numberFound = true;
      }
    });

    if (numberFound) setNumberExists('Mobile number already exists');
    else onMobileChange();
  };

  return (
    <div className="register-dialog-box">
      <div className="register-fields">
        <div className="register-field">
          <label className="register-field-label" htmlFor="mobile">
            New Mobile Number <div className="field-mandatory">*</div>
          </label>
          <InputText
            className="register-input"
            id="mobile"
            keyfilter="num"
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
          />
        </div>

        <span className="error-message">{doesNumberExist}</span>
      </div>

      <div className="register-buttons">
        <Button
          className="register-button close-button"
          label="Close"
          onClick={() => setMobileEditVisible(false)}
        />
        <Button
          className="register-button submit-button"
          label="Submit"
          onClick={onSubmitClick}
          disabled={mobile === ''}
        />
      </div>
    </div>
  );
};

const mapState = (state: RootState) => ({
  userList: state.userList,
});

const mapDispatch = (dispatch: Dispatch) => ({
  updateUserList: dispatch.userList.update,
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;

export default connect(mapState, mapDispatch)(GetPassword);

import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';
import { Dispatch, RootState } from '../models/store';
import { InputText } from 'primereact/inputtext';
import { IUserInfo } from '../assets/UserInfo';

import './css/LoginDialogs.scss';

type Props = StateProps & DispatchProps & any;

const GetPassword = (props: Props) => {
  const { setPasswordVisible, onGetPasswordSuccess, userList } = props;

  const [mobile, setMobile] = useState('');
  const [isNumberWrong, setNumberWrong] = useState('');

  const onSubmitClick = () => {
    let userFound = false;
    userList.forEach((user: IUserInfo) => {
      if (!userFound) {
        if (mobile === user.mobile) {
          onGetPasswordSuccess();
        }
      }
    });

    if (!userFound) setNumberWrong('Mobile number not registered');
  };

  return (
    <div className="register-dialog-box">
      <div className="register-fields">
        <div className="register-field">
          <label className="register-field-label" htmlFor="mobile">
            Registered Mobile <div className="field-mandatory">*</div>
          </label>
          <InputText
            className="register-input"
            id="mobile"
            keyfilter="num"
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
          />
        </div>

        <span className="error-message">{isNumberWrong}</span>
      </div>

      <div className="register-buttons">
        <Button
          className="register-button close-button"
          label="Close"
          onClick={() => setPasswordVisible(false)}
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

const mapDispatch = (dispatch: Dispatch) => ({});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;

export default connect(mapState, mapDispatch)(GetPassword);

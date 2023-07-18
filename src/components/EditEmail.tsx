import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';
import { Dispatch, RootState } from '../models/store';
import { InputText } from 'primereact/inputtext';

import './css/LoginDialogs.scss';

type Props = StateProps & DispatchProps & any;

const GetPassword = (props: Props) => {
  const { loggedIn, setEmailEditVisible } = props;

  const [email, setEmail] = useState('');

  const onEmailChange = () => {
    axios
      .post('http://cafmdemo.emqube.com:81/api/api/Common/UpdateEmail', {
        'Email': email,
        'ProfileId': loggedIn,
      })
      .then(() => {
        setEmailEditVisible(false);
      });
  };

  return (
    <div className="register-dialog-box">
      <div className="register-fields">
        <div className="register-field">
          <label className="register-field-label" htmlFor="mobile">
            New Email <div className="field-mandatory">*</div>
          </label>
          <InputText
            className="register-input"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
      </div>

      <div className="register-buttons">
        <Button
          className="register-button close-button"
          label="Close"
          onClick={() => setEmailEditVisible(false)}
        />
        <Button
          className="register-button submit-button"
          label="Submit"
          onClick={onEmailChange}
          disabled={email === ''}
        />
      </div>
    </div>
  );
};

const mapState = (state: RootState) => ({});

const mapDispatch = (dispatch: Dispatch) => ({});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;

export default connect(mapState, mapDispatch)(GetPassword);

import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { connect } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { Dispatch, RootState } from '../models/store';
import GetPassword from './GetPassword';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import Register from '../components/Register';
import { Toast } from 'primereact/toast';

import './css/Login.scss';

type Props = StateProps & DispatchProps & any;

const Login = (props: Props) => {
  const { setLoggedIn, updateUserList } = props;

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPass, setRememberPass] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [inputWrong, setInputWrong] = useState('');

  const toastRef = useRef<Toast>(null);

  const onLoginClick = () => {
    axios
      .post('http://cafmdemo.emqube.com:81/api/api/Login/GetLogin', {
        'UserName': mobile,
        'Password': password,
      })
      .then((response) => {
        console.log('response:', response);
        const { data } = response;

        switch (data?.Message?.MessageTypeValue) {
          case 1:
            setInputWrong('Mobile number not registered');
            console.log('Mobile number not registered');
            break;
          case 2:
            setInputWrong(data?.Message?.Text);
            console.log(data?.Message?.Text);
            break;
          case 4:
            const {
              ProfileId,
              FirstName,
              LastName,
              Mobile,
              Email,
              SiteName,
              SiteId,
              LocationName,
              LocationId,
              Password,
            } = data.UserDetails;
            updateUserList([
              {
                userId: ProfileId,
                firstName: FirstName,
                lastName: LastName,
                mobile: Mobile,
                email: Email,
                siteName: SiteName,
                siteId: SiteId,
                location: LocationName,
                locationId: LocationId,
                password: Password,
              },
            ]);
            console.log('Logged in');
            setLoggedIn(data?.UserDetails?.ProfileId);
            break;
        }
      });
  };

  const onGetPasswordSuccess = (message?: string) => {
    toastRef.current?.show({
      severity: 'success',
      summary: 'Password sent',
      detail:
        message ?? 'Your password has been sent to your registered email.',
      life: 5000,
    });

    setPasswordVisible(false);
  };

  const renderRegisterDialog = () => {
    return (
      <Dialog
        headerClassName="register-dialog-header"
        header="New Request"
        visible={registerVisible}
        onHide={() => setRegisterVisible(false)}
        style={{ width: '410px' }}
        className="register-dialog"
        draggable={false}
      >
        <Register setRegisterVisible={setRegisterVisible} />
      </Dialog>
    );
  };

  const renderPasswordRequestDialog = () => {
    return (
      <>
        <Toast ref={toastRef} />
        <Dialog
          headerClassName="register-dialog-header"
          header=""
          visible={passwordVisible}
          onHide={() => setPasswordVisible(false)}
          style={{ width: '410px' }}
          draggable={false}
        >
          <GetPassword
            setPasswordVisible={setPasswordVisible}
            onGetPasswordSuccess={onGetPasswordSuccess}
          />
        </Dialog>
      </>
    );
  };

  return (
    <div className="login-window">
      <div className="login-box">
        <div className="login-title">LOGIN</div>
        <div className="login-subtitle">Portal</div>

        <div className="login-fields">
          <span className="login-field p-input-icon-right mobile-field">
            <InputText
              placeholder="Mobile *"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              keyfilter="num"
            />
            <i className="pi pi-mobile" />
          </span>

          <span className="login-field p-input-icon-right mobile-field">
            <Password
              placeholder="Password *"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              feedback={false}
              toggleMask
            />
          </span>

          <span className="error-message">{inputWrong}</span>
        </div>

        <div className="register-section">
          <div
            className="register-link"
            onClick={() => setPasswordVisible(true)}
          >
            Get your password in registered email?
          </div>
          <div
            className="register-link"
            onClick={() => setRegisterVisible(true)}
          >
            New user? Register here
          </div>
        </div>

        <div className="submit-section">
          <div className="remember-section">
            <Checkbox
              checked={rememberPass}
              onChange={(e) => setRememberPass(!rememberPass)}
            />
            <label>Remember me</label>
          </div>

          <Button
            className="submit-button"
            label="Login"
            disabled={!mobile || !password}
            onClick={() => onLoginClick()}
          />
        </div>
      </div>

      {renderRegisterDialog()}
      {renderPasswordRequestDialog()}
    </div>
  );
};

const mapState = (state: RootState) => ({});

const mapDispatch = (dispatch: Dispatch) => ({
  updateUserList: dispatch.userList.update,
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;

export default connect(mapState, mapDispatch)(Login);

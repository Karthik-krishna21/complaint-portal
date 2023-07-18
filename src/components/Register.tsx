import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';
import { Dispatch, RootState } from '../models/store';
import { InputText } from 'primereact/inputtext';

import './css/LoginDialogs.scss';

type Props = StateProps & DispatchProps & any;

const Register = (props: Props) => {
  const { setRegisterVisible } = props;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [siteName, setSiteName] = useState('');
  const [location, setLocation] = useState('');
  const [infoFilled, setInfoFilled] = useState(false);
  const [createError, setCreateError] = useState('');

  useEffect(() => {
    if (
      firstName === '' ||
      lastName === '' ||
      mobile === '' ||
      email === '' ||
      siteName === '' ||
      location === ''
    )
      setInfoFilled(false);
    else setInfoFilled(true);
  }, [firstName, lastName, mobile, email, siteName, location]);

  const inputFields = [
    {
      id: 'first-name',
      label: 'First Name',
      inputProps: {
        id: 'first-name',
        value: firstName,
      },
      onChange: setFirstName,
      isMandatory: true,
    },
    {
      id: 'last-name',
      label: 'Last Name',
      inputProps: { id: 'last-name', value: lastName },
      onChange: setLastName,
      isMandatory: true,
    },
    {
      id: 'mobile',
      label: 'Mobile',
      inputProps: {
        id: 'mobile',
        value: mobile,
        keyfilter: 'num',
      },
      onChange: setMobile,
      isMandatory: true,
    },
    {
      id: 'email',
      label: 'Email',
      inputProps: { id: 'email', value: email },
      onChange: setEmail,
      isMandatory: true,
    },
    {
      id: 'site-name',
      label: 'Site/Building Name',
      inputProps: { id: 'site-name', value: siteName },
      onChange: setSiteName,
      isMandatory: true,
    },
    {
      id: 'location',
      label: 'Location/Room',
      inputProps: { id: 'location', value: location },
      onChange: setLocation,
      isMandatory: true,
    },
  ];

  const onSubmitClick = () => {
    axios
      .post(
        'http://cafmdemo.emqube.com:81/api/api/Login/RequestSelfRegistration',
        {
          'FirstName': firstName,
          'LastName': lastName,
          'Email': email,
          'Mobile': mobile,
          'SiteName': siteName,
          'LocationName': location,
        }
      )
      .then((response) => {
        console.log(response);
        setRegisterVisible(false);
      });
  };

  const renderInputField = (args: any) => {
    const { id, label, inputProps, onChange, isMandatory } = args;

    return (
      <div className="register-field">
        <label className="register-field-label" htmlFor={id}>
          {label} {isMandatory && <div className="field-mandatory">*</div>}
        </label>
        <InputText
          className="register-input"
          id={id}
          onChange={(e) => onChange(e.target.value)}
          {...inputProps}
        />
      </div>
    );
  };

  return (
    <div className="register-dialog-box">
      <div className="register-fields">
        {inputFields.map((inputField) => {
          return renderInputField({ ...inputField });
        })}

        <span className="error-message">{createError}</span>
      </div>

      <div className="register-buttons">
        <Button
          className="register-button close-button"
          label="Close"
          onClick={() => setRegisterVisible(false)}
        />
        <Button
          className="register-button submit-button"
          label="Submit"
          onClick={onSubmitClick}
          disabled={!infoFilled}
        />
      </div>
    </div>
  );
};

const mapState = (state: RootState) => ({});

const mapDispatch = (dispatch: Dispatch) => ({});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;

export default connect(mapState, mapDispatch)(Register);

import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';
import { Dispatch, RootState } from '../models/store';
import { IComplaintInfo } from '../assets/ComplaintInfo';
import { InputTextarea } from 'primereact/inputtextarea';

import './css/LoginDialogs.scss';

type Props = StateProps & DispatchProps & any;

const CancelTicket = (props: Props) => {
  const {
    activeTicket,
    complaintList,
    setActiveTicket,
    setCancelTicketVisible,
    updateComplaintList,
  } = props;

  const [isFormFilled, setFormFilled] = useState(false);

  const onReasonChange = (text: string) => {
    if (text.length) setFormFilled(true);
    else setFormFilled(false);
  };

  const popupClose = () => {
    setActiveTicket('');
    setCancelTicketVisible(false);
  };

  const onSubmitClick = () => {
    const complaintIndex = complaintList?.findIndex(
      (complaint: IComplaintInfo) => complaint.ticketId === activeTicket
    );

    if (complaintIndex !== -1) {
      const tempComplaintList = [...complaintList];
      tempComplaintList.splice(complaintIndex, 1);
      updateComplaintList(tempComplaintList);
    }

    popupClose();
  };

  return (
    <div className="register-dialog-box">
      <div className="register-fields">
        <div className="register-field">
          <label className="register-field-label">
            Reason <div className="field-mandatory">*</div>
          </label>

          <InputTextarea
            autoResize
            onChange={(e) => onReasonChange(e.target.value)}
            rows={5}
            cols={30}
          />
        </div>
      </div>

      <div className="register-buttons">
        <Button
          className="register-button close-button"
          label="Close"
          onClick={popupClose}
        />
        <Button
          className="register-button submit-button"
          label="Submit"
          onClick={onSubmitClick}
          disabled={!isFormFilled}
        />
      </div>
    </div>
  );
};

const mapState = (state: RootState) => ({
  complaintList: state.complaintList,
});

const mapDispatch = (dispatch: Dispatch) => ({
  updateComplaintList: dispatch.complaintList.update,
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;

export default connect(mapState, mapDispatch)(CancelTicket);

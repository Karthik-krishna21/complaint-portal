import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';
import { Dispatch, RootState } from '../models/store';
import { Dropdown } from 'primereact/dropdown';
import {
  EIssueType,
  EVisitTime,
  IComplaintInfo,
} from '../assets/ComplaintInfo';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { IUserInfo } from '../assets/UserInfo';

import './css/LoginDialogs.scss';

type Props = StateProps & DispatchProps & any;

export const getIssueDropdownOptions = [
  {
    label: EIssueType.CRASHING,
    value: EIssueType.CRASHING,
  },
  {
    label: EIssueType.OVER_HEATING,
    value: EIssueType.OVER_HEATING,
  },
  {
    label: EIssueType.SLOW_PERFORMANCE,
    value: EIssueType.SLOW_PERFORMANCE,
  },
];

export const getVisitDropdownOptions = [
  {
    label: EVisitTime.MORNING,
    value: EVisitTime.MORNING,
  },
  {
    label: EVisitTime.AFTERNOON,
    value: EVisitTime.AFTERNOON,
  },
  {
    label: EVisitTime.EVENING,
    value: EVisitTime.EVENING,
  },
];

const NewTicket = (props: Props) => {
  const {
    activeTicket = '',
    complaintList,
    loggedIn,
    setActiveTicket,
    setNewTicketvisible,
    refreshComplaintList,
    userList,
  } = props;

  const complaintIndex = complaintList.findIndex(
    (complaint: IComplaintInfo) => complaint.ticketId === activeTicket
  );
  const userDetails = userList.find(
    (user: IUserInfo) => user.userId === loggedIn
  );
  const complaint: IComplaintInfo = complaintList[complaintIndex];

  const [issueDropdownOptions, setIssueDropdownOptions] = useState([]);

  useEffect(() => {
    axios
      .post('http://cafmdemo.emqube.com:81/api/api/Common/GetIssueList')
      .then((response) => {
        setIssueDropdownOptions(
          response.data.IssueList.map((issue) => {
            return { label: issue.IssueName, value: issue.IssueId };
          })
        );
      });
  }, []);

  const [issue, setIssue] = useState(complaint?.issue || '');
  const [issueDetail, setIssueDetail] = useState(complaint?.issueDetail || '');
  const [visitTime, setVisitTime] = useState(complaint?.visitTime || '');
  const [isFormFilled, setFormFilled] = useState(false);

  useEffect(() => {
    if (issue === '' || issueDetail === '' || visitTime === '')
      setFormFilled(false);
    else setFormFilled(true);
  }, [issue, issueDetail, visitTime]);

  function getNewTicketId(ticketId: string): string {
    if (ticketId.length === 5) return ticketId;
    return getNewTicketId('0' + ticketId);
  }

  const popupClose = () => {
    setActiveTicket('');
    setNewTicketvisible(false);
  };

  const onSubmitClick = () => {
    if (!activeTicket || activeTicket === '') {
      axios
        .post('http://cafmdemo.emqube.com:81/api/api/Ticket/AddUpdateTicket', {
          'TicketId': 0,
          'IssueId': issue,
          'IssueDetails': issueDetail,
          'Remarks': `Good time to visit: ${visitTime}`,
          'TimeToVisit': visitTime,
          'Status': 1,
          'StatusRemark': '',
          'LoggedInUser': loggedIn,
          'SiteId': userDetails.siteId,
          'LocationId': userDetails.locationId,
        })
        .then(() => refreshComplaintList(props));
    } else {
      axios
        .post('http://cafmdemo.emqube.com:81/api/api/Ticket/AddUpdateTicket', {
          'TicketId': activeTicket,
          'IssueId': issue,
          'IssueDetails': issueDetail,
          'Remarks': `Good time to visit: ${visitTime}`,
          'TimeToVisit': visitTime,
          'Status': 1,
          'StatusRemark': '',
          'LoggedInUser': loggedIn,
          'SiteId': userDetails.siteId,
          'LocationId': userDetails.locationId,
        })
        .then(() => refreshComplaintList(props));
      setActiveTicket('');
    }

    popupClose();
  };

  return (
    <div className="register-dialog-box">
      <div className="register-fields">
        <div className="register-field">
          <label className="register-field-label">
            Issue <div className="field-mandatory">*</div>
          </label>

          <Dropdown
            className="w-full ticket-dropdown"
            placeholder="Select"
            onChange={(e) => setIssue(e.value)}
            options={issueDropdownOptions}
            optionLabel="label"
            optionValue="value"
            value={issue}
            panelClassName="ticket-panel"
          />
        </div>

        <div className="register-field">
          <label className="register-field-label">
            Issue Details <div className="field-mandatory">*</div>
          </label>

          <InputTextarea
            autoResize
            value={issueDetail}
            onChange={(e) => setIssueDetail(e.target.value)}
            rows={5}
            cols={30}
            className="register-input"
          />
        </div>

        <div className="register-field">
          <label className="register-field-label">
            Good time to visit? <div className="field-mandatory">*</div>
          </label>

          <InputText
            className="register-input"
            placeholder="Visit Time"
            value={visitTime}
            onChange={(e) => setVisitTime(e.target.value)}
          />
        </div>

        <div className="register-field">
          <label htmlFor="attachment" className="register-field-label">
            Attachment
          </label>

          <div className="p-inputgroup w-full register-input attachment-field">
            <div className="input-field">
              <InputText
                className="register-field"
                disabled
                placeholder="Choose file(s)"
                aria-describedby="attachment-help"
              />
              <span className="p-inputgroup-addon attachment-browse">
                Browse
              </span>
            </div>
            <small id="attachment-help">
              Maximum no of attachments: 3 <br />
              Maximum file size: 4MB <br />
              Accepted file types: png, jpg, jpeg and pdf
            </small>
          </div>
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
  userList: state.userList,
});

const mapDispatch = (dispatch: Dispatch) => ({
  updateComplaintList: dispatch.complaintList.update,
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;

export default connect(mapState, mapDispatch)(NewTicket);

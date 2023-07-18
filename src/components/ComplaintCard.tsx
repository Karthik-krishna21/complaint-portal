import React from 'react';
import { connect } from 'react-redux';
import { IUserInfo } from '../assets/UserInfo';
import { RootState, Dispatch } from '../models/store';

import './css/ComplaintCard.scss';

type Props = StateProps & DispatchProps & any;

const getTimeString = (dateNum: number) => {
  return ('0' + dateNum).slice(-2);
};

const ComplaintCard = (props: Props) => {
  const {
    complaint,
    issueDropdownOptions = [],
    onCancelClick,
    onEditClick,
    userList,
  } = props;
  const { ticketId, issue, reporter, issueTime } = complaint;
  const issueName =
    issueDropdownOptions.find((issueItem) => issueItem.value === issue)
      ?.label || '';

  const reporterDetails = userList.find(
    (user: IUserInfo) => user.userId === reporter
  );
  const { firstName, lastName } = reporterDetails;

  const tempDate = new Date(issueTime);
  const displayDate =
    getTimeString(tempDate.getDate()) +
    '/' +
    getTimeString(tempDate.getMonth()) +
    '/' +
    tempDate.getFullYear() +
    ' ' +
    getTimeString(tempDate.getHours()) +
    ':' +
    getTimeString(tempDate.getMinutes()) +
    ':' +
    getTimeString(tempDate.getSeconds());

  return (
    <div className="complaint-card">
      <div className="complaint-header">
        <div className="ticket-id">Ticket #{ticketId}</div>
        <div className="ticket-created">CREATED</div>
      </div>

      <div className="complaint-body">
        <div className="complaint-item">
          <div className="complaint-tag">Issue:</div>
          <div className="complaint-value">{issueName}</div>
        </div>
        <div className="complaint-item">
          <div className="complaint-tag">Reported:</div>
          <div className="complaint-value">{firstName + ' ' + lastName}</div>
        </div>
        <div className="complaint-item">
          <div className="complaint-tag">Raised On:</div>
          <div className="complaint-value">{displayDate}</div>
        </div>
      </div>

      <div className="complaint-footer">
        <div className="footer-item" onClick={() => onEditClick(ticketId)}>
          Edit
        </div>
        <div className="footer-item" onClick={() => onCancelClick(ticketId)}>
          Cancel
        </div>
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

export default connect(mapState, mapDispatch)(ComplaintCard);

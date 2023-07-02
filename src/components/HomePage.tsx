import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import CancelTicket from './CancelTicket';
import { classNames } from 'primereact/utils';
import ComplaintCard from './ComplaintCard';
import { connect } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import EditEmail from './EditEmail';
import EditNumber from './EditNumber';
import { EIssueType, IComplaintInfo } from '../assets/ComplaintInfo';
import { IUserInfo } from '../assets/UserInfo';
import NewTicket from './NewTicket';
import { RootState, Dispatch } from '../models/store';
import TicketFilter from './TicketFilter';

import './css/HomePage.scss';
import './css/LoginDialogs.scss';

type Props = StateProps & DispatchProps & any;

const HomePage = (props: Props) => {
  const {
    cardFilterProp,
    complaintList,
    containerSize,
    loggedIn,
    setLoggedIn,
    userList,
  } = props;
  const [displayComplaintList, setDisplayComplaintList] = useState(
    complaintList.filter(
      (complaint: IComplaintInfo) => complaint.reporter === loggedIn
    )
  );
  const [isMobileEditVisible, setMobileEditVisible] = useState(false);
  const [isEmailEditVisible, setEmailEditVisible] = useState(false);
  const [isMobileView, setMobileView] = useState(false);

  const userDetails = userList.find(
    (user: IUserInfo) => user.userId === loggedIn
  );
  const { firstName, lastName, siteName, location, mobile, email } =
    userDetails;

  const [isNewTicketVisible, setNewTicketvisible] = useState(false);
  const [isCancelTicketVisiible, setCancelTicketVisible] = useState(false);
  const [activeTicket, setActiveTicket] = useState('');

  useEffect(() => {
    const { filterKey, filterValue } = cardFilterProp;
    if (filterKey !== '' && filterValue !== EIssueType.EMPTY) {
      setDisplayComplaintList(
        complaintList.filter(
          (complaint: any) =>
            complaint.reporter === loggedIn &&
            complaint[filterKey] === filterValue
        )
      );
    } else
      setDisplayComplaintList(
        complaintList.filter(
          (complaint: IComplaintInfo) => complaint.reporter === loggedIn
        )
      );
  }, [cardFilterProp, complaintList, loggedIn]);

  useEffect(() => {
    setMobileView(containerSize.width < containerSize.height);
  }, [containerSize]);

  const onEditClick = (ticketId: string) => {
    setActiveTicket(ticketId);
    setNewTicketvisible(true);
  };

  const onCancelClick = (ticketId: string) => {
    setActiveTicket(ticketId);
    setCancelTicketVisible(true);
  };

  const renderMobileEditDialog = () => {
    return (
      <>
        {/* <Toast ref={toastRef} /> */}
        <Dialog
          headerClassName="register-dialog-header"
          header=""
          visible={isMobileEditVisible}
          onHide={() => setMobileEditVisible(false)}
          style={{ width: '410px' }}
          draggable={false}
        >
          <EditNumber
            loggedIn={loggedIn}
            setMobileEditVisible={setMobileEditVisible}
          />
        </Dialog>
      </>
    );
  };

  const renderEmailEditDialog = () => {
    return (
      <>
        {/* <Toast ref={toastRef} /> */}
        <Dialog
          headerClassName="register-dialog-header"
          header=""
          visible={isEmailEditVisible}
          onHide={() => setEmailEditVisible(false)}
          style={{ width: '410px' }}
          draggable={false}
        >
          <EditEmail
            loggedIn={loggedIn}
            setEmailEditVisible={setEmailEditVisible}
          />
        </Dialog>
      </>
    );
  };

  const renderNewTicketDialog = () => (
    <Dialog
      headerClassName="register-dialog-header"
      header="New Ticket"
      visible={isNewTicketVisible}
      onHide={() => {
        setActiveTicket('');
        setNewTicketvisible(false);
      }}
      style={{ width: '410px' }}
      className="register-dialog"
      draggable={false}
    >
      <NewTicket
        activeTicket={activeTicket}
        loggedIn={loggedIn}
        setActiveTicket={setActiveTicket}
        setNewTicketvisible={setNewTicketvisible}
      />
    </Dialog>
  );

  const renderCancelTicketDialog = () => (
    <Dialog
      headerClassName="register-dialog-header"
      header="Cancel Ticket"
      visible={isCancelTicketVisiible}
      onHide={() => {
        setActiveTicket('');
        setCancelTicketVisible(false);
      }}
      style={{ width: '410px' }}
      className="register-dialog"
      draggable={false}
    >
      <CancelTicket
        activeTicket={activeTicket}
        setActiveTicket={setActiveTicket}
        setCancelTicketVisible={setCancelTicketVisible}
      />
    </Dialog>
  );

  const renderUserInfo = (
    <div className="user-info">
      <div className="left-side">
        <div className="user-name">{`Welcome, ${firstName} ${lastName}`}</div>
        <div className="address">{`${siteName}, ${location}`}</div>
      </div>

      <div className="vertical-separator"></div>

      <div className="right-side">
        <div
          className={classNames({
            'contact-info': true,
            'mobile-view': isMobileView,
          })}
        >
          <div className="right-caption">Email: </div>
          <div className="email">
            {email}
            <div
              className="edit-icon"
              onClick={() => setEmailEditVisible(true)}
            >
              <i className="pi pi-pencil" />
            </div>
          </div>
        </div>

        <div
          className={classNames({
            'contact-info': true,
            'mobile-view': isMobileView,
          })}
        >
          <div className="right-caption">Mobile: </div>
          <div className="mobile">
            {mobile}
            <div
              className="edit-icon"
              onClick={() => setMobileEditVisible(true)}
            >
              <i className="pi pi-pencil" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHeader = () => {
    return (
      <div className="home-header">
        <div className="header-section">
          <div className="logo-section">LOGO</div>

          {!isMobileView && renderUserInfo}

          <div className="logout-section" onClick={() => setLoggedIn(null)}>
            <i className="pi pi-sign-out" />
            <div className="logout">Logout</div>
          </div>
        </div>

        {isMobileView && renderUserInfo}
      </div>
    );
  };

  return (
    <>
      {renderHeader()}
      <div className="portal-body">
        <div
          className={classNames({
            'top-section': true,
            'mobile-view': isMobileView,
          })}
        >
          <div className="filter">
            <TicketFilter />
          </div>
          <Button
            className="add-ticket-button"
            icon={<i className="pi pi-plus" />}
            label="Add Ticket"
            onClick={() => setNewTicketvisible(true)}
          />
        </div>

        <div className="complaints">
          <div className="complaint-cards">
            {displayComplaintList.map((complaint: IComplaintInfo) => {
              return (
                <ComplaintCard
                  complaint={complaint}
                  onCancelClick={onCancelClick}
                  onEditClick={onEditClick}
                />
              );
            })}
          </div>
        </div>
      </div>
      {renderNewTicketDialog()}
      {renderCancelTicketDialog()}
      {renderMobileEditDialog()}
      {renderEmailEditDialog()}
    </>
  );
};

const mapState = (state: RootState) => ({
  cardFilterProp: state.cardFilterProp,
  complaintList: state.complaintList,
  containerSize: state.containerSize,
  userList: state.userList,
});

const mapDispatch = (dispatch: Dispatch) => ({
  updateComplaintList: dispatch.complaintList.update,
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;

export default connect(mapState, mapDispatch)(HomePage);

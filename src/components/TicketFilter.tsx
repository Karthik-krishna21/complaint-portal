import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, RootState } from '../models/store';
import { Dropdown } from 'primereact/dropdown';
import { EIssueType } from '../assets/ComplaintInfo';
import { getIssueDropdownOptions, getVisitDropdownOptions } from './NewTicket';

import './css/LoginDialogs.scss';

type Props = StateProps & DispatchProps & any;

const getFilterKeyDropdownOptions = [
  {
    label: 'Issue',
    value: 'issue',
  },
  {
    label: 'Visit time',
    value: 'visitTime',
  },
];

const TicketFilter = (props: Props) => {
  const { cardFilterProp, updateCardFilterProp } = props;
  const { filterKey, filterValue } = cardFilterProp;

  const [showReset, updateShowReset] = useState(false);

  const getFilterValueDropdownOption = [
    ...(filterKey === 'issue'
      ? getIssueDropdownOptions
      : getVisitDropdownOptions),
  ];

  const updateFilterKey = (key: string) => {
    updateCardFilterProp({ ...cardFilterProp, filterKey: key });
  };

  const updateFilterValue = (value: string) => {
    updateCardFilterProp({ ...cardFilterProp, filterValue: value });
  };

  const onFilterReset = () => {
    updateCardFilterProp({
      filterKey: '',
      filterValue: EIssueType.EMPTY,
    });
    updateShowReset(false);
  };

  useEffect(() => {
    updateFilterValue(EIssueType.EMPTY);
    if (filterKey === 'issue' || filterKey === 'visitTime')
      updateShowReset(true);
  }, [filterKey]);

  return (
    <div className="filter-section">
      <div className="filter-caption">Filter Tickets:</div>

      <div className="filter-dropdowns">
        <Dropdown
          className="w-half key-dropdown"
          placeholder="Select"
          onChange={(e) => updateFilterKey(e.value)}
          options={getFilterKeyDropdownOptions}
          optionLabel="label"
          optionValue="value"
          value={filterKey}
          panelClassName="ticket-panel"
        />

        <Dropdown
          className="w-half value-dropdown"
          placeholder="Select"
          onChange={(e) => updateFilterValue(e.value)}
          options={getFilterValueDropdownOption}
          optionLabel="label"
          optionValue="value"
          value={filterValue}
          disabled={!showReset}
          panelClassName="ticket-panel"
        />

        {showReset && (
          <div className="reset-button" onClick={onFilterReset}>
            Reset
          </div>
        )}
      </div>
    </div>
  );
};

const mapState = (state: RootState) => ({
  cardFilterProp: state.cardFilterProp,
});

const mapDispatch = (dispatch: Dispatch) => ({
  updateCardFilterProp: dispatch.cardFilterProp.update,
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;

export default connect(mapState, mapDispatch)(TicketFilter);

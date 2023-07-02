export interface IComplaintInfo {
  ticketId: string;
  issue: EIssueType;
  issueDetail: string;
  reporter: string;
  visitTime: EVisitTime;
  issueTime: string;
}

export enum EIssueType {
  OVER_HEATING = 'Overheating',
  CRASHING = 'Crashing',
  SLOW_PERFORMANCE = 'Slow Performance',
  EMPTY = '',
}

export enum EVisitTime {
  MORNING = 'Morning',
  AFTERNOON = 'Afternoon',
  EVENING = 'Evening',
  EMPTY = '',
}

export const getComplaintList = () => {
  return [
    {
      ticketId: '00001',
      issue: EIssueType.CRASHING,
      issueDetail: 'System crashing',
      reporter: '1',
      visitTime: EVisitTime.AFTERNOON,
      issueTime: '2023-06-25T10:00:00Z',
    },
    {
      ticketId: '00002',
      issue: EIssueType.OVER_HEATING,
      issueDetail: 'System cverheating',
      reporter: '2',
      visitTime: EVisitTime.MORNING,
      issueTime: '2023-06-25T09:00:00Z',
    },
    {
      ticketId: '00003',
      issue: EIssueType.CRASHING,
      issueDetail: 'System crashing',
      reporter: '2',
      visitTime: EVisitTime.EVENING,
      issueTime: '2023-06-25T13:00:00Z',
    },
    {
      ticketId: '00004',
      issue: EIssueType.SLOW_PERFORMANCE,
      issueDetail: 'System is slow',
      reporter: '1',
      visitTime: EVisitTime.AFTERNOON,
      issueTime: '2023-06-25T08:00:00Z',
    },
    {
      ticketId: '00005',
      issue: EIssueType.SLOW_PERFORMANCE,
      issueDetail: 'System is slow',
      reporter: '1',
      visitTime: EVisitTime.MORNING,
      issueTime: '2023-06-25T09:00:00Z',
    },
    {
      ticketId: '00006',
      issue: EIssueType.OVER_HEATING,
      issueDetail: 'System cverheating',
      reporter: '2',
      visitTime: EVisitTime.AFTERNOON,
      issueTime: '2023-06-25T11:00:00Z',
    },
    {
      ticketId: '00007',
      issue: EIssueType.SLOW_PERFORMANCE,
      issueDetail: 'System is slow',
      reporter: '2',
      visitTime: EVisitTime.EVENING,
      issueTime: '2023-06-25T16:00:00Z',
    },
    {
      ticketId: '00008',
      issue: EIssueType.CRASHING,
      issueDetail: 'System crashing',
      reporter: '1',
      visitTime: EVisitTime.EVENING,
      issueTime: '2023-06-25T15:00:00Z',
    },
    {
      ticketId: '00009',
      issue: EIssueType.CRASHING,
      issueDetail: 'System crashing',
      reporter: '1',
      visitTime: EVisitTime.AFTERNOON,
      issueTime: '2023-06-25T10:00:00Z',
    },
    {
      ticketId: '00010',
      issue: EIssueType.OVER_HEATING,
      issueDetail: 'System cverheating',
      reporter: '2',
      visitTime: EVisitTime.MORNING,
      issueTime: '2023-06-25T09:00:00Z',
    },
    {
      ticketId: '00011',
      issue: EIssueType.CRASHING,
      issueDetail: 'System crashing',
      reporter: '2',
      visitTime: EVisitTime.EVENING,
      issueTime: '2023-06-25T13:00:00Z',
    },
    {
      ticketId: '00012',
      issue: EIssueType.SLOW_PERFORMANCE,
      issueDetail: 'System is slow',
      reporter: '1',
      visitTime: EVisitTime.AFTERNOON,
      issueTime: '2023-06-25T08:00:00Z',
    },
    {
      ticketId: '00013',
      issue: EIssueType.SLOW_PERFORMANCE,
      issueDetail: 'System is slow',
      reporter: '1',
      visitTime: EVisitTime.MORNING,
      issueTime: '2023-06-25T09:00:00Z',
    },
    {
      ticketId: '00014',
      issue: EIssueType.OVER_HEATING,
      issueDetail: 'System cverheating',
      reporter: '2',
      visitTime: EVisitTime.AFTERNOON,
      issueTime: '2023-06-25T11:00:00Z',
    },
    {
      ticketId: '00015',
      issue: EIssueType.SLOW_PERFORMANCE,
      issueDetail: 'System is slow',
      reporter: '2',
      visitTime: EVisitTime.EVENING,
      issueTime: '2023-06-25T16:00:00Z',
    },
    {
      ticketId: '00016',
      issue: EIssueType.CRASHING,
      issueDetail: 'System crashing',
      reporter: '1',
      visitTime: EVisitTime.EVENING,
      issueTime: '2023-06-25T15:00:00Z',
    },
  ];
};

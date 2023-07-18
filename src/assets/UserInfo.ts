export interface IUserInfo {
  userId: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  siteName: string;
  siteId: string;
  location: string;
  locationId: string;
  password: string;
}

export const getUserInfo = () => {
  return [
    {
      userId: '1',
      firstName: 'test',
      lastName: 'name',
      mobile: '1234567890',
      email: 'test@user.com',
      siteName: 'site1',
      location: 'location1',
      password: 'pass',
    },
    {
      userId: '2',
      firstName: 'first',
      lastName: 'user',
      mobile: '9876543210',
      email: 'first@test.com',
      siteName: 'site2',
      location: 'location2',
      password: 'wordpass',
    },
  ];
};

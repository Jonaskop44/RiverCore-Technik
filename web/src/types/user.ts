export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  designation?: string;
  companyName?: string;
  activated?: boolean;
  role?: string;
}

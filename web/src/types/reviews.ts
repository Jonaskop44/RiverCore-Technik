export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  designation: string;
  companyName?: string;
  profilePicture?: string;
  email?: string;
};

export type Author = {
  id: number;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  userId: number;
  user: User;
};

export type Review = {
  id: number;
  title: string;
  rating: number;
  content: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  author: Author;
};

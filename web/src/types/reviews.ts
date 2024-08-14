export type User = {
  firstName: string;
  lastName: string;
  designation: string;
  companyName?: string | null;
  profilePicture?: string | null;
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

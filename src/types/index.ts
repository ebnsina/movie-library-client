export interface User {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Movie {
  _id: string;
  name: string;
  releaseDate: string;
  duration: number;
  actors: string[];
  createdBy: User;
  averageRating: number;
  ratings: Rating[];
  createdAt: string;
  updatedAt?: string;
}

export interface Rating {
  _id?: string;
  user: string | User;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ITopic {
  title: string;
  textcolor?: string;
  bgcolor: string;
}

export enum ERole { 
  USER="User", ADMIN="Admin"
}

export interface ILink {
  path: string;
  title: string;
  class?: string;
};

export interface IPost {
  id: number | string;
  author: number | string;
  content: string;
  likes: number;
  comments: (number | string)[];
  topics: ITopic[];
  created_at: number;
  updated_at: number;
}

export interface IComment {
  id: number | string;
  author: number | string;
  post: number | string;
  content: string;
  likes: number;
  created_at: number;
  updated_at: number;
}

export interface IUser {
  id: number | string;
  username: string;
  role: ERole;
  profile_image: string;
}
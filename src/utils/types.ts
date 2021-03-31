export type IDType = number | string;
export interface ITopic {
  id: IDType;
  title: string;
  textColor?: string;
  bgColor: string;
}

export enum ERole {
  USER = "User",
  ADMIN = "Admin",
}

export interface ILink {
  path: string;
  title: string;
  class?: string;
}

export interface IPost {
  id: IDType;
  author: IDType;
  content: string;
  likes: number;
  comments: IDType[];
  topics: ITopic[];
  created_at: number;
  updated_at: number;
}

export interface IComment {
  id: IDType;
  author: IDType;
  post: IDType;
  content: string;
  likes: number;
  created_at: number;
  updated_at: number;
}

export interface IUser {
  id: IDType;
  username: string;
  role: ERole;
  profile_image: string;
}

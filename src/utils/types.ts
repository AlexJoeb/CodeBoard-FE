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
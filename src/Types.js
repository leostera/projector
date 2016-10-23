//@flow

import type { Location } from 'history'

export type Query = string

export type Stamp = string

export type Tokens = {
  [key: string]: string
}

export type Meta = {
  Version:  string;
  Revision: string;
  Stamp: Stamp;
  Tokens: Tokens;
}

export type Id = string
export type Name = string
export type Color = string
export type Description = string

export type Label = {
  name: Name;
  color: Color
}

export type Milestone = {
  id: Id;
  title: Name;
  description: Description;
  issues: Issue[];
}

export type IssueState = "OPEN" | "CLOSED";

export type Issue = {
  id: Id;
  title: Name;
  description: Description;
  milestone?: Milestone;
  labels?: Label[];
  state: IssueState;
}

export type Repository = {
  id: Id;
  name: Name;
  description: Description;
  milestones: Milestone[];
  issues: Issue[];
}

export type BaobabTree<T> = {
  get(): T[];
};

export type Repositories = BaobabTree<Repository>;

export type State = {
  _meta: Meta;
  location: Location;
  repositories?: Repositories;
}

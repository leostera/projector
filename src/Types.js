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

export type URL = string
export type Id = string
export type Name = string
export type Color = string
export type Description = string

export type Label = {
  id: Id;
  name: Name;
  color: Color;
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
  number: number;
  description: Description;
  milestone?: Milestone;
  labels: Label[];
  state: IssueState;
  repository: Repository;
}

export type Repository = {
  id: Id;
  name: Name;
  description: Description;
  milestones: Milestone[];
  issues: Issue[];
  url: URL;
}

export type BaobabTree<T> = {
  get(): T[];
};

export type Repositories = BaobabTree<Repository>;

export type State = {
  _meta: Meta;
  location: Location;
  repositories?: Repositories;
  loading?: boolean;
}

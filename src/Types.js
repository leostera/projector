import type { Location } from 'history'

export type Stamp = string
export type Environment = "LOCAL" | "DEVELOPMENT" | "PRODUCTION"

export type Meta = {
  Version:  string;
  Revision: string;
  Env: Environment;
  Stamp: Stamp;
}

export type Id = integer
export type Name = string
export type Color = string

export type Label = {
  name: Name;
  color: Color
}

export type Milestone = {
  id: Id;
  name: Name;
}

export type Issue = {
  id: Id;
  name: Name;
  description: Description;
  milestone:? Milestone;
  labels:? [Label];
}

export type Project = {
  name: Name;
  description: Description;
  milestones:? [Milestone];
  issues:? [Issue];
}

export type State = {
  _meta: Meta;
  location: Location;
  projects: [Project];
}

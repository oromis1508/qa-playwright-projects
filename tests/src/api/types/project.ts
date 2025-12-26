export type Project = {
  name: string;
  id: number;
  ownerId: number;
};
export type Ok<T, S extends number> = {
  ok: true;
  status: S;
  data: T;
};

export type Err = {
  ok: false;
  status: number;
  error: string;
};

export type Result<T, S extends number> = Ok<T, S> | Err;

export type ProjectsListResult = Result<{ items: Project[] }, 200>;

export type ProjectCreateResult = Result<{ project: Project }, 201>;

export type ProjectGetResult = Result<{ project: Project }, 200>;

export type Project = {
  name: string;
  id: number;
  ownerId: number;
};

export type ProjectsListData = { items: Project[] };

export type ProjectData = { project: Project };

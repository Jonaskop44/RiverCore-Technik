export type Navigation = {
  id: number;
  title: string;
  path?: string;
  submenu?: Navigation[];
};

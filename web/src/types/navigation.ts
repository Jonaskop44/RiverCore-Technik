export type Navigation = {
  id: number;
  title: string;
  path?: string;
  newTab: boolean;
  submenu?: Navigation[];
};

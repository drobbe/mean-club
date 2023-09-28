export class FilterClubClass {
  page: number;
  itemsPerPage: number;
  name: string;
  mode: modeType;
}

export enum modeType {
  'all',
  'followed',
  'unfollowed',
}

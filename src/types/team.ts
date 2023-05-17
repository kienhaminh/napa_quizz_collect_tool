export interface ITeamInfo {
  _id: string;
  name: string;
  type: number;
  createdAt: string;
  createdBy: {
    _id: string;
    username: string;
  };
  _updatedAt: string;
  roomId: string;
}

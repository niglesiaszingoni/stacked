export type SyncStep = {
  id: string;
  name: string;
  state: string;
  hasExtraData: boolean;
};
export type SyncDetailStep = {
  id: number;
  name: string;
  loaded: number;
  state: string;
};

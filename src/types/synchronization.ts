export type SyncStep = {
  id: string;
  name: string;
  state: string;
  hasExtraData: boolean;
  subtitle?: string;
};
export type SyncDetailStep = {
  id: number;
  name: string;
  loaded: number;
  state: string;
};

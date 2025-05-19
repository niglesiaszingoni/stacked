export const ModalSyncSteps = [
  {
    id: "1",
    name: "Connecting to platform",
    state: "initial",
    hasExtraData: false,
  },
  {
    id: "2",
    name: "Finding Active Slates",
    state: "initial",
    subtitle: "4 leagues found",
    hasExtraData: false,
  },
  {
    id: "3",
    name: "Loading Leagues",
    state: "initial",
    hasExtraData: true,
  },
  {
    id: "4",
    name: "Calculating Exposures/Data",
    state: "initial",
    hasExtraData: false,
  },
];

export const InitialSyncDetail = [
  {
    id: 1,
    name: "League Delta",
    loaded: 0,
    state: "loading",
  },
  {
    id: 2,
    name: "League Alpha",
    loaded: 0,
    state: "initial",
  },
  {
    id: 3,
    name: "League Gamma",
    loaded: 0,
    state: "initial",
  },
  {
    id: 4,
    name: "League Beta",
    loaded: 0,
    state: "initial",
  },
];

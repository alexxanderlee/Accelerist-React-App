import { RootState } from 'src/state/types';

export const getTeam = (state: RootState) => state.team.team;

export const getLastLogins = (state: RootState) => state.team.lastLogins;

export const isLoading = (state: RootState) => state.team.isLoading;

import { createSlice, AsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { ITeam, ILastLogin } from 'src/interfaces';
import { getTeam, getLastLogins, getReports } from './thunks';
import { userActions } from 'src/state/features/user';
import { toast } from 'react-toastify';

interface TeamData {
  team: ITeam | null;
  lastLogins: ILastLogin[];
  loading: boolean;
}

type TeamAsyncThunk = AsyncThunk<ITeam | ILastLogin[], void, { rejectValue: string }>;
type PendingAction = ReturnType<TeamAsyncThunk['pending']>;
type RejectedAction = ReturnType<TeamAsyncThunk['rejected']>;

function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.startsWith('team/') && action.type.endsWith('/pending');
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.startsWith('team/') && action.type.endsWith('/rejected');
}

const initialState: TeamData = {
  team: null,
  lastLogins: [],
  loading: false,
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTeam.fulfilled, (state, action) => {
      state.team = action.payload;
      state.loading = false;
    });
    builder.addCase(getLastLogins.fulfilled, (state, action) => {
      state.lastLogins = action.payload;
      state.loading = false;
    });
    builder.addCase(getReports.fulfilled, (state, action) => {
      state.team = action.payload.team;
      state.lastLogins = action.payload.lastLogins;
      state.loading = false;
    });
    builder.addCase(userActions.logout, (state) => {
      state.team = null;
      state.lastLogins = [];
    });
    builder.addMatcher(isPendingAction, (state) => {
      state.loading = true;
    });
    builder.addMatcher(isRejectedAction, (state, action) => {
      toast.error(action.payload);
      state.loading = false;
    });
  },
});

export const teamActions = { ...teamSlice.actions, getTeam, getLastLogins, getReports };

export default teamSlice.reducer;
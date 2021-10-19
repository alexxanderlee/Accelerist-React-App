import { createSlice, AsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { IProspect, MetaData, FetchError } from 'src/interfaces';
import { getSavedLists, createSavedList } from './thunks';
import { userActions } from 'src/state/features/user';

interface SavedListState {
  items: IProspect[];
  meta: MetaData | null;
  loading: boolean;
  error: FetchError | null;
}

type SavedListAsyncThunk = AsyncThunk<unknown, unknown, { rejectValue: FetchError }>;
type PendingAction = ReturnType<SavedListAsyncThunk['pending']>;
type RejectedAction = ReturnType<SavedListAsyncThunk['rejected']>;

function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.startsWith('savedList/') && action.type.endsWith('/pending');
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.startsWith('savedList/') && action.type.endsWith('/rejected');
}

const initialState: SavedListState = {
  items: [],
  meta: null,
  loading: false,
  error: null,
};

const savedListSlice = createSlice({
  name: 'savedList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSavedLists.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.meta = action.payload.meta;
      state.loading = false;
    });
    builder.addCase(createSavedList.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.loading = false;
    });
    builder.addCase(userActions.logout, (state) => {
      state.items = [];
      state.meta = null;
    });
    builder.addMatcher(isPendingAction, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addMatcher(isRejectedAction, (state, action) => {
      state.error = action.payload ?? null;
      state.loading = false;
    });
  },
});

export const savedListActions = { ...savedListSlice.actions, getSavedLists, createSavedList };

export default savedListSlice.reducer;

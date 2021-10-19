import { createSlice, AsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { ICompany, MetaData, FetchError } from 'src/interfaces';
import { getFavouriteCompanies } from './thunks';
import { userActions } from 'src/state/features/user';

interface CompaniesState {
  favourites: {
    items: ICompany[];
    meta: MetaData;
  };
  loading: boolean;
  error: FetchError | null;
}

type SavedListAsyncThunk = AsyncThunk<unknown, unknown, { rejectValue: FetchError }>;
type PendingAction = ReturnType<SavedListAsyncThunk['pending']>;
type RejectedAction = ReturnType<SavedListAsyncThunk['rejected']>;

function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.startsWith('companies/') && action.type.endsWith('/pending');
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.startsWith('companies/') && action.type.endsWith('/rejected');
}

const initialState: CompaniesState = {
  favourites: {
    items: [],
    meta: {},
  },
  loading: false,
    error: null,
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFavouriteCompanies.fulfilled, (state, action) => {
      const { items, meta } = action.payload;
      state.favourites.items = items;
      state.favourites.meta = meta;
      state.loading = false;
    });
    builder.addCase(userActions.logout, (state) => {
      state.favourites.items = [];
      state.favourites.meta = {};
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

export const companiesActions = { ...companiesSlice.actions, getFavouriteCompanies };

export default companiesSlice.reducer;

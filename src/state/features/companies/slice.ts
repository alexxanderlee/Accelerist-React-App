import { createSlice, AsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { ICompany, MetaData, FetchError } from 'src/interfaces';
import { getFavouriteCompanies, getCompanies, likeCompany, dislikeCompany, exportToExcel } from './thunks';
import { userActions } from 'src/state/features/user';
import { downloadXlsxFile } from 'src/utils/downloadFile';

interface CompaniesState {
  companies: {
    items: ICompany[];
    meta: MetaData | null;
  },
  favourites: {
    items: ICompany[];
    meta: MetaData | null;
  };
  loading: boolean;
  error: FetchError | null;
}

type SavedListAsyncThunk = AsyncThunk<unknown, unknown, { rejectValue: FetchError }>;
type PendingAction = ReturnType<SavedListAsyncThunk['pending']>;
type RejectedAction = ReturnType<SavedListAsyncThunk['rejected']>;

function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.startsWith('companies/async/') && action.type.endsWith('/pending');
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.startsWith('companies/') && action.type.endsWith('/rejected');
}

const initialState: CompaniesState = {
  companies: {
    items: [],
    meta: null,
  },
  favourites: {
    items: [],
    meta: null,
  },
  loading: false,
  error: null,
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCompanies.fulfilled, (state, action) => {
      const { items, meta } = action.payload;
      state.companies.items = items;
      state.companies.meta = meta;
      state.loading = false;
    });
    builder.addCase(getFavouriteCompanies.fulfilled, (state, action) => {
      const { items, meta } = action.payload;
      state.favourites.items = items;
      state.favourites.meta = meta;
      state.loading = false;
    });
    builder.addCase(likeCompany.pending, (state, { meta }) => {
      state.companies.items = state.companies.items.map(company => {
        if (company.id === meta.arg) {
          company.like = true;
        }
        return company;
      });
    })
    builder.addCase(dislikeCompany.pending, (state, { meta }) => {
      state.companies.items = state.companies.items.map(company => {
        if (company.id === meta.arg) {
          company.like = false;
        }
        return company;
      });
    });
    builder.addCase(exportToExcel.fulfilled, (_, action) => {
      const { file, name } = action.payload;
      downloadXlsxFile(file, name);
    });
    builder.addCase(userActions.logout, (state) => {
      state.favourites.items = [];
      state.favourites.meta = null;
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

export const companiesActions = {
  ...companiesSlice.actions,
  getFavouriteCompanies,
  getCompanies,
  likeCompany,
  dislikeCompany,
  exportToExcel,
};

export default companiesSlice.reducer;

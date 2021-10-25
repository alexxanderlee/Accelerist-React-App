import { createSlice, AsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { ICompany, MetaData } from 'src/interfaces';
import {
  getFavouriteCompanies,
  getCompanies,
  likeCompany,
  dislikeCompany,
  exportToExcel,
  getCompanyById,
} from './thunks';
import { userActions } from 'src/state/features/user';
import { downloadXlsxFile } from 'src/utils/downloadFile';
import { toast } from 'react-toastify';

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
}

type SavedListAsyncThunk = AsyncThunk<unknown, unknown, { rejectValue: string }>;
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
    builder.addCase(getCompanyById.fulfilled, (state, action) => {
      const isExist = state.companies.items.find(company => company.id === action.payload.id) ? true : false;
      if (!isExist) {
        state.companies.items.push(action.payload);
      }
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
    });
    builder.addMatcher(isRejectedAction, (state, action) => {
      toast.error(action.payload);
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
  getCompanyById,
};

export default companiesSlice.reducer;

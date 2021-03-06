import { createSlice, AsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { IProspect, MetaData } from 'src/interfaces';
import { getSavedLists, createSavedList, getSavedListById, exportToExcel, deleteSavedList, updateSavedList } from './thunks';
import { userActions } from 'src/state/features/user';
import { downloadXlsxFile } from 'src/utils/downloadFile';
import { toast } from 'react-toastify';

interface SavedListState {
  items: IProspect[];
  meta: MetaData | null;
  loading: boolean;
}

type SavedListAsyncThunk = AsyncThunk<unknown, unknown, { rejectValue: string }>;
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
    builder.addCase(getSavedListById.fulfilled, (state, action) => {
      const isExist = state.items.find(savedList => savedList.id === action.payload.id) ? true : false;
      if (!isExist) {
        state.items.push(action.payload);
      }
      state.loading = false;
    });
    builder.addCase(updateSavedList.fulfilled, (state, action) => {
      state.items = state.items.map(savedList => {
        if (savedList.id === action.payload.id) {
          return action.payload;
        }
        return savedList;
      });
      state.loading = false;
    });
    builder.addCase(deleteSavedList.fulfilled, (state, action) => {
      state.items = state.items.filter(savedList => savedList.id !== action.payload);
      state.loading = false;
    });
    builder.addCase(exportToExcel.fulfilled, (_, action) => {
      const { file, name } = action.payload;
      downloadXlsxFile(file, name);
    });
    builder.addCase(userActions.logout, (state) => {
      state.items = [];
      state.meta = null;
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

export const savedListActions = {
  ...savedListSlice.actions,
  getSavedLists,
  createSavedList,
  getSavedListById,
  exportToExcel,
  deleteSavedList,
  updateSavedList,
};

export default savedListSlice.reducer;

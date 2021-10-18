import { createSlice, AsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { FetchError, UserData } from 'src/interfaces';
import { AuthRequestAttributes, loginUser, sendMail, signupUser, changePassword } from './thunks';

interface UserState {
  data: UserData | null;
  error: FetchError | null;
  loading: boolean;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

type AuthAsyncThunk = AsyncThunk<UserData, AuthRequestAttributes, { rejectValue: FetchError }>;
type PendingAction = ReturnType<AuthAsyncThunk['pending']>;
type FulfilledAction = ReturnType<AuthAsyncThunk['fulfilled']>;
type RejectedAction = ReturnType<AuthAsyncThunk['rejected']>;

function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('/pending');
}

function isFulfilledAction(action: AnyAction): action is FulfilledAction {
  return action.type.endsWith('/fulfilled');
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('/rejected');
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isPendingAction, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addMatcher(isFulfilledAction, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addMatcher(isRejectedAction, (state, action) => {
      action.payload && (state.error = action.payload);
      state.loading = false;
    });
  },
});

export const userActions = { ...userSlice.actions, loginUser, signupUser, sendMail, changePassword };

export default userSlice.reducer;

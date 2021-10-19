import { createSlice, AsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { FetchError, IUser } from 'src/interfaces';
import { AuthRequestAttributes, loginUser, sendMail, signupUser, changePassword } from './thunks';

interface UserState {
  user: IUser | null;
  isAuthenticated: boolean;
  error: FetchError | null;
  loading: boolean;
}

type AuthAsyncThunk = AsyncThunk<{ user: IUser, token: string }, AuthRequestAttributes, { rejectValue: FetchError }>;
type PendingAction = ReturnType<AuthAsyncThunk['pending']>;
type FulfilledAction = ReturnType<AuthAsyncThunk['fulfilled']>;
type RejectedAction = ReturnType<AuthAsyncThunk['rejected']>;

function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.startsWith('user/') && action.type.endsWith('/pending');
}

function isFulfilledAction(action: AnyAction): action is FulfilledAction {
  return action.type.startsWith('user/') && action.type.endsWith('/fulfilled');
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.startsWith('user/') && action.type.endsWith('/rejected');
}

const initialState: UserState = {
  user: null,
  isAuthenticated: localStorage.getItem('token') ? true : false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    clearError: (state) => { state.error = null },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isPendingAction, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addMatcher(isFulfilledAction, (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem('token', token);
    });
    builder.addMatcher(isRejectedAction, (state, action) => {
      state.error = action.payload ?? null;
      state.isAuthenticated = false;
      state.loading = false;
      localStorage.removeItem('token');
    });
  },
});

export const userActions = { ...userSlice.actions, loginUser, signupUser, sendMail, changePassword };

export default userSlice.reducer;

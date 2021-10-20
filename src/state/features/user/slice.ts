import { createSlice, AsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { IUser } from 'src/interfaces';
import { toast } from 'react-toastify';
import { AuthRequestAttributes, loginUser, sendMail, signupUser, changePassword } from './thunks';

interface UserState {
  user: IUser | null;
  isAuthenticated: boolean;
  loading: boolean;
}

type AuthAsyncThunk = AsyncThunk<{ user: IUser, accessToken: string }, AuthRequestAttributes, { rejectValue: string }>;
type PendingAction = ReturnType<AuthAsyncThunk['pending']>;
type FulfilledAction = ReturnType<AuthAsyncThunk['fulfilled']>;
type RejectedAction = ReturnType<AuthAsyncThunk['rejected']>;

function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.startsWith('user/') && action.type.endsWith('/pending');
}

function isFulfilledAction(action: AnyAction): action is FulfilledAction {
  return action.type.startsWith('user/') && action.type.endsWith('/fulfilled');
}

function isFulfilledAuthAction(action: AnyAction): action is FulfilledAction {
  return (action.type.startsWith('user/login') || action.type.startsWith('user/signup')) && action.type.endsWith('/fulfilled');
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.startsWith('user/') && action.type.endsWith('/rejected');
}

const initialState: UserState = {
  user: null,
  isAuthenticated: localStorage.getItem('token') ? true : false,
  loading: false,
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
  },
  extraReducers: (builder) => {
    builder.addMatcher(isPendingAction, (state) => {
      state.loading = true;
    });
    builder.addMatcher(isFulfilledAuthAction, (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.isAuthenticated = true;
      localStorage.setItem('token', accessToken);
    });
    builder.addMatcher(isFulfilledAction, (state) => {
      state.loading = false;
    });
    builder.addMatcher(isRejectedAction, (state, action) => {
      toast.error(action.payload);
      state.isAuthenticated = false;
      state.loading = false;
      localStorage.removeItem('token');
    });
  },
});

export const userActions = { ...userSlice.actions, loginUser, signupUser, sendMail, changePassword };

export default userSlice.reducer;

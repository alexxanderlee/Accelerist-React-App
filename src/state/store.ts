import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userReducer, teamReducer, savedListReducer } from './features';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user', 'team', 'savedList'],
};

const userConfig = {
  key: 'user',
  storage,
  blacklist: ['loading', 'error'],
}

const rootReducer = combineReducers({
  user: persistReducer(userConfig, userReducer),
  team: teamReducer,
  savedList: savedListReducer,
});

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  })
});

export const persistor = persistStore(store);
export default store;

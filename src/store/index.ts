import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import localforage from "localforage";
import { createLogger } from "redux-logger";
import { api } from "@/services/api"; // RTK Query service
import { authReducer } from "@/services/auth";

// Create an instance of redux-logger
const logger = createLogger({
  // Optional config: https://github.com/LogRocket/redux-logger#options
  collapsed: true, // Collapses the log entries
  duration: true, // Prints duration of each action?
  diff: true, // Show diff between states?
});

// 1. Persist config only for the auth slice
const authPersistConfig = {
  key: "auth",
  storage: localforage,
  // You can add other options like blacklist/whitelist of fields inside auth
};

// 2. Wrap the auth reducer with persistReducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// 3. Create the store with an object of reducers
export const store = configureStore({
  reducer: {
    // Only `auth` is persisted
    auth: persistedAuthReducer,
    // RTK Query slice is NOT persisted
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Required for redux-persist actions
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger, api.middleware),
});

// 4. Create persistor to rehydrate store
export const persistor = persistStore(store);

// 5. Optional: RTK Query’s setupListeners
setupListeners(store.dispatch);

// Type helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

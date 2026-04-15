import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
// We are removing the 'import storage' line that was failing
import userSlice from "./userSlice";
import productSlice from "./productSlice";


const rootReducer = combineReducers({
  user: userSlice,
  product: productSlice,
});

// ✅ UNIVERSAL FAIL-SAFE CONFIG
// This uses the browser's native localStorage directly.
// It is 100% compatible with Redux Persist and avoids the 'undefined' import error.
const persistConfig = {
  key: "root",
  version: 1,
  storage: {
    getItem: (key) => Promise.resolve(localStorage.getItem(key)),
    setItem: (key, value) => {
      localStorage.setItem(key, value);
      return Promise.resolve();
    },
    removeItem: (key) => {
      localStorage.removeItem(key);
      return Promise.resolve();
    },
  },
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };

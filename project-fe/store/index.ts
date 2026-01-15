import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // ✅ correct localStorage
import authReducer from "@/feature/auth/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: ["loading"],
};

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

export const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (
    getDefaultMiddleware: (arg0: { serializableCheck: boolean }) => any
  ) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

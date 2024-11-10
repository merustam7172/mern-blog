import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from './user/userSlice.js'
import { version } from "mongoose";
import themeReducer from './theme/theme.js'


const rootReducer = combineReducers({
  user : userReducer,
  theme : themeReducer,
})

const persistConfig = {
  key: "root",
  storage,
  version : 1
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware : (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck : false}),
})

export const persistor = persistStore(store)
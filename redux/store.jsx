'use client';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import storage from 'redux-persist/lib/storage';
import { searchReducer } from "./reducers/search";
import { collectionReducer } from "./reducers/collection";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ['collection'],
}

const rootReducer = combineReducers({search: searchReducer, collection: collectionReducer})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunkMiddleware)
})


export let persistor = persistStore(store)

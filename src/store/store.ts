
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from "@reduxjs/toolkit/query";
import authApi from './feature/authApi/authApi'
import insurerApi from './feature/insurerapi/insurerapi';
import myProfileApi from './feature/myProfileApi/myProfileApi';
import claimlyGuidesApi from './feature/claimlyGuides/claimlyGuidesApi';
import webApi from './feature/web/webApi';
import metaApi from './feature/meta/metaApi';


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [insurerApi.reducerPath]: insurerApi.reducer,
    [myProfileApi.reducerPath]: myProfileApi.reducer,
    [claimlyGuidesApi.reducerPath]: claimlyGuidesApi.reducer,
    [webApi.reducerPath]: webApi.reducer,
    [metaApi.reducerPath]: metaApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      insurerApi.middleware,
      myProfileApi.middleware,
      claimlyGuidesApi.middleware,
      webApi.middleware,
      metaApi.middleware
    )
})

setupListeners(store.dispatch);

// Types (IMPORTANT)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



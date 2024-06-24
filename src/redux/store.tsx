import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { customerApi } from './api/customerApi';

export const store = configureStore({
    reducer: {
        [customerApi.reducerPath]: customerApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(customerApi.middleware)
    },
});

setupListeners(store.dispatch);

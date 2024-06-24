import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { customerApi } from './api/customerApi';
// import { usersReducer } from './slices/usersSlice';
// import { albumsApi } from './apis/albumsApi';
// import { photosApi } from './apis/photosApi';

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

// export * from './thunks/fetchUsers';
// export * from './thunks/addUser';
// export * from './thunks/removeUser';
// export {
//   useFetchAlbumsQuery,
//   useAddAlbumMutation,
//   useRemoveAlbumMutation,
// } from './apis/albumsApi';
// export {
//   useFetchPhotosQuery,
//   useAddPhotoMutation,
//   useRemovePhotoMutation,
// } from './apis/photosApi';

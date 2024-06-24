import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import generateUniqueId from 'generate-unique-id';

const customerApi = createApi({
    reducerPath: 'customers',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
    }),
    tagTypes: ['Customer'],
    endpoints(builder) {
        return {
            fetchCustomersList: builder.query({
                providesTags: ['Customer'],
                query: () => {
                    return {
                        url: '/customers',
                        method: 'GET',
                    };
                },
            }),
            fetchCustomerById: builder.query({
                query: (id) => {
                    return {
                        url: `/customers/${id}`,
                        method: 'GET',
                    };
                },
            }),
            addCustomer: builder.mutation({
                invalidatesTags: ['Customer'],
                query: (album) => {
                    return {
                        method: 'POST',
                        url: '/customers',
                        body: {
                            id: generateUniqueId(),
                            ...album
                        },
                    };
                },
            }),
            editCustomer: builder.mutation({
                invalidatesTags: ['Customer'],
                query: ({id,...rest}) => {
                    return {
                        method: 'PATCH',
                        url: `/customers/${id}`,
                        body: {
                            ...rest
                        },
                    };
                },
            }),
            removeCustomer: builder.mutation({
                invalidatesTags: ['Customer'],
                query: (data) => {
                    return {
                        method: 'DELETE',
                        url: `/customers/${data.id}`,
                    };
                },
            }),
        };
    },
});

export const {
    useFetchCustomersListQuery,
    useFetchCustomerByIdQuery,
    useAddCustomerMutation,
    useRemoveCustomerMutation,
    useEditCustomerMutation
} = customerApi;
export { customerApi };

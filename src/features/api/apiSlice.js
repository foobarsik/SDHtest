import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.github.com'}),
    endpoints: builder => ({
        getIssues: builder.query({
            query: (page = 1, per_page = 20, repo = 'facebook/react-native') =>
                `/repos/${repo}/issues?per_page=${per_page}&page=${page}`
        })
    })
})

export const {useGetIssuesQuery} = apiSlice

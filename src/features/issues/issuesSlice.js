import {createSlice} from "@reduxjs/toolkit";
import {GetIssues} from "src/services/githubService";

export const issueSlice = createSlice({
    name: "issues",
    initialState: {
        issues: [],
        isLoading: false,
        isSuccess: false,
        isMore: true,
        error: null,
    },
    extraReducers: {
        [GetIssues.pending]: (state) => {
            state.isLoading = true;
        },
        [GetIssues.fulfilled]: (state, action) => {
            if (action.payload.length === 0) {
                state.isMore = false;
            } else {
                state.issues = [...state.issues, ...action.payload]
            }
            state.isLoading = false;
            state.isSuccess = true;
        },
        [GetIssues.rejected]: (state, action) => {
            state.error = action.error.message
            state.isLoading = false;
        }
    },
});

export const selectAllPosts = state => state.issues;

export const selectIssueById = (state, id) => {
    return state.issues.issues.find(issue => issue.number === id);
}

export default issueSlice.reducer;

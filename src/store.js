import {configureStore} from '@reduxjs/toolkit';

import issueSlice from "./features/issues/issuesSlice";

export const store = configureStore({
    reducer: {
        issues: issueSlice
    }
})

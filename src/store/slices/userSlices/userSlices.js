import { createSlice } from "@reduxjs/toolkit";

const userSlices = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        toggleUsers(state, { payload }) {
            return {
                ...state,
                user: payload
            }
        }
    }
})

export const selectUsers = state => state.user

export const { toggleUsers } = userSlices.actions

export const usersReducer = userSlices.reducer
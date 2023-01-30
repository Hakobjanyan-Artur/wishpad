import { createSlice } from "@reduxjs/toolkit";

const userSlices = createSlice({
    name: 'user',
    initialState: {
        user: null,
        id: null
    },
    reducers: {
        toggleUsers(state, { payload }) {
            return {
                ...state,
                user: payload
            }
        },
        toggleId(state, { payload }) {
            return {
                ...state,
                id: payload
            }
        },
    }
})

export const selectUsers = state => state.user

export const { toggleUsers, toggleId } = userSlices.actions

export const usersReducer = userSlices.reducer
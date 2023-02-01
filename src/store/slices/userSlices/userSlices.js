import { createSlice } from "@reduxjs/toolkit";

const userSlices = createSlice({
    name: 'user',
    initialState: {
        users: null,
        user: null,
        id: null,
    },
    reducers: {
        toggleUser(state, { payload }) {
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
        toggleUsers(state, { payload }) {
            return {
                ...state,
                users: payload
            }
        }
    }
})

export const selectUsers = state => state.user

export const { toggleUsers, toggleId, toggleUser, toggleCurrentUser } = userSlices.actions

export const usersReducer = userSlices.reducer
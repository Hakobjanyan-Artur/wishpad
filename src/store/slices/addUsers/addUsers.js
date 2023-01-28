import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../../components/firebasaConfig/FirebasaConfig";
import { addDoc, collection } from "firebase/firestore"
const usersRef = collection(db, "users")

const addUsers = createSlice({
    name: 'addusers',
    initialState: {},
    reducers: {
        addNewUser(state, { payload }) {
            state = { ...payload }

            addDoc(usersRef, state)
        }
    }
})

export const selectusers = state => state.addNewUser

export const { addNewUser } = addUsers.actions

export const addNewUserReduser = addUsers.reducer
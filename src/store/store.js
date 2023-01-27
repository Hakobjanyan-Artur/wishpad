import { configureStore } from "@reduxjs/toolkit";
import { addNewUserReduser } from "./slices/addUsers/addUsers";
import { usersReducer } from "./slices/userSlices/userSlices";

const store = configureStore({
    reducer: {
        newUser: addNewUserReduser,
        user: usersReducer
    }
})

export default store
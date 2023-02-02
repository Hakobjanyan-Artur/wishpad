import { configureStore } from "@reduxjs/toolkit";
import { addNewUserReduser } from "./slices/addUsers/addUsers";
import { searchReducer } from "./slices/searchUsers/searchUsers";
import { usersReducer } from "./slices/userSlices/userSlices";

const store = configureStore({
    reducer: {
        newUser: addNewUserReduser,
        user: usersReducer,
        search: searchReducer
    }
})

export default store
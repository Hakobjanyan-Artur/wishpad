import { configureStore } from "@reduxjs/toolkit";
import { addNewUserReduser } from "./slices/addUsers/addUsers";

const store = configureStore({
    reducer: {
        newUser: addNewUserReduser
    }
})

export default store
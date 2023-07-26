import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from "react-redux";
import { RootState } from "../store";

type InitialState = {
    user: User | null
}

const initialState: InitialState = {
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            if (state.user === null) {
                state.user = action.payload;
            }
        },

        removeUser: (state) => {
            state.user = null
        }
    }
})

export const { removeUser, setUser } = userSlice.actions

export const userSelector = (state: RootState) => state.user

export default userSlice.reducer
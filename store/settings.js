import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebar: true,
    header: "",
    darkMode: "light",
};

// Actual Slice
export const settingsSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Action to set the authentication status
        toggleSidebar(state) {
            state.sidebar = !state.sidebar;
        },
        setHeader(state, action) {
            state.header = action.payload;
        },
        toggleDisplayMode(state, action) {
            console.log("state");
            if (action.payload) state.darkMode = action.payload;
            else
                state.darkMode === "light"
                    ? (state.darkMode = "dark")
                    : (state.darkMode = "light");
        },
    },
});

export const { toggleSidebar, setHeader, toggleDisplayMode } =
    settingsSlice.actions;

export default settingsSlice.reducer;

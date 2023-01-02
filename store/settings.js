import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebar: true,
    header: "",
    darkMode: "light",
    popup: null,
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
        setPopup(state, action) {
            state.popup = action.payload
        }
    },
});

export const { toggleSidebar, setHeader, toggleDisplayMode, setPopup } =
    settingsSlice.actions;

export default settingsSlice.reducer;

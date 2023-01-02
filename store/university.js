import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	universities: [],
	university: {},
	isloading: false,
	error: "",
	success: "",
};

export const get_all_universities = createAsyncThunk(
	"university/getAll",
	async (thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("study-auth")}`,
				},
			};

			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/universities`,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const create_university = createAsyncThunk(
	"university/createUniversity",
	async (name, thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("study-auth")}`,
				},
			};

			const body = { name: name }

			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/user/university`, body, 
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const universitySlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
	},
	extraReducers(builder) {
		builder.addCase(get_all_universities.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_all_universities.fulfilled, (state, actions) => {
			state.isloading = false;
            state.universities = actions.payload
            state.university = actions.payload[0]
		});
		builder.addCase(get_all_universities.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(create_university.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(create_university.fulfilled, (state, actions) => {
			state.isloading = false;
			state.university = actions.payload
		});
		builder.addCase(create_university.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});
	},
});

// Action creators are generated for each case reducer function
export const {  } = universitySlice.actions;

export default universitySlice.reducer;

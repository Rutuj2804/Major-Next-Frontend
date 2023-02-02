import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	subjects: [],
	isloading: false,
	error: "",
	success: "",
};

export const add_subject = createAsyncThunk(
	"university/createUniversity",
	async ({name, id}, thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("study-auth")}`,
				},
			};

			const body = { name: name, faculty: [] }

			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/class/subject/${id}`, body, 
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
		builder.addCase(add_subject.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(add_subject.fulfilled, (state, actions) => {
			state.isloading = false;
			state.subjects = actions.payload
		});
		builder.addCase(add_subject.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});
	},
});

// Action creators are generated for each case reducer function
export const {} = universitySlice.actions;

export default universitySlice.reducer;

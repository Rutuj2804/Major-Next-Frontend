import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	demand: [],
	isloading: false,
	error: "",
	success: "",
};

export const post_fees_demand = createAsyncThunk(
	"fees/postFeesDemand",
	async ({ title,classID, university, amount }, thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${localStorage.getItem(
						"study-auth"
					)}`,
				},
			};

			const body = JSON.stringify({ title, university, amount })

			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/fees/demand/${classID}`,
				body,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const get_fees_demand = createAsyncThunk(
	"fees/getFeesDemand",
	async (id, thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${localStorage.getItem(
						"study-auth"
					)}`,
				},
			};

			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/fees/demand/${id}`,
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
		builder.addCase(post_fees_demand.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(post_fees_demand.fulfilled, (state, actions) => {
			state.isloading = false;
			state.demand = [...state.demand, actions.payload]
		});
		builder.addCase(post_fees_demand.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(get_fees_demand.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_fees_demand.fulfilled, (state, actions) => {
			state.isloading = false;
			state.demand = actions.payload
		});
		builder.addCase(get_fees_demand.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});
	},
});

// Action creators are generated for each case reducer function
export const {
} = universitySlice.actions;

export default universitySlice.reducer;

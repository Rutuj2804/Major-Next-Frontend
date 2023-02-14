import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	cards: [],
	line: [],
	bar: [],
	pie: [],
	data_grid: {},
	isloading: false,
	error: "",
	success: "",
};

export const get_cards = createAsyncThunk(
	"analytics/getCards",
	async ({ id }, thunkApi) => {
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
				`${process.env.NEXT_PUBLIC_API_URL}/analytics/cards/${id}`,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const get_line = createAsyncThunk(
	"analytics/getLine",
	async ({ id }, thunkApi) => {
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
				`${process.env.NEXT_PUBLIC_API_URL}/analytics/line/${id}`,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const get_bar = createAsyncThunk(
	"analytics/getBar",
	async ({ id }, thunkApi) => {
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
				`${process.env.NEXT_PUBLIC_API_URL}/analytics/bar/${id}`,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const get_pie = createAsyncThunk(
	"analytics/getPie",
	async ({ id }, thunkApi) => {
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
				`${process.env.NEXT_PUBLIC_API_URL}/analytics/pie/${id}`,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const get_data_grid = createAsyncThunk(
	"analytics/getDataGrid",
	async ({ id }, thunkApi) => {
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
				`${process.env.NEXT_PUBLIC_API_URL}/analytics/classes/${id}`,
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
		builder.addCase(get_cards.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_cards.fulfilled, (state, actions) => {
			state.isloading = false;
			state.cards = actions.payload
		});
		builder.addCase(get_cards.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(get_line.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_line.fulfilled, (state, actions) => {
			state.isloading = false;
			state.line = actions.payload
		});
		builder.addCase(get_line.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(get_bar.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_bar.fulfilled, (state, actions) => {
			state.isloading = false;
			state.bar = actions.payload
		});
		builder.addCase(get_bar.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(get_pie.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_pie.fulfilled, (state, actions) => {
			state.isloading = false;
			state.pie = actions.payload
		});
		builder.addCase(get_pie.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(get_data_grid.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_data_grid.fulfilled, (state, actions) => {
			state.isloading = false;
			state.data_grid = actions.payload
		});
		builder.addCase(get_data_grid.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});
	},
});

// Action creators are generated for each case reducer function
export const {  } = universitySlice.actions;

export default universitySlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	subjects: [],
	isloading: false,
	error: "",
	success: "",
};

export const add_subject = createAsyncThunk(
	"subjects/addSubject",
	async ({ name, id }, thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${localStorage.getItem(
						"study-auth"
					)}`,
				},
			};

			const body = { name: name, faculty: [] };

			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/class/subject/${id}`,
				body,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const delete_subject = createAsyncThunk(
	"subjects/deleteSubject",
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

			const res = await axios.delete(
				`${process.env.NEXT_PUBLIC_API_URL}/class/subject/${id}`,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const delete_bulk_subject = createAsyncThunk(
	"subjects/deleteBulkSubject",
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

			const body = JSON.stringify({ id: id })

			const res = await axios.put(
				`${process.env.NEXT_PUBLIC_API_URL}/class/subject`, body,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const get_my_subjects = createAsyncThunk(
	"subjects/getMySubjects",
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

			const URL = id ? `/admin/${id}` : "/my"

			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/class${URL}`,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const get_subjects_from_class = createAsyncThunk(
	"subjects/getSubjectsFromClass",
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
				`${process.env.NEXT_PUBLIC_API_URL}/class/subject/${id}`,
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
	reducers: {},
	extraReducers(builder) {
		builder.addCase(get_my_subjects.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_my_subjects.fulfilled, (state, actions) => {
			state.isloading = false;
			state.subjects = actions.payload;
		});
		builder.addCase(get_my_subjects.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(add_subject.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(add_subject.fulfilled, (state, actions) => {
			state.isloading = false;
			state.subjects = [...state.subjects, actions.payload];
		});
		builder.addCase(add_subject.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(delete_subject.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(delete_subject.fulfilled, (state, actions) => {
			state.isloading = false;
			state.subjects = state.subjects.filter(v=>v._id !== actions.payload._id)
		});
		builder.addCase(delete_subject.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(delete_bulk_subject.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(delete_bulk_subject.fulfilled, (state, actions) => {
			state.isloading = false;
			state.subjects = state.subjects.filter(v=>!actions.payload.includes(v._id))
		});
		builder.addCase(delete_bulk_subject.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(get_subjects_from_class.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_subjects_from_class.fulfilled, (state, actions) => {
			state.isloading = false;
			state.subjects = actions.payload
		});
		builder.addCase(get_subjects_from_class.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});
	},
});

// Action creators are generated for each case reducer function
export const {} = universitySlice.actions;

export default universitySlice.reducer;

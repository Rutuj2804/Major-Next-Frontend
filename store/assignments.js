import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	assignments: [],
	submitted: [],
	isloading: false,
	id: null,
	error: "",
	success: "",
};

export const get_my_assignments = createAsyncThunk(
	"assignments/getMyAssignments",
	async (_,thunkApi) => {
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
				`${process.env.NEXT_PUBLIC_API_URL}/class/add_assignments`,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const post_assignments = createAsyncThunk(
	"assignments/postAssignments",
	async ({ id, subjectId, title, files, description, date },thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "multipart/form-data",
					Authorization: `Bearer ${localStorage.getItem(
						"study-auth"
					)}`,
				},
			};

			const formData = new FormData()
			formData.append("title", title)
			formData.append("description", description)
			formData.append("submission", date)
			for (let i = 0; i < files.length; i++) {
				formData.append("files", files[i]);
			}

			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/class/add_assignments/${id}/${subjectId}`, formData,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const delete_assignments = createAsyncThunk(
	"assignments/deleteAssignments",
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

			const body = JSON.stringify({ id });

			const res = await axios.put(
				`${process.env.NEXT_PUBLIC_API_URL}/class/add_assignments`,
				body,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const submit_assignments = createAsyncThunk(
	"assignments/submitAssignments",
	async ({ id, file},thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "multipart/form-data",
					Authorization: `Bearer ${localStorage.getItem(
						"study-auth"
					)}`,
				},
			};

			const formData = new FormData()
			formData.append("file", file);

			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/assignments/submit/${id}`, formData,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const get_submitted_assignments = createAsyncThunk(
	"assignments/getSubmittedAssignments",
	async ({ id},thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "multipart/form-data",
					Authorization: `Bearer ${localStorage.getItem(
						"study-auth"
					)}`,
				},
			};

			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/assignments/${id}`,
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
		setAssignmentId(state, action) {
			state.id = action.payload
		},
		setAssignmentSuccess(state, action) {
			state.success = action.payload
		},
		setAssignmentError(state, action) {
			state.error = action.payload
		}
	},
	extraReducers(builder) {
		builder.addCase(get_my_assignments.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_my_assignments.fulfilled, (state, actions) => {
			state.isloading = false;
			state.assignments = actions.payload;
		});
		builder.addCase(get_my_assignments.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(post_assignments.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(post_assignments.fulfilled, (state, actions) => {
			state.isloading = false;
			state.assignments = [...state.assignments, ...actions.payload];
		});
		builder.addCase(post_assignments.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(delete_assignments.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(delete_assignments.fulfilled, (state, actions) => {
			state.isloading = false;
			state.assignments = state.assignments.filter(v=>!actions.payload.includes(v._id))
		});
		builder.addCase(delete_assignments.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(submit_assignments.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(submit_assignments.fulfilled, (state, actions) => {
			state.isloading = false;
			state.success = actions.payload.success
		});
		builder.addCase(submit_assignments.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(get_submitted_assignments.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_submitted_assignments.fulfilled, (state, actions) => {
			state.isloading = false;
			state.submitted = actions.payload
		});
		builder.addCase(get_submitted_assignments.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});
	},
});

// Action creators are generated for each case reducer function
export const { setAssignmentId, setAssignmentError, setAssignmentSuccess } = universitySlice.actions;

export default universitySlice.reducer;

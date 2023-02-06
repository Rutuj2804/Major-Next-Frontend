import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	notes: [],
	isloading: false,
	error: "",
	success: "",
};

export const post_notes_to_a_subject = createAsyncThunk(
	"notes/postNotesToSubject",
	async ({ id, subjectId, files }, thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "multipart/form-data",
					Authorization: `Bearer ${localStorage.getItem(
						"study-auth"
					)}`,
				},
			};

			const formData = new FormData();
			for (let i = 0; i < files.length; i++) {
				formData.append("files", files[i]);
			}

			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/class/add_notes/${id}/${subjectId}`,
				formData,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const get_all_notes_for_me = createAsyncThunk(
	"notes/getAllNotesForMe",
	async (thunkApi) => {
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
				`${process.env.NEXT_PUBLIC_API_URL}/class/add_notes`,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const delete_notes = createAsyncThunk(
	"notes/deleteNotes",
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
				`${process.env.NEXT_PUBLIC_API_URL}/class/add_notes`,
				body,
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
		builder.addCase(post_notes_to_a_subject.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(post_notes_to_a_subject.fulfilled, (state, actions) => {
			state.isloading = false;
			state.notes = [...state.notes, ...actions.payload];
		});
		builder.addCase(post_notes_to_a_subject.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(get_all_notes_for_me.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_all_notes_for_me.fulfilled, (state, actions) => {
			state.isloading = false;
			state.notes = actions.payload;
		});
		builder.addCase(get_all_notes_for_me.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(delete_notes.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(delete_notes.fulfilled, (state, actions) => {
			state.isloading = false;
			state.notes = state.notes.filter(v=>!actions.payload.includes(v._id))
		});
		builder.addCase(delete_notes.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});
	},
});

// Action creators are generated for each case reducer function
export const {} = universitySlice.actions;

export default universitySlice.reducer;

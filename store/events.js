import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	events: [],
	isloading: false,
	id: "",
	id: null,
	error: "",
	success: "",
};

export const post_events = createAsyncThunk(
	"events/postEvent",
	async ({ title, files, description, university }, thunkApi) => {
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
			formData.append("title", title);
			formData.append("description", description);
			formData.append("university", university);
			for (let i = 0; i < files.length; i++) {
				formData.append("files", files[i]);
			}

			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/events/create`,
				formData,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const get_events = createAsyncThunk(
	"events/getEvent",
	async ({ id }, thunkApi) => {
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
				`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const delete_events = createAsyncThunk(
	"events/deleteEvent",
	async ({ id }, thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "multipart/form-data",
					Authorization: `Bearer ${localStorage.getItem(
						"study-auth"
					)}`,
				},
			};

			const res = await axios.delete(
				`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`,
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
		setEventsSuccess(state, action) {
			state.success = action.payload;
		},
		setEventsError(state, action) {
			state.error = action.payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(post_events.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(post_events.fulfilled, (state, actions) => {
			state.isloading = false;
			state.events = [actions.payload, ...state.events];
			state.success = "Successfully posted a Event";
		});
		builder.addCase(post_events.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(get_events.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_events.fulfilled, (state, actions) => {
			state.isloading = false;
			state.events = actions.payload;
		});
		builder.addCase(get_events.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(delete_events.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(delete_events.fulfilled, (state, actions) => {
			state.isloading = false;
			state.events = state.events.filter(
				(v) => v._id !== actions.payload._id
			);
			state.success = "Successfully deleted a Event"
		});
		builder.addCase(delete_events.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});
	},
});

// Action creators are generated for each case reducer function
export const { setEventsError, setEventsSuccess } = universitySlice.actions;

export default universitySlice.reducer;

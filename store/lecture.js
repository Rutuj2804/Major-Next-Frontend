import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	lectures: [],
	lecture: {
		title: "",
		description: "",
		file: "https://static.videezy.com/system/resources/previews/000/021/517/original/Flying-Over-A-Beach-4K.mp4",
		subjectID: "",
		user: ""
	},
	isloading: false,
	id: "",
	id: null,
	error: "",
	success: "",
};

export const post_lecture = createAsyncThunk(
	"lecture/postLecture",
	async ({ title, file, description, classID, subjectID }, thunkApi) => {
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
			formData.append("classID", classID);
			formData.append("subjectID", subjectID);
			formData.append("file", file);

			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/lecture/create`,
				formData,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const get_lecture = createAsyncThunk(
	"lecture/getLecture",
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
				`${process.env.NEXT_PUBLIC_API_URL}/lecture/class/${id}`,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const get_single_lecture = createAsyncThunk(
	"lecture/getSingleLecture",
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
				`${process.env.NEXT_PUBLIC_API_URL}/lecture/single/${id}`,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const delete_lecture = createAsyncThunk(
	"lecture/deleteLecture",
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
				`${process.env.NEXT_PUBLIC_API_URL}/lecture/${id}`,
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
		setLectureSuccess(state, action) {
			state.success = action.payload;
		},
		setLectureError(state, action) {
			state.error = action.payload;
		},
		setLectureId(state, action) {
			state.id = action.payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(post_lecture.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(post_lecture.fulfilled, (state, actions) => {
			state.isloading = false;
			if(state.id === actions.payload.classID._id)
			state.lectures = [actions.payload, ...state.lectures];
			state.success = "Successfully posted a lecture"
		});
		builder.addCase(post_lecture.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(get_lecture.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_lecture.fulfilled, (state, actions) => {
			state.isloading = false;
			state.lectures = actions.payload;
		});
		builder.addCase(get_lecture.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(delete_lecture.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(delete_lecture.fulfilled, (state, actions) => {
			state.isloading = false;
			state.lectures = state.lectures.filter(
				(v) => v._id !== actions.payload._id
			);
		});
		builder.addCase(delete_lecture.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(get_single_lecture.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_single_lecture.fulfilled, (state, actions) => {
			state.isloading = false;
			state.lecture = actions.payload
		});
		builder.addCase(get_single_lecture.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});
	},
});

// Action creators are generated for each case reducer function
export const {
	setAssignmentId,
	setLectureError,
	setLectureSuccess,
	setLectureId,
} = universitySlice.actions;

export default universitySlice.reducer;

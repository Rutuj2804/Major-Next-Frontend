import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	results: [],
	id: "",
	result: {
		marks: "00",
		maxMarks: "00",
		result: {
			name: "",
		},
		user: {
			firstname: "",
			lastname: "",
			email: "",
		}
	},
	isloading: false,
	error: "",
	success: "",
};

export const post_results = createAsyncThunk(
	"results/postResults",
	async ({ id, name, classID, subjectID, file }, thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "multipart/form-data",
					Authorization: `Bearer ${localStorage.getItem(
						"study-auth"
					)}`,
				},
			};

            const body = new FormData()
            body.append("name", name)
            body.append("classID", classID)
            body.append("subjectID", subjectID)
            body.append("file", file)

			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/results/create/${id}`, body,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const get_results = createAsyncThunk(
	"results/getResults",
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
				`${process.env.NEXT_PUBLIC_API_URL}/results/get/${id}`, 
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const get_single_results = createAsyncThunk(
	"results/getSingleResults",
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
				`${process.env.NEXT_PUBLIC_API_URL}/results/result/${id}`, 
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const delete_results = createAsyncThunk(
	"results/deleteResults",
	async (ids, thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${localStorage.getItem(
						"study-auth"
					)}`,
				},
			};

            const body = JSON.stringify({ id: ids })

			const res = await axios.put(
				`${process.env.NEXT_PUBLIC_API_URL}/results/delete`, body,
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
		setPopupID: (s, a) => {
			s.id = a.payload
		}
	},
	extraReducers(builder) {
		builder.addCase(post_results.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(post_results.fulfilled, (state, actions) => {
			state.isloading = false;
			state.results = [...state.results, actions.payload]
		});
		builder.addCase(post_results.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});
        
		builder.addCase(get_results.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_results.fulfilled, (state, actions) => {
			state.isloading = false;
			state.results = actions.payload
		});
		builder.addCase(get_results.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});
        
		builder.addCase(delete_results.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(delete_results.fulfilled, (state, actions) => {
			state.isloading = false;
			state.results = state.results.filter(v=>!actions.payload.includes(v._id))
		});
		builder.addCase(delete_results.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});
        
		builder.addCase(get_single_results.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_single_results.fulfilled, (state, actions) => {
			state.isloading = false;
			state.result = actions.payload
		});
		builder.addCase(get_single_results.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});
	},
});

// Action creators are generated for each case reducer function
export const { setPopupID } = universitySlice.actions;

export default universitySlice.reducer;

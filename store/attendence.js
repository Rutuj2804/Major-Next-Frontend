import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	attendence: [],
	data: [],
	isloading: false,
	id: null,
	error: "",
	success: "",
};

export const get_attendence = createAsyncThunk(
	"attendence/getAttendence",
	async (id,thunkApi) => {
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
				`${process.env.NEXT_PUBLIC_API_URL}/attendence/attendence/${id}`,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const delete_attendence = createAsyncThunk(
	"attendence/deleteAttendence",
	async (id,thunkApi) => {
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
				`${process.env.NEXT_PUBLIC_API_URL}/attendence/attendence/${id}`,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const post_attendence = createAsyncThunk(
	"attendence/postAttendence",
	async ({ classId, students },thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${localStorage.getItem(
						"study-auth"
					)}`,
				},
			};

			const body = JSON.stringify({ class: classId, students})

			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/attendence/create/`, body,
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
		setAttendence(s,a){
			const x = s.attendence.filter(x=>x._id === a.payload)[0]
			const y = []
			s.data = x
			for (let i = 0; i < x.students?.length; i++) {
				y.push(x.students[i]._id)
			}
			s.data = y
		}
	},
	extraReducers(builder) {
		builder.addCase(get_attendence.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_attendence.fulfilled, (state, actions) => {
			state.isloading = false;
			state.attendence = actions.payload;
		});
		builder.addCase(get_attendence.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});
		
		builder.addCase(post_attendence.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(post_attendence.fulfilled, (state, actions) => {
			state.isloading = false;
			state.attendence = [ ...state.attendence, actions.payload ];
		});
		builder.addCase(post_attendence.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});
		
		builder.addCase(delete_attendence.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(delete_attendence.fulfilled, (state, actions) => {
			state.isloading = false;
			state.attendence = state.attendence.filter(x=>x._id !== actions.payload._id)
		});
		builder.addCase(delete_attendence.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});
	},
});

// Action creators are generated for each case reducer function
export const { setAttendence } = universitySlice.actions;

export default universitySlice.reducer;

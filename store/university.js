import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CODES } from "../assets/data/popup";
import { setPopup } from "./settings";

const initialState = {
	universities: [],
	classes: [],
	class: {},
	university: {},
	isloading: false,
	error: "",
	success: "",
};

export const get_all_universities = createAsyncThunk(
	"university/getAll",
	async (_,thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("study-auth")}`,
				},
			};

			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/universities`,
				config
			);

			if(res.data.length === 0) thunkApi.dispatch(setPopup(CODES.CREATE_UNIVERISTY))

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const create_university = createAsyncThunk(
	"university/createUniversity",
	async (name, thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("study-auth")}`,
				},
			};

			const body = { name: name }

			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/user/university`, body, 
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const create_class = createAsyncThunk(
	"university/createClass",
	async ({name, university, router}, thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("study-auth")}`,
				},
			};

			const body = { name: name, university: university }

			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/class/create`, body, 
				config
			);

			router.push(`/classes/${res.data._id}`)

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const update_class = createAsyncThunk(
	"university/updateClass",
	async ({id, name, university}, thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("study-auth")}`,
				},
			};

			const body = { name: name, university: university }

			const res = await axios.put(
				`${process.env.NEXT_PUBLIC_API_URL}/class/update/${id}`, body, 
				config
			);

			return { _id: id, name: name };
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const delete_class = createAsyncThunk(
	"university/deleteClass",
	async (id, thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("study-auth")}`,
				},
			};

			const res = await axios.delete(
				`${process.env.NEXT_PUBLIC_API_URL}/class/${id}`, 
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const bulk_delete_class = createAsyncThunk(
	"university/bulkDeleteClass",
	async (body, thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("study-auth")}`,
				},
			};

			const res = await axios.put(
				`${process.env.NEXT_PUBLIC_API_URL}/class/delete`, body,
				config
			);

			return {res, body};
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const get_all_classes = createAsyncThunk(
	"university/getAllClasses",
	async (id, thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("study-auth")}`,
				},
			};

			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/class/classes/${id}`, 
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const get_my_classes = createAsyncThunk(
	"university/getMyClasses",
	async (id, thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("study-auth")}`,
				},
			};

			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/class/faculty/classes/${id}`, 
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const get_class_by_id = createAsyncThunk(
	"university/getClassById",
	async (id, thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("study-auth")}`,
				},
			};

			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/class/class/${id}`, 
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
		setClass (state, action) {
			state.class = action.payload
		}
	},
	extraReducers(builder) {
		builder.addCase(get_all_universities.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_all_universities.fulfilled, (state, actions) => {
			state.isloading = false;
            state.universities = actions.payload
            state.university = actions.payload[0]
		});
		builder.addCase(get_all_universities.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(create_university.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(create_university.fulfilled, (state, actions) => {
			state.isloading = false;
			state.university = actions.payload
		});
		builder.addCase(create_university.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(get_all_classes.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_all_classes.fulfilled, (state, actions) => {
			state.isloading = false;
			state.classes = actions.payload
		});
		builder.addCase(get_all_classes.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(get_my_classes.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_my_classes.fulfilled, (state, actions) => {
			state.isloading = false;
			state.classes = actions.payload
		});
		builder.addCase(get_my_classes.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(create_class.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(create_class.fulfilled, (state, actions) => {
			state.isloading = false;
			state.class = actions.payload
		});
		builder.addCase(create_class.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(update_class.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(update_class.fulfilled, (state, actions) => {
			state.isloading = false;
			state.classes = state.classes.filter(c=>{
				if(c._id === actions.payload._id) {
					c.name = actions.payload.name
					return c
				} else
				return c
			})
		});
		builder.addCase(update_class.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(delete_class.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(delete_class.fulfilled, (state, actions) => {
			state.isloading = false;
			state.classes = state.classes.filter(c=>c._id!==actions.payload._id)
		});
		builder.addCase(delete_class.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(bulk_delete_class.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(bulk_delete_class.fulfilled, (state, actions) => {
			state.isloading = false;
			state.classes = state.classes.filter(c=>!actions.payload.body.classes.includes(c._id))
		});
		builder.addCase(bulk_delete_class.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(get_class_by_id.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_class_by_id.fulfilled, (state, actions) => {
			state.isloading = false;
			state.class = actions.payload
		});
		builder.addCase(get_class_by_id.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});
	},
});

// Action creators are generated for each case reducer function
export const { setClass } = universitySlice.actions;

export default universitySlice.reducer;

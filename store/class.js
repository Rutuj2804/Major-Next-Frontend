import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	subjects: [],
	notes: [],
	assignments: [],
	students: [],
	isloading: false,
	error: "",
	success: "",
};

export const get_my_subjects = createAsyncThunk(
	"class/getMySubjects",
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
				`${process.env.NEXT_PUBLIC_API_URL}/class/my`,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const get_my_notes = createAsyncThunk(
	"class/getMyNotes",
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

export const get_my_assignments = createAsyncThunk(
	"class/getMyAssignments",
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
				`${process.env.NEXT_PUBLIC_API_URL}/class/add_assignments`,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const get_all_students = createAsyncThunk(
	"class/getAllStudents",
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
				`${process.env.NEXT_PUBLIC_API_URL}/class/add_students/${id}`,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const get_my_students = createAsyncThunk(
	"class/getMyStudents",
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
				`${process.env.NEXT_PUBLIC_API_URL}/class/add_students/faculty/${id}`,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const manual_add_student_to_class = createAsyncThunk(
	"class/manualAddStudentToClass",
	async ({ id, email }, thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${localStorage.getItem(
						"study-auth"
					)}`,
				},
			};

			const body = { email };

			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/class/manualAdd_students/${id}`,
				body,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const manual_add_faculty_to_class = createAsyncThunk(
	"class/manualAddFacultyToClass",
	async ({ id, email }, thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${localStorage.getItem(
						"study-auth"
					)}`,
				},
			};

			const body = { email };

			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/class/manualAdd_faculty/${id}`,
				body,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const delete_student_from_class = createAsyncThunk(
	"class/deleteStudentFromClass",
	async ({ id, students }, thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${localStorage.getItem(
						"study-auth"
					)}`,
				},
			};

			const body = JSON.stringify({ students });

			const res = await axios.put(
				`${process.env.NEXT_PUBLIC_API_URL}/class/add_students/${id}`,
				body,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const delete_faculty_from_class = createAsyncThunk(
	"class/deleteFacultyFromClass",
	async ({ id, faculty }, thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${localStorage.getItem(
						"study-auth"
					)}`,
				},
			};

			const body = JSON.stringify({ faculty });

			const res = await axios.put(
				`${process.env.NEXT_PUBLIC_API_URL}/class/add_faculty/${id}`,
				body,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const classSlice = createSlice({
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

		builder.addCase(get_my_notes.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_my_notes.fulfilled, (state, actions) => {
			state.isloading = false;
			state.notes = actions.payload;
		});
		builder.addCase(get_my_notes.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

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

		builder.addCase(get_all_students.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_all_students.fulfilled, (state, actions) => {
			state.isloading = false;
			state.students = actions.payload;
		});
		builder.addCase(get_all_students.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(get_my_students.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_my_students.fulfilled, (state, actions) => {
			state.isloading = false;
			state.students = actions.payload;
		});
		builder.addCase(get_my_students.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(manual_add_student_to_class.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(
			manual_add_student_to_class.fulfilled,
			(state, actions) => {
				state.isloading = false;
				state.students = state.students.filter((c) => {
					if (c._id === actions.payload._id) {
						c.students = actions.payload.students;
						c.faculty = actions.payload.faculty;
						return c;
					} else {
						return c;
					}
				});
			}
		);
		builder.addCase(
			manual_add_student_to_class.rejected,
			(state, action) => {
				state.isloading = false;
				state.error = action.payload;
			}
		);

		builder.addCase(manual_add_faculty_to_class.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(
			manual_add_faculty_to_class.fulfilled,
			(state, actions) => {
				state.isloading = false;
				state.students = state.students.filter((c) => {
					if (c._id === actions.payload._id) {
						c.students = actions.payload.students;
						c.faculty = actions.payload.faculty;
						return c;
					} else {
						return c;
					}
				});
			}
		);
		builder.addCase(
			manual_add_faculty_to_class.rejected,
			(state, action) => {
				state.isloading = false;
				state.error = action.payload;
			}
		);

		builder.addCase(delete_student_from_class.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(
			delete_student_from_class.fulfilled,
			(state, actions) => {
				state.isloading = false;
				state.students = state.students.filter((c) => {
					if (c._id === actions.payload._id) {
						c.students = actions.payload.students;
						c.faculty = actions.payload.faculty;
						return c;
					} else {
						return c;
					}
				});
			}
		);
		builder.addCase(
			delete_student_from_class.rejected,
			(state, action) => {
				state.isloading = false;
				state.error = action.payload;
			}
		);

		builder.addCase(delete_faculty_from_class.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(
			delete_faculty_from_class.fulfilled,
			(state, actions) => {
				state.isloading = false;
				state.students = state.students.filter((c) => {
					if (c._id === actions.payload._id) {
						c.students = actions.payload.students;
						c.faculty = actions.payload.faculty;
						return c;
					} else {
						return c;
					}
				});
			}
		);
		builder.addCase(
			delete_faculty_from_class.rejected,
			(state, action) => {
				state.isloading = false;
				state.error = action.payload;
			}
		);
	},
});

// Action creators are generated for each case reducer function
export const {} = classSlice.actions;

export default classSlice.reducer;

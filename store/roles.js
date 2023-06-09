import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	roles: [],
	assigned: [],
	role: {
		roles: {
			name: "",
			students: 2,
			faculty: 2,
			class: 2,
			subjects: 2,
			events: 2,
			utilities: 2,
			assignments: 2,
			roles: 2,
		}
	},
	isloading: false,
	error: "",
	success: "",
};

export const define_new_role = createAsyncThunk(
	"roles/defineRole",
	async ({ name, university }, thunkApi) => {
		try {
			const body = JSON.stringify({
				name,
				university,
				students: 2,
				faculty: 2,
				class: 2,
				subjects: 0,
				events: 0,
				utilities: 0,
				assignments: 0,
				roles: 2,
			});

			const config = {
				headers: {
					"Content-type": "application/json",
                    "Authorization":`Bearer ${localStorage.getItem("study-auth")}`,
				},
			};

			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/administration/roles/define`,
				body,
				config
			);
			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const update_role_by_id = createAsyncThunk(
	"roles/updateRole",
	async ({ formData, id }, thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
                    "Authorization":`Bearer ${localStorage.getItem("study-auth")}`,
				},
			};

			const res = await axios.put(
				`${process.env.NEXT_PUBLIC_API_URL}/administration/roles/update/${id}`,
				formData,
				config
			);
			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const get_my_role = createAsyncThunk(
	"roles/getMyRole",
	async (id, thunkApi) => {
		try {

			const config = {
				headers: {
					"Content-type": "application/json",
                    "Authorization":`Bearer ${localStorage.getItem("study-auth")}`,
				},
			};

			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/administration/my/university/${id}`,
				config
			);
			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const get_all_roles_assigned = createAsyncThunk(
	"roles/getAllRolesAssigned",
	async (id, thunkApi) => {
		try {

			const config = {
				headers: {
					"Content-type": "application/json",
                    "Authorization":`Bearer ${localStorage.getItem("study-auth")}`,
				},
			};

			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/administration/assign/${id}`,
				config
			);
			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const get_all_roles = createAsyncThunk(
	"roles/getAllRoles",
	async (id, thunkApi) => {
		try {

			const config = {
				headers: {
					"Content-type": "application/json",
                    "Authorization":`Bearer ${localStorage.getItem("study-auth")}`,
				},
			};

			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/administration/roles/university/${id}`,
				config
			);
			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const assign_role = createAsyncThunk(
	"roles/assignRole",
	async ({id, user, role}, thunkApi) => {
		try {

			const config = {
				headers: {
					"Content-type": "application/json",
                    "Authorization":`Bearer ${localStorage.getItem("study-auth")}`,
				},
			};

            const body = JSON.stringify({ user, role })

			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/administration/assign/${id}`, body,
				config
			);
			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const delete_assigned_role = createAsyncThunk(
	"roles/deleteAssignedRole",
	async (id, thunkApi) => {
		try {

			const config = {
				headers: {
					"Content-type": "application/json",
                    "Authorization":`Bearer ${localStorage.getItem("study-auth")}`,
				},
			};

			const res = await axios.delete(
				`${process.env.NEXT_PUBLIC_API_URL}/administration/assigned/delete/${id}`,
				config
			);
			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout(state) {
			localStorage.removeItem("study-auth");
			state.isAuthenticated = false;
		},
	},
	extraReducers(builder) {
		builder.addCase(define_new_role.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(define_new_role.fulfilled, (state, actions) => {
			state.isloading = false;
            state.roles = [...state.roles, actions.payload]
		});
		builder.addCase(define_new_role.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

        builder.addCase(get_my_role.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_my_role.fulfilled, (state, actions) => {
			state.isloading = false;
            state.role = actions.payload
		});
		builder.addCase(get_my_role.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

        builder.addCase(get_all_roles_assigned.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_all_roles_assigned.fulfilled, (state, actions) => {
			state.isloading = false;
            state.assigned = actions.payload
		});
		builder.addCase(get_all_roles_assigned.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

        builder.addCase(get_all_roles.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_all_roles.fulfilled, (state, actions) => {
			state.isloading = false;
            state.roles = actions.payload
		});
		builder.addCase(get_all_roles.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

        builder.addCase(assign_role.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(assign_role.fulfilled, (state, actions) => {
			state.isloading = false;
			state.assigned = [...state.assigned, actions.payload]
		});
		builder.addCase(assign_role.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

        builder.addCase(update_role_by_id.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(update_role_by_id.fulfilled, (state, actions) => {
			state.isloading = false;
			state.success = "Successfully updated the role"
		});
		builder.addCase(update_role_by_id.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

        builder.addCase(delete_assigned_role.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(delete_assigned_role.fulfilled, (state, actions) => {
			state.isloading = false;
			state.assigned = state.assigned.filter(a=>a._id!==actions.payload._id)
		});
		builder.addCase(delete_assigned_role.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});
	},
});

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions;

export default authSlice.reducer;

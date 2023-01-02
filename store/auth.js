import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	id: "",
	isAuthenticated: false,
	email: "",
	firstname: "",
	lastname: "",
	isloading: false,
	error: "",
	success: "",
};

export const login_user = createAsyncThunk(
	"auth/loginUser",
	async ({ email, password, firstname, lastname }, thunkApi) => {
		try {
			const body = JSON.stringify({
				email,
				password,
				firstname,
				lastname,
			});

			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/authentication/signin`,
				body,
				config
			);
			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const register_user = createAsyncThunk(
	"auth/registerUser",
	async ({ email, password, firstname, lastname }, thunkApi) => {
		try {
			const body = JSON.stringify({
				email,
				password,
				firstname,
				lastname,
			});

			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/authentication/signup`,
				body,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const check_authentication = createAsyncThunk(
	"auth/checkAuthentication",
	async (token, thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};

			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/me`,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.messsage);
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
		builder.addCase(login_user.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(login_user.fulfilled, (state, actions) => {
			state.isloading = false;
			state.isAuthenticated = true;
			localStorage.setItem("study-auth", actions.payload.token);
		});
		builder.addCase(login_user.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
			state.isAuthenticated = false;
		});

		builder.addCase(check_authentication.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(check_authentication.fulfilled, (state, actions) => {
			state.isloading = false;
			state.firstname = actions.payload.firstname;
			state.lastname = actions.payload.lastname;
			state.email = actions.payload.email;
			state.id = actions.payload._id;
			state.isAuthenticated = true;
		});
		builder.addCase(check_authentication.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
			state.isAuthenticated = false;
		});

		builder.addCase(register_user.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(register_user.fulfilled, (state, actions) => {
			state.isloading = false;
			state.isAuthenticated = true;
			localStorage.setItem("study-auth", actions.payload.token);
		});
		builder.addCase(register_user.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});
	},
});

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions;

export default authSlice.reducer;

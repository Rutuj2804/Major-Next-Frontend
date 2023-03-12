import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	rooms: [],
	users: [],
	selected_users: [],
	room: {},
	messages: [],
	isloading: false,
	error: "",
	success: "",
};

export const get_rooms = createAsyncThunk(
	"chat/getRooms",
	async (_, thunkApi) => {
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
				`${process.env.NEXT_PUBLIC_API_URL}/chat/room`,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const get_users = createAsyncThunk(
	"chat/getUsers",
	async (username, thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${localStorage.getItem(
						"study-auth"
					)}`,
				},
			};

            const body = JSON.stringify({ username })

			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/authentication/users`, body,
				config
			);

			return res.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const create_rooms = createAsyncThunk(
	"chat/createRooms",
	async ({ name, users }, thunkApi) => {
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${localStorage.getItem(
						"study-auth"
					)}`,
				},
			};

            let body;

            if(users.length > 1) {
                body = JSON.stringify({ users, name })
            } else {
                body = JSON.stringify({ users })
            }

			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/chat/room`, body,
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
        setSelectedUsers(s, a) {
            s.selected_users = a.payload
        }
    },
	extraReducers(builder) {
		builder.addCase(get_rooms.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_rooms.fulfilled, (state, actions) => {
			state.isloading = false;
			state.rooms = actions.payload;
		});
		builder.addCase(get_rooms.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(get_users.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(get_users.fulfilled, (state, actions) => {
			state.isloading = false;
			state.users = actions.payload;
		});
		builder.addCase(get_users.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});

		builder.addCase(create_rooms.pending, (state) => {
			state.isloading = true;
		});
		builder.addCase(create_rooms.fulfilled, (state, actions) => {
			state.isloading = false;
			state.rooms = [ ...state.rooms, actions.payload ];
		});
		builder.addCase(create_rooms.rejected, (state, action) => {
			state.isloading = false;
			state.error = action.payload;
		});
	},
});

// Action creators are generated for each case reducer function
export const {setSelectedUsers} = universitySlice.actions;

export default universitySlice.reducer;

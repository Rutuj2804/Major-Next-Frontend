import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_rooms, get_users, setSelectedUsers } from "../../store/chat";
import { setPopup } from "../../store/settings";

const AddGroups = () => {
	const [name, setName] = useState("");
	const [temporaryName, setTemporaryName] = useState("");
	const [temporarySelection, setTemporarySelection] = useState("");
	const [users, setUsers] = useState([]);

	const users_from_server = useSelector((state) => state.chat.users);

	const dispatch = useDispatch();
	console.log(users);
	const router = useRouter();

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(create_rooms({ name, router, users }));
		setName("");
		dispatch(setPopup(null));
	};

	const handleChange = (e) => {
		setTemporaryName(e.target.value);
		if (e.target.value) {
			dispatch(get_users(e.target.value));
		}
	};

	return (
		<div className="addClass__Wrapper" onClick={(e) => e.stopPropagation()}>
			<div className="top">
				<h4>Add Group</h4>
				<IconButton onClick={() => dispatch(setPopup(null))}>
					<XMarkIcon className="h-5 w-5 text-black" />
				</IconButton>
			</div>
			<div className="bottom">
				<form onSubmit={onSubmit}>
					<div className="inputDiv">
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
						<label>Group Name</label>
					</div>
					<div className="inputDiv">
						<input
							type="text"
							value={temporaryName}
							onChange={(e) => handleChange(e)}
							required
						/>
						<label>Search User</label>
					</div>
					<div className="inputDiv">
						<select
							onChange={(e) => {
								setTemporaryName("");
							}}
						>
							{users_from_server.map((v) => (
								<option
									key={v._id}
								>
									{v.firstname + " " + v.lastname}
								</option>
							))}
						</select>
					</div>
					<div className="users__result">
						{users.map((v) => (
							<div className="box">
								{v.firstname + " " + v.lastname}
							</div>
						))}
					</div>
					<div>
						<Button type="submit">Create</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddGroups;

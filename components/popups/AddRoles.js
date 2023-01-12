import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { define_new_role } from "../../store/roles";
import { setPopup } from "../../store/settings";

const AddRoles = () => {
	const [name, setName] = useState("");

	const university = useSelector((state) => state.university.university._id);

	const dispatch = useDispatch();

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(define_new_role({ name, university }));
        setName("")
        dispatch(setPopup(null))
	};

	return (
		<div className="addClass__Wrapper" onClick={(e) => e.stopPropagation()}>
			<div className="top">
				<h4>Add Class</h4>
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
						<label>Role Name</label>
					</div>
					<div>
						<Button type="submit">Create Role</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddRoles;

import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assign_role, get_all_roles } from "../../store/roles";
import { setPopup } from "../../store/settings";

const AssignRole = () => {
	const [name, setName] = useState("");
	
	const university = useSelector((state) => state.university.university._id);
	const roles = useSelector((state) => state.roles.roles);

	const [roleID, setRoleID] = useState(roles[0]?._id);
	
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(get_all_roles(university));
	}, [university]);

	useEffect(()=>{
		setRoleID(roles[0]?._id)
	}, [roles])

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(assign_role({ user: name, role: roleID, id: university }));
        setName("")
        dispatch(setPopup(null))
	};

	return (
		<div className="addClass__Wrapper" onClick={(e) => e.stopPropagation()}>
			<div className="top">
				<h4>Assign Role</h4>
				<IconButton onClick={() => dispatch(setPopup(null))}>
					<XMarkIcon className="h-5 w-5 text-black" />
				</IconButton>
			</div>
			<div className="bottom">
				<form onSubmit={onSubmit}>
					<div className="inputDiv">
						<input
							type="email"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
						<label>Student Email</label>
					</div>
					<div className="inputDiv">
						<select onChange={e=>setRoleID(e.target.value)} value={roleID}>
							{
								roles.map(c=>(
									<option key={c._id} value={c._id}>{c.name}</option>
								))
							}
						</select>
					</div>
					<div>
						<Button type="submit">Add student</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AssignRole;

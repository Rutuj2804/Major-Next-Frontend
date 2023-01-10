import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopup } from "../../store/settings";
import { create_class } from "../../store/university";

const AddClass = () => {
	const [name, setName] = useState("");

	const university = useSelector((state) => state.university.university._id);

	const dispatch = useDispatch();

    const router = useRouter()

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(create_class({ name, university, router }));
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
						<label>Class Name</label>
					</div>
					<div>
						<Button type="submit">Create</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddClass;

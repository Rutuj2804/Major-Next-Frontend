import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_all_students, manual_add_student_to_class } from "../../store/class";
import { setPopup } from "../../store/settings";
import { add_subject } from "../../store/subjects";

const AddStudent = () => {
	const [name, setName] = useState("");
	
	const university = useSelector((state) => state.university.university._id);
	const students = useSelector((state) => state.class.students);

	const [classId, setClassId] = useState(students[0]?._id);
	
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(get_all_students(university));
	}, [university]);

	useEffect(()=>setClassId(students[0]?._id), [students])

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(add_subject({ name: name, id: classId }));
        setName("")
        dispatch(setPopup(null))
	};

	return (
		<div className="addClass__Wrapper" onClick={(e) => e.stopPropagation()}>
			<div className="top">
				<h4>Add Subject</h4>
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
						<label>Subject Name</label>
					</div>
					<div className="inputDiv">
						<select onChange={e=>setClassId(e.target.value)} value={classId}>
							{
								students.map(c=>(
									<option key={c._id} value={c._id}>{c.name}</option>
								))
							}
						</select>
					</div>
					<div>
						<Button type="submit">Add subject</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddStudent;

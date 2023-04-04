import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { bulk_add_student_to_class, get_all_students } from "../../store/class";
import { setPopup } from "../../store/settings";

const BulkAddStudent = () => {
	const [file, setFile] = useState(null);
	
	const university = useSelector((state) => state.university.university._id);
	const students = useSelector((state) => state.class.students);

	const [classId, setClassId] = useState(students[0]._id);
	
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(get_all_students(university));
	}, [university]);

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(bulk_add_student_to_class({ file: file, id: classId }));
        setFile(null)
        dispatch(setPopup(null))
	};

	const onDrop = useCallback(acceptedFiles => {
		// Do something with the files
		setFile(acceptedFiles[0]);
	}, [])
	const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

	return (
		<div className="addClass__Wrapper" onClick={(e) => e.stopPropagation()}>
			<div className="top">
				<h4>Bulk Add Student</h4>
				<IconButton onClick={() => dispatch(setPopup(null))}>
					<XMarkIcon className="h-5 w-5 text-black" />
				</IconButton>
			</div>
			<div className="bottom">
				<form onSubmit={onSubmit}>
					<div className="dragDiv" {...getRootProps()}>
						<input {...getInputProps()} />
						{
							isDragActive ?
							<p>Drop the .csv file here ...</p> :
							<p>Drag &apos;n&apos; drop .csv file here, or click to select file</p>
						}
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
					<div className="flex justify-between items-center">
						<Button type="submit">Add student</Button>
						<Button>Download CSV</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default BulkAddStudent;

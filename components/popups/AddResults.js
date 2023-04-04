import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	get_all_students,
} from "../../store/class";
import { setPopup } from "../../store/settings";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { get_subjects_from_class } from "../../store/subjects";
import { post_notes_to_a_subject } from "../../store/notes";
import { post_results } from "../../store/results";

const AddResults = () => {

	const university = useSelector((state) => state.university.university._id);
	const students = useSelector((state) => state.class.students);

	const subjects = useSelector((state) => state.subjects.subjects);

	const [classId, setClassId] = useState(students[0]?._id);

	const [subjectId, setSubjectId] = useState();
	const [file, setFile] = useState(null);

	const [name, setName] = useState("")

	const dispatch = useDispatch();

	useEffect(() => setClassId(students[0]?._id), [students]);

	useEffect(() => {
		dispatch(get_all_students(university));
	}, [university]);

	useEffect(()=>{
		if(classId){
			dispatch(get_subjects_from_class(classId))
		}
	}, [classId])

	useEffect(()=>{
		if(subjects)
		setSubjectId(subjects[0]?._id)
	}, [subjects])

	const onSubmit = (e) => {
		e.preventDefault();
		if(file){
			dispatch(post_results({ id: university, subjectID: subjectId, file: file, classID: classId, name: name  }));
			dispatch(setPopup(null));
		}
	};

	const onDrop = useCallback((acceptedFiles) => {
		// Do something with the files
		setFile(acceptedFiles[0]);
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	});

	return (
		<div className="addClass__Wrapper" onClick={(e) => e.stopPropagation()}>
			<div className="top">
				<h4>Add Results</h4>
				<IconButton onClick={() => dispatch(setPopup(null))}>
					<XMarkIcon className="h-5 w-5 text-black" />
				</IconButton>
			</div>
			<div className="bottom">
				<form onSubmit={onSubmit}>
					<div className="inputDiv">
						<input
							type="text"
							onChange={(e) => setName(e.target.value)}
							value={name}
							placeholder="Enter Result title"
							required
						/>
					</div>
					<div className="dragDiv" {...getRootProps()}>
						<input {...getInputProps()} />
						{isDragActive ? (
							<p>Drop the .csv file here ...</p>
						) : (
							<p>
								Drag &apos;n&apos; drop .csv file here, or click to select
								file
							</p>
						)}
					</div>
					<div className="inputDiv">
						<select
							onChange={(e) => setClassId(e.target.value)}
							value={classId}
						>
							{students.map((c) => (
								<option key={c._id} value={c._id}>
									{c.name}
								</option>
							))}
						</select>
					</div>
					<div className="inputDiv">
						<select
							onChange={(e) => setSubjectId(e.target.value)}
							value={subjectId}
						>
							{subjects.map((c) => (
								<option key={c._id} value={c._id}>
									{c.name}
								</option>
							))}
						</select>
					</div>
					<div>
						<Button type="submit">Add Result</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddResults;

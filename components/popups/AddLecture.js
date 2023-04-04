import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_all_students } from "../../store/class";
import { setPopup } from "../../store/settings";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { get_subjects_from_class } from "../../store/subjects";
import { post_lecture } from "../../store/lecture";

const AddLecture = () => {
	const university = useSelector((state) => state.university.university._id);
	const students = useSelector((state) => state.class.students);

	const subjects = useSelector((state) => state.subjects.subjects);

	const [classId, setClassId] = useState(students[0]?._id);

	const [subjectId, setSubjectId] = useState();
	const [file, setFile] = useState(null);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [error, setError] = useState("");

	const dispatch = useDispatch();

	useEffect(() => setClassId(students[0]?._id), [students]);

	useEffect(() => {
		dispatch(get_all_students(university));
	}, [university]);

	useEffect(() => {
		if (classId) {
			dispatch(get_subjects_from_class(classId));
		}
	}, [classId]);

	useEffect(() => {
		if (subjects) setSubjectId(subjects[0]?._id);
	}, [subjects]);

	const onSubmit = (e) => {
		e.preventDefault();
		if(file){
			dispatch(
				post_lecture({ classID: classId, subjectID: subjectId, file, title, description })
			);
			dispatch(setPopup(null));
		}
	};

	const onDrop = useCallback((acceptedFiles) => {
		if(!acceptedFiles[0].type.includes("video"))
		setError("Please select a video file")
		else {
			setError("")
			setFile(acceptedFiles[0]);
		}
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	});

	return (
		<div className="addClass__Wrapper" onClick={(e) => e.stopPropagation()}>
			<div className="top">
				<h4>Add Lecture</h4>
				<IconButton onClick={() => dispatch(setPopup(null))}>
					<XMarkIcon className="h-5 w-5 text-black" />
				</IconButton>
			</div>
			<div className="bottom">
				{
					error ? <p className="text-red-500">{error}</p> : null
				}
				<form onSubmit={onSubmit}>
					<div className="inputDiv">
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
							placeholder="Lecture Title"
						/>
					</div>
					<div className="inputDiv">
						<textarea
							type="text"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
							placeholder="Lecture Description"
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
						<Button disabled={error} type="submit">Add lecture</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddLecture;

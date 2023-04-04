import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopup } from "../../store/settings";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { post_events } from "../../store/events";

const AddEvent = () => {
	const university = useSelector((state) => state.university.university._id);

	const [file, setFile] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const dispatch = useDispatch();

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(
			post_events({
				university: university,
				files: file,
				title,
				description,
			})
		);
		dispatch(setPopup(null));
	};

	const onDrop = useCallback((acceptedFiles) => {
		setFile(acceptedFiles);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	});

	return (
		<div className="addClass__Wrapper" onClick={(e) => e.stopPropagation()}>
			<div className="top">
				<h4>Add Event</h4>
				<IconButton onClick={() => dispatch(setPopup(null))}>
					<XMarkIcon className="h-5 w-5 text-black" />
				</IconButton>
			</div>
			<div className="bottom">
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
					<div>
						<Button type="submit">Add Event</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddEvent;

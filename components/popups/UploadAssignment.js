import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopup } from "../../store/settings";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { submit_assignments } from "../../store/assignments";

const UploadAssignment = () => {
	const assignmentID = useSelector((state) => state.assignments.id);
	const [file, setFile] = useState(null);

	const dispatch = useDispatch();

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(
			submit_assignments({
				id: assignmentID,
				file: file,
			})
		);
		dispatch(setPopup(null));
	};

	const onDrop = useCallback((acceptedFiles) => {
		setFile(acceptedFiles[0]);
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	});

	return (
		<div className="addClass__Wrapper" onClick={(e) => e.stopPropagation()}>
			<div className="top">
				<h4>Upload Assignment</h4>
				<IconButton onClick={() => dispatch(setPopup(null))}>
					<XMarkIcon className="h-5 w-5 text-black" />
				</IconButton>
			</div>
			<div className="bottom">
				<form onSubmit={onSubmit}>
					<div className="dragDiv" {...getRootProps()}>
						<input {...getInputProps()} />
						{isDragActive ? (
							<p>Drop the .csv file here ...</p>
						) : (
							<p>
								Drag 'n' drop .csv file here, or click to select
								file
							</p>
						)}
					</div>
					<div>
						<Button type="submit">Upload assignment</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UploadAssignment;

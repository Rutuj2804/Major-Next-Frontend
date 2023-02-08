import Head from "next/head";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setError,
	setHeader,
	setPopup,
	setSuccess,
} from "../../store/settings";
import Paper from "../../components/paper";
import { ArrowRightIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import LecturePost from "../../components/cards/LecturePost";
import { get_all_classes } from "../../store/university";
import { Button } from "@mui/material";
import { CODES } from "../../assets/data/popup";
import {
	get_lecture,
	setLectureError,
	setLectureId,
	setLectureSuccess,
} from "../../store/lecture";
import moment from "moment/moment";

const Lectures = () => {
	const dispatch = useDispatch();
	const university = useSelector((state) => state.university.university._id);
	const classData = useSelector((state) => state.university.classes);
	const lectureData = useSelector((state) => state.lecture.lectures);
	const success = useSelector((state) => state.lecture.success);
	const error = useSelector((state) => state.lecture.error);

	const [selectedClass, setSelectedClass] = useState(classData[0]);

	useEffect(() => {
		if (success) dispatch(setSuccess(success));

		dispatch(setLectureSuccess(""));
	}, [success]);

	useEffect(() => {
		if (error) dispatch(setError(error));

		dispatch(setLectureError(""));
	}, [error]);

	useEffect(() => {
		setSelectedClass(classData[0]);
	}, [classData]);

	useEffect(() => {
		if (selectedClass) dispatch(get_lecture({ id: selectedClass._id }));
	}, [selectedClass]);

	useEffect(() => {
		dispatch(setHeader("Lectures"));
	}, []);

	useEffect(() => {
		dispatch(get_all_classes(university));
	}, [university]);

	return (
		<div>
			<Head>
				<title>Lectures</title>
			</Head>
			<main className="roles__Wrapper">
				<div className="flex justify-between items-center mt-4 breadcrumps">
					<div></div>
					<div className="flex gap-4">
						<Button
							startIcon={
								<PlusIcon className="h-5 w-5 text-white" />
							}
							onClick={() => {
								dispatch(setPopup(CODES.ADD_LECTURE));
								dispatch(setLectureId(selectedClass._id));
							}}
						>
							Add Lecture
						</Button>
					</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
					<div className="roles_definition">
						<Paper className="roles_sticky">
							{classData.map((e) => (
								<div
									className={
										selectedClass?.name === e.name
											? "role bg-[#efefef]"
											: "role"
									}
									key={e._id}
									onClick={() => setSelectedClass(e)}
								>
									<ArrowRightIcon className="h-5 w-5 text-black" />
									<h4>{e.name}</h4>
								</div>
							))}
						</Paper>
					</div>
					<div className="md:col-span-2 lg:col-span-2">
						{lectureData.map((v) => (
							<LecturePost
								key={v._id}
								title={v.title}
								description={v.description}
								user={v.user.firstname + " " + v.user.lastname}
								id={v._id}
								subject={v.subjectID.name}
								time={moment(v.createdAt).format(
									"MMMM Do YYYY, h:mm:ss a"
								)}
							/>
						))}
					</div>
				</div>
			</main>
		</div>
	);
};

export default Lectures;

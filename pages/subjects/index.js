import { PlusIcon } from "@heroicons/react/24/solid";
import { Button } from "@mui/material";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CODES } from "../../assets/data/popup";
import Paper from "../../components/paper";
import { get_my_subjects } from "../../store/class";
import { setHeader, setPopup } from "../../store/settings";
import Cards from "./Cards";

const Subjects = () => {
	const dispatch = useDispatch();

	const subjects = useSelector((state) => state.class.subjects);

	useEffect(() => {
		dispatch(setHeader("Subjects"));
		dispatch(get_my_subjects());
	}, []);

	return (
		<main>
			<Head>
				<title>Utilities</title>
			</Head>
			<div className="flex justify-between items-center mt-4 breadcrumps">
				<div></div>
				<div className="flex gap-4">
					<Button
						startIcon={<PlusIcon className="h-5 w-5 text-white" />}
						onClick={() => dispatch(setPopup(CODES.ADD_SUBJECT))}
					>
						Add Subject
					</Button>
				</div>
			</div>
			<div className="mt-4">
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{subjects.map((s) => (
						<Paper key={s._id}>
							<Cards name={s.name} id={s._id} />
						</Paper>
					))}
				</div>
			</div>
		</main>
	);
};

export default Subjects;

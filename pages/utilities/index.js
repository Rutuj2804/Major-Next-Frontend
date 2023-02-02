import React, { useEffect } from "react";
import {
	BanknotesIcon,
	CalendarIcon,
	CreditCardIcon,
	EnvelopeIcon,
	PlusIcon,
} from "@heroicons/react/24/solid";
import Cards from "../../components/cards";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { setHeader } from "../../store/settings";
import MyResponsivePie from "../../components/charts/NivoPieChart";
import MyResponsiveBar from "../../components/charts/NivoBarChart";
import Paper from "../../components/paper";
import NotesCard from "./NotesCard";
import SubjectCard from "../subjects/Cards";
import { get_my_notes, get_my_subjects } from "../../store/class";
import { Button } from "@mui/material";
import { CODES } from "../../assets/data/popup";

const cardsData = [
	{
		count: 299,
		name: "Meetings",
		percentage: 29,
		isDown: false,
		icon: <CreditCardIcon className="h-10 w-10 text-green-500" />,
	},
	{
		count: 20,
		name: "Events",
		percentage: 10,
		isDown: true,
		icon: <CalendarIcon className="h-10 w-10 text-red-500" />,
	},
	{
		count: 587,
		name: "Emails",
		percentage: 17,
		isDown: false,
		icon: <EnvelopeIcon className="h-10 w-10 text-blue-500" />,
	},
	{
		count: "188k",
		name: "Spendings",
		percentage: 50,
		isDown: true,
		icon: <BanknotesIcon className="h-10 w-10 text-yellow-500" />,
	},
];

const Utilities = () => {
	const dispatch = useDispatch();

	const subjects = useSelector((state) => state.class.subjects);

	useEffect(() => {
		dispatch(setHeader("Utilities"));
		dispatch(get_my_notes());
		dispatch(get_my_subjects());
	}, []);

	return (
		<div>
			<Head>
				<title>Utilities</title>
			</Head>
			<main>
				<div className="flex justify-between items-center mt-4 breadcrumps">
					<div></div>
					<div className="flex gap-4">
						<Button
							startIcon={
								<PlusIcon className="h-5 w-5 text-white" />
							}
							onClick={() =>
								dispatch(setPopup(CODES.ADD_STUDENT))
							}
						>
							Add Notes
						</Button>
					</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
					{subjects.map((s) => (
						<Paper key={s._id}>
							<SubjectCard name={s.name} id={s._id} />
						</Paper>
					))}
				</div>
			</main>
		</div>
	);
};

export default Utilities;

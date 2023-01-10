import React, { useEffect } from "react";
import {
	BanknotesIcon,
	CalendarIcon,
	CreditCardIcon,
	EnvelopeIcon,
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

	const subjects = useSelector(state=>state.class.subjects)

	useEffect(() => {
		dispatch(setHeader("Utilities"));
		dispatch(get_my_notes())
		dispatch(get_my_subjects())
	}, []);

	return (
		<div>
			<Head>
				<title>Utilities</title>
			</Head>
			<main>
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
					{cardsData.map((c, i) => (
						<Cards
							key={i}
							count={c.count}
							name={c.name}
							percentage={c.percentage}
							isDown={c.isDown}
							icon={c.icon}
						/>
					))}
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
					<Paper className="h-[500px]">
						<MyResponsivePie />
					</Paper>
					<Paper className="h-[500px]">
						<MyResponsiveBar />
					</Paper>
					<Paper className="utilities__Scroll h-[500px]">
						<NotesCard />
						<NotesCard />
						<NotesCard />
						<NotesCard />
						<NotesCard />
						<NotesCard />
						<NotesCard />
						<NotesCard />
					</Paper>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{
						subjects.map(s=>(
							<Paper key={s._id}>
								<SubjectCard name={s.name} id={s._id} />
							</Paper>
						))
					}
				</div>
			</main>
		</div>
	);
};

export default Utilities;

import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHeader } from "../../store/settings";
import EventCard from "./EventCard";

const Events = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setHeader("Events"));
	}, []);

	return (
		<div>
			<Head>
				<title>Events</title>
			</Head>
			<main>
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 mt-4">
					<div className="md:col-span-1 lg:col-span-1"></div>
					<div className="md:col-span-2 lg:col-span-3">
						<EventCard />
						<EventCard />
						<EventCard />
					</div>
					<div className="md:col-span-1 lg:col-span-1"></div>
				</div>
			</main>
		</div>
	);
};

export default Events;

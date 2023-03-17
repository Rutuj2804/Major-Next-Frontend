import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@mui/material";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, setHeader, setPopup, setSuccess } from "../../store/settings";
import EventCard from "./EventCard";
import { CODES } from "../../assets/data/popup";
import { get_events, setEventsError, setEventsSuccess } from "../../store/events";
import moment from "moment/moment";

const Events = () => {
	const dispatch = useDispatch();

	const id = useSelector((state) => state.university.university._id);

	const events = useSelector((state) => state.events.events);

	useEffect(() => {
		dispatch(setHeader("Events"));
	}, []);

	useEffect(()=>{
		if(id)
		dispatch(get_events({ id }));
	}, [id])

	const success = useSelector((state) => state.events.success);
	const error = useSelector((state) => state.events.error);

	useEffect(() => {
		if (success) dispatch(setSuccess(success));

		dispatch(setEventsSuccess(""));
	}, [success]);

	useEffect(() => {
		if (error) dispatch(setError(error));

		dispatch(setEventsError(""));
	}, [error]);

	return (
		<div>
			<Head>
				<title>Events</title>
			</Head>
			<main>
				<div className="flex justify-between items-center mt-4 breadcrumps">
					<div></div>
					<div className="flex gap-4">
						<Button
							startIcon={
								<PlusIcon className="h-5 w-5 text-white" />
							}
							onClick={() => dispatch(setPopup(CODES.ADD_EVENT))}
						>
							Add Event
						</Button>
					</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 mt-4">
					<div className="md:col-span-1 lg:col-span-1"></div>
					<div className="md:col-span-2 lg:col-span-3">
						{events.map((v) => (
							<EventCard
								title={v.title}
								description={v.description}
								user={v.user.firstname + " " + v.user.lastname}
								time={moment(v.createdAt).format(
									"MMMM Do YYYY, h:mm:ss a"
								)}
								files={v.files}
								key={v._id}
								id={v._id}
							/>
						))}
					</div>
					<div className="md:col-span-1 lg:col-span-1"></div>
				</div>
			</main>
		</div>
	);
};

export default Events;

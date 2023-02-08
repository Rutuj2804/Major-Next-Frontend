import { PlayIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Avatar, Button, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { delete_lecture } from "../../store/lecture";
import Paper from "../paper";

const LecturePost = ({ title, time, description, user, id, subject }) => {

	const router = useRouter()

	const dispatch = useDispatch()

	return (
		<Paper className="mb-3">
			<div className="lecturePost">
				<div className="header">
					<div className="left">
						<Avatar />
						<div className="user">
							<h6>{user}</h6>
							<p>{time}</p>
						</div>
					</div>
					<div className="right">
						<IconButton onClick={()=>dispatch(delete_lecture({ id }))}>
							<TrashIcon className="h-5 w-5 text-red-500" />
						</IconButton>
					</div>
				</div>
				<div className="lecture__body">
					<div className="left">
						<span className="subject">{subject}</span>
						<h4>Title: {title}</h4>
						<p>
							<span>Description:</span> {description}
						</p>
					</div>
					<div className="right">
						<Button startIcon={<PlayIcon className="h-5 w-5 text-white" />} onClick={()=>router.push(`/lectures/${id}`)}>Start Lecture</Button>
					</div>
				</div>
			</div>
		</Paper>
	);
};

export default LecturePost;

import { XMarkIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@mui/material";
import moment from "moment/moment";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_single_results } from "../../store/results";
import { setPopup } from "../../store/settings";

const AddResults = () => {

	const resultID = useSelector((state) => state.results.id);
	const result = useSelector((state) => state.results.result);

	const dispatch = useDispatch();

	useEffect(()=>{
		dispatch(get_single_results(resultID))
	}, [resultID])

	return (
		<div className="addClass__Wrapper" onClick={(e) => e.stopPropagation()}>
			<div className="top">
				<h4>Results</h4>
				<IconButton onClick={() => dispatch(setPopup(null))}>
					<XMarkIcon className="h-5 w-5 text-black" />
				</IconButton>
			</div>
			<div className="bottom">
				Result:&nbsp;&nbsp; <strong>{result.result.name}</strong>
				<div className="flex justify-between items-center">
					<p>First Name:&nbsp;&nbsp; <strong>{result.user.firstname}</strong></p><br/><br/>
					<p>Last Name:&nbsp;&nbsp; <strong>{result.user.lastname}</strong></p>
				</div>
				<p>Email:&nbsp;&nbsp; <strong>{result.user.email}</strong></p><br/>
				<p>Marks Obtained:&nbsp;&nbsp; <strong className="text-[30px]"><span className="text-green-500">{`${result.marks}`}</span> {`/ ${result.maxMarks}`}</strong></p><br/>
				<p className="text-gray-700 text-sm">Posted on {moment(result.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
			</div>
		</div>
	);
};

export default AddResults;

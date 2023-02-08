import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { setError, setSuccess } from "../../store/settings";

const Success = ({ msg, isError }) => {

	const dispatch = useDispatch()

	const handleContinue = () => {
		dispatch(setSuccess(""))
		dispatch(setError(""))
	}

	return (
		<div className="success__Wrapper">
			<div className="box">
				<div className="icon">
					<CheckCircleIcon className={`h-20 w-20 text-${isError ? "red": "green"}-500`} />
				</div>
				<div className="msg">
					<p>{msg}</p>
                    <Button className={`bg-${isError ? "red": "green"}-500`} onClick={()=>handleContinue()}>Continue</Button>
				</div>
			</div>
		</div>
	);
};

export default Success;

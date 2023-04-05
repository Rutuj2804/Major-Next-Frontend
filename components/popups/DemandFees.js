import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_all_students } from "../../store/class";
import { setPopup } from "../../store/settings";
import { get_subjects_from_class } from "../../store/subjects";
import { post_fees_demand } from "../../store/fees";

const DemandFees = () => {
    const university = useSelector((state) => state.university.university._id);
    const students = useSelector((state) => state.class.students);

    const [classId, setClassId] = useState(students[0]?._id);

    const [title, setTitle] = useState("");
	const [amount, setAmount] = useState(0)
    const [error, setError] = useState("");

    const dispatch = useDispatch();

    useEffect(() => setClassId(students[0]?._id), [students]);

    useEffect(() => {
        dispatch(get_all_students(university));
    }, [university]);

    const onSubmit = (e) => {
        e.preventDefault();
		if(amount < 0) {
			setError ("Amount must be more than 0")
		} else {
			dispatch(
				post_fees_demand({
					classID: classId,
					title,
					amount,
					university
				})
			);
			dispatch(setPopup(null));
		}
    };

    return (
        <div className="addClass__Wrapper" onClick={(e) => e.stopPropagation()}>
            <div className="top">
                <h4>Demand Fees</h4>
                <IconButton onClick={() => dispatch(setPopup(null))}>
                    <XMarkIcon className="h-5 w-5 text-black" />
                </IconButton>
            </div>
            <div className="bottom">
                {error ? <p className="text-red-500">{error}</p> : null}
                <form onSubmit={onSubmit}>
                    <div className="inputDiv">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="Fee Title"
                        />
                    </div>
                    <div className="inputDiv">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            placeholder="Fee Amount"
							min={0}
                        />
                    </div>
                    <div className="inputDiv">
                        <select
                            onChange={(e) => setClassId(e.target.value)}
                            value={classId}
                        >
                            {students.map((c) => (
                                <option key={c._id} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <Button disabled={error} type="submit">
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DemandFees;

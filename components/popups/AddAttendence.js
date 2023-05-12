import {
    CheckCircleIcon,
    XCircleIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import { Button, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopup } from "../../store/settings";
import { get_class_by_id } from "../../store/class";
import { useEffect } from "react";
import { post_attendence } from "../../store/attendence";

const AddAttendence = () => {
    const [selected, setSelected] = useState([]);

    const classData = useSelector((state) => state.class.class);

    const dispatch = useDispatch();

    const router = useRouter();

    const id = router.query.id;

    useEffect(() => {
        dispatch(get_class_by_id(id));
    }, [id]);

	const submit = () => {
		dispatch(post_attendence({ classId: id, students: selected }))
		setSelected([])
        dispatch(setPopup(null))
	}

    return (
        <div className="addClass__Wrapper" onClick={(e) => e.stopPropagation()}>
            <div className="top">
                <h4>Add Attendence</h4>
                <IconButton onClick={() => dispatch(setPopup(null))}>
                    <XMarkIcon className="h-5 w-5 text-black" />
                </IconButton>
            </div>
            <div className="area">
                {classData.students?.map((r) => (
                    <div
                        key={r._id}
                        className={
                            selected.includes(r._id)
                                ? "checkbox border-green-500"
                                : "checkbox border-red-500"
                        }
                        onClick={() => {
                            if (selected.includes(r._id)) {
                                const x = selected.filter((x) => {
                                    if (x !== r._id) {
                                        return x;
                                    } else {
                                    }
                                });
                                setSelected(x);
                            } else {
                                setSelected((v) => [...v, r._id]);
                            }
                        }}
                    >
                        <p>
                            {r.firstname
                                ? `${r.firstname} ${r.lastname}`
                                : r.email}
                        </p>
                        {selected.includes(r._id) ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        ) : (
                            <XCircleIcon className="h-5 w-5 text-red-500" />
                        )}
                    </div>
                ))}
                <Button onClick={submit}>Submit</Button>
            </div>
        </div>
    );
};

export default AddAttendence;

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

const OpenAttendence = () => {
    const selected = useSelector((state) => state.attendence.data)

    const classData = useSelector((state) => state.class.class);

    const dispatch = useDispatch();

    const router = useRouter();

    const id = router.query.id;

    useEffect(() => {
        dispatch(get_class_by_id(id));
    }, [id]);

    return (
        <div className="addClass__Wrapper" onClick={(e) => e.stopPropagation()}>
            <div className="top">
                <h4>Open Attendence</h4>
                <IconButton onClick={() => dispatch(setPopup(null))}>
                    <XMarkIcon className="h-5 w-5 text-black" />
                </IconButton>
            </div>
            <div className="area">
                {classData.students?.map((r) => (
                    <div
                        key={r._id}
                        className={
                            selected?.includes(r._id)
                                ? "checkbox border-green-500"
                                : "checkbox border-red-500"
                        }
                    >
                        <p>
                            {r.firstname
                                ? `${r.firstname} ${r.lastname}`
                                : r.email}
                        </p>
                        {selected?.includes(r._id) ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        ) : (
                            <XCircleIcon className="h-5 w-5 text-red-500" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OpenAttendence;

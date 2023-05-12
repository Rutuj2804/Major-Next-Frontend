import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setError,
    setHeader,
    setPopup,
    setSuccess,
} from "../../store/settings";
import {
    delete_assignments,
    get_my_assignments,
    setAssignmentError,
    setAssignmentId,
    setAssignmentSuccess,
} from "../../store/assignments";
import { Button } from "@mui/material";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { CODES } from "../../assets/data/popup";
import { useRouter } from "next/router";
import AssignmentsCard from "./AssignmentsCard";

const Assignments = () => {
    const dispatch = useDispatch();
    const assignments = useSelector((state) => state.assignments.assignments);
    const success = useSelector((state) => state.assignments.success);
    const error = useSelector((state) => state.assignments.error);

    const router = useRouter();

    useEffect(() => {
        if (success) dispatch(setSuccess(success));

        dispatch(setAssignmentSuccess(""));
    }, [success]);

    useEffect(() => {
        if (error) dispatch(setError(error));

        dispatch(setAssignmentError(""));
    }, [error]);

    useEffect(() => {
        dispatch(setHeader("Assignments"));
        dispatch(get_my_assignments());
    }, []);

    return (
        <div>
            <Head>
                <title>Assignments</title>
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
                                dispatch(setPopup(CODES.ADD_ASSIGNMENTS))
                            }
                        >
                            Add Assignment
                        </Button>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {assignments.map((s) => (
                            <AssignmentsCard
                                key={s._id}
                                name={s.file.split("\\")[2]}
                                classN={s.subject.name}
                                deleteA={() => dispatch(delete_assignments([s._id]))}
                                file={s.file}
                                submit={() => {
                                    dispatch(setAssignmentId(s._id));
                                    dispatch(
                                        setPopup(CODES.UPLOAD_ASSIGNMENTS)
                                    );
                                }}
                                submissions={() =>
                                    router.push(`/assignments/${s._id}`)
                                }
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Assignments;

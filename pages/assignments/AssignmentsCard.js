import React from "react";
import { IconButton } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";
import {
    ArrowDownTrayIcon,
    ArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import {
    ArrowUpTrayIcon,
    ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";

const AssignmentsCard = ({ name, classN, deleteA, file, submit, submissions }) => {
    return (
        <div className="subjectsCards__Wrapper">
            <div className="top">
                <div>
                    <h4>{name?.slice(0, 25)}</h4>
                    <p>{classN}</p>
                </div>
                <div>
                    <IconButton className="text-red-500" onClick={deleteA}>
                        <DeleteRounded />
                    </IconButton>
                </div>
            </div>
            <div className="bottom">
                <div>
                    <Link
                        target="_blank"
                        href={`${process.env.NEXT_PUBLIC_API_URL + "/" + file}`}
                    >
                        <IconButton>
                            <ArrowUpRightIcon className="h-5 w-5" />
                        </IconButton>
                    </Link>
                    <IconButton onClick={submit}>
                        <ArrowUpTrayIcon className="h-5 w-5" />
                    </IconButton>
                </div>
                <IconButton onClick={submissions}>
                    <ChevronDoubleRightIcon className="h-5 w-5" />
                </IconButton>
            </div>
        </div>
    );
};

export default AssignmentsCard;

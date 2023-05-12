import React from "react";
import { IconButton } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";
import { ArrowDownTrayIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const NotesCard = ({ name, classN, deleteA, file }) => {
    return (
        <div className="subjectsCards__Wrapper">
            <div className="top">
                <div>
                    <h4>{name}</h4>
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
                </div>
                <Link
                    target="_blank"
                    href={`${process.env.NEXT_PUBLIC_API_URL + "/" + file}`}
                    download
                >
                    <IconButton>
                        <ArrowDownTrayIcon className="h-5 w-5" />
                    </IconButton>
                </Link>
            </div>
        </div>
    );
};

export default NotesCard;

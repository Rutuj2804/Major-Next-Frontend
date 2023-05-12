import React from "react";
import { IconButton } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";
import { FolderIcon, PlayIcon, Square3Stack3DIcon } from "@heroicons/react/24/outline";

const SubjectCards = ({ name, classN, assignments, deleteA, notes, lectures }) => {
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
                    <IconButton onClick={assignments}><FolderIcon className="h-5 w-5" /></IconButton>
                    <IconButton onClick={notes}><Square3Stack3DIcon className="h-5 w-5" /></IconButton>
                </div>
                <IconButton onClick={lectures}><PlayIcon className="h-5 w-5" /></IconButton>
            </div>
        </div>
    );
};

export default SubjectCards;

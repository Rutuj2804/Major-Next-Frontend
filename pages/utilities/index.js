import React, { useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { setHeader, setPopup } from "../../store/settings";
import { Button } from "@mui/material";
import { CODES } from "../../assets/data/popup";
import { delete_notes, get_all_notes_for_me } from "../../store/notes";
import NotesCard from "./NotesCard";

const Utilities = () => {
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.notes.notes);

    useEffect(() => {
        dispatch(setHeader("Utilities"));
    }, []);

    useEffect(() => {
        dispatch(get_all_notes_for_me());
    }, []);

    return (
        <div>
            <Head>
                <title>Utilities</title>
            </Head>
            <main>
                <div className="flex justify-between items-center mt-4 breadcrumps">
                    <div></div>
                    <div className="flex gap-4">
                        <Button
                            startIcon={
                                <PlusIcon className="h-5 w-5 text-white" />
                            }
                            onClick={() => dispatch(setPopup(CODES.ADD_NOTES))}
                        >
                            Add Notes
                        </Button>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {notes.map((s) => (
                            <NotesCard
                                key={s._id}
                                name={s.file.split("\\")[2]}
                                classN={s.subject.name}
                                deleteA={() => dispatch(delete_notes([s._id]))}
                                file={s.file}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Utilities;

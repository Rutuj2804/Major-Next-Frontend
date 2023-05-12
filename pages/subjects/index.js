import { PlusIcon } from "@heroicons/react/24/solid";
import { Button } from "@mui/material";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CODES } from "../../assets/data/popup";
import { delete_subject, get_my_subjects } from "../../store/subjects";
import { setHeader, setPopup } from "../../store/settings";
import { useRouter } from "next/router";
import SubjectCards from "./Cards";

const Subjects = () => {
    const dispatch = useDispatch();

    const subjects = useSelector((state) => state.subjects.subjects);

    const role = useSelector((state) => state.roles?.role?.roles?.name);
    const university = useSelector((state) => state.university.university?._id);

    const router = useRouter();

    useEffect(() => {
        dispatch(setHeader("Subjects"));
        if (role === "ADMIN") dispatch(get_my_subjects(university));
        else dispatch(get_my_subjects());
    }, [role, university]);

    return (
        <main>
            <Head>
                <title>Utilities</title>
            </Head>
            <div className="flex justify-between items-center mt-4 breadcrumps">
                <div></div>
                <div className="flex gap-4">
                    <Button
                        startIcon={<PlusIcon className="h-5 w-5 text-white" />}
                        onClick={() => dispatch(setPopup(CODES.ADD_SUBJECT))}
                    >
                        Add Subject
                    </Button>
                </div>
            </div>
            <div className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {subjects.map((s) => (
                        <SubjectCards
                            key={s._id}
                            name={s.name}
                            classN={s.class.name}
                            assignments={() => router.push(`/assignments`)}
                            deleteA={() => dispatch(delete_subject(s._id))}
                            notes={() => router.push(`/utilities`)}
                            lectures={() => router.push("/lectures")}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Subjects;

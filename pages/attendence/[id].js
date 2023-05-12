import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHeader, setPopup } from "../../store/settings";
import { useEffect } from "react";
import { delete_attendence, get_attendence, setAttendence } from "../../store/attendence";
import Head from "next/head";
import Paper from "../../components/paper";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { CODES } from "../../assets/data/popup";
import moment from "moment/moment";

const Attendence = () => {
    const dispatch = useDispatch();
    // const university = useSelector((state) => state.university.university._id);
    // const classData = useSelector((state) => state.university.classes);
    const attendenceData = useSelector((state) => state.attendence.attendence);

    const router = useRouter();

    const id = router.query.id;

    useEffect(() => {
        dispatch(setHeader("Attendence"));
    }, []);

    useEffect(() => {
        dispatch(get_attendence(id));
    }, [id]);

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 90,
            disableColumnMenu: true,
            renderCell: (param) => <>{param.row._id}</>,
        },
        {
            field: "name",
            headerName: "Class name",
            flex: 1,
            disableColumnMenu: true,
            renderCell: (param) => <>{param.row.class?.name}</>,
        },
        {
            field: "createdAt",
            headerName: "date",
            width: 150,
            disableColumnMenu: true,
            renderCell: (param) => (
                <>{moment(param.row.createdAt).format("MMM Do YY")}</>
            ),
        },
        {
            field: "present",
            headerName: "present",
            width: 150,
            disableColumnMenu: true,
            renderCell: (param) => <>{param.row.students?.length}</>,
        },
        {
            field: "total",
            headerName: "total",
            width: 200,
            disableColumnMenu: true,
            align: "center",
            renderCell: (param) => <>{param.row.class?.students.length}</>,
        },
        {
            field: "percentage",
            headerName: "percentage",
            width: 200,
            disableColumnMenu: true,
            align: "center",
            renderCell: (param) => (
                <>
                    {(param.row.students?.length * 100) /
                        param.row.class?.students.length}
                    %
                </>
            ),
        },
        {
            field: "open",
            headerName: "Open",
            width: 200,
            disableColumnMenu: true,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => (
                <>
                    <Button
                        onClick={() => {
                            dispatch(setPopup(CODES.OPEN_ATTENDENCE));
                            dispatch(setAttendence(params.row._id));
                        }}
                        className="table-buttons bg-green-500"
                    >
                        Open
                    </Button>
                </>
            ),
        },
        {
            field: "delete",
            headerName: "Delete Class",
            width: 200,
            disableColumnMenu: true,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => (
                <>
                    <Button
                        onClick={() => dispatch(delete_attendence(params.row._id))}
                        className="table-buttons bg-red-500"
                        startIcon={<TrashIcon className="h-4 w-4 text-white" />}
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <Head>
                <title>Attendence</title>
            </Head>
            <main>
                <div className="flex justify-between items-center mt-4 breadcrumps">
                    <div></div>
                    <div className="">
                        <Button
                            startIcon={
                                <PlusIcon className="h-5 w-5 text-white" />
                            }
                            onClick={() =>
                                dispatch(setPopup(CODES.ADD_ATTENDENCE))
                            }
                        >
                            Add Attendence
                        </Button>
                    </div>
                </div>
                <div className="mt-4">
                    <Paper className="h-[800px]">
                        <DataGrid
                            columns={columns}
                            rows={attendenceData}
                            checkboxSelection
                            disableSelectionOnClick
                            rowsPerPageOptions={[]}
                            getRowId={(row) => row._id}
                        />
                    </Paper>
                </div>
            </main>
        </div>
    );
};

export default Attendence;

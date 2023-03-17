import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CODES } from "../../assets/data/popup";
import Paper from "../../components/paper";
import { delete_results, get_results, setPopupID } from "../../store/results";
import { setHeader, setPopup } from "../../store/settings";

const Results = () => {
    const dispatch = useDispatch();

    const university = useSelector((state) => state.university.university._id);
    const results = useSelector((state) => state.results.results);
    const role = useSelector((state) => state.roles.role.roles.name);

    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        dispatch(setHeader("Results"));
    }, [dispatch]);

    useEffect(() => {
        if (university) dispatch(get_results(university));
    }, [university]);

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 100,
            disableColumnMenu: true,
            renderCell: (params) => <>{params.row._id}</>,
        },
        {
            field: "name",
            headerName: "Results",
            flex: 1,
            disableColumnMenu: true,
        },
        {
            field: "user",
            headerName: "Posted By",
            flex: 1,
            disableColumnMenu: true,
            renderCell: (params) => (
                <>
                    {params.row.user.firstname + " " + params.row.user.lastname}
                </>
            ),
        },
        {
            field: "class",
            headerName: "Class",
            flex: 1,
            disableColumnMenu: true,
            renderCell: (params) => <>{params.row.classID.name}</>,
        },
        {
            field: "subject",
            headerName: "Subject",
            flex: 1,
            disableColumnMenu: true,
            renderCell: (params) => <>{params.row.subjectID.name}</>,
        },
        {
            field: "Open",
            headerName: "Open Result",
            width: 200,
            disableColumnMenu: true,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => (
                <>
                    <Button
                        className="table-buttons bg-green-500"
                        startIcon={<TrashIcon className="h-4 w-4 text-white" />}
                        onClick={() => {
                            dispatch(setPopup(CODES.SHOW_RESULTS));
                            dispatch(setPopupID(params.row._id));
                        }}
                        disabled={role == "STUDENT" ? false : true}
                    >
                        Open
                    </Button>
                </>
            ),
        },
        {
            field: "delete",
            headerName: "Delete Result",
            width: 200,
            disableColumnMenu: true,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => (
                <>
                    <Button
                        onClick={() =>
                            dispatch(delete_results([params.row._id]))
                        }
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
                <title>Results</title>
            </Head>

            <main>
                <div className="flex justify-between items-center mt-4 breadcrumps">
                    <div>
                        {selectedRows.length > 0 && (
                            <Button
                                onClick={() =>
                                    dispatch(delete_results(selectedRows))
                                }
                                className="table-buttons bg-red-500"
                                startIcon={
                                    <TrashIcon className="h-4 w-4 text-white" />
                                }
                            >
                                Delete Utilities
                            </Button>
                        )}
                    </div>
                    <div className="flex gap-4">
                        <Button
                            startIcon={
                                <PlusIcon className="h-5 w-5 text-white" />
                            }
                            onClick={() =>
                                dispatch(setPopup(CODES.ADD_RESULTS))
                            }
                        >
                            Add Results
                        </Button>
                    </div>
                </div>

                <div className="mt-4">
                    <Paper className="h-[800px]">
                        <DataGrid
                            columns={columns}
                            rows={results}
                            checkboxSelection={true}
                            disableSelectionOnClick
                            onSelectionModelChange={(newSelectionModel) => {
                                setSelectedRows(newSelectionModel);
                            }}
                            getRowId={(row) => row._id}
                            rowsPerPageOptions={[]}
                        />
                    </Paper>
                </div>
            </main>
        </div>
    );
};

export default Results;

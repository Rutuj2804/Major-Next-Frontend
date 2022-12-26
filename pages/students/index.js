import { DataGrid } from "@mui/x-data-grid";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHeader } from "../../store/settings";
import data from "../../assets/data/mockdata.json";
import Paper from "../../components/paper"

const columns = [
    { field: "id", headerName: "ID", width: 90, disableColumnMenu: true },
    {
        field: "first_name",
        headerName: "First name",
        width: 200,
        disableColumnMenu: true
    },
    {
        field: "last_name",
        headerName: "Last name",
        width: 200,
        disableColumnMenu: true
    },
    {
        field: "email",
        headerName: "Email",
        width: 300,
        disableColumnMenu: true
    },
    {
        field: "phone",
        headerName: "Phone",
        width: 200,
        disableColumnMenu: true
    },
    {
        field: "country",
        headerName: "Country",
        width: 200,
        disableColumnMenu: true
    },
    {
        field: "currency",
        headerName: "Currency",
        width: 200,
        disableColumnMenu: true
    },
];

const Students = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setHeader("Students"));
	}, []);

	return (
		<div>
			<Head>
				<title>Students</title>
			</Head>
			<main>
                <div className="mt-4">
                    <Paper className="h-[800px]">
                        <DataGrid columns={columns} rows={data} checkboxSelection rowsPerPageOptions={[]} />
                    </Paper>
                </div>
			</main>
		</div>
	);
};

export default Students;

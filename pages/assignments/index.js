import { DataGrid } from "@mui/x-data-grid";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHeader } from "../../store/settings";
import data from "../../assets/data/emaildata.json";
import Paper from "../../components/paper"
import { get_my_assignments } from "../../store/class";

const valueGetter = (params) => {
    return `${params.row.title} - ${params.row.text} ${params.row.text} ${params.row.text}`;
};

const columns = [
    { field: "id", headerName: "ID", width: 90, disableColumnMenu: true },
    {
        field: "title",
        headerName: "Email",
        flex: 1,
        valueGetter: valueGetter,
        disableColumnMenu: true
    },
];

const Assignments = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setHeader("Assignments"));
		dispatch(get_my_assignments())
	}, []);

	return (
		<div>
			<Head>
				<title>Assignments</title>
			</Head>
			<main>
				<div className="mt-4">
					<Paper className="h-[850px]">
						<DataGrid
							columns={columns}
							rows={data}
							checkboxSelection
							rowsPerPageOptions={[]}
							disableSelectionOnClick
						/>
					</Paper>
				</div>
			</main>
		</div>
	);
};

export default Assignments;

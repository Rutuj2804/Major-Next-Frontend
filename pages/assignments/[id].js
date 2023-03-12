import { DataGrid } from "@mui/x-data-grid";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHeader, setPopup } from "../../store/settings";
import Paper from "../../components/paper";
import { delete_assignments, get_submitted_assignments } from "../../store/assignments";
import { Button } from "@mui/material";
import Link from "next/link";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { CODES } from "../../assets/data/popup";
import { useRouter } from "next/router";
import moment from "moment/moment";

const valueGetter = (params) => {
	const file = params.row.file.split("\\");
	return file[file.length - 1];
};

const AssignmentsSubmissions = () => {
	const dispatch = useDispatch();
	const assignments = useSelector((state) => state.assignments.assignments);

    const router = useRouter()

    const { id } = router.query

	useEffect(() => {
		dispatch(setHeader("Assignments Submission"));
		dispatch(get_submitted_assignments({id}));
	}, []);

	const columns = [
		{
			field: "id",
			headerName: "ID",
			width: 90,
			disableColumnMenu: true,
			renderCell: (params) => <>{params.row._id}</>,
		},
		{
			field: "title",
			headerName: "Assignment",
			minWidth: 300,
			flex: 1,
			disableColumnMenu: true,
			renderCell: (params) => <>{params.row.assignment?.title}</>,
		},
		{
			field: "description",
			headerName: "Description",
			flex: 1,
			disableColumnMenu: true,
			renderCell: (params) => <>{params.row.assignment?.description}</>,
		},
		{
			field: "user",
			headerName: "Posted By",
			width: 200,
			disableColumnMenu: true,
			renderCell: (params) => <>{params.row.user?.firstname + ' ' + params.row.user?.lastname}</>,
		},
		{
			field: "postedon",
			headerName: "Posted On",
			width: 200,
			disableColumnMenu: true,
			renderCell: (params) => <>{moment(params.row.createdAt).format("MMM Do YY")}</>,
		},
		{
			field: "download",
			headerName: "Download utility",
			width: 200,
			disableColumnMenu: true,
			align: "center",
			headerAlign: "center",
			renderCell: (params) => (
				<>
					<Link href={`${process.env.NEXT_PUBLIC_API_URL + '/' + params.row.file}`} target="_blank">
						<Button className="table-buttons bg-green-500">Open</Button>
					</Link>
				</>
			),
			disableColumnMenu: true,
		},
	];

	return (
		<div>
			<Head>
				<title>Assignments</title>
			</Head>
			<main>
				<div className="flex justify-between items-center mt-4 breadcrumps">
					<div>
						
					</div>
					<div className="flex gap-4">
						<Button
							startIcon={
								<PlusIcon className="h-5 w-5 text-white" />
							}
							onClick={() => dispatch(setPopup(CODES.ADD_ASSIGNMENTS))}
						>
							Add Assignment
						</Button>
					</div>
				</div>
				<div className="mt-4">
					<Paper className="h-[850px]">
						<DataGrid
							columns={columns}
							rows={assignments}
							checkboxSelection={false}
							rowsPerPageOptions={[]}
							getRowId={(row) => row._id}
							disableSelectionOnClick
						/>
					</Paper>
				</div>
			</main>
		</div>
	);
};

export default AssignmentsSubmissions;

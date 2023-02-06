import { DataGrid } from "@mui/x-data-grid";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHeader, setPopup } from "../../store/settings";
import Paper from "../../components/paper";
import { delete_assignments, get_my_assignments } from "../../store/assignments";
import { Button } from "@mui/material";
import Link from "next/link";
import { CloudArrowUpIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { CODES } from "../../assets/data/popup";

const valueGetter = (params) => {
	const file = params.row.file.split("\\");
	return file[file.length - 1];
};

const Assignments = () => {
	const dispatch = useDispatch();
	const assignments = useSelector((state) => state.assignments.assignments);

	const [selectedRows, setSelectedRows] = useState([]);

	useEffect(() => {
		dispatch(setHeader("Assignments"));
		dispatch(get_my_assignments());
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
			renderCell: (params) => <>{params.row.title}</>,
		},
		{
			field: "description",
			headerName: "Description",
			width: 200,
			disableColumnMenu: true,
			renderCell: (params) => <>{params.row.description}</>,
		},
		{
			field: "class",
			headerName: "Class & Subject",
			width: 200,
			disableColumnMenu: true,
			renderCell: (params) => <>{params.row.class?.name + ' | ' + params.row.subject?.name}</>,
		},
		{
			field: "user",
			headerName: "Posted By",
			width: 200,
			disableColumnMenu: true,
			renderCell: (params) => <>{params.row.user?.firstname + ' ' + params.row.user?.lastname}</>,
		},
		{
			field: "submission",
			headerName: "Last Date",
			width: 200,
			disableColumnMenu: true,
			align: "center",
			headerAlign: "center",
			renderCell: (params) => <>{params.row.submission}</>,
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
					<Link href={`/assignments`}>
						<Button className="table-buttons">Download</Button>
					</Link>
				</>
			),
			disableColumnMenu: true,
		},
		{
			field: "delete",
			headerName: "Delete",
			width: 200,
			disableColumnMenu: true,
			align: "center",
			headerAlign: "center",
			renderCell: (params) => (
				<>
					<Button
						onClick={() => dispatch(delete_assignments([params.row._id]))}
						className="table-buttons bg-red-500"
						startIcon={<TrashIcon className="h-4 w-4 text-white" />}
					>
						Delete
					</Button>
				</>
			),
			disableColumnMenu: true,
		},
		{
			field: "upload",
			headerName: "Upload Assignment",
			width: 200,
			disableColumnMenu: true,
			align: "center",
			headerAlign: "center",
			renderCell: (params) => (
				<>
					<Button
						className="table-buttons bg-green-500"
						startIcon={<CloudArrowUpIcon className="h-4 w-4 text-white" />}
					>
						Upload
					</Button>
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
						{selectedRows.length > 0 && (
							<Button
								onClick={() =>
									dispatch(delete_assignments(selectedRows))
								}
								className="table-buttons bg-red-500"
								startIcon={
									<TrashIcon className="h-4 w-4 text-white" />
								}
							>
								Delete Assignments
							</Button>
						)}
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
							checkboxSelection
							rowsPerPageOptions={[]}
							onSelectionModelChange={(newSelectionModel) => {
								setSelectedRows(newSelectionModel);
							}}
							getRowId={(row) => row._id}
							disableSelectionOnClick
						/>
					</Paper>
				</div>
			</main>
		</div>
	);
};

export default Assignments;

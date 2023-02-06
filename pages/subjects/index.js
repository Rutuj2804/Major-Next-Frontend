import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@mui/material";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CODES } from "../../assets/data/popup";
import Paper from "../../components/paper";
import { delete_bulk_subject, delete_subject, get_my_subjects } from "../../store/subjects";
import { DataGrid } from "@mui/x-data-grid";
import { setHeader, setPopup } from "../../store/settings";
import { useState } from "react";
import { useRouter } from "next/router";

const Subjects = () => {
	const dispatch = useDispatch();

	const subjects = useSelector((state) => state.subjects.subjects);

	const role = useSelector((state) => state.roles?.role?.roles?.name);
	const university = useSelector((state) => state.university.university?._id);

	const [selectedRows, setSelectedRows] = useState([]);

	const router = useRouter()

	useEffect(() => {
		dispatch(setHeader("Subjects"));
		if (role === "ADMIN") dispatch(get_my_subjects(university));
		else dispatch(get_my_subjects());
	}, [role, university]);

	const columns = [
		{
			field: "_id",
			headerName: "ID",
			width: 150,
			disableColumnMenu: true,
		},
		{
			field: "name",
			headerName: "Subject",
			width: 300,
			disableColumnMenu: true,
		},
		{
			field: "class",
			headerName: "Class",
			width: 200,
			disableColumnMenu: true,
			renderCell: (params) => <>{params.row.class.name}</>,
		},
		{
			field: "class_open",
			headerName: "Go to class",
			width: 200,
			disableColumnMenu: true,
			align: "center",
			headerAlign: "center",
			renderCell: (params) => (
				<>
					<Button
						className="table-buttons"
						onClick={() =>
							router.push(`/classes/${params.row.class._id}`)
						}
					>
						Open class
					</Button>
				</>
			),
		},
		{
			field: "assignemnts_open",
			headerName: "Go to class",
			width: 200,
			disableColumnMenu: true,
			align: "center",
			headerAlign: "center",
			renderCell: (params) => (
				<>
					<Button
						className="table-buttons"
						onClick={() =>
							router.push(`/assignments/${params.row.class._id}`)
						}
					>
						Open Assignemnts
					</Button>
				</>
			),
		},
		{
			field: "notes_open",
			headerName: "Go to class",
			width: 200,
			disableColumnMenu: true,
			align: "center",
			headerAlign: "center",
			renderCell: (params) => (
				<>
					<Button
						className="table-buttons"
						onClick={() =>
							router.push(`/utilities/${params.row.class._id}`)
						}
					>
						Open Notes
					</Button>
				</>
			),
		},
		{
			field: "delete",
			headerName: "Delete subject from class",
			width: 200,
			disableColumnMenu: true,
			align: "center",
			headerAlign: "center",
			renderCell: (params) => (
				<>
					<Button
						onClick={() => dispatch(delete_subject(params.row._id))}
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
		<main>
			<Head>
				<title>Utilities</title>
			</Head>
			<div className="flex justify-between items-center mt-4 breadcrumps">
				<div>
					{selectedRows.length > 0 && (
						<Button
							onClick={() =>
								dispatch(
									delete_bulk_subject(selectedRows)
								)
							}
							className="table-buttons bg-red-500"
							startIcon={
								<TrashIcon className="h-4 w-4 text-white" />
							}
						>
							Delete Classes
						</Button>
					)}
				</div>
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
				{/* <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{subjects.map((s) => (
						<Paper key={s._id}>
							<Cards name={s.name} id={s._id} />
						</Paper>
					))}
				</div> */}
				<Paper className="h-[800px]">
					<DataGrid
						columns={columns}
						rows={subjects}
						checkboxSelection={true}
						disableSelectionOnClick
						onSelectionModelChange={(newSelectionModel) => {
							setSelectedRows(newSelectionModel);
						}}
						rowsPerPageOptions={[]}
						getRowId={(row) => row._id}
					/>
				</Paper>
			</div>
		</main>
	);
};

export default Subjects;

import React, { useEffect } from "react";
import {
	BanknotesIcon,
	CalendarIcon,
	CreditCardIcon,
	EnvelopeIcon,
	PlusIcon,
	TrashIcon,
} from "@heroicons/react/24/solid";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { setHeader, setPopup } from "../../store/settings";
import Paper from "../../components/paper";
import SubjectCard from "../subjects/Cards";
import { get_my_subjects } from "../../store/subjects";
import { Button } from "@mui/material";
import { CODES } from "../../assets/data/popup";
import { delete_notes, get_all_notes_for_me } from "../../store/notes";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import { useState } from "react";

const cardsData = [
	{
		count: 299,
		name: "Meetings",
		percentage: 29,
		isDown: false,
		icon: <CreditCardIcon className="h-10 w-10 text-green-500" />,
	},
	{
		count: 20,
		name: "Events",
		percentage: 10,
		isDown: true,
		icon: <CalendarIcon className="h-10 w-10 text-red-500" />,
	},
	{
		count: 587,
		name: "Emails",
		percentage: 17,
		isDown: false,
		icon: <EnvelopeIcon className="h-10 w-10 text-blue-500" />,
	},
	{
		count: "188k",
		name: "Spendings",
		percentage: 50,
		isDown: true,
		icon: <BanknotesIcon className="h-10 w-10 text-yellow-500" />,
	},
];

const valueGetter = (params) => {
	const file = params.row.file.split("\\");
	return file[file.length - 1];
};

const Utilities = () => {
	const dispatch = useDispatch();
	const notes = useSelector((state) => state.notes.notes);

	const [selectedRows, setSelectedRows] = useState([]);

	useEffect(() => {
		dispatch(setHeader("Utilities"));
	}, []);

	useEffect(() => {
		dispatch(get_all_notes_for_me());
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
			headerName: "Utility name",
			minWidth: 200,
			flex: 1,
			valueGetter: valueGetter,
			disableColumnMenu: true,
		},
		{
			field: "class",
			headerName: "Class",
			width: 200,
			disableColumnMenu: true,
			renderCell: (params) => (
				<>
					{params.row.class?.name}
				</>
			),
		},
		{
			field: "subject",
			headerName: "Subject",
			width: 200,
			disableColumnMenu: true,
			renderCell: (params) => (
				<>
					{params.row.subject?.name}
				</>
			),
		},
		{
			field: "open",
			headerName: "Open utility",
			width: 200,
			disableColumnMenu: true,
			align: "center",
			headerAlign: "center",
			renderCell: (params) => (
				<>
					<Link target="_blank" href={`${process.env.NEXT_PUBLIC_API_URL + '/' + params.row.file}`}>
						<Button className="table-buttons">Open</Button>
					</Link>
				</>
			),
			disableColumnMenu: true,
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
					<Link href={`${process.env.NEXT_PUBLIC_API_URL + '/' + params.row.file}`} download onClick={e=>e.preventDefault()}>
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
						onClick={() => dispatch(delete_notes([params.row._id]))}
						className="table-buttons bg-red-500"
						startIcon={<TrashIcon className="h-4 w-4 text-white" />}
					>
						Delete
					</Button>
				</>
			),
			disableColumnMenu: true,
		},
	];

	return (
		<div>
			<Head>
				<title>Utilities</title>
			</Head>
			<main>
				<div className="flex justify-between items-center mt-4 breadcrumps">
					<div>
					{selectedRows.length > 0 && (
						<Button
							onClick={() =>
								dispatch(
									delete_notes(selectedRows)
								)
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
							onClick={() => dispatch(setPopup(CODES.ADD_NOTES))}
						>
							Add Notes
						</Button>
					</div>
				</div>
				<div className="my-4">
					<Paper className="h-[850px]">
						<DataGrid
							columns={columns}
							rows={notes}
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

export default Utilities;

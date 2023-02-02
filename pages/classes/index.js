import { DataGrid } from "@mui/x-data-grid";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHeader, setPopup } from "../../store/settings";
import Paper from "../../components/paper";
import {
    bulk_delete_class,
	delete_class,
	get_all_classes,
	setClass,
} from "../../store/university";
import { Button } from "@mui/material";
import Link from "next/link";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { CODES } from "../../assets/data/popup";
import { useState } from "react";

const Classes = () => {
	const dispatch = useDispatch();
	const university = useSelector((state) => state.university.university._id);
	const classData = useSelector((state) => state.university.classes);

	const [selectedRows, setSelectedRows] = useState([]);

	useEffect(() => {
		dispatch(setHeader("Classes"));
	}, []);

	useEffect(() => {
		dispatch(get_all_classes(university));
	}, [university]);

	const filteredClass = [];

	classData.filter((s) => {
		const x = {};
		x["id"] = s._id;
		x["name"] = s.name;
		x["faculty"] = s.faculty.length;
		x["students"] = s.students.length;

		filteredClass.push(x);
	});

	const setPopupForUpdate = (params) => {
		dispatch(setPopup(CODES.UPDATE_CLASS));
		dispatch(
			setClass({
				_id: params.row.id,
				name: params.row.name,
				university: university,
			})
		);
	};

	const columns = [
		{ field: "id", headerName: "ID", width: 90, disableColumnMenu: true },
		{
			field: "name",
			headerName: "Class name",
			width: 300,
			disableColumnMenu: true,
		},
		{
			field: "faculty",
			headerName: "Faculty",
			width: 150,
			disableColumnMenu: true,
		},
		{
			field: "students",
			headerName: "Students",
			width: 150,
			disableColumnMenu: true,
		},
		{
			field: "assignments",
			headerName: "Assignments",
			width: 200,
			disableColumnMenu: true,
			align: "center",
			headerAlign: "center",
			renderCell: (params) => (
				<Link href={`/assignments/${params.row.id}`}>
					<Button className="table-buttons">Assignments</Button>
				</Link>
			),
		},
		{
			field: "notes",
			headerName: "Notes",
			width: 200,
			disableColumnMenu: true,
			align: "center",
			headerAlign: "center",
			renderCell: (params) => (
				<Link href={`/utilities/${params.row.id}`}>
					<Button className="table-buttons">Notes</Button>
				</Link>
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
						onClick={() => dispatch(delete_class(params.row.id))}
						className="table-buttons bg-red-500"
						startIcon={<TrashIcon className="h-4 w-4 text-white" />}
					>
						Delete
					</Button>
				</>
			),
		},
		{
			field: "update",
			headerName: "Update Class",
			width: 200,
			disableColumnMenu: true,
			align: "center",
			headerAlign: "center",
			renderCell: (params) => (
				<>
					<Button
						onClick={() => setPopupForUpdate(params)}
						className="table-buttons bg-green-500"
						startIcon={
							<PencilIcon className="h-4 w-4 text-white" />
						}
					>
						Update
					</Button>
				</>
			),
		},
	];

	return (
		<div>
			<Head>
				<title>Classes</title>
			</Head>
			<main>
				<div className="flex justify-between items-center mt-4 breadcrumps">
					<div>
						{selectedRows.length > 0 && (
							<Button
								onClick={() =>
									dispatch(bulk_delete_class({ classes: selectedRows }))
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
					<div className="">
						<Button
							startIcon={
								<PlusIcon className="h-5 w-5 text-white" />
							}
							onClick={() => dispatch(setPopup(CODES.ADD_CLASS))}
						>
							Add Class
						</Button>
					</div>
				</div>
				<div className="mt-4">
					<Paper className="h-[800px]">
						<DataGrid
							columns={columns}
							rows={filteredClass}
							checkboxSelection
							disableSelectionOnClick
							onSelectionModelChange={(newSelectionModel) => {
								setSelectedRows(newSelectionModel);
							}}
							rowsPerPageOptions={[]}
						/>
					</Paper>
				</div>
			</main>
		</div>
	);
};

export default Classes;

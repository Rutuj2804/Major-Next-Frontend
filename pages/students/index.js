import { DataGrid } from "@mui/x-data-grid";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHeader, setPopup } from "../../store/settings";
import Paper from "../../components/paper";
import { delete_student_from_class, get_all_students } from "../../store/class";
import { Button } from "@mui/material";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { CODES } from "../../assets/data/popup";
import { useRouter } from "next/router";

const Students = () => {
	const dispatch = useDispatch();
	const university = useSelector((state) => state.university.university._id);
	const students = useSelector((state) => state.class.students);

	const router = useRouter();

	useEffect(() => {
		dispatch(setHeader("Students"));
	}, []);

	useEffect(() => {
		dispatch(get_all_students(university));
	}, [university]);

	const filteredStudents = [];

	students.filter((s) => {
		let c = s.name;
		let cid = s._id;
		let t = s.createdAt;
		for (let i = 0; i < s.students.length; i++) {
			const x = {};
			x["id"] = s.students[i]._id + " " + cid;
			x["studentId"] = s.students[i]._id;
			x["first_name"] = s.students[i].firstname;
			x["last_name"] = s.students[i].lastname;
			x["email"] = s.students[i].email;
			x["class"] = c;
			x["classID"] = cid;
			x["faculties"] = s.faculty?.length;
			x["created_at"] = t;
			filteredStudents.push(x);
		}
	});

	const columns = [
		{ field: "id", headerName: "ID", width: 90, disableColumnMenu: true },
		{
			field: "first_name",
			headerName: "First name",
			flex: 1,
			disableColumnMenu: true,
		},
		{
			field: "last_name",
			headerName: "Last name",
			flex: 1,
			disableColumnMenu: true,
		},
		{
			field: "email",
			headerName: "Email",
			flex: 1,
			disableColumnMenu: true,
		},
		{
			field: "class",
			headerName: "Class",
			width: 200,
			disableColumnMenu: true,
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
							router.push(`/classes/${params.row.classID}`)
						}
					>
						Open class
					</Button>
				</>
			),
		},
		{
			field: "delete",
			headerName: "Delete student from class",
			width: 200,
			disableColumnMenu: true,
			align: "center",
			headerAlign: "center",
			renderCell: (params) => (
				<>
					<Button
						onClick={() =>
							dispatch(
								delete_student_from_class({
									id: params.row.classID,
									students: [params.row.studentId],
								})
							)
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
				<title>Students</title>
			</Head>
			<main>
				<div className="flex justify-between items-center mt-4 breadcrumps">
					<div></div>
					<div className="flex gap-4">
						<Button
							startIcon={
								<PlusIcon className="h-5 w-5 text-white" />
							}
							onClick={() =>
								dispatch(setPopup(CODES.ADD_STUDENT))
							}
						>
							Add Student
						</Button>
						<Button
							startIcon={
								<PlusIcon className="h-5 w-5 text-white" />
							}
							onClick={() =>
								dispatch(setPopup(CODES.BULK_ADD_STUDENT))
							}
						>
							Bulk Add
						</Button>
					</div>
				</div>
				<div className="mt-4">
					<Paper className="h-[800px]">
						<DataGrid
							columns={columns}
							rows={filteredStudents}
							checkboxSelection={false}
							disableSelectionOnClick
							onSelectionModelChange={(newSelectionModel) => {
								console.log(newSelectionModel);
							}}
							rowsPerPageOptions={[]}
						/>
					</Paper>
				</div>
			</main>
		</div>
	);
};

export default Students;

import { DataGrid } from "@mui/x-data-grid";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHeader } from "../../store/settings";
import Paper from "../../components/paper";
import { get_all_students } from "../../store/class";

const FacultyStudents = () => {
	const dispatch = useDispatch();
	const university = useSelector((state) => state.university.university._id);
	const students = useSelector((state) => state.class.students);

	useEffect(() => {
		dispatch(setHeader("Faculty"));
	}, []);

	useEffect(() => {
		dispatch(get_all_students(university));
	}, [university]);

	const filteredStudents = [];

	students.filter((s) => {
		let c = s.name;
		let t = s.createdAt;
		for (let i = 0; i < s.faculty.length; i++) {
			const x = {};
			x["id"] = s.faculty[i]._id + c;
			x["first_name"] = s.faculty[i].firstname;
			x["last_name"] = s.faculty[i].lastname;
			x["email"] = s.faculty[i].email;
			x["class"] = c;
			x["students"] = s.students?.length;
			x["created_at"] = t;
			filteredStudents.push(x);
		}
	});

	const columns = [
		{ field: "id", headerName: "ID", width: 90, disableColumnMenu: true },
		{
			field: "first_name",
			headerName: "First name",
			width: 200,
			disableColumnMenu: true,
		},
		{
			field: "last_name",
			headerName: "Last name",
			width: 200,
			disableColumnMenu: true,
		},
		{
			field: "email",
			headerName: "Email",
			width: 300,
			disableColumnMenu: true,
		},
		{
			field: "class",
			headerName: "Class",
			width: 200,
			disableColumnMenu: true,
		},
		{
			field: "students",
			headerName: "Students",
			width: 200,
			disableColumnMenu: true,
		},
		{
			field: "students",
			headerName: "Students",
			width: 200,
			disableColumnMenu: true,
		},
	];

	return (
		<div>
			<Head>
				<title>Faculty</title>
			</Head>
			<main>
				<div className="mt-4">
					<Paper className="h-[800px]">
						<DataGrid
							columns={columns}
							rows={filteredStudents}
							checkboxSelection
							rowsPerPageOptions={[]}
						/>
					</Paper>
				</div>
			</main>
		</div>
	);
};

export default FacultyStudents;

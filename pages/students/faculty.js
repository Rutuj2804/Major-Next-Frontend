import { DataGrid } from "@mui/x-data-grid";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHeader } from "../../store/settings";
import data from "../../assets/data/mockdata.json";
import Paper from "../../components/paper"
import { get_all_students, get_my_students } from "../../store/class";

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
        field: "class",
        headerName: "Class",
        width: 200,
        disableColumnMenu: true
    },
    {
        field: "faculties",
        headerName: "Faculties",
        width: 200,
        disableColumnMenu: true
    },
    {
        field: "created_at",
        headerName: "Class Created At",
        width: 200,
        disableColumnMenu: true
    },
];

const FacultyStudents = () => {
	const dispatch = useDispatch();
    const university = useSelector(state=>state.university.university._id)
    const students = useSelector(state=>state.class.students)

	useEffect(() => {
		dispatch(setHeader("Students"));
	}, []);

    useEffect(()=>{
        dispatch(get_my_students(university))
    }, [university])

    const filteredStudents = []

    students.filter(s=>{
        let c = s.name
        let t = s.createdAt
        for (let i = 0; i < s.students.length; i++) {
            const x = {}
            x["id"] = s.students[i]._id + c
            x["first_name"] = s.students[i].firstname
            x["last_name"] = s.students[i].lastname
            x["email"] = s.students[i].email
            x["class"] = c
            x["faculties"] = s.faculty?.length
            x["created_at"] = t
            filteredStudents.push(x)
        }
    })

	return (
		<div>
			<Head>
				<title>Students</title>
			</Head>
			<main>
                <div className="mt-4">
                    <Paper className="h-[800px]">
                        <DataGrid columns={columns} rows={filteredStudents} checkboxSelection rowsPerPageOptions={[]} />
                    </Paper>
                </div>
			</main>
		</div>
	);
};

export default FacultyStudents;
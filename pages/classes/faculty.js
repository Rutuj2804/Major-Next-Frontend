import { DataGrid } from "@mui/x-data-grid";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHeader } from "../../store/settings";
import data from "../../assets/data/mockdata.json";
import Paper from "../../components/paper"
import { get_my_classes } from "../../store/university";
import { Button } from "@mui/material";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid"
import Link from "next/link";

const FacultyClasses = () => {
	const dispatch = useDispatch();
    const university = useSelector(state=>state.university.university._id)
    const classData = useSelector(state=>state.university.classes)

	useEffect(() => {
		dispatch(setHeader("Classes"));
	}, []);

    useEffect(()=>{
        dispatch(get_my_classes(university))
    }, [university])

    const filteredClass = []

    classData.filter(s=>{
        const x = {}
        x["id"] = s._id
        x["name"] = s.name
        x["faculty"] = s.faculty.length
        x["students"] = s.students.length

        filteredClass.push(x)
    })

    const columns = [
        { field: "id", headerName: "ID", width: 90, disableColumnMenu: true },
        {
            field: "name",
            headerName: "Class name",
            width: 300,
            disableColumnMenu: true
        },
        {
            field: "faculty",
            headerName: "Faculty",
            width: 150,
            disableColumnMenu: true
        },
        {
            field: "students",
            headerName: "Students",
            width: 150,
            disableColumnMenu: true
        },
        {
            field: "assignments",
            headerName: "Assignments",
            width: 200,
            disableColumnMenu: true,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => <Link href={`/assignments/${params.row.id}`}><Button className="table-buttons">Assignments</Button></Link>
        },
        {
            field: "notes",
            headerName: "Notes",
            width: 200,
            disableColumnMenu: true,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => <Link href={`/utilities/${params.row.id}`}><Button className="table-buttons">Notes</Button></Link>
        },
        {
            field: "delete",
            headerName: "Delete Class",
            width: 200,
            disableColumnMenu: true,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => <><Button onClick={()=>dispatch(delete_class(params.row.id))} className="table-buttons bg-red-500" startIcon={<TrashIcon className="h-4 w-4 text-white" />}>Delete</Button></>
        },
        {
            field: "update",
            headerName: "Update Class",
            width: 200,
            disableColumnMenu: true,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => <><Button className="table-buttons bg-green-500" startIcon={<PencilIcon className="h-4 w-4 text-white" />}>Update</Button></>
        },
    ];

	return (
		<div>
			<Head>
				<title>Classes</title>
			</Head>
			<main>
                {/* <div className="flex justify-between items-center mt-4 breadcrumps">
                    <div></div>
                    <div className="">
                        <Button startIcon={<PlusIcon className="h-5 w-5 text-white" />}>Add Class</Button>
                    </div>
                </div> */}
                <div className="mt-4">
                    <Paper className="h-[800px]">
                        <DataGrid columns={columns} rows={filteredClass} checkboxSelection disableSelectionOnClick rowsPerPageOptions={[]} />
                    </Paper>
                </div>
			</main>
		</div>
	);
};

export default FacultyClasses;

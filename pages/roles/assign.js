import { DataGrid } from "@mui/x-data-grid";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHeader, setPopup } from "../../store/settings";
import Paper from "../../components/paper";
import { delete_student_from_class } from "../../store/class";
import { Button } from "@mui/material";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { CODES } from "../../assets/data/popup";
import { useRouter } from "next/router";
import { get_all_roles_assigned } from "../../store/roles";

const AssignRoles = () => {
	const dispatch = useDispatch();
	const university = useSelector((state) => state.university.university._id);
	const assigned = useSelector((state) => state.roles.assigned);

	const router = useRouter()

	useEffect(() => {
		dispatch(setHeader("Roles"));
	}, []);

	useEffect(() => {
		dispatch(get_all_roles_assigned(university));
	}, [university]);

	const columns = [
		{ field: "_id", headerName: "ID", width: 90, disableColumnMenu: true, renderCell: (params) => <>{params.row._id}</> },
		{
			field: "firstname",
			headerName: "First name",
			width: 300,
			disableColumnMenu: true,
            renderCell: (params) => <>{params.row.user.firstname}</>
		},
		{
			field: "lastname",
			headerName: "Last name",
			width: 300,
			disableColumnMenu: true,
            renderCell: (params) => <>{params.row.user.lastname}</>
		},
		{
			field: "email",
			headerName: "Email",
			width: 300,
			disableColumnMenu: true,
            renderCell: (params) => <>{params.row.user.email}</>
		},
		{
			field: "roles",
			headerName: "Role",
			width: 300,
			disableColumnMenu: true,
            renderCell: (params) => <>{params.row.roles.name}</>
		},
		{
			field: "delete",
			headerName: "Delete role for user",
			width: 200,
			disableColumnMenu: true,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => <><Button onClick={()=>dispatch(delete_student_from_class({ id: params.row.classID, students: [ params.row.studentId ] }))} className="table-buttons bg-red-500" startIcon={<TrashIcon className="h-4 w-4 text-white" />}>Delete</Button></>
		},
	];

	return (
		<div>
			<Head>
				<title>Roles</title>
			</Head>
			<main>
				<div className="flex justify-between items-center mt-4 breadcrumps">
                    <div></div>
                    <div className="">
                        <Button startIcon={<PlusIcon className="h-5 w-5 text-white" />} onClick={()=>dispatch(setPopup(CODES.ASSIGN_ROLES))}>Assign Role</Button>
                    </div>
                </div>
				<div className="mt-4">
					<Paper className="h-[800px]">
						<DataGrid
							columns={columns}
							rows={assigned}
							checkboxSelection
							rowsPerPageOptions={[]}
                            getRowId={row=>row._id}
						/>
					</Paper>
				</div>
			</main>
		</div>
	);
};

export default AssignRoles;

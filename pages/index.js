import Head from "next/head";
import React, { useEffect } from "react";
import {
	AcademicCapIcon,
	CalendarIcon,
	CreditCardIcon,
	CubeIcon,
	FireIcon,
	ViewfinderCircleIcon,
} from "@heroicons/react/24/solid";
import MyResponsiveBar from "../components/charts/NivoBarChart";
import MyResponsiveLine from "../components/charts/NivoLineChart";
import Paper from "../components/paper";
import Cards from "../components/cards";
import MyResponsivePie from "../components/charts/NivoPieChart";
import { DataGrid } from "@mui/x-data-grid";
import data from "../assets/data/mockdata.json";
import { Avatar } from "@mui/material";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setHeader } from "../store/settings";
import {
	get_bar,
	get_cards,
	get_data_grid,
	get_line,
	get_pie,
} from "../store/analytics";

const cardsData = [
	{
		count: 299,
		name: "Classes",
		percentage: 29,
		isDown: false,
		icon: <AcademicCapIcon className="h-10 w-10 text-green-500" />,
	},
	{
		count: 20,
		name: "Students",
		percentage: 10,
		isDown: true,
		icon: <CubeIcon className="h-10 w-10 text-yellow-500" />,
	},
	{
		count: 587,
		name: "Faculties",
		percentage: 17,
		isDown: false,
		icon: <ViewfinderCircleIcon className="h-10 w-10 text-blue-500" />,
	},
	{
		count: "188k",
		name: "Events",
		percentage: 50,
		isDown: true,
		icon: <FireIcon className="h-10 w-10 text-red-500" />,
	},
];

const columnsClasses = [
	{
		field: "id",
		headerName: "ID",
		width: 90,
		disableColumnMenu: true,
		renderCell: (params) => <>{params.row._id}</>,
	},
	{
		field: "name",
		headerName: "name",
		width: 200,
		disableColumnMenu: true,
		flex: 1,
	},
	{
		field: "faculty",
		headerName: "Faculty",
		width: 150,
		disableColumnMenu: true,
		renderCell: (params) => <>{params.row.faculty?.length}</>,
	},
	{
		field: "students",
		headerName: "Students",
		width: 150,
		disableColumnMenu: true,
		renderCell: (params) => <>{params.row.students?.length}</>,
	},
];

const columnsSubject = [
	{
		field: "id",
		headerName: "ID",
		width: 90,
		disableColumnMenu: true,
		renderCell: (params) => <>{params.row._id}</>,
	},
	{
		field: "name",
		headerName: "name",
		width: 200,
		disableColumnMenu: true,
		flex: 1,
	},
	{
		field: "class",
		headerName: "Class",
		width: 150,
		disableColumnMenu: true,
		renderCell: (params) => <>{params.row.class.name}</>,
	},
	{
		field: "faculty",
		headerName: "Faculty",
		width: 150,
		disableColumnMenu: true,
		renderCell: (params) => <>{params.row.class?.faculty?.length}</>,
	},
];

const Index = () => {
	const dispatch = useDispatch();

	const id = useSelector((state) => state.university.university._id);

	const cards_data = useSelector((state) => state.analytics.cards);
	const line_data = useSelector((state) => state.analytics.line);
	const bar_data = useSelector((state) => state.analytics.bar);
	const pie_data = useSelector((state) => state.analytics.pie);
	const data_grid_data = useSelector((state) => state.analytics.data_grid);

	useEffect(() => {
		dispatch(setHeader("Dashboard"));
	}, [dispatch]);

	useEffect(() => {
		if (id) {
			dispatch(get_cards({ id }));
			dispatch(get_line({ id }));
			dispatch(get_bar({ id }));
			dispatch(get_pie({ id }));
			dispatch(get_data_grid({ id }));
		}
	}, [id]);

	return (
		<div>
			<Head>
				<title>Dashboard</title>
			</Head>
			<main>
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
					{cards_data.map((c, i) => (
						<Cards
							key={c._id}
							count={c.count}
							name={c.name}
							percentage={0}
							isDown={false}
							icon={cardsData[i].icon}
						/>
					))}
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
					<Paper className="h-[500px] col-span-2">
						<MyResponsiveLine data_sent={line_data} />
					</Paper>
					<Paper className="h-[500px]">
						<MyResponsiveBar data_sent={bar_data} />
					</Paper>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
					<Paper className="h-[500px]">
						<MyResponsivePie data_sent={pie_data} />
					</Paper>
					{data_grid_data.role == "STUDENT" ? (
						<Paper className="h-[500px] col-span-2">
							<DataGrid
								columns={columnsSubject}
								rows={data_grid_data.data || []}
								checkboxSelection
								rowsPerPageOptions={[]}
								getRowId={(row) => row._id}
							/>
						</Paper>
					) : (
						<Paper className="h-[500px] col-span-2">
							<DataGrid
								columns={columnsClasses}
								rows={data_grid_data.data || []}
								checkboxSelection
								rowsPerPageOptions={[]}
								getRowId={(row) => row._id}
							/>
						</Paper>
					)}
				</div>
			</main>
		</div>
	);
};

export default Index;
